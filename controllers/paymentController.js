import mongoose from 'mongoose';
import Payment from '../models/Payment.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import { createNotificationHelper } from './notificationController.js';

export const submitPayment = async (req, res) => {
  const { course } = req.body;
  const transactionId = req.body.transactionId?.trim();

  try {
    if (!course || !mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({ message: 'Valid course ID is required' });
    }
    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a payment screenshot receipt' });
    }

    const courseDoc = await Course.findById(course);
    if (!courseDoc || !courseDoc.isPublished) {
      return res.status(404).json({ message: 'Course not found or unavailable' });
    }

    const existingEnrollment = await Enrollment.findOne({ user: req.user._id, course });
    if (existingEnrollment?.accessGranted) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    const pendingPayment = await Payment.findOne({
      user: req.user._id,
      course,
      status: 'pending'
    });
    if (pendingPayment) {
      return res.status(400).json({ message: 'You already have a pending payment verification for this course' });
    }

    const duplicateTx = await Payment.findOne({
      transactionId,
      status: { $in: ['pending', 'approved'] }
    });
    if (duplicateTx) {
      return res.status(409).json({ message: 'This transaction ID has already been submitted' });
    }

    // Always compute amount server-side to prevent price tampering
    const serverAmount =
      courseDoc.discountedPrice != null && courseDoc.discountedPrice > 0
        ? courseDoc.discountedPrice
        : courseDoc.price;

    const screenshotUrl = `/uploads/${req.file.filename}`;

    const payment = await Payment.create({
      user: req.user._id,
      course: courseDoc._id,
      amount: serverAmount,
      screenshotUrl,
      transactionId,
      status: 'pending',
    });

    // Upsert enrollment so rejected-payment retries update the existing record cleanly
    try {
      await Enrollment.findOneAndUpdate(
        { user: req.user._id, course: courseDoc._id },
        {
          $set: { paymentId: payment._id, accessGranted: false },
          $unset: { grantedAt: 1 }
        },
        { upsert: true, new: true }
      );
    } catch (enrollErr) {
      await Payment.findByIdAndDelete(payment._id);
      throw enrollErr;
    }

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
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be either approved or rejected' });
    }

    const payment = await Payment.findById(req.params.id).populate('course');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = status;
    payment.reviewedBy = req.user._id;
    if (status === 'rejected') {
      payment.rejectionReason = rejectionReason?.trim() || 'Receipt could not be verified';
    } else {
      payment.rejectionReason = undefined;
    }
    await payment.save();

    // Update or create corresponding enrollment access status
    const courseId = payment.course?._id || payment.course;
    if (courseId) {
      const updateOps =
        status === 'approved'
          ? { $set: { paymentId: payment._id, accessGranted: true, grantedAt: new Date() } }
          : { $set: { paymentId: payment._id, accessGranted: false }, $unset: { grantedAt: 1 } };

      await Enrollment.findOneAndUpdate(
        { user: payment.user, course: courseId },
        updateOps,
        { upsert: true, new: true }
      );
    }

    // Trigger Notification
    const courseTitle = payment.course?.title || 'your selected course';
    if (status === 'approved') {
      await createNotificationHelper(
        payment.user,
        'Payment Approved!',
        `Your payment for "${courseTitle}" has been verified. You now have full access to class links and resources.`
      );
    } else {
      await createNotificationHelper(
        payment.user,
        'Payment Verification Failed',
        `Your payment for "${courseTitle}" was rejected. Reason: ${payment.rejectionReason}`
      );
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
