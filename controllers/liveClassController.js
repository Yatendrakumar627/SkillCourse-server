import LiveClass from '../models/LiveClass.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import { createNotificationHelper } from './notificationController.js';

export const getLiveClasses = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const classes = await LiveClass.find({}).populate('course').sort({ date: 1 });
      return res.json(classes);
    }

    // For students: first find which courses the user has approved enrollments for
    const enrollments = await Enrollment.find({ user: req.user._id, accessGranted: true });
    const courseIds = enrollments.map(e => e.course);

    const classes = await LiveClass.find({ course: { $in: courseIds } })
      .populate('course')
      .sort({ date: 1 });

    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLiveClass = async (req, res) => {
  const { course, topic, meetLink, date, notesUrl } = req.body;
  try {
    const liveClass = await LiveClass.create({
      course,
      topic,
      meetLink,
      date,
      notesUrl
    });

    // Notify all enrolled students
    const courseObj = await Course.findById(course);
    const enrollments = await Enrollment.find({ course, accessGranted: true });
    const formattedDate = new Date(date).toLocaleString();

    for (const enroll of enrollments) {
      await createNotificationHelper(
        enroll.user,
        'New Live Class Scheduled!',
        `A class on "${topic}" has been scheduled for "${courseObj?.title || 'your course'}" at ${formattedDate}.`
      );
    }

    res.status(201).json(liveClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLiveClass = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByIdAndDelete(req.params.id);
    if (!liveClass) return res.status(404).json({ message: 'Live class not found' });
    res.json({ message: 'Live class deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
