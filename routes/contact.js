import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

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
    res.status(201).json({ message: 'Message received. We will contact you soon.', id: saved._id });
  } catch (error) {
    next(error);
  }
});

export default router;
