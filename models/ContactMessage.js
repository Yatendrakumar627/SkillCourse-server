import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxLength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true, maxLength: 3000 },
}, { timestamps: true });

export default mongoose.model('ContactMessage', contactMessageSchema);
