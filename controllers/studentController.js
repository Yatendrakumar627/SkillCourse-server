import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudentStatus = async (req, res) => {
  const { status } = req.body;
  try {
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be active or inactive.' });
    }
    const student = await User.findOne({ _id: req.params.id, role: 'student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.status = status;
    await student.save();
    res.json({ message: `Student status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id, accessGranted: true })
      .populate('course');
    const courses = enrollments.map(e => e.course).filter(c => c !== null);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course')
      .populate('paymentId')
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentActivityDetails = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: 'student' }).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const enrollments = await Enrollment.find({ user: student._id }).populate('course').populate('paymentId');
    const submissions = await AssignmentSubmission.find({ student: student._id }).populate('assignment');

    res.json({ student, enrollments, submissions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMyProfile = async (req, res) => {
  const { name, phone, password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name !== undefined) {
      const trimmedName = String(name).trim();
      if (!trimmedName) {
        return res.status(400).json({ message: 'Name cannot be empty' });
      }
      user.name = trimmedName;
    }
    if (phone !== undefined) {
      user.phone = String(phone).trim();
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
      user.password = password; // pre-save hook hashes this
    }
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
