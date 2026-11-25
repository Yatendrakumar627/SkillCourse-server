import Module from '../models/Module.js';
import Course from '../models/Course.js';

const parseTelegramMessageId = (raw) => {
  if (raw === undefined || raw === null || raw === '') return null;
  const str = String(raw).trim();
  if (/^\d+$/.test(str)) return Number(str);
  const match = str.match(/t\.me\/(?:c\/\d+\/|[^/]+\/)(\d+)/i);
  return match ? Number(match[1]) : null;
};

export const getModulesByCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).select('isPublished');
    if (!course || (!course.isPublished && (!req.user || req.user.role !== 'admin'))) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const modules = await Module.find({ course: req.params.courseId }).sort({ order: 1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createModule = async (req, res) => {
  const title = req.body.title?.trim();
  const description = req.body.description?.trim();
  const order = Number(req.body.order) || 0;
  const telegramMessageId = parseTelegramMessageId(req.body.telegramMessageId);
  const courseId = req.params.courseId || req.body.course;

  try {
    if (!title) {
      return res.status(400).json({ message: 'Module title is required' });
    }
    if (req.body.telegramMessageId && !telegramMessageId) {
      return res.status(400).json({ message: 'Invalid Telegram message ID or link' });
    }
    const courseExists = await Course.exists({ _id: courseId });
    if (!courseExists) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const moduleItem = await Module.create({
      course: courseId,
      title,
      description,
      order,
      telegramMessageId
    });
    res.status(201).json(moduleItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateModule = async (req, res) => {
  try {
    const updates = {};
    if (req.body.title !== undefined) {
      if (!String(req.body.title).trim()) {
        return res.status(400).json({ message: 'Module title cannot be empty' });
      }
      updates.title = String(req.body.title).trim();
    }
    if (req.body.description !== undefined) {
      updates.description = String(req.body.description).trim();
    }
    if (req.body.order !== undefined) {
      updates.order = Number(req.body.order) || 0;
    }
    if (req.body.telegramMessageId !== undefined) {
      const parsedId = parseTelegramMessageId(req.body.telegramMessageId);
      if (req.body.telegramMessageId && !parsedId) {
        return res.status(400).json({ message: 'Invalid Telegram message ID or link' });
      }
      updates.telegramMessageId = parsedId;
    }

    const filter = req.params.courseId
      ? { _id: req.params.id, course: req.params.courseId }
      : { _id: req.params.id };

    const moduleItem = await Module.findOneAndUpdate(filter, updates, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!moduleItem) return res.status(404).json({ message: 'Module not found' });
    res.json(moduleItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteModule = async (req, res) => {
  try {
    const filter = req.params.courseId
      ? { _id: req.params.id, course: req.params.courseId }
      : { _id: req.params.id };

    const moduleItem = await Module.findOneAndDelete(filter);
    if (!moduleItem) return res.status(404).json({ message: 'Module not found' });
    res.json({ message: 'Module deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
