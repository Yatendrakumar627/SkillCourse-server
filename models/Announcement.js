import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Optional, if null it's for everyone
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Announcement', announcementSchema);
