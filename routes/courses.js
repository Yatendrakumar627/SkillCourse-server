import express from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory,
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { protect, optionalProtect, adminOnly } from '../middleware/auth.js';
import moduleRouter from './modules.js';
import assignmentRouter from './assignments.js';

const router = express.Router();

// Child hierarchical routing
router.use('/:courseId/modules', moduleRouter);
router.use('/:courseId/assignments', assignmentRouter);

// Categories
router.get('/categories', getCategories);
router.post('/categories', protect, adminOnly, createCategory);
router.delete('/categories/:id', protect, adminOnly, deleteCategory);

// Courses
router.get('/', optionalProtect, getCourses);
router.get('/:slug', getCourseBySlug);
router.post('/', protect, adminOnly, createCourse);
router.put('/:id', protect, adminOnly, updateCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);

export default router;

