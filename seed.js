import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import CourseCategory from './models/CourseCategory.js';
import Course from './models/Course.js';
import Module from './models/Module.js';
import Assignment from './models/Assignment.js';
import { categoriesData, buildCoursesData } from './data/coursesCatalog.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms';
const isResetMode = process.argv.includes('--reset');

const seedDB = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME?.trim() || 'SkillCourse Admin';
    const adminPhone = process.env.ADMIN_PHONE?.trim() || '1234567890';

    if (!adminEmail || !adminPassword || adminPassword.length < 12) {
      throw new Error('ADMIN_EMAIL and a strong ADMIN_PASSWORD (min 12 chars) must be set in server/.env');
    }

    await mongoose.connect(MONGO_URI);
    console.log(`Connected to DB for seeding (${isResetMode ? 'RESET' : 'UPSERT'} mode)...`);

    if (isResetMode) {
      await User.deleteMany({ role: 'admin' });
      await CourseCategory.deleteMany({});
      await Course.deleteMany({});
      await Module.deleteMany({});
      await Assignment.deleteMany({});
    }

    // Ensure Admin User exists and stays synced with .env credentials
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword, // Hashed via User pre-save hook
        phone: adminPhone,
        role: 'admin',
        status: 'active'
      });
      console.log(`Admin user seeded for ${adminEmail} (credentials loaded from .env).`);
    } else {
      let updated = false;
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        updated = true;
      }
      if (existingAdmin.status !== 'active') {
        existingAdmin.status = 'active';
        updated = true;
      }
      if (!(await existingAdmin.comparePassword(adminPassword))) {
        existingAdmin.password = adminPassword; // Re-hashed via User pre-save hook
        updated = true;
      }
      if (updated) {
        await existingAdmin.save();
        console.log(`Admin user synced with .env credentials (${adminEmail}).`);
      } else {
        console.log(`Admin user (${adminEmail}) already in sync with .env.`);
      }
    }

    // Upsert Categories by slug
    const cats = {};
    for (const cat of categoriesData) {
      const savedCat = await CourseCategory.findOneAndUpdate(
        { slug: cat.slug },
        { $set: cat },
        { upsert: true, returnDocument: 'after', runValidators: true }
      );
      cats[cat.slug] = savedCat._id;
    }
    console.log(`Categories synced (${Object.keys(cats).length} total).`);

    // Upsert Courses, Modules & Assignments
    const coursesData = buildCoursesData(cats);
    let createdOrUpdatedCount = 0;
    let modulesAdded = 0;
    let assignmentsAdded = 0;

    for (const { modules = [], assignments = [], ...courseFields } of coursesData) {
      const savedCourse = await Course.findOneAndUpdate(
        { slug: courseFields.slug },
        { $set: courseFields },
        { upsert: true, returnDocument: 'after', runValidators: true }
      );
      createdOrUpdatedCount++;

      if (modules.length) {
        const existingModuleCount = await Module.countDocuments({ course: savedCourse._id });
        if (existingModuleCount === 0) {
          await Module.create(modules.map((m) => ({ course: savedCourse._id, ...m })));
          modulesAdded += modules.length;
        }
      }

      if (assignments.length) {
        const existingAssignmentCount = await Assignment.countDocuments({ course: savedCourse._id });
        if (existingAssignmentCount === 0) {
          await Assignment.create(
            assignments.map((a) => ({
              course: savedCourse._id,
              title: a.title,
              description: a.description,
              dueDate: new Date(Date.now() + a.dueDaysFromNow * 24 * 60 * 60 * 1000)
            }))
          );
          assignmentsAdded += assignments.length;
        }
      }
    }

    console.log(`Courses synced (${createdOrUpdatedCount} total).`);
    console.log(`Syllabus Modules added: ${modulesAdded}.`);
    console.log(`Assignments added: ${assignmentsAdded}.`);

    await mongoose.connection.close();
    console.log('DB Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedDB();
