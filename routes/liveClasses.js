import express from 'express';
import {
  getLiveClasses,
  createLiveClass,
  deleteLiveClass
} from '../controllers/liveClassController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getLiveClasses);
router.post('/', protect, adminOnly, createLiveClass);
router.delete('/:id', protect, adminOnly, deleteLiveClass);

export default router;
