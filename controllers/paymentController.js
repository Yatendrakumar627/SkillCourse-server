import Payment from '../models/Payment.js';
import Enrollment from '../models/Enrollment.js';
import { createNotificationHelper } from './notificationController.js';

export const submitPayment = async (req, res) => {
  const { course, amount, transactionId } = req.body;
  try {
    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a payment screenshot receipt' });
    }

    const screenshotUrl = `/uploads/${req.file.filename}`;

    const payment = await Payment.create({
      user: req.user._id,
      course,
      amount,
      screenshotUrl,
      transactionId,
      status: 'pending',
    });

    // Create a pending enrollment record so user can track status
    await Enrollment.create({
      user: req.user._id,
      course,
      paymentId: payment._id,
      accessGranted: false
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('course')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate('user', 'name email phone')
      .populate('course')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  const { status, rejectionReason } = req.body;
  try {
    const payment = await Payment.findById(req.params.id).populate('course');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = status;
    payment.reviewedBy = req.user._id;
    if (status === 'rejected') {
      payment.rejectionReason = rejectionReason;
    }
    await payment.save();

    // Update corresponding enrollment access status
    const enrollment = await Enrollment.findOne({ paymentId: payment._id });
    if (enrollment) {
      if (status === 'approved') {
        enrollment.accessGranted = true;
        enrollment.grantedAt = new Date();
      } else {
        enrollment.accessGranted = false;
      }
      await enrollment.save();
    }

    // Trigger Notification
    const courseTitle = payment.course?.title || 'your selected course';
    if (status === 'approved') {
      await createNotificationHelper(
        payment.user,
        'Payment Approved!',
        `Your payment for "${courseTitle}" has been verified. You now have full access to class links and resources.`
      );
    } else if (status === 'rejected') {
      await createNotificationHelper(
        payment.user,
        'Payment Verification Failed',
        `Your payment for "${courseTitle}" was rejected. Reason: ${rejectionReason || 'Receipt not clear'}`
      );
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
