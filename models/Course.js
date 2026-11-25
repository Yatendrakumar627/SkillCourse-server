import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: { type: String, maxLength: 150 },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  thumbnail: { type: String },
  duration: { type: String },
  language: { type: String, default: 'English' },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseCategory' },
  instructor: { type: String },
  isPublished: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 100 }
}, { timestamps: true });

courseSchema.index({ isPublished: 1, displayOrder: 1, createdAt: 1 });
courseSchema.index({ category: 1, isPublished: 1, displayOrder: 1 });

export default mongoose.model('Course', courseSchema);
