import crypto from 'crypto';
import mongoose from 'mongoose';
import Payment from '../models/Payment.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import { createNotificationHelper } from './notificationController.js';

const UTR_REGEX = /^[A-Z0-9]{8,30}$/;

const approvePaymentAndGrantAccess = async (payment, reviewerId = null) => {
  payment.status = 'approved';
  payment.rejectionReason = undefined;
  if (reviewerId) {
    payment.reviewedBy = reviewerId;
  }
  await payment.save();

  const courseId = payment.course?._id || payment.course;
  if (courseId) {
    await Enrollment.findOneAndUpdate(
      { user: payment.user, course: courseId },
      { $set: { paymentId: payment._id, accessGranted: true, grantedAt: new Date() } },
      { upsert: true, returnDocument: 'after' }
    );
  }

  const courseTitle = payment.course?.title || 'your selected course';
  await createNotificationHelper(
    payment.user,
    'Payment Approved!',
    `Your payment for "${courseTitle}" has been verified. You now have full access to class links and resources.`
  );
};

export const getPaymentConfig = (req, res) => {
  res.json({
    upiId: process.env.PAYMENT_UPI_ID?.trim() || 'pay@skillcourse',
    upiName: process.env.PAYMENT_UPI_NAME?.trim() || 'SkillCourse Education',
    bankName: process.env.PAYMENT_BANK_NAME?.trim() || 'SkillCourse Education',
    accountNumber: process.env.PAYMENT_ACCOUNT_NUMBER?.trim() || '1234567890',
    ifsc: process.env.PAYMENT_IFSC?.trim() || 'SKILL0001',
    autoVerifyEnabled: Boolean(process.env.UPI_WEBHOOK_SECRET),
  });
};

export const submitPayment = async (req, res) => {
  const { course } = req.body;
  const transactionId = typeof req.body.transactionId === 'string'
    ? req.body.transactionId.trim().toUpperCase()
    : '';

  try {
    if (!course || !mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({ message: 'Valid course ID is required' });
    }
    if (!UTR_REGEX.test(transactionId)) {
      return res.status(400).json({
        message: 'Please enter a valid 8–30 character UTR / Transaction Reference ID (letters and numbers only)'
      });
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

    if (status === 'approved') {
      await approvePaymentAndGrantAccess(payment, req.user._id);
    } else {
      payment.status = 'rejected';
      payment.reviewedBy = req.user._id;
      payment.rejectionReason = rejectionReason?.trim() || 'Receipt could not be verified';
      await payment.save();

      const courseId = payment.course?._id || payment.course;
      if (courseId) {
        await Enrollment.findOneAndUpdate(
          { user: payment.user, course: courseId },
          { $set: { paymentId: payment._id, accessGranted: false }, $unset: { grantedAt: 1 } },
          { upsert: true, returnDocument: 'after' }
        );
      }

      const courseTitle = payment.course?.title || 'your selected course';
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

// Free UPI Automation Webhook (e.g. Android SMS/Notification forwarder or self-hosted listener)
export const handleUpiWebhook = async (req, res) => {
  const webhookSecret = process.env.UPI_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return res.status(503).json({ message: 'UPI webhook automation is not configured' });
  }

  const signature = req.headers['x-webhook-signature'];
  if (typeof signature !== 'string' || !signature) {
    return res.status(401).json({ message: 'Missing webhook signature' });
  }

  const expected = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body || {}))
    .digest('hex');

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return res.status(401).json({ message: 'Invalid webhook signature' });
  }

  try {
    const utr = typeof req.body.utr === 'string' ? req.body.utr.trim().toUpperCase() : '';
    const amount = Number(req.body.amount);

    if (!UTR_REGEX.test(utr) || Number.isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Valid UTR and positive amount are required' });
    }

    const payment = await Payment.findOne({ transactionId: utr }).populate('course');
    if (!payment) {
      return res.status(404).json({ message: 'No matching payment submission found for UTR' });
    }
    if (payment.status === 'approved') {
      return res.json({ message: 'Payment already verified', paymentId: payment._id });
    }
    if (payment.status !== 'pending') {
      return res.status(409).json({ message: `Payment is already ${payment.status}` });
    }
    if (Number(payment.amount) !== amount) {
      return res.status(400).json({ message: 'Amount mismatch' });
    }

    await approvePaymentAndGrantAccess(payment);
    res.json({ message: 'Payment verified and course access granted', paymentId: payment._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
