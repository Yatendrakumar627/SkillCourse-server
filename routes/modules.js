import express from 'express';
import {
  getModulesByCourse,
  createModule,
  updateModule,
  deleteModule
} from '../controllers/moduleController.js';
import { protect, optionalProtect, adminOnly } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router.get('/', optionalProtect, getModulesByCourse);
router.post('/', protect, adminOnly, createModule);
router.put('/:id', protect, adminOnly, updateModule);
router.delete('/:id', protect, adminOnly, deleteModule);

export default router;

