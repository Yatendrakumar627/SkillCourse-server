import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import CourseCategory from './models/CourseCategory.js';
import Course from './models/Course.js';
import Module from './models/Module.js';
import Assignment from './models/Assignment.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms';

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB for seeding...');

    // Clear existing
    await User.deleteMany({ email: 'admin@skillcourse.com' });
    await CourseCategory.deleteMany({});
    await Course.deleteMany({});
    await Module.deleteMany({});
    await Assignment.deleteMany({});

    // Create Admin User
    const admin = await User.create({
      name: 'SkillCourse Admin',
      email: 'admin@skillcourse.com',
      password: 'adminpassword', // Will be hashed via pre-save hook
      phone: '1234567890',
      role: 'admin',
      status: 'active'
    });
    console.log('Admin user seeded successfully. Email: admin@skillcourse.com, Password: adminpassword');

    // Create Categories
    const webDevCat = await CourseCategory.create({
      name: 'Web Development',
      slug: 'web-development',
      icon: 'IconCode'
    });

    const designCat = await CourseCategory.create({
      name: 'UI/UX Design',
      slug: 'ui-ux-design',
      icon: 'IconPalette'
    });

    console.log('Categories seeded.');

    // Create Courses
    const courses = await Course.create([
      {
        title: 'Full Stack Web Development Live Program',
        slug: 'full-stack-web-development-live-program',
        description: 'Learn React, Node.js, Express, and MongoDB. This is a live course conducted via Google Meet, held every weekend. Includes personal mentoring and notes downloads.',
        shortDescription: 'Master modern full-stack web development with live interactive sessions.',
        price: 299,
        discountedPrice: 199,
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
        duration: '12 Weeks',
        language: 'English',
        level: 'Intermediate',
        category: webDevCat._id,
        instructor: 'Dr. John Doe',
        isPublished: true
      },
      {
        title: 'Introduction to Figma & UI/UX Principles',
        slug: 'introduction-to-figma-ui-ux-principles',
        description: 'Design beautiful, conversion-friendly mobile and web user interfaces. Learn typography, layout, component systems in Figma, and wireframing.',
        shortDescription: 'Begin your creative journey as a UI/UX designer. Learn Figma from scratch.',
        price: 150,
        discountedPrice: 99,
        thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60',
        duration: '6 Weeks',
        language: 'English',
        level: 'Beginner',
        category: designCat._id,
        instructor: 'Sarah Jenkins',
        isPublished: true
      }
    ]);

    console.log('Courses seeded.');

    const webDevCourse = courses[0];
    const designCourse = courses[1];

    // Seed Modules for Web Dev
    await Module.create([
      {
        course: webDevCourse._id,
        title: 'HTML5 & CSS3 Advanced Layouts',
        description: 'Semantic tags, flexbox, grid system, responsive design, and CSS variables.',
        order: 1
      },
      {
        course: webDevCourse._id,
        title: 'JavaScript ES6+ & Async Programming',
        description: 'Promises, async/await, closures, prototypical inheritance, and API integration.',
        order: 2
      },
      {
        course: webDevCourse._id,
        title: 'React Fundamentals & Component Architecture',
        description: 'Hooks, custom hooks, context API, state management, and reusable layout components.',
        order: 3
      }
    ]);

    // Seed Modules for Figma UI/UX
    await Module.create([
      {
        course: designCourse._id,
        title: 'Introduction to Figma Tools',
        description: 'Frames, vectors, pen tools, layout grids, components, and auto-layout fundamentals.',
        order: 1
      },
      {
        course: designCourse._id,
        title: 'Design System & Typography Principles',
        description: 'Creating typography hierarchies, styling guides, grid libraries, and UI component libraries.',
        order: 2
      }
    ]);

    console.log('Syllabus Modules seeded.');

    // Seed Assignments
    await Assignment.create([
      {
        course: webDevCourse._id,
        title: 'Build a Responsive Dashboard Layout',
        description: 'Use HTML5, CSS Flexbox and Grid to design a static mockup dashboard with a sidebar navigation.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        course: designCourse._id,
        title: 'Figma Auto-Layout Landing Page Practice',
        description: 'Design a modern hero banner and features section using Figma Auto-Layout constraints. Upload the Fig link or screenshot.',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      }
    ]);

    console.log('Assignments seeded.');

    mongoose.connection.close();
    console.log('DB Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDB();

