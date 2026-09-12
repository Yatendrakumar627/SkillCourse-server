import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import paymentRoutes from './routes/payments.js';
import liveClassRoutes from './routes/liveClasses.js';
import announcementRoutes from './routes/announcements.js';
import studentRoutes from './routes/students.js';
import notificationRoutes from './routes/notifications.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// Normalize CORS origins: strip trailing slashes, support comma-separated list
const normalizeOrigin = (origin) => origin.replace(/\/+$/, '');
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)
  .map(normalizeOrigin);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
}));

// Set up Helmet with configuration to allow resource sharing/loading locally if needed
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit for smoother API interactions during development
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/live-classes', liveClassRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/notifications', notificationRoutes);

// Basic Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
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
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

