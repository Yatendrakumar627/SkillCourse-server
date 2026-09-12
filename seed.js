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
    const categoriesData = [
      { name: 'Web Development', slug: 'web-development', icon: 'IconCode' },
      { name: 'UI/UX Design', slug: 'ui-ux-design', icon: 'IconPalette' },
      { name: 'Data Science', slug: 'data-science', icon: 'IconChartBarLine' },
      { name: 'Mobile Development', slug: 'mobile-development', icon: 'IconDeviceMobile' },
      { name: 'Digital Marketing', slug: 'digital-marketing', icon: 'IconTargetArrow' }
    ];

    const createdCategories = await CourseCategory.create(categoriesData);
    const cats = Object.fromEntries(createdCategories.map((c) => [c.slug, c._id]));
    console.log('Categories seeded.');

    // Course data — all fields fully editable through the admin panel (/admin -> Courses)
    const coursesData = [
      {
        title: 'Full Stack Web Development Live Program',
        slug: 'full-stack-web-development-live-program',
        description: 'Learn React, Node.js, Express, and MongoDB through live weekend Google Meet sessions. Includes personal mentoring, code reviews, and downloadable notes. Built for Indian job-market roles — cover DSA, project builds, and freelance basics.',
        shortDescription: 'Master modern full-stack web development with live interactive sessions.',
        price: 9999,
        discountedPrice: 4999,
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
        duration: '12 Weeks',
        language: 'Hindi + English',
        level: 'Intermediate',
        category: cats['web-development'],
        instructor: 'Dr. Rahul Sharma',
        isPublished: true,
        modules: [
          { title: 'HTML5 & CSS3 Advanced Layouts', description: 'Semantic tags, flexbox, grid system, responsive design, and CSS variables.', order: 1 },
          { title: 'JavaScript ES6+ & Async Programming', description: 'Promises, async/await, closures, prototypical inheritance, and API integration.', order: 2 },
          { title: 'React Fundamentals & Component Architecture', description: 'Hooks, custom hooks, context API, state management, and reusable layout components.', order: 3 }
        ],
        assignments: [
          { title: 'Build a Responsive Dashboard Layout', description: 'Use HTML5, CSS Flexbox and Grid to design a static mockup dashboard with a sidebar navigation.', dueDaysFromNow: 7 }
        ]
      },
      {
        title: 'Introduction to Figma & UI/UX Principles',
        slug: 'introduction-to-figma-ui-ux-principles',
        description: 'Design beautiful, conversion-friendly mobile and web user interfaces. Learn typography, layout, component systems in Figma, and wireframing with real Indian product case studies (UPI apps, e-commerce, edtech).',
        shortDescription: 'Begin your creative journey as a UI/UX designer. Learn Figma from scratch.',
        price: 3499,
        discountedPrice: 1999,
        thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60',
        duration: '6 Weeks',
        language: 'English',
        level: 'Beginner',
        category: cats['ui-ux-design'],
        instructor: 'Nisha Kulkarni',
        isPublished: true,
        modules: [
          { title: 'Introduction to Figma Tools', description: 'Frames, vectors, pen tools, layout grids, components, and auto-layout fundamentals.', order: 1 },
          { title: 'Design System & Typography Principles', description: 'Creating typography hierarchies, styling guides, grid libraries, and UI component libraries.', order: 2 }
        ],
        assignments: [
          { title: 'Figma Auto-Layout Landing Page Practice', description: 'Design a modern hero banner and features section using Figma Auto-Layout constraints. Upload the Fig link or screenshot.', dueDaysFromNow: 5 }
        ]
      },
      {
        title: 'MERN Stack Web Development in Hindi',
        slug: 'mern-stack-web-development-in-hindi',
        description: 'A complete Hindi-language bootcamp covering MongoDB, Express, React and Node.js. Build 3 real projects (job portal, food delivery, chat app), deploy on Vercel/Railway, and crack web developer roles with a strong GitHub portfolio.',
        shortDescription: 'Full MERN stack development taught entirely in Hindi.',
        price: 4999,
        discountedPrice: 3499,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
        duration: '16 Weeks',
        language: 'Hindi + English',
        level: 'Intermediate',
        category: cats['web-development'],
        instructor: 'Rahul Verma',
        isPublished: true,
        modules: [
          { title: 'JavaScript & ES6 Crash Course', description: 'Variables, functions, arrays, objects, DOM and modern ES6+ syntax in Hindi.', order: 1 },
          { title: 'Backend with Node.js & Express', description: 'REST APIs, authentication (JWT), file uploads, and database design with MongoDB.', order: 2 },
          { title: 'React Frontend & Deployment', description: 'Building responsive React UIs, state with Context/Redux, and deploying full-stack apps.', order: 3 }
        ],
        assignments: [
          { title: 'Build a Blog REST API', description: 'Create a Node + Express + MongoDB API with user auth and CRUD for blog posts. Share the GitHub link.', dueDaysFromNow: 10 }
        ]
      },
      {
        title: 'JavaScript: Zero to Mastery',
        slug: 'javascript-zero-to-mastery',
        description: 'Start from absolute basics and go deep into closures, async/await, promises, and modern ES2024. Designed for absolute beginners — every concept explained with small Indian-context examples and daily practice challenges.',
        shortDescription: 'Crack your first frontend job with complete JavaScript fundamentals.',
        price: 2999,
        discountedPrice: 1999,
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
        duration: '8 Weeks',
        language: 'Hindi + English',
        level: 'Beginner',
        category: cats['web-development'],
        instructor: 'Amit Bansal',
        isPublished: true,
        modules: [
          { title: 'Programming Foundations', description: 'Data types, operators, conditionals, loops, and functions.', order: 1 },
          { title: 'Arrays, Objects & ES6+', description: 'Higher-order methods, destructuring, spread/rest, and template literals.', order: 2 },
          { title: 'Async JavaScript & DOM', description: 'Callbacks, promises, fetch, and building interactive pages.', order: 3 }
        ],
        assignments: [
          { title: 'DOM Mini-Project: Digital Clock & Timer', description: 'Build an interactive clock and countdown timer using vanilla JavaScript.', dueDaysFromNow: 6 }
        ]
      },
      {
        title: 'AWS Cloud & DevOps Bootcamp',
        slug: 'aws-cloud-devops-bootcamp',
        description: 'Go from zero to cloud-ready: EC2, S3, IAM, VPC, Docker, Kubernetes, CI/CD pipelines with GitHub Actions. Perfect for BFSI, startup, and product-company DevOps openings in India.',
        shortDescription: 'Cloud + containers + CI/CD — get industry-ready for DevOps roles.',
        price: 6999,
        discountedPrice: 4999,
        thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60',
        duration: '12 Weeks',
        language: 'English',
        level: 'Advanced',
        category: cats['web-development'],
        instructor: 'Sandeep Reddy',
        isPublished: true,
        modules: [
          { title: 'Linux & AWS Fundamentals', description: 'Shell scripting, EC2, S3, IAM, and networking basics.', order: 1 },
          { title: 'Docker & Kubernetes', description: 'Containerizing apps, orchestrating pods, and managing clusters on EKS.', order: 2 },
          { title: 'CI/CD & Infrastructure as Code', description: 'GitHub Actions pipelines and Terraform for repeatable infrastructure.', order: 3 }
        ],
        assignments: []
      },
      {
        title: 'Data Science & Python Bootcamp',
        slug: 'data-science-python-bootcamp',
        description: 'Hands-on training in Python, NumPy, Pandas, Matplotlib, and SQL. Work on Indian datasets — Flipkart sales, demonetisation trends, COVID dashboards — and build a portfolio of 5 analysis projects for analytics roles.',
        shortDescription: 'Become job-ready for analytics roles with Python and real project work.',
        price: 7999,
        discountedPrice: 4999,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
        duration: '12 Weeks',
        language: 'Hindi + English',
        level: 'Beginner',
        category: cats['data-science'],
        instructor: 'Dr. Kavita Sharma',
        isPublished: true,
        modules: [
          { title: 'Python for Data Analysis', description: 'Python syntax, NumPy arrays, and Pandas DataFrames.', order: 1 },
          { title: 'SQL & Data Visualisation', description: 'Writing SQL, cleaning messy data, and telling stories with Matplotlib/Seaborn.', order: 2 },
          { title: 'Capstone Projects', description: 'End-to-end analysis of real Indian datasets with reports.', order: 3 }
        ],
        assignments: [
          { title: 'Sales Data Analysis Project', description: 'Analyse a retail sales dataset with Pandas and present your findings with charts.', dueDaysFromNow: 12 }
        ]
      },
      {
        title: 'Machine Learning with Python',
        slug: 'machine-learning-with-python',
        description: 'Linear regression to deep learning: scikit-learn, feature engineering, model evaluation, and deployment. Solve predictive problems like housing price prediction and loan default detection commonly asked in Indian ML interviews.',
        shortDescription: 'Practical ML with scikit-learn, model deployment, and interview prep.',
        price: 9999,
        discountedPrice: 6999,
        thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&auto=format&fit=crop&q=60',
        duration: '10 Weeks',
        language: 'English',
        level: 'Intermediate',
        category: cats['data-science'],
        instructor: 'Prof. Anil Kumar',
        isPublished: true,
        modules: [
          { title: 'ML Foundations', description: 'Supervised vs unsupervised learning, train/test splits, and metrics.', order: 1 },
          { title: 'Classic Algorithms', description: 'Linear/logistic regression, decision trees, random forests, and SVM.', order: 2 },
          { title: 'Deployment & Real Projects', description: 'Saving models, Flask APIs, and building a mini ML product.', order: 3 }
        ],
        assignments: []
      },
      {
        title: 'Flutter App Development Masterclass',
        slug: 'flutter-app-development-masterclass',
        description: 'Build beautiful cross-platform apps with Flutter and Dart — from your first widget to a published Play Store app. Covers state management, APIs, Firebase auth, and monetisation with Admob. Perfect for the growing Indian mobile-first market.',
        shortDescription: 'Ship your own Android + iOS apps with Flutter, from scratch.',
        price: 5999,
        discountedPrice: 3999,
        thumbnail: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop&q=60',
        duration: '10 Weeks',
        language: 'Hindi + English',
        level: 'Beginner',
        category: cats['mobile-development'],
        instructor: 'Sneha Gupta',
        isPublished: true,
        modules: [
          { title: 'Dart & Flutter Basics', description: 'Widgets, layouts, navigation, and theming.', order: 1 },
          { title: 'State Management & APIs', description: 'Provider/Riverpod, HTTP calls, and local storage.', order: 2 },
          { title: 'Firebase & Play Store Launch', description: 'Auth, cloud database, push notifications, and publishing.', order: 3 }
        ],
        assignments: [
          { title: 'Build a To-Do List App', description: 'A Flutter app with local storage, task add/edit/delete, and a clean Material design.', dueDaysFromNow: 8 }
        ]
      },
      {
        title: 'Android App Development with Kotlin',
        slug: 'android-app-development-with-kotlin',
        description: 'Learn modern Android development with Kotlin, Jetpack Compose, Room, and Retrofit. Build apps like a news reader and expense tracker, and get placement-ready for Android roles in Indian product companies and agencies.',
        shortDescription: 'Modern Android development with Kotlin & Jetpack Compose.',
        price: 5499,
        discountedPrice: 3499,
        thumbnail: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&auto=format&fit=crop&q=60',
        duration: '12 Weeks',
        language: 'English',
        level: 'Intermediate',
        category: cats['mobile-development'],
        instructor: 'Vikram Singh',
        isPublished: true,
        modules: [
          { title: 'Kotlin & Android Foundations', description: 'Kotlin language, activities, fragments, and app lifecycle.', order: 1 },
          { title: 'Jetpack Compose & Room', description: 'Declarative UI, state hoisting, and local databases.', order: 2 },
          { title: 'Networking & Release', description: 'Retrofit, coroutines, and preparing for Play Store release.', order: 3 }
        ],
        assignments: []
      },
      {
        title: 'Digital Marketing Career Track',
        slug: 'digital-marketing-career-track',
        description: 'A complete roadmap to digital marketing in India: Google Ads, Meta Ads, SEO, content marketing, and email campaigns. Hands-on campaigns on real budgets, certification prep, and freelance/client acquisition tips.',
        shortDescription: 'Launch a digital marketing career with Google & Meta Ads mastery.',
        price: 3999,
        discountedPrice: 2499,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
        duration: '8 Weeks',
        language: 'Hindi + English',
        level: 'Beginner',
        category: cats['digital-marketing'],
        instructor: 'Priya Deshmukh',
        isPublished: true,
        modules: [
          { title: 'Digital Marketing Foundations', description: 'Marketing funnel, audience research, and channel strategy.', order: 1 },
          { title: 'Google & Meta Advertising', description: 'Search/PMAX campaigns, remarketing, and pixel setup.', order: 2 },
          { title: 'Content, Email & Analytics', description: 'Blogging, newsletters, and Google Analytics 4 reporting.', order: 3 }
        ],
        assignments: [
          { title: 'Launch a Google Ads Campaign', description: 'Set up a search campaign with keyword research and write ad copies. Share your campaign screenshot.', dueDaysFromNow: 9 }
        ]
      },
      {
        title: 'SEO Mastery with Google Tools',
        slug: 'seo-mastery-with-google-tools',
        description: 'Rank higher on Google with practical SEO: keyword research, on-page optimisation, technical SEO, backlinks, and Search Console. Learn with real Indian websites and build a portfolio of case studies.',
        shortDescription: 'Execute SEO that actually ranks, using Google Search Console & Analytics.',
        price: 2999,
        discountedPrice: 1499,
        thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=60',
        duration: '6 Weeks',
        language: 'English',
        level: 'Intermediate',
        category: cats['digital-marketing'],
        instructor: 'Rajesh Iyer',
        isPublished: true,
        modules: [
          { title: 'Keyword Research & Content SEO', description: 'Finding low-competition keywords and crafting ranking content.', order: 1 },
          { title: 'Technical SEO & Tools', description: 'Site speed, schema markup, sitemaps, and Google Search Console.', order: 2 }
        ],
        assignments: []
      },
      {
        title: 'UI/UX Design & Design Thinking',
        slug: 'ui-ux-design-design-thinking',
        description: 'Learn the full design process — user research, personas, wireframes, prototyping, and usability testing — applied to Indian products like fintech wallets and food apps. End with a case study portfolio recruiters love.',
        shortDescription: 'From research to hi-fi prototypes — design products people love.',
        price: 3499,
        discountedPrice: 2299,
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60',
        duration: '8 Weeks',
        language: 'Hindi + English',
        level: 'Beginner',
        category: cats['ui-ux-design'],
        instructor: 'Meera Joshi',
        isPublished: true,
        modules: [
          { title: 'UX Research & Personas', description: 'Interviews, empathy maps, journey maps, and user personas.', order: 1 },
          { title: 'Wireframing & Prototyping', description: 'Information architecture, lo-fi wireframes, and clickable prototypes.', order: 2 },
          { title: 'Design Systems & Portfolio', description: 'UI kits, handoff with developers, and a case-study portfolio.', order: 3 }
        ],
        assignments: [
          { title: 'Re-design a Payment App Flow', description: 'Wireframe and prototype a new checkout flow for a UPI payment app.', dueDaysFromNow: 7 }
        ]
      }
    ];

    // Create Courses
    const createdCourses = await Course.create(
      coursesData.map(({ modules, assignments, ...course }) => course)
    );
    console.log('Courses seeded.');

    // Seed Modules + Assignments per course
    for (let i = 0; i < coursesData.length; i++) {
      const { modules = [], assignments = [] } = coursesData[i];
      if (modules.length) {
        await Module.create(
          modules.map((m) => ({ course: createdCourses[i]._id, ...m }))
        );
      }
      if (assignments.length) {
        await Assignment.create(
          assignments.map((a) => ({
            course: createdCourses[i]._id,
            title: a.title,
            description: a.description,
            dueDate: new Date(Date.now() + a.dueDaysFromNow * 24 * 60 * 60 * 1000)
          }))
        );
      }
    }

    console.log('Syllabus Modules seeded.');
    console.log('Assignments seeded.');

    mongoose.connection.close();
    console.log('DB Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDB();