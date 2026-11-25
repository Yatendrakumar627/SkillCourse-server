import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  order: { type: Number, default: 0 },
  telegramMessageId: { type: Number, default: null }
}, { timestamps: true });

export default mongoose.model('Module', moduleSchema);
