import express from 'express';
import {
  getAssignmentsByCourse,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissionsForAdmin,
  gradeSubmission
} from '../controllers/assignmentController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { uploadAssignmentFile } from '../middleware/upload.js';

const router = express.Router({ mergeParams: true });

router.get('/', protect, getAssignmentsByCourse);
router.post('/', protect, adminOnly, uploadAssignmentFile.single('file'), createAssignment);
router.put('/:id', protect, adminOnly, uploadAssignmentFile.single('file'), updateAssignment);
router.delete('/:id', protect, adminOnly, deleteAssignment);
router.post('/submit', protect, uploadAssignmentFile.single('file'), submitAssignment);
router.post('/:assignmentId/submit', protect, uploadAssignmentFile.single('file'), submitAssignment);
router.get('/submissions/:assignmentId', protect, adminOnly, getSubmissionsForAdmin);
router.put('/grade/:id', protect, adminOnly, gradeSubmission);

export default router;

