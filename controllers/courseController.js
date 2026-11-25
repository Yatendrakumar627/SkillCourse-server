import Course from '../models/Course.js';
import CourseCategory from '../models/CourseCategory.js';
import Module from '../models/Module.js';
import Assignment from '../models/Assignment.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';
import LiveClass from '../models/LiveClass.js';
import Announcement from '../models/Announcement.js';
import Enrollment from '../models/Enrollment.js';

const toSlug = (text = '') =>
  String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const buildUniqueCourseSlug = async (title, excludeId = null) => {
  const baseSlug = toSlug(title) || `course-${Date.now()}`;
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = excludeId ? { slug, _id: { $ne: excludeId } } : { slug };
    const exists = await Course.exists(query);
    if (!exists) return slug;
    slug = `${baseSlug}-${counter++}`;
  }
};

// --- Categories ---
export const getCategories = async (req, res) => {
  try {
    const categories = await CourseCategory.find({}).lean();
    res.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=300');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const name = req.body.name?.trim();
  const icon = req.body.icon?.trim();
  try {
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const slug = toSlug(name);
    if (!slug) {
      return res.status(400).json({ message: 'Invalid category name' });
    }
    const existing = await CourseCategory.findOne({ slug });
    if (existing) {
      return res.status(409).json({ message: 'Category already exists' });
    }
    const category = await CourseCategory.create({ name, slug, icon });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await CourseCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    await Course.updateMany({ category: req.params.id }, { $unset: { category: 1 } });
    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Courses ---
export const getCourses = async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};
    if (category) {
      query.category = category;
    }
    // Users can only see published courses unless they are admin
    const isAdmin = req.user?.role === 'admin';
    if (!isAdmin) {
      query.isPublished = true;
      res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    const courses = await Course.find(query)
      .populate('category')
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const query = { slug: req.params.slug };
    if (!req.user || req.user.role !== 'admin') {
      query.isPublished = true;
    }
    const course = await Course.findOne(query).populate('category').lean();
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  const {
    title,
    description,
    shortDescription,
    price,
    discountedPrice,
    thumbnail,
    duration,
    language,
    level,
    category,
    instructor,
    isPublished,
    isFeatured,
    displayOrder
  } = req.body;

  try {
    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: 'Price must be a valid non-negative number' });
    }

    const hasDiscount = discountedPrice !== '' && discountedPrice !== null && discountedPrice !== undefined;
    const numericDiscount = hasDiscount ? Number(discountedPrice) : undefined;
    if (hasDiscount && (Number.isNaN(numericDiscount) || numericDiscount < 0 || numericDiscount > numericPrice)) {
      return res.status(400).json({ message: 'Discounted price must be between 0 and the base price' });
    }

    const slug = await buildUniqueCourseSlug(title);
    const course = await Course.create({
      title: title.trim(),
      slug,
      description,
      shortDescription,
      price: numericPrice,
      discountedPrice: numericDiscount,
      thumbnail,
      duration,
      language,
      level,
      category: category || undefined,
      instructor,
      isPublished: Boolean(isPublished),
      isFeatured: Boolean(isFeatured),
      displayOrder: displayOrder !== undefined && displayOrder !== '' ? Number(displayOrder) : 100
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const allowedFields = [
      'title',
      'description',
      'shortDescription',
      'price',
      'discountedPrice',
      'thumbnail',
      'duration',
      'language',
      'level',
      'category',
      'instructor',
      'isPublished',
      'isFeatured',
      'displayOrder',
    ];

    const setUpdates = {};
    const unsetUpdates = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        setUpdates[field] = req.body[field];
      }
    }

    if (setUpdates.title !== undefined) {
      if (!String(setUpdates.title).trim()) {
        return res.status(400).json({ message: 'Course title cannot be empty' });
      }
      setUpdates.title = String(setUpdates.title).trim();
      setUpdates.slug = await buildUniqueCourseSlug(setUpdates.title, course._id);
    }

    if (setUpdates.price !== undefined) {
      const numericPrice = Number(setUpdates.price);
      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ message: 'Price must be a valid non-negative number' });
      }
      setUpdates.price = numericPrice;
    }

    const effectivePrice = setUpdates.price ?? course.price;
    if (Object.prototype.hasOwnProperty.call(setUpdates, 'discountedPrice')) {
      if (setUpdates.discountedPrice === '' || setUpdates.discountedPrice === null) {
        delete setUpdates.discountedPrice;
        unsetUpdates.discountedPrice = 1;
      } else {
        const numericDiscount = Number(setUpdates.discountedPrice);
        if (Number.isNaN(numericDiscount) || numericDiscount < 0 || numericDiscount > effectivePrice) {
          return res.status(400).json({ message: 'Discounted price must be between 0 and the base price' });
        }
        setUpdates.discountedPrice = numericDiscount;
      }
    }

    if (setUpdates.category === '' || setUpdates.category === null) {
      delete setUpdates.category;
      unsetUpdates.category = 1;
    }

    if (Object.prototype.hasOwnProperty.call(setUpdates, 'displayOrder')) {
      if (setUpdates.displayOrder === '' || setUpdates.displayOrder === null) {
        setUpdates.displayOrder = 100;
      } else {
        const numericOrder = Number(setUpdates.displayOrder);
        if (Number.isNaN(numericOrder)) {
          return res.status(400).json({ message: 'Display order must be a valid number' });
        }
        setUpdates.displayOrder = numericOrder;
      }
    }

    if (Object.prototype.hasOwnProperty.call(setUpdates, 'isFeatured')) {
      setUpdates.isFeatured = Boolean(setUpdates.isFeatured);
    }
    if (Object.prototype.hasOwnProperty.call(setUpdates, 'isPublished')) {
      setUpdates.isPublished = Boolean(setUpdates.isPublished);
    }

    const updateQuery = Object.keys(unsetUpdates).length
      ? { $set: setUpdates, $unset: unsetUpdates }
      : { $set: setUpdates };

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateQuery,
      { returnDocument: 'after', runValidators: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const assignments = await Assignment.find({ course: course._id }).select('_id');
    const assignmentIds = assignments.map((a) => a._id);

    await Promise.all([
      Module.deleteMany({ course: course._id }),
      AssignmentSubmission.deleteMany({ assignment: { $in: assignmentIds } }),
      Assignment.deleteMany({ course: course._id }),
      LiveClass.deleteMany({ course: course._id }),
      Announcement.deleteMany({ course: course._id }),
      Enrollment.deleteMany({ course: course._id }),
    ]);

    res.json({ message: 'Course removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
