import Assignment from '../models/Assignment.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import { createNotificationHelper, createBulkNotificationsHelper } from './notificationController.js';
import { notifyTelegramEvent } from '../utils/telegramNotifier.js';

export const getAssignmentsByCourse = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      const enrolled = await Enrollment.findOne({ user: req.user._id, course: req.params.courseId, accessGranted: true });
      if (!enrolled) {
        return res.status(403).json({ message: 'Access denied. You are not enrolled in this course.' });
      }
    }

    const assignments = await Assignment.find({ course: req.params.courseId }).sort({ createdAt: -1 });

    // For students, fetch if they have already submitted solutions for these
    if (req.user.role === 'student') {
      const submissions = await AssignmentSubmission.find({
        student: req.user._id,
        assignment: { $in: assignments.map(a => a._id) }
      });
      return res.json({ assignments, submissions });
    }

    // For admins, include submission counts per assignment in one aggregation
    const counts = await AssignmentSubmission.aggregate([
      { $match: { assignment: { $in: assignments.map((a) => a._id) } } },
      { $group: { _id: '$assignment', count: { $sum: 1 } } },
    ]);
    const submissionCounts = Object.fromEntries(counts.map((c) => [String(c._id), c.count]));

    res.json({ assignments, submissionCounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const filter = req.params.courseId
      ? { _id: req.params.id, course: req.params.courseId }
      : { _id: req.params.id };
    const assignment = await Assignment.findOne(filter);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (req.body.title !== undefined) {
      const title = String(req.body.title).trim();
      if (!title) return res.status(400).json({ message: 'Assignment title cannot be empty' });
      assignment.title = title;
    }
    if (req.body.description !== undefined) {
      const description = String(req.body.description).trim();
      if (!description) return res.status(400).json({ message: 'Assignment description cannot be empty' });
      assignment.description = description;
    }
    if (req.body.dueDate !== undefined) {
      assignment.dueDate = req.body.dueDate ? new Date(req.body.dueDate) : undefined;
    }
    if (req.file) {
      assignment.filePath = `/uploads/${req.file.filename}`;
    }

    await assignment.save();
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const filter = req.params.courseId
      ? { _id: req.params.id, course: req.params.courseId }
      : { _id: req.params.id };
    const assignment = await Assignment.findOneAndDelete(filter);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    await AssignmentSubmission.deleteMany({ assignment: assignment._id });
    res.json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAssignment = async (req, res) => {
  const title = req.body.title?.trim();
  const description = req.body.description?.trim();
  const { dueDate } = req.body;
  const courseId = req.params.courseId || req.body.course;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const courseObj = await Course.findById(courseId);
    if (!courseObj) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let filePath = '';
    if (req.file) {
      filePath = `/uploads/${req.file.filename}`;
    }

    const assignment = await Assignment.create({
      course: courseId,
      title,
      description,
      filePath,
      dueDate: dueDate || undefined
    });

    // Notify all enrolled students in bulk
    const enrollments = await Enrollment.find({ course: courseId, accessGranted: true }).select('user');
    await createBulkNotificationsHelper(
      enrollments.map((e) => e.user),
      'New Assignment Published!',
      `A new assignment "${title}" has been published for course "${courseObj.title}".`
    );

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitAssignment = async (req, res) => {
  const assignmentId = req.params.assignmentId || req.body.assignment;
  const submissionText = req.body.submissionText?.trim();

  try {
    if (!assignmentId) {
      return res.status(400).json({ message: 'Assignment ID is required' });
    }
    if (!submissionText && !req.file) {
      return res.status(400).json({ message: 'Please provide a text answer or upload a solution file' });
    }

    const assignmentFilter = req.params.courseId
      ? { _id: assignmentId, course: req.params.courseId }
      : { _id: assignmentId };
    const assignmentDoc = await Assignment.findOne(assignmentFilter);
    if (!assignmentDoc) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (req.user.role !== 'admin') {
      const enrolled = await Enrollment.findOne({
        user: req.user._id,
        course: assignmentDoc.course,
        accessGranted: true
      });
      if (!enrolled) {
        return res.status(403).json({ message: 'Access denied. You are not enrolled in this course.' });
      }
    }

    const setFields = {};
    if (submissionText !== undefined) {
      setFields.submissionText = submissionText;
    }
    if (req.file) {
      setFields.filePath = `/uploads/${req.file.filename}`;
    }

    const submission = await AssignmentSubmission.findOneAndUpdate(
      { assignment: assignmentDoc._id, student: req.user._id },
      {
        $set: setFields,
        $unset: { grade: 1, feedback: 1 }
      },
      { new: true, upsert: true }
    );

    notifyTelegramEvent('New Assignment Submission', [
      ['Student', `${req.user.name} (${req.user.email})`],
      ['Assignment', assignmentDoc.title],
      ['Has File', req.file ? 'Yes' : 'No'],
    ]);

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubmissionsForAdmin = async (req, res) => {
  try {
    const assignmentFilter = req.params.courseId
      ? { _id: req.params.assignmentId, course: req.params.courseId }
      : { _id: req.params.assignmentId };
    const assignmentDoc = await Assignment.findOne(assignmentFilter);
    if (!assignmentDoc) {
      return res.status(404).json({ message: 'Assignment not found for this course' });
    }

    const submissions = await AssignmentSubmission.find({ assignment: assignmentDoc._id })
      .populate('student', 'name email')
      .sort({ updatedAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gradeSubmission = async (req, res) => {
  const grade = req.body.grade?.trim();
  const feedback = req.body.feedback?.trim();

  try {
    if (!grade) {
      return res.status(400).json({ message: 'Grade is required' });
    }

    const submission = await AssignmentSubmission.findById(req.params.id).populate('assignment');
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    if (
      req.params.courseId &&
      submission.assignment &&
      String(submission.assignment.course) !== String(req.params.courseId)
    ) {
      return res.status(404).json({ message: 'Submission does not belong to this course' });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    await submission.save();

    // Notify the student
    const assignmentTitle = submission.assignment?.title || 'your assignment';
    await createNotificationHelper(
      submission.student,
      'Assignment Graded!',
      `Your solution for "${assignmentTitle}" was graded: "${grade}". Feedback: ${feedback || 'No comments'}`
    );

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
