import express from 'express';
import {
  getAssignmentsByCourse,
  createAssignment,
  submitAssignment,
  getSubmissionsForAdmin,
  gradeSubmission
} from '../controllers/assignmentController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router({ mergeParams: true });

router.get('/', protect, getAssignmentsByCourse);
router.post('/', protect, adminOnly, upload.single('file'), createAssignment);
router.post('/submit', protect, upload.single('file'), submitAssignment);
router.get('/submissions/:assignmentId', protect, adminOnly, getSubmissionsForAdmin);
router.put('/grade/:id', protect, adminOnly, gradeSubmission);

export default router;

