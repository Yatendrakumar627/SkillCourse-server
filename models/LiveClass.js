import mongoose from 'mongoose';

const liveClassSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  topic: { type: String, required: true },
  meetLink: { type: String, required: true },
  date: { type: Date, required: true },
  notesUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('LiveClass', liveClassSchema);
