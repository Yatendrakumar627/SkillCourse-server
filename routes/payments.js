import express from 'express';
import {
  getPaymentConfig,
  submitPayment,
  getMyPayments,
  getAllPayments,
  updatePaymentStatus,
  handleUpiWebhook
} from '../controllers/paymentController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/config', protect, getPaymentConfig);
router.post('/upi-webhook', handleUpiWebhook);
router.post('/submit', protect, upload.single('screenshot'), submitPayment);
router.get('/my', protect, getMyPayments);
router.get('/all', protect, adminOnly, getAllPayments);
router.put('/:id/status', protect, adminOnly, updatePaymentStatus);

export default router;
