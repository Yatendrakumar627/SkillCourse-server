import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  filePath: { type: String }, // optional path for files/notes
  dueDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Assignment', assignmentSchema);
