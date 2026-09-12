import express from 'express';
import {
  getStudents,
  updateStudentStatus,
  getMyCourses,
  getMyEnrollments,
  getStudentActivityDetails,
  updateMyProfile
} from '../controllers/studentController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/my-courses', protect, getMyCourses);
router.get('/my-enrollments', protect, getMyEnrollments);
router.put('/profile', protect, updateMyProfile);
router.get('/activity/:id', protect, adminOnly, getStudentActivityDetails);
router.get('/', protect, adminOnly, getStudents);
router.put('/:id/status', protect, adminOnly, updateStudentStatus);

export default router;

