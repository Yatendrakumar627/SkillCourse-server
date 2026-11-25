import mongoose from 'mongoose';

const courseCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  icon: { type: String }
}, { timestamps: true });

export default mongoose.model('CourseCategory', courseCategorySchema);
