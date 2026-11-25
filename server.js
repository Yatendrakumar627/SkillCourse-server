import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { UPLOAD_DIR } from './middleware/upload.js';
import { protect, adminOnly } from './middleware/auth.js';
import Module from './models/Module.js';
import Enrollment from './models/Enrollment.js';
import {
  isTelegramConfigured,
  sendTelegramMessage,
  createDeliveryLink,
  startTelegramBotListener,
} from './utils/telegramNotifier.js';

// Route imports
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import paymentRoutes from './routes/payments.js';
import liveClassRoutes from './routes/liveClasses.js';
import announcementRoutes from './routes/announcements.js';
import studentRoutes from './routes/students.js';
import notificationRoutes from './routes/notifications.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is required.');
  process.exit(1);
}

const app = express();

// Strip MongoDB operator injection keys ($ / .) in place
const sanitizeValue = (val) => {
  if (Array.isArray(val)) {
    val.forEach(sanitizeValue);
    return val;
  }
  if (val && typeof val === 'object') {
    for (const key of Object.keys(val)) {
      if (key.startsWith('$') || key.includes('.')) {
        delete val[key];
      } else {
        sanitizeValue(val[key]);
      }
    }
  }
  return val;
};

const mongoSanitizeMiddleware = (req, res, next) => {
  if (req.body) sanitizeValue(req.body);
  if (req.params) sanitizeValue(req.params);
  if (req.query) sanitizeValue(req.query);
  next();
};

if (process.env.TRUST_PROXY === 'true' || process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(mongoSanitizeMiddleware);

// Normalize CORS origins: strip trailing slashes, support comma-separated list
const normalizeOrigin = (origin) => origin.replace(/\/+$/, '');
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)
  .map(normalizeOrigin);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || corsOrigins.includes(normalizeOrigin(origin))) {
      return callback(null, true);
    }
    const err = new Error(`Origin ${origin} not allowed by CORS`);
    err.statusCode = 403;
    return callback(err);
  },
}));

// Set up Helmet with configuration to allow resource sharing/loading locally if needed
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Serve uploads folder statically with safe headers
app.use('/uploads', express.static(UPLOAD_DIR, {
  setHeaders: (res, filePath) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp', '.gif', '.pdf'].includes(ext)) {
      res.setHeader('Content-Disposition', 'attachment');
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts, please try again later.' },
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many messages sent, please try again later.' },
});

// Mount API Routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/contact', contactLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/live-classes', liveClassRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/contact', contactRoutes);

app.post('/api/telegram/test', protect, adminOnly, async (req, res) => {
  if (!isTelegramConfigured()) {
    return res.status(503).json({
      message: 'Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID in server/.env first.',
    });
  }
  const result = await sendTelegramMessage(
    '<b>SkillCourse LMS</b>\nTelegram database event channel connected successfully.'
  );
  if (!result.sent) {
    return res.status(502).json({ message: `Telegram test failed: ${result.reason}` });
  }
  res.json({ message: 'Test message sent to Telegram channel!', messageId: result.messageId });
});

app.post('/api/telegram/deliver', protect, async (req, res) => {
  try {
    if (!isTelegramConfigured()) {
      return res.status(503).json({ message: 'Telegram file delivery is not configured' });
    }
    const { moduleId } = req.body;
    if (!moduleId || !mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ message: 'Valid module ID is required' });
    }

    const mod = await Module.findById(moduleId);
    if (!mod || !mod.telegramMessageId) {
      return res.status(404).json({ message: 'No Telegram file attached to this module' });
    }

    if (req.user.role !== 'admin') {
      const enrolled = await Enrollment.exists({
        user: req.user._id,
        course: mod.course,
        accessGranted: true,
      });
      if (!enrolled) {
        return res.status(403).json({ message: 'Access denied. Enroll in this course first.' });
      }
    }

    const delivery = await createDeliveryLink({
      userId: req.user._id,
      moduleTitle: mod.title,
      messageId: mod.telegramMessageId,
    });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Basic Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// 404 handler for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.code === 'LIMIT_FILE_SIZE' ? 'Uploaded file exceeds the size limit.' : err.message });
  }
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource identifier' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate value violates unique constraint' });
  }

  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    console.error('Unhandled server error:', err);
  }
  res.status(statusCode).json({ message: err.message || 'Internal server error' });
});

// Database connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      startTelegramBotListener();
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

