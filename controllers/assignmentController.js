import Assignment from '../models/Assignment.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import { createNotificationHelper } from './notificationController.js';

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

    res.json({ assignments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAssignment = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const courseId = req.params.courseId || req.body.course;
  try {
    let filePath = '';
    if (req.file) {
      filePath = `/uploads/${req.file.filename}`;
    }

    const assignment = await Assignment.create({
      course: courseId,
      title,
      description,
      filePath,
      dueDate
    });

    // Notify all enrolled students
    const courseObj = await Course.findById(courseId);
    const enrollments = await Enrollment.find({ course: courseId, accessGranted: true });

    for (const enroll of enrollments) {
      await createNotificationHelper(
        enroll.user,
        'New Assignment Published!',
        `A new assignment "${title}" has been published for course "${courseObj?.title || 'your course'}".`
      );
    }

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitAssignment = async (req, res) => {
  const { assignment, submissionText } = req.body;
  try {
    let filePath = '';
    if (req.file) {
      filePath = `/uploads/${req.file.filename}`;
    }

    const submission = await AssignmentSubmission.findOneAndUpdate(
      { assignment, student: req.user._id },
      { submissionText, filePath, grade: undefined, feedback: undefined },
      { new: true, upsert: true }
    );

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubmissionsForAdmin = async (req, res) => {
  try {
    const submissions = await AssignmentSubmission.find({ assignment: req.params.assignmentId })
      .populate('student', 'name email')
      .sort({ updatedAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gradeSubmission = async (req, res) => {
  const { grade, feedback } = req.body;
  try {
    const submission = await AssignmentSubmission.findById(req.params.id).populate('assignment');
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
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
