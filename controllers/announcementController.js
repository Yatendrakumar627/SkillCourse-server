import Announcement from '../models/Announcement.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { createBulkNotificationsHelper } from './notificationController.js';

export const getAnnouncements = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const announcements = await Announcement.find({}).populate('course').sort({ createdAt: -1 });
      return res.json(announcements);
    }

    // For students: global announcements (course: null) + course-specific announcements
    const enrollments = await Enrollment.find({ user: req.user._id, accessGranted: true });
    const courseIds = enrollments.map(e => e.course);

    const announcements = await Announcement.find({
      $or: [
        { course: null },
        { course: { $in: courseIds } }
      ]
    })
    .populate('course')
    .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  const title = req.body.title?.trim();
  const message = req.body.message?.trim();
  const course = req.body.course || null;

  try {
    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    if (course) {
      const courseExists = await Course.exists({ _id: course });
      if (!courseExists) {
        return res.status(404).json({ message: 'Target course not found' });
      }
    }

    const announcement = await Announcement.create({
      title,
      message,
      course,
      createdBy: req.user._id
    });

    // Notify targeted users in bulk
    if (course) {
      const enrollments = await Enrollment.find({ course, accessGranted: true }).select('user');
      await createBulkNotificationsHelper(
        enrollments.map((e) => e.user),
        `New Announcement: ${title}`,
        message
      );
    } else {
      const students = await User.find({ role: 'student', status: 'active' }).select('_id');
      await createBulkNotificationsHelper(
        students.map((s) => s._id),
        `Global Announcement: ${title}`,
        message
      );
    }

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
