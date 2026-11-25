import express from 'express';
import {
  getLiveClasses,
  createLiveClass,
  updateLiveClass,
  deleteLiveClass
} from '../controllers/liveClassController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getLiveClasses);
router.post('/', protect, adminOnly, createLiveClass);
router.put('/:id', protect, adminOnly, updateLiveClass);
router.delete('/:id', protect, adminOnly, deleteLiveClass);

export default router;
