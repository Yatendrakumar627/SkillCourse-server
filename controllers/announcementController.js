import Announcement from '../models/Announcement.js';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import { createNotificationHelper } from './notificationController.js';

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
  const { title, message, course } = req.body;
  try {
    const announcement = await Announcement.create({
      title,
      message,
      course: course || null,
      createdBy: req.user._id
    });

    // Notify targeted users
    if (course) {
      const enrollments = await Enrollment.find({ course, accessGranted: true });
      for (const enroll of enrollments) {
        await createNotificationHelper(
          enroll.user,
          `New Announcement: ${title}`,
          message
        );
      }
    } else {
      // Global: Notify all students
      const students = await User.find({ role: 'student', status: 'active' });
      for (const student of students) {
        await createNotificationHelper(
          student._id,
          `Global Announcement: ${title}`,
          message
        );
      }
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
