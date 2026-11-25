import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import { notifyTelegramEvent } from '../utils/telegramNotifier.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const message = req.body.message?.trim();

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const saved = await ContactMessage.create({ name, email, message });

    notifyTelegramEvent('New Contact Inquiry', [
      ['Name', name],
      ['Email', email],
      ['Message', message.slice(0, 500)],
    ]);

    res.status(201).json({ message: 'Message received. We will contact you soon.', id: saved._id });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json({ message: 'Contact message deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
