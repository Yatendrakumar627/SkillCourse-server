import Module from '../models/Module.js';

export const getModulesByCourse = async (req, res) => {
  try {
    const modules = await Module.find({ course: req.params.courseId }).sort({ order: 1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createModule = async (req, res) => {
  const { title, description, order } = req.body;
  const courseId = req.params.courseId || req.body.course;
  try {
    const moduleItem = await Module.create({
      course: courseId,
      title,
      description,
      order: order || 0
    });
    res.status(201).json(moduleItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateModule = async (req, res) => {
  try {
    const moduleItem = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!moduleItem) return res.status(404).json({ message: 'Module not found' });
    res.json(moduleItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteModule = async (req, res) => {
  try {
    const moduleItem = await Module.findByIdAndDelete(req.params.id);
    if (!moduleItem) return res.status(404).json({ message: 'Module not found' });
    res.json({ message: 'Module deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
