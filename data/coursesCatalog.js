export const categoriesData = [
  { name: 'Web Development', slug: 'web-development', icon: 'IconCode' },
  { name: 'Full Stack Development', slug: 'full-stack-development', icon: 'IconStack2' },
  { name: 'UI/UX Design', slug: 'ui-ux-design', icon: 'IconPalette' },
  { name: 'Data Science', slug: 'data-science', icon: 'IconChartBarLine' },
  { name: 'Mobile Development', slug: 'mobile-development', icon: 'IconDeviceMobile' },
  { name: 'Digital Marketing', slug: 'digital-marketing', icon: 'IconTargetArrow' },
  { name: 'Career & Productivity', slug: 'career-productivity', icon: 'IconBriefcase' }
];

const CAREER_PRIORITY = {
  'ai-powered-student': 1,
  'placement-ready-pro': 2,
  'data-analytics-career-track': 3,
  'excel-to-excellence': 4,
  'communication-mastery': 5,
  'python-coding-foundation': 6,
  'digital-marketing-launchpad': 7,
  'freelance-starter-pro': 8,
  'creative-design-content-studio': 9,
  'dsa-coding-interviews-aptitude-bootcamp': 10,
  'prompt-engineering-no-code-ai-automation': 11,
  'financial-modeling-valuation-corporate-excel': 12,
  'public-speaking-corporate-english-presentation-skills': 13,
  'remote-career-personal-branding-linkedin-growth': 14,
  'google-data-analytics-spreadsheet-insights-bootcamp': 15,
  'performance-marketing-meta-google-ads-mastery': 16,
  'social-media-marketing-reels-creator-growth': 17,
  'short-form-video-editing-canva-pro-mastery': 18,
  'python-automation-automate-the-boring-stuff': 19
};

export const buildCoursesData = (cats) => rawCoursesData(cats).map((course) => {
  const priority = CAREER_PRIORITY[course.slug] ?? 100;
  return {
    ...course,
    displayOrder: priority,
    isFeatured: priority <= 9
  };
});

const rawCoursesData = (cats) => [
  // --- Existing Core Courses ---
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
  },

  // --- Data Science Complete Suite (2026 Curriculum) ---
  {
    title: 'SQL & Data Analytics Mastery for Data Scientists',
    slug: 'sql-data-analytics-mastery-data-scientists',
    description: 'Master SQL for data science and analytics using PostgreSQL and BigQuery. Learn complex joins, CTEs, window functions (RANK, LEAD, LAG), query optimization, cohort retention analysis, and ETL data modeling for real business datasets.',
    shortDescription: 'Write production SQL with CTEs, window functions, and analytical modeling.',
    price: 4999,
    discountedPrice: 2999,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    duration: '8 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['data-science'],
    instructor: 'Dr. Kavita Sharma',
    isPublished: true,
    modules: [
      { title: 'Relational Modeling & Core SQL', description: 'Joins, aggregations, subqueries, and schema normalization in PostgreSQL.', order: 1 },
      { title: 'Advanced Analytical SQL', description: 'CTEs, recursive queries, window functions, and cohort retention SQL.', order: 2 },
      { title: 'Query Tuning & Warehouse Pipelines', description: 'Indexing, execution plans, and cloud analytics with BigQuery/Snowflake.', order: 3 }
    ],
    assignments: [
      { title: 'E-Commerce Cohort & Funnel Analysis', description: 'Write SQL queries using CTEs and window functions to compute monthly retention and revenue cohorts.', dueDaysFromNow: 7 }
    ]
  },
  {
    title: 'Statistics, Probability & A/B Testing for Data Science',
    slug: 'statistics-probability-ab-testing-data-science',
    description: 'Build rock-solid mathematical intuition for Data Science. Cover probability distributions, Bayes theorem, hypothesis testing (t-test, ANOVA, chi-square), confidence intervals, power analysis, and real-world product A/B experimentation.',
    shortDescription: 'Master statistical inference, probability, and product A/B testing.',
    price: 5499,
    discountedPrice: 3499,
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&auto=format&fit=crop&q=60',
    duration: '8 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['data-science'],
    instructor: 'Prof. Anil Kumar',
    isPublished: true,
    modules: [
      { title: 'Probability & Distributions', description: 'Random variables, Normal, Binomial, Poisson, Central Limit Theorem, and Bayes rule.', order: 1 },
      { title: 'Hypothesis Testing & Inference', description: 'P-values, t-tests, chi-square, ANOVA, and non-parametric tests in Python.', order: 2 },
      { title: 'Experiment Design & A/B Testing', description: 'Sample size calculation, peeking pitfalls, CUPED, and causal inference basics.', order: 3 }
    ],
    assignments: [
      { title: 'Checkout Flow A/B Test Report', description: 'Analyze an A/B experiment dataset in Python and recommend a launch decision with statistical rigor.', dueDaysFromNow: 9 }
    ]
  },
  {
    title: 'Business Intelligence: Power BI, Tableau & Looker',
    slug: 'business-intelligence-power-bi-tableau-looker',
    description: 'Become an executive data storyteller. Build interactive dashboards in Microsoft Power BI (DAX & Power Query), Tableau (calculated fields, LOD expressions), and Looker Studio backed by live SQL databases.',
    shortDescription: 'Build executive BI dashboards using Power BI, DAX, and Tableau.',
    price: 5999,
    discountedPrice: 3499,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    duration: '10 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['data-science'],
    instructor: 'Rohan Malhotra',
    isPublished: true,
    modules: [
      { title: 'Power BI & Power Query', description: 'Data ingestion, star schema modeling, and cleaning transformations.', order: 1 },
      { title: 'DAX Mastery & KPI Design', description: 'Time-intelligence DAX measures, row-level security, and executive layouts.', order: 2 },
      { title: 'Tableau & Data Storytelling', description: 'LOD expressions, parameters, geo-maps, and Looker Studio reporting.', order: 3 }
    ],
    assignments: [
      { title: 'Executive Revenue Dashboard', description: 'Create a multi-page Power BI or Tableau dashboard with YoY growth, region filters, and drill-through.', dueDaysFromNow: 10 }
    ]
  },
  {
    title: 'Deep Learning & Neural Networks with PyTorch & TensorFlow',
    slug: 'deep-learning-neural-networks-pytorch-tensorflow',
    description: 'Master deep neural architectures from first principles using PyTorch and TensorFlow/Keras. Cover backpropagation, optimizers, BatchNorm, CNNs, ResNets, RNNs/LSTMs, attention mechanisms, and GPU mixed-precision training.',
    shortDescription: 'Train production neural networks using PyTorch and TensorFlow.',
    price: 11999,
    discountedPrice: 7999,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
    duration: '14 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['data-science'],
    instructor: 'Dr. Siddharth Nair',
    isPublished: true,
    modules: [
      { title: 'PyTorch Tensors & Autograd', description: 'Neural network mechanics, loss functions, AdamW, and regularization.', order: 1 },
      { title: 'CNNs & Sequence Models', description: 'Convolutional architectures, transfer learning, LSTMs, and attention layers.', order: 2 },
      { title: 'Scaling & TensorFlow Deployment', description: 'Mixed precision training, TorchScript/ONNX export, and Keras workflows.', order: 3 }
    ],
    assignments: [
      { title: 'PyTorch Custom Classifier Pipeline', description: 'Train and evaluate a transfer-learning image/tabular neural network in PyTorch with learning curves.', dueDaysFromNow: 14 }
    ]
  },
  {
    title: 'Generative AI, LLMs, RAG & AI Agents Engineering',
    slug: 'generative-ai-llms-rag-ai-agents-engineering',
    description: '2026 flagship GenAI program: master transformer architectures, prompt engineering, Retrieval-Augmented Generation (RAG) with LangChain & LlamaIndex, Vector DBs (Pinecone, Chroma, pgvector), LoRA/QLoRA fine-tuning, and multi-step AI Agents.',
    shortDescription: 'Build production LLM apps, RAG pipelines, and autonomous AI agents.',
    price: 14999,
    discountedPrice: 9999,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
    duration: '14 Weeks',
    language: 'Hindi + English',
    level: 'Intermediate',
    category: cats['data-science'],
    instructor: 'Dr. Siddharth Nair',
    isPublished: true,
    modules: [
      { title: 'LLM Foundations & Prompt Systems', description: 'Transformers, embeddings, structured outputs, and evaluation harnesses.', order: 1 },
      { title: 'Production RAG & Vector Databases', description: 'Chunking, hybrid search, reranking, ChromaDB, Pinecone, and LangChain/LlamaIndex.', order: 2 },
      { title: 'AI Agents & Fine-Tuning (LoRA/QLoRA)', description: 'Tool-calling agents, multi-agent workflows, and parameter-efficient fine-tuning.', order: 3 }
    ],
    assignments: [
      { title: 'Enterprise Knowledge RAG Assistant', description: 'Build a citation-backed RAG assistant over PDF docs using embeddings, vector search, and an LLM.', dueDaysFromNow: 14 }
    ]
  },
  {
    title: 'Natural Language Processing (NLP) & Transformers Mastery',
    slug: 'natural-language-processing-nlp-transformers-mastery',
    description: 'Go deep into modern NLP with Hugging Face Transformers, spaCy, BERT, RoBERTa, and encoder-decoder models. Build named entity recognition, semantic search, sentiment engines, and multilingual Indian-language text pipelines.',
    shortDescription: 'Master Hugging Face Transformers, BERT fine-tuning, and modern NLP.',
    price: 9999,
    discountedPrice: 6499,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60',
    duration: '10 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['data-science'],
    instructor: 'Ananya Chatterjee',
    isPublished: true,
    modules: [
      { title: 'Classical NLP & Embeddings', description: 'Tokenization, BPE, TF-IDF, Word2Vec, and sentence transformers.', order: 1 },
      { title: 'Hugging Face & Transformer Fine-Tuning', description: 'BERT/DeBERTa classification, NER, question answering, and PEFT.', order: 2 },
      { title: 'Production Text & Search Pipelines', description: 'Semantic similarity, topic modeling, and low-latency NLP inference.', order: 3 }
    ],
    assignments: [
      { title: 'Fine-Tune a Support Ticket Classifier', description: 'Fine-tune a pretrained Transformer with Hugging Face on multi-class customer support logs.', dueDaysFromNow: 12 }
    ]
  },
  {
    title: 'Computer Vision & Image AI with PyTorch & OpenCV',
    slug: 'computer-vision-image-ai-pytorch-opencv',
    description: 'Build real-time visual AI systems using OpenCV, PyTorch, Ultralytics YOLO, and Vision Transformers (ViT). Covers object detection, instance segmentation, OCR pipelines, face/pose estimation, and edge ONNX optimization.',
    shortDescription: 'Real-time object detection, segmentation, and Vision Transformers.',
    price: 9999,
    discountedPrice: 6499,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
    duration: '10 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['data-science'],
    instructor: 'Dr. Aravind Menon',
    isPublished: true,
    modules: [
      { title: 'OpenCV & Image Processing', description: 'Filtering, contours, augmentations, and geometric transformations.', order: 1 },
      { title: 'Detection & Segmentation Models', description: 'YOLOv8/v11 object detection, SAM/U-Net segmentation, and Vision Transformers.', order: 2 },
      { title: 'Video Analytics & Edge Deployment', description: 'Object tracking, OCR pipelines, and ONNX/TensorRT optimization.', order: 3 }
    ],
    assignments: [
      { title: 'Real-Time Safety Helmet Detector', description: 'Train a YOLO detector on custom bounding-box annotations and run inference on sample video.', dueDaysFromNow: 12 }
    ]
  },
  {
    title: 'Big Data Engineering: Apache Spark, PySpark & Databricks',
    slug: 'big-data-engineering-apache-spark-pyspark-databricks',
    description: 'Process terabyte-scale datasets with Apache Spark, PySpark, Delta Lake, and Databricks. Learn distributed DataFrames, Spark SQL, structured streaming, Kafka ingestion, and cloud lakehouse architectures.',
    shortDescription: 'Scale data science pipelines with PySpark, Delta Lake, and Databricks.',
    price: 10999,
    discountedPrice: 7499,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    duration: '12 Weeks',
    language: 'English',
    level: 'Advanced',
    category: cats['data-science'],
    instructor: 'Sandeep Reddy',
    isPublished: true,
    modules: [
      { title: 'Distributed Spark Architecture', description: 'Executors, partitions, Catalyst optimizer, and PySpark DataFrames.', order: 1 },
      { title: 'Spark SQL & Delta Lakehouse', description: 'Medallion architecture (Bronze/Silver/Gold), ACID tables, and optimization.', order: 2 },
      { title: 'Streaming & Feature Pipelines', description: 'Spark Structured Streaming with Kafka and ML feature tables at scale.', order: 3 }
    ],
    assignments: [
      { title: 'Medallion ETL Pipeline in PySpark', description: 'Build a Bronze-to-Gold PySpark transformation pipeline with partitioned Parquet/Delta outputs.', dueDaysFromNow: 14 }
    ]
  },
  {
    title: 'MLOps, FastAPI & Cloud ML Deployment',
    slug: 'mlops-fastapi-cloud-ml-deployment',
    description: 'Take models from Jupyter notebooks to reliable production systems. Master MLflow experiment tracking, DVC data versioning, FastAPI inference microservices, Docker, Kubernetes, CI/CD, and data/concept drift monitoring.',
    shortDescription: 'Deploy, track, and monitor production ML models with MLflow & Docker.',
    price: 10999,
    discountedPrice: 6999,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60',
    duration: '10 Weeks',
    language: 'Hindi + English',
    level: 'Advanced',
    category: cats['data-science'],
    instructor: 'Vikramaditya Rao',
    isPublished: true,
    modules: [
      { title: 'Reproducible ML & Experiment Tracking', description: 'MLflow, Weights & Biases, DVC, and automated training pipelines.', order: 1 },
      { title: 'Serving Models with FastAPI & Docker', description: 'Async inference APIs, Pydantic validation, batching, and containerization.', order: 2 },
      { title: 'CI/CD & Production Drift Monitoring', description: 'GitHub Actions for ML, cloud deployment, and Evidently drift alerts.', order: 3 }
    ],
    assignments: [
      { title: 'Containerized ML Inference Service', description: 'Package a trained ML model behind a FastAPI endpoint with MLflow registry and Dockerfile.', dueDaysFromNow: 11 }
    ]
  },
  {
    title: 'R Programming & Statistical Computing for Data Science',
    slug: 'r-programming-statistical-computing-data-science',
    description: 'Master R for statistical research, bioinformatics, econometrics, and analytics. Learn tidyverse (dplyr, tidyr), publication-grade ggplot2 visualizations, statistical modeling, R Markdown reporting, and interactive Shiny web apps.',
    shortDescription: 'Statistical computing, ggplot2 visuals, and Shiny apps with R.',
    price: 4999,
    discountedPrice: 2999,
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&auto=format&fit=crop&q=60',
    duration: '8 Weeks',
    language: 'English',
    level: 'Beginner',
    category: cats['data-science'],
    instructor: 'Dr. Meenakshi Iyer',
    isPublished: true,
    modules: [
      { title: 'R Foundations & Tidyverse', description: 'Vectors, data frames, dplyr data manipulation, and tidyr workflows.', order: 1 },
      { title: 'Statistical Modeling & ggplot2', description: 'Regression, ANOVA, time-series forecasting, and layered ggplot2 graphics.', order: 2 },
      { title: 'R Markdown & Shiny Dashboards', description: 'Reproducible reports and interactive Shiny data applications.', order: 3 }
    ],
    assignments: [
      { title: 'Interactive Shiny Analytics App', description: 'Build an R Shiny dashboard with reactive filters and ggplot2 visualizations.', dueDaysFromNow: 10 }
    ]
  },

  // --- Full Stack Developer Individual Language Courses (All Major Languages) ---
  {
    title: 'JavaScript Full Stack Developer: React, Node.js & PostgreSQL',
    slug: 'javascript-full-stack-developer-react-nodejs',
    description: 'End-to-end JavaScript engineering covering modern ES2025+, React 19, Node.js, Express, PostgreSQL & MongoDB, JWT authentication, Redis caching, testing, and cloud CI/CD deployment.',
    shortDescription: 'Single-language JavaScript full stack with React, Node.js & SQL/NoSQL.',
    price: 8999,
    discountedPrice: 5499,
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
    duration: '14 Weeks',
    language: 'Hindi + English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Dr. Rahul Sharma',
    isPublished: true,
    modules: [
      { title: 'Modern JavaScript & React 19 UI', description: 'ES2025+, hooks, React Router, TanStack Query, and responsive state architecture.', order: 1 },
      { title: 'Node.js, Express & Dual Databases', description: 'REST APIs, PostgreSQL relational schemas, MongoDB, and JWT security.', order: 2 },
      { title: 'Testing, Docker & Production Launch', description: 'Vitest/Playwright testing, Redis caching, and cloud deployment.', order: 3 }
    ],
    assignments: [
      { title: 'Full Stack SaaS Task & Billing App', description: 'Build a React + Node.js + PostgreSQL app with auth, roles, and CRUD.', dueDaysFromNow: 12 }
    ]
  },
  {
    title: 'TypeScript & Next.js Full Stack Engineering',
    slug: 'typescript-nextjs-full-stack-engineering',
    description: 'Build production full-stack apps with strict TypeScript, Next.js App Router, React Server Components, Server Actions, Prisma/Drizzle ORM, tRPC, PostgreSQL, and Vercel/Docker deployment.',
    shortDescription: 'End-to-end type safety with TypeScript, Next.js, Prisma & PostgreSQL.',
    price: 9999,
    discountedPrice: 5999,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    duration: '12 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Amit Bansal',
    isPublished: true,
    modules: [
      { title: 'Advanced TypeScript Patterns', description: 'Generics, discriminated unions, Zod validation, and shared API contracts.', order: 1 },
      { title: 'Next.js App Router & Server Actions', description: 'RSC, streaming SSR, caching, middleware, and Auth.js integration.', order: 2 },
      { title: 'Prisma/Drizzle ORM & tRPC', description: 'Type-safe PostgreSQL migrations, tRPC routers, and production deployment.', order: 3 }
    ],
    assignments: [
      { title: 'Type-Safe Next.js Marketplace', description: 'Build a Next.js + TypeScript + Prisma application with server actions and Zod validation.', dueDaysFromNow: 12 }
    ]
  },
  {
    title: 'Python Full Stack Developer: Django, FastAPI & React',
    slug: 'python-full-stack-developer-django-fastapi-react',
    description: 'Master Python full-stack engineering for web & AI products. Build robust backends with Django REST Framework and async FastAPI, background workers with Celery/Redis, PostgreSQL, and modern React frontends.',
    shortDescription: 'Full stack web & AI apps using Python, Django, FastAPI & React.',
    price: 9499,
    discountedPrice: 5999,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60',
    duration: '14 Weeks',
    language: 'Hindi + English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Prakash Kulkarni',
    isPublished: true,
    modules: [
      { title: 'Django & Django REST Framework', description: 'ORM models, class-based views, JWT auth, and admin customization.', order: 1 },
      { title: 'FastAPI, Async Python & Celery', description: 'High-speed async APIs, Pydantic v2, Redis queues, and WebSockets.', order: 2 },
      { title: 'React Integration & Docker Deploy', description: 'Connecting React SPA, CORS/security, Docker Compose, and cloud hosting.', order: 3 }
    ],
    assignments: [
      { title: 'AI-Ready Job Board in FastAPI & React', description: 'Create a FastAPI + PostgreSQL backend with a React frontend and background email tasks.', dueDaysFromNow: 14 }
    ]
  },
  {
    title: 'Java Full Stack Developer: Spring Boot 3 & Microservices',
    slug: 'java-full-stack-developer-spring-boot-microservices',
    description: 'Enterprise Java Full Stack track covering Java 21+, Spring Boot 3, Spring Security/JWT, Spring Data JPA/Hibernate, Kafka event-driven microservices, Docker, and React/Angular frontend integration.',
    shortDescription: 'Enterprise full stack with Java 21, Spring Boot 3, JPA & React/Angular.',
    price: 10999,
    discountedPrice: 6999,
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60',
    duration: '16 Weeks',
    language: 'Hindi + English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Saurabh Deshpande',
    isPublished: true,
    modules: [
      { title: 'Core Java 21 & Spring Boot 3', description: 'OOP, Streams, Spring IoC, REST controllers, and exception handling.', order: 1 },
      { title: 'JPA, Security & Microservices', description: 'Hibernate, PostgreSQL/MySQL, Spring Security JWT, and Kafka messaging.', order: 2 },
      { title: 'Frontend Integration & Cloud', description: 'Connecting React/Angular clients, JUnit/Mockito testing, and Docker.', order: 3 }
    ],
    assignments: [
      { title: 'Banking Ledger Spring Boot API + UI', description: 'Build a Spring Boot 3 + JPA + React full-stack ledger with JWT role-based access.', dueDaysFromNow: 14 }
    ]
  },
  {
    title: 'C# & .NET 9 Full Stack Developer: ASP.NET Core & React',
    slug: 'csharp-dotnet-full-stack-developer-aspnet-core',
    description: 'Master Microsoft enterprise full-stack development with C# 13, .NET 9, ASP.NET Core Minimal APIs, Entity Framework Core, SQL Server, Blazor & React, SignalR real-time apps, and Azure cloud deployment.',
    shortDescription: 'Enterprise C#, ASP.NET Core, Entity Framework, Blazor & React.',
    price: 9499,
    discountedPrice: 5999,
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60',
    duration: '14 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Karthik Subramanian',
    isPublished: true,
    modules: [
      { title: 'Modern C# & ASP.NET Core Web API', description: 'LINQ, async/await, dependency injection, Minimal APIs, and Identity.', order: 1 },
      { title: 'Entity Framework Core & SQL Server', description: 'Code-first migrations, complex queries, and Clean Architecture.', order: 2 },
      { title: 'Blazor, React & Azure Hosting', description: 'Building reactive UIs with Blazor or React, SignalR, and Azure App Service.', order: 3 }
    ],
    assignments: [
      { title: 'Inventory & Order System in .NET', description: 'Build an ASP.NET Core + EF Core REST API paired with a React or Blazor dashboard.', dueDaysFromNow: 12 }
    ]
  },
  {
    title: 'PHP & Laravel 11 Full Stack Developer: Livewire & Vue.js',
    slug: 'php-laravel-full-stack-developer-livewire-vue',
    description: 'Modern PHP 8.3+ and Laravel 11 full-stack engineering. Build rapid SaaS apps with Eloquent ORM, Livewire 3, Inertia.js + Vue.js/React, queues, Blade + Tailwind CSS, MySQL, and automated Pest testing.',
    shortDescription: 'Rapid SaaS development with PHP 8.3, Laravel 11, Livewire & Vue.js.',
    price: 6999,
    discountedPrice: 3999,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
    duration: '12 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['full-stack-development'],
    instructor: 'Imran Siddiqui',
    isPublished: true,
    modules: [
      { title: 'Modern PHP 8 & Laravel Core', description: 'Routing, controllers, Eloquent relationships, migrations, and Sanctum auth.', order: 1 },
      { title: 'Livewire 3 & Inertia + Vue.js', description: 'Reactive full-stack interfaces without API boilerplate using Livewire and Inertia.', order: 2 },
      { title: 'Queues, Payments & Production', description: 'Horizon queues, Stripe/Razorpay webhooks, Pest tests, and server deployment.', order: 3 }
    ],
    assignments: [
      { title: 'Multi-Vendor Storefront in Laravel', description: 'Create a Laravel 11 + MySQL + Livewire/Inertia catalog with cart and admin panel.', dueDaysFromNow: 10 }
    ]
  },
  {
    title: 'Go (Golang) Full Stack Developer: Gin, gRPC & React',
    slug: 'go-golang-full-stack-developer-gin-grpc-react',
    description: 'Build ultra-fast concurrent backends with Go (Golang), Gin/Fiber, sqlc/GORM, PostgreSQL, gRPC microservices, and WebSockets paired with a TypeScript & React frontend.',
    shortDescription: 'High-concurrency full stack apps with Go, Gin, gRPC, PostgreSQL & React.',
    price: 9499,
    discountedPrice: 5999,
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60',
    duration: '12 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Nikhil Bhardwaj',
    isPublished: true,
    modules: [
      { title: 'Go Concurrency & Standard Library', description: 'Goroutines, channels, interfaces, context, and net/http fundamentals.', order: 1 },
      { title: 'Gin/Fiber APIs, PostgreSQL & gRPC', description: 'Structured logging, sqlc type-safe SQL, JWT auth, and gRPC services.', order: 2 },
      { title: 'React Frontend & Dockerized Deploy', description: 'Real-time WebSocket dashboards in React and single-binary Docker builds.', order: 3 }
    ],
    assignments: [
      { title: 'Concurrent URL Shortener & Analytics', description: 'Build a Go + Gin + PostgreSQL service with a React analytics dashboard.', dueDaysFromNow: 12 }
    ]
  },
  {
    title: 'Rust Full Stack Developer: Axum, WebAssembly & TypeScript',
    slug: 'rust-full-stack-developer-axum-wasm-typescript',
    description: 'Master memory-safe, blazing-fast full-stack Rust. Build async REST & WebSocket backends with Axum/Actix-Web, SQLx + PostgreSQL, compile Rust to WebAssembly (Wasm), and integrate with TypeScript/Leptos frontends.',
    shortDescription: 'Blazing-fast full stack Rust with Axum, SQLx, WebAssembly & TypeScript.',
    price: 10999,
    discountedPrice: 6999,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
    duration: '12 Weeks',
    language: 'English',
    level: 'Advanced',
    category: cats['full-stack-development'],
    instructor: 'Aditya Narayanan',
    isPublished: true,
    modules: [
      { title: 'Rust Ownership & Async Tokio', description: 'Ownership, lifetimes, traits, error handling, and Tokio async runtime.', order: 1 },
      { title: 'Axum Web APIs & SQLx', description: 'Type-checked PostgreSQL queries with SQLx, extractors, and JWT middleware.', order: 2 },
      { title: 'WebAssembly (Wasm) & Frontend', description: 'Compiling Rust to Wasm with wasm-bindgen and pairing with TypeScript/Leptos.', order: 3 }
    ],
    assignments: [
      { title: 'Real-Time Chat Service in Axum', description: 'Build an async Rust Axum WebSocket + SQLx server with a TypeScript web client.', dueDaysFromNow: 14 }
    ]
  },
  {
    title: 'Ruby on Rails Full Stack Developer: Hotwire & PostgreSQL',
    slug: 'ruby-on-rails-full-stack-developer-hotwire',
    description: 'Learn the productivity powerhouse used by top SaaS startups. Master Ruby 3, Rails 7/8, ActiveRecord, Hotwire (Turbo & Stimulus), ActionCable real-time updates, Sidekiq background jobs, and Tailwind CSS.',
    shortDescription: 'Ship full-stack SaaS products fast with Ruby on Rails, Hotwire & Turbo.',
    price: 7499,
    discountedPrice: 4499,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
    duration: '10 Weeks',
    language: 'English',
    level: 'Beginner',
    category: cats['full-stack-development'],
    instructor: 'Rohan Malhotra',
    isPublished: true,
    modules: [
      { title: 'Ruby & Rails MVC Fundamentals', description: 'Ruby idioms, Rails routing, ActiveRecord associations, and Devise auth.', order: 1 },
      { title: 'Hotwire, Turbo Streams & Stimulus', description: 'SPA-like interactivity without heavy JS using Turbo Frames and Stimulus.', order: 2 },
      { title: 'Background Jobs & RSpec Testing', description: 'Sidekiq, PostgreSQL optimization, RSpec/Capybara tests, and Kamal deploy.', order: 3 }
    ],
    assignments: [
      { title: 'Live Kanban Board with Hotwire', description: 'Create a real-time collaborative task board in Rails using Turbo Streams.', dueDaysFromNow: 10 }
    ]
  },
  {
    title: 'Kotlin Full Stack Developer: Ktor, Spring Boot & React',
    slug: 'kotlin-full-stack-developer-ktor-spring-boot',
    description: 'Use concise, null-safe Kotlin across the full stack. Build async microservices with Ktor and Spring Boot Kotlin, Exposed ORM, coroutines, Kotlin Multiplatform shared logic, and React/Compose Web frontends.',
    shortDescription: 'Modern full stack Kotlin with Ktor, Spring Boot, coroutines & React.',
    price: 8999,
    discountedPrice: 5499,
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60',
    duration: '12 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Vikram Singh',
    isPublished: true,
    modules: [
      { title: 'Kotlin Coroutines & Ktor Servers', description: 'Coroutines, structured concurrency, Ktor routing, and kotlinx.serialization.', order: 1 },
      { title: 'Spring Boot Kotlin & Exposed ORM', description: 'Type-safe SQL with Exposed, PostgreSQL, and JWT authentication.', order: 2 },
      { title: 'Shared KMP Models & Web UI', description: 'Sharing validation/DTOs across Kotlin Multiplatform and React clients.', order: 3 }
    ],
    assignments: [
      { title: 'Ktor Booking API & Web Client', description: 'Build a Ktor + PostgreSQL booking API with coroutine tests and a React client.', dueDaysFromNow: 12 }
    ]
  },
  {
    title: 'Swift Full Stack Developer: Server-Side Vapor & SwiftUI',
    slug: 'swift-full-stack-developer-vapor-swiftui',
    description: 'Write both backend and Apple-ecosystem apps in Swift. Build high-performance server-side APIs with Vapor, Fluent ORM, PostgreSQL, async/await concurrency, WebSockets, and SwiftUI/Web clients.',
    shortDescription: 'End-to-end Swift engineering with Vapor backend, Fluent & SwiftUI.',
    price: 8999,
    discountedPrice: 5499,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
    duration: '10 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Arjun Kapoor',
    isPublished: true,
    modules: [
      { title: 'Swift Concurrency & Vapor Setup', description: 'Swift Package Manager, async/await, actors, and Vapor routing.', order: 1 },
      { title: 'Fluent ORM & PostgreSQL Auth', description: 'Database migrations, Fluent models, Leaf templates, and JWT auth.', order: 2 },
      { title: 'Full Stack Client & Linux Deploy', description: 'Connecting SwiftUI/web clients and deploying Vapor via Docker on Linux.', order: 3 }
    ],
    assignments: [
      { title: 'Shared-Swift Expense Tracker', description: 'Build a Vapor + PostgreSQL API sharing Codable models with a client app.', dueDaysFromNow: 12 }
    ]
  },
  {
    title: 'C++ Full Stack & WebAssembly Systems: Drogon & React',
    slug: 'cpp-full-stack-webassembly-systems-drogon',
    description: 'Harness modern C++20/23 for ultra-low-latency web servers and browser compute. Build async REST & WebSocket backends with Drogon/Crow, compile C++ modules to WebAssembly via Emscripten, and power React dashboards.',
    shortDescription: 'Low-latency C++20 web servers (Drogon), WebAssembly & React UIs.',
    price: 9999,
    discountedPrice: 5999,
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60',
    duration: '12 Weeks',
    language: 'English',
    level: 'Advanced',
    category: cats['full-stack-development'],
    instructor: 'Dr. Aravind Menon',
    isPublished: true,
    modules: [
      { title: 'Modern C++20 & Async Web Servers', description: 'CMake, smart pointers, coroutines, and building REST APIs with Drogon/Crow.', order: 1 },
      { title: 'PostgreSQL, Redis & WebSockets', description: 'Connection pooling, JSON serialization, and low-latency streaming APIs.', order: 2 },
      { title: 'Emscripten WebAssembly + React', description: 'Compiling compute-heavy C++ libraries to Wasm for interactive web apps.', order: 3 }
    ],
    assignments: [
      { title: 'Wasm Image Filter & C++ Backend', description: 'Compile a C++ filter module to WebAssembly and store presets in a Drogon API.', dueDaysFromNow: 14 }
    ]
  },
  {
    title: 'Angular & MEAN Stack Full Stack Developer',
    slug: 'angular-mean-stack-full-stack-developer',
    description: 'Master enterprise Angular (Signals, standalone components, RxJS, SSR) paired with Node.js, Express, and MongoDB. Build scalable role-based enterprise portals with TypeScript end-to-end.',
    shortDescription: 'Enterprise MEAN stack with Angular Signals, RxJS, Node & MongoDB.',
    price: 8499,
    discountedPrice: 4999,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    duration: '14 Weeks',
    language: 'Hindi + English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Rahul Verma',
    isPublished: true,
    modules: [
      { title: 'Modern Angular & Signals', description: 'Standalone components, Signals, RxJS operators, and reactive forms.', order: 1 },
      { title: 'Node.js, Express & MongoDB APIs', description: 'Aggregation pipelines, JWT/refresh tokens, and modular Express services.', order: 2 },
      { title: 'Enterprise Architecture & SSR', description: 'Route guards, Angular SSR, Jasmine/Jest testing, and Docker deployment.', order: 3 }
    ],
    assignments: [
      { title: 'HRMS Leave Portal (MEAN Stack)', description: 'Build an Angular + Node.js + MongoDB employee leave approval workflow.', dueDaysFromNow: 12 }
    ]
  },
  {
    title: 'Vue.js, Nuxt & Node.js Full Stack Developer',
    slug: 'vuejs-nuxt-nodejs-full-stack-developer',
    description: 'Build sleek full-stack web apps with Vue 3 Composition API, Pinia state management, Nuxt 3 full-stack server routes, Prisma + PostgreSQL, and Node.js microservices.',
    shortDescription: 'Modern full stack with Vue 3, Nuxt 3 SSR, Pinia, Node.js & Prisma.',
    price: 7999,
    discountedPrice: 4999,
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60',
    duration: '12 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['full-stack-development'],
    instructor: 'Sneha Gupta',
    isPublished: true,
    modules: [
      { title: 'Vue 3 Composition API & Pinia', description: 'Reactivity, composables, Vue Router, and Pinia stores with TypeScript.', order: 1 },
      { title: 'Nuxt 3 Full Stack & Nitro Server', description: 'SSR/hybrid rendering, server API routes, middleware, and SEO.', order: 2 },
      { title: 'Prisma, Auth & Cloud Hosting', description: 'PostgreSQL integration with Prisma, authentication, and edge deployment.', order: 3 }
    ],
    assignments: [
      { title: 'SSR Event Ticketing App in Nuxt', description: 'Build a Nuxt 3 + Prisma + PostgreSQL event booking app with Pinia cart state.', dueDaysFromNow: 11 }
    ]
  },
  {
    title: 'HTML5, CSS3 & Tailwind CSS: Modern Frontend Foundations',
    slug: 'html5-css3-tailwind-css-frontend-foundations',
    description: 'Build pixel-perfect, accessible, mobile-first web interfaces from scratch. Master semantic HTML5, CSS Grid & Flexbox, container queries, Tailwind CSS utility architecture, and responsive design patterns.',
    shortDescription: 'Master HTML5, CSS Grid/Flexbox, Tailwind CSS & accessible UI design.',
    price: 2999,
    discountedPrice: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60',
    duration: '6 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['full-stack-development'],
    instructor: 'Nisha Kulkarni',
    isPublished: true,
    modules: [
      { title: 'Semantic HTML5 & Accessibility', description: 'ARIA landmarks, forms, SEO-friendly markup, and keyboard navigation.', order: 1 },
      { title: 'CSS3 Grid, Flexbox & Animations', description: 'Modern responsive layouts, custom properties, and smooth transitions.', order: 2 },
      { title: 'Tailwind CSS Design Systems', description: 'Utility-first workflows, dark mode, responsive components, and Vite builds.', order: 3 }
    ],
    assignments: [
      { title: 'Responsive SaaS Pricing & Landing UI', description: 'Build a responsive landing page with dark mode toggle using HTML5 and Tailwind CSS.', dueDaysFromNow: 6 }
    ]
  },

  // --- Requested Complete Course Catalogue (Exact 9) ---
  {
    title: 'AI Powered Student',
    slug: 'ai-powered-student',
    description: 'Supercharge your college and career productivity with modern AI tools. Master structured prompting with ChatGPT, Claude, and Gemini, build smart study systems with NotebookLM & Notion AI, synthesize research papers faster, and automate notes and presentations.',
    shortDescription: 'Study smarter and faster using ChatGPT, Claude, NotebookLM, and AI workflows.',
    price: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['career-productivity'],
    instructor: 'Dr. Siddharth Nair',
    isPublished: true,
    modules: [
      { title: 'AI Tools & Prompt Engineering for Students', description: 'Mastering ChatGPT, Claude, Gemini, and role-based study prompting.', order: 1 },
      { title: 'Research, Notes & Presentation Workflows', description: 'NotebookLM synthesis, Notion AI knowledge bases, and slide generation.', order: 2 },
      { title: 'AI Projects, Coding Help & Ethics', description: 'Debugging code with AI, resume drafting, and responsible academic AI use.', order: 3 }
    ],
    assignments: [
      { title: 'Build an AI Study & Project Assistant', description: 'Create a structured prompt library and NotebookLM/Notion study workspace for one subject.', dueDaysFromNow: 5 }
    ]
  },
  {
    title: 'Excel to Excellence',
    slug: 'excel-to-excellence',
    description: 'Go from spreadsheet beginner to corporate Excel power user. Learn XLOOKUP, INDEX-MATCH, SUMIFS, dynamic array formulas, Pivot Tables, Power Query data cleaning, conditional formatting, and executive MIS dashboards.',
    shortDescription: 'Master XLOOKUP, Pivot Tables, Power Query, and executive Excel dashboards.',
    price: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['career-productivity'],
    instructor: 'Rohan Malhotra',
    isPublished: true,
    modules: [
      { title: 'Core Formulas & Data Cleaning', description: 'Text/date functions, logical formulas, data validation, and shortcuts.', order: 1 },
      { title: 'Lookup Mastery & Dynamic Arrays', description: 'XLOOKUP, INDEX-MATCH, SUMIFS, FILTER, UNIQUE, and SORT.', order: 2 },
      { title: 'Pivot Tables, Power Query & Dashboards', description: 'Automated ETL with Power Query, slicers, and KPI reporting dashboards.', order: 3 }
    ],
    assignments: [
      { title: 'Automated Monthly Sales MIS Dashboard', description: 'Clean a raw sales workbook using Power Query and build an interactive Pivot dashboard.', dueDaysFromNow: 6 }
    ]
  },
  {
    title: 'Placement Ready Pro',
    slug: 'placement-ready-pro',
    description: 'Complete campus and off-campus job placement accelerator. Cover quantitative aptitude, logical reasoning, ATS-friendly resume & LinkedIn optimization, group discussions, HR storytelling, and technical mock interviews.',
    shortDescription: 'Crack campus & off-campus placements with aptitude, ATS resumes, and mock interviews.',
    price: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60',
    duration: '5 Weeks',
    language: 'Hindi + English',
    level: 'Intermediate',
    category: cats['career-productivity'],
    instructor: 'Vikramaditya Rao',
    isPublished: true,
    modules: [
      { title: 'Aptitude & Reasoning Sprint', description: 'Quantitative aptitude, data interpretation, and timed logical reasoning drills.', order: 1 },
      { title: 'ATS Resume, LinkedIn & Portfolio', description: 'Keyword-aligned resumes, GitHub/portfolio polish, and cold referral outreach.', order: 2 },
      { title: 'Group Discussions & Mock Interviews', description: 'STAR behavioral answers, HR rounds, and role-specific technical interviews.', order: 3 }
    ],
    assignments: [
      { title: 'ATS Resume & Mock Interview Evaluation', description: 'Submit your tailored 1-page ATS resume and complete a recorded STAR interview response.', dueDaysFromNow: 7 }
    ]
  },
  {
    title: 'Digital Marketing Launchpad',
    slug: 'digital-marketing-launchpad',
    description: 'Launch your digital marketing skill set in 5 practical weeks. Learn marketing funnels, Meta & Google Ads setup, SEO fundamentals, Instagram & LinkedIn content growth, email automation, and campaign ROI analytics.',
    shortDescription: 'Practical Meta Ads, Google Ads, SEO, and social media growth launchpad.',
    price: 1999,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    duration: '5 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['digital-marketing'],
    instructor: 'Priya Deshmukh',
    isPublished: true,
    modules: [
      { title: 'Marketing Funnels & Content Strategy', description: 'Buyer personas, landing page messaging, and organic social growth.', order: 1 },
      { title: 'Meta Ads & Google Search Campaigns', description: 'Pixel tracking, audience targeting, ad creatives, and budget optimization.', order: 2 },
      { title: 'SEO Basics & Analytics Reporting', description: 'On-page SEO, Google Analytics 4, and client-ready ROI reports.', order: 3 }
    ],
    assignments: [
      { title: 'Full-Funnel Campaign Blueprint', description: 'Design a 30-day Meta + Search campaign plan with ad copy, targeting, and KPIs.', dueDaysFromNow: 7 }
    ]
  },
  {
    title: 'Communication Mastery',
    slug: 'communication-mastery',
    description: 'Build confident workplace communication for interviews, meetings, and client calls. Improve spoken clarity, structured thinking, business email & Slack writing, executive presentation skills, and persuasive storytelling.',
    shortDescription: 'Speak clearly, write crisp emails, and present ideas with confidence.',
    price: 999,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['career-productivity'],
    instructor: 'Meera Joshi',
    isPublished: true,
    modules: [
      { title: 'Confident Speaking & Body Language', description: 'Voice modulation, eliminating filler words, and thinking clearly on the spot.', order: 1 },
      { title: 'Business Writing & Workplace Etiquette', description: 'Crisp emails, Slack updates, meeting agendas, and stakeholder follow-ups.', order: 2 },
      { title: 'Storytelling & Executive Presentations', description: 'Structuring decks, handling tough Q&A, and persuasive pitching.', order: 3 }
    ],
    assignments: [
      { title: '3-Minute Persuasive Pitch Video', description: 'Record a 3-minute structured presentation on a project or case study and submit notes.', dueDaysFromNow: 5 }
    ]
  },
  {
    title: 'Data Analytics Career Track',
    slug: 'data-analytics-career-track',
    description: 'Job-focused 6-week analytics track combining Advanced Excel, PostgreSQL querying, Python Pandas EDA, and Power BI dashboards. Graduate with real business case studies ready for Data Analyst and Business Analyst roles.',
    shortDescription: 'Become a job-ready Data Analyst with Excel, SQL, Python & Power BI.',
    price: 2999,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    duration: '6 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['data-science'],
    instructor: 'Dr. Kavita Sharma',
    isPublished: true,
    modules: [
      { title: 'Excel & SQL for Data Extraction', description: 'Pivot analysis, SQL joins, aggregations, CTEs, and window functions.', order: 1 },
      { title: 'Python & Exploratory Data Analysis', description: 'Cleaning messy datasets with Pandas and spotting trends with Seaborn.', order: 2 },
      { title: 'Power BI Dashboards & Capstone', description: 'Building interactive BI reports and presenting insights to stakeholders.', order: 3 }
    ],
    assignments: [
      { title: 'End-to-End Business Analytics Case Study', description: 'Analyze an e-commerce dataset using SQL + Python and deliver a Power BI summary.', dueDaysFromNow: 10 }
    ]
  },
  {
    title: 'Freelance Starter Pro',
    slug: 'freelance-starter-pro',
    description: 'Turn your skills into consistent freelance income. Learn how to package a high-value offer, optimize Upwork & Fiverr profiles, land international clients via LinkedIn & cold outreach, price retainers, and manage contracts.',
    shortDescription: 'Land your first freelance clients on Upwork, Fiverr, and LinkedIn.',
    price: 1999,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['career-productivity'],
    instructor: 'Rajesh Iyer',
    isPublished: true,
    modules: [
      { title: 'Niche Selection & Service Packaging', description: 'Identifying profitable skills, proof-of-work portfolios, and outcome pricing.', order: 1 },
      { title: 'Upwork, Fiverr & Cold Outreach', description: 'Writing winning proposals, LinkedIn inbound positioning, and discovery calls.', order: 2 },
      { title: 'Contracts, Invoicing & Retainers', description: 'Scope management, Indian/international payments, and turning gigs into retainers.', order: 3 }
    ],
    assignments: [
      { title: 'Freelance Offer & Outreach Kit', description: 'Draft your service landing pitch, Upwork profile bio, and 5 personalized client proposals.', dueDaysFromNow: 6 }
    ]
  },
  {
    title: 'Creative Design & Content Studio',
    slug: 'creative-design-content-studio',
    description: 'Create scroll-stopping brand visuals, carousels, thumbnails, and short-form videos. Master Canva Pro brand kits, visual hierarchy, CapCut/Premiere short-form editing, AI design workflows, and content calendars.',
    shortDescription: 'Design viral carousels, brand kits, thumbnails, and Reels with Canva & video tools.',
    price: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['ui-ux-design'],
    instructor: 'Nisha Kulkarni',
    isPublished: true,
    modules: [
      { title: 'Visual Design & Canva Pro Mastery', description: 'Typography, color contrast, brand kits, and high-converting carousels.', order: 1 },
      { title: 'Short-Form Video & Reels Editing', description: 'Hooks, pacing, captions, b-roll, and sound design in CapCut/Premiere.', order: 2 },
      { title: 'Content Systems & Creator Portfolio', description: 'Batching weekly content calendars and building a freelance creative kit.', order: 3 }
    ],
    assignments: [
      { title: 'Brand Kit + 5-Slide Carousel + Reel', description: 'Create a mini brand kit, an Instagram carousel, and a 30-second edited short video.', dueDaysFromNow: 6 }
    ]
  },
  {
    title: 'Python Coding Foundation',
    slug: 'python-coding-foundation',
    description: 'Start coding from absolute zero with Python 3. Master variables, loops, functions, lists/dicts, file handling, OOP basics, working with JSON/REST APIs, and problem-solving logic for web or data careers.',
    shortDescription: 'Learn Python 3 from scratch: logic, data structures, OOP, and real mini-apps.',
    price: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60',
    duration: '6 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['full-stack-development'],
    instructor: 'Prakash Kulkarni',
    isPublished: true,
    modules: [
      { title: 'Python Syntax & Control Flow', description: 'Variables, conditionals, loops, functions, and clean debugging habits.', order: 1 },
      { title: 'Data Structures & File Handling', description: 'Lists, tuples, sets, dictionaries, CSV/JSON files, and error handling.', order: 2 },
      { title: 'OOP & API Mini-Projects', description: 'Classes, modules, pip packages, and fetching live data from REST APIs.', order: 3 }
    ],
    assignments: [
      { title: 'CLI Expense Tracker & Currency Converter', description: 'Build a Python command-line expense tracker saving records to JSON/CSV.', dueDaysFromNow: 8 }
    ]
  },

  // --- Related 2026 Courses Around These Topics ---
  {
    title: 'Prompt Engineering & No-Code AI Automation (Zapier & Make)',
    slug: 'prompt-engineering-no-code-ai-automation',
    description: 'Connect ChatGPT/Claude with everyday tools without writing heavy code. Build automated email triage, lead-enrichment, content-repurposing, and Notion/Sheets workflows using Zapier, Make.com, and AI Copilots.',
    shortDescription: 'Automate business & study workflows using AI prompts, Zapier, and Make.com.',
    price: 1999,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'English',
    level: 'Beginner',
    category: cats['career-productivity'],
    instructor: 'Dr. Siddharth Nair',
    isPublished: true,
    modules: [
      { title: 'Structured Prompt Systems', description: 'Few-shot templates, JSON outputs, and Microsoft/Google AI Copilots.', order: 1 },
      { title: 'Zapier & Make.com Automations', description: 'Webhooks, triggers, routers, and connecting Gmail, Slack, and Sheets.', order: 2 },
      { title: 'End-to-End AI Workflows', description: 'Automated content pipelines, CRM summaries, and error handling.', order: 3 }
    ],
    assignments: [
      { title: 'Automated Form-to-Report AI Workflow', description: 'Design a Make/Zapier scenario that summarizes incoming form leads with an LLM.', dueDaysFromNow: 7 }
    ]
  },
  {
    title: 'Financial Modeling, Valuation & Corporate Excel',
    slug: 'financial-modeling-valuation-corporate-excel',
    description: 'Built for finance, consulting, and business analyst aspirants. Construct 3-statement financial models, Discounted Cash Flow (DCF) valuations, sensitivity tables, and investor-ready Excel models from historical company filings.',
    shortDescription: 'Build 3-statement financial models, DCF valuations, and scenario analysis in Excel.',
    price: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    duration: '6 Weeks',
    language: 'English',
    level: 'Intermediate',
    category: cats['career-productivity'],
    instructor: 'Rohan Malhotra',
    isPublished: true,
    modules: [
      { title: 'Accounting & 3-Statement Linking', description: 'Income statement, balance sheet, cash flow forecasting, and circularity.', order: 1 },
      { title: 'DCF Valuation & WACC', description: 'Free cash flows, terminal value, comps analysis, and sensitivity matrices.', order: 2 },
      { title: 'Scenario Modeling & Deck Output', description: 'Bull/base/bear switches and executive finance summary charts.', order: 3 }
    ],
    assignments: [
      { title: 'Listed Company 3-Statement + DCF Model', description: 'Build an Excel valuation model with sensitivity table for a public company.', dueDaysFromNow: 10 }
    ]
  },
  {
    title: 'DSA, Coding Interviews & Aptitude Bootcamp',
    slug: 'dsa-coding-interviews-aptitude-bootcamp',
    description: 'Crack product-company and MNC technical rounds. Master arrays, strings, recursion, trees, graphs, dynamic programming, and time-complexity optimization alongside quantitative aptitude and live mock interviews.',
    shortDescription: 'Master Data Structures, Algorithms, and technical interview problem solving.',
    price: 2999,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    duration: '8 Weeks',
    language: 'Hindi + English',
    level: 'Intermediate',
    category: cats['career-productivity'],
    instructor: 'Amit Bansal',
    isPublished: true,
    modules: [
      { title: 'Arrays, Hashing & Two Pointers', description: 'Complexity analysis, sliding window, binary search, and recursion.', order: 1 },
      { title: 'Linked Lists, Stacks, Trees & Graphs', description: 'BFS/DFS, binary search trees, heaps, and shortest path patterns.', order: 2 },
      { title: 'Dynamic Programming & Timed Mocks', description: 'Memoization, tabulation, greedy patterns, and 1-on-1 coding mocks.', order: 3 }
    ],
    assignments: [
      { title: '25-Problem Curated DSA Sheet', description: 'Solve and submit clean solutions with complexity notes for 25 core interview patterns.', dueDaysFromNow: 10 }
    ]
  },
  {
    title: 'Performance Marketing, Meta Ads & Google Ads Mastery',
    slug: 'performance-marketing-meta-google-ads-mastery',
    description: 'Go beyond basics into paid acquisition. Master Meta Conversions API, Google PMax & Shopping ads, A/B creative testing, ROAS optimization, landing page CRO, and scaling ad budgets profitably.',
    shortDescription: 'Scale ROI with Meta Ads, Google PMax, conversion tracking, and CRO.',
    price: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=60',
    duration: '6 Weeks',
    language: 'Hindi + English',
    level: 'Intermediate',
    category: cats['digital-marketing'],
    instructor: 'Priya Deshmukh',
    isPublished: true,
    modules: [
      { title: 'Tracking, Pixels & Attribution', description: 'Google Tag Manager, GA4 events, Meta Pixel, and Conversions API.', order: 1 },
      { title: 'Meta Ads Scaling & Creative Testing', description: 'CBO/ABO structures, hooks, retargeting funnels, and ROAS diagnostics.', order: 2 },
      { title: 'Google Search, YouTube & PMax', description: 'Keyword match types, negative lists, bidding strategies, and landing CRO.', order: 3 }
    ],
    assignments: [
      { title: 'ROAS Audit & Media Buying Plan', description: 'Audit a sample ad account and propose a testing roadmap to improve CPA.', dueDaysFromNow: 8 }
    ]
  },
  {
    title: 'Social Media Marketing, Reels & Creator Growth',
    slug: 'social-media-marketing-reels-creator-growth',
    description: 'Build an organic audience on Instagram, YouTube Shorts, and LinkedIn. Learn viral hook psychology, algorithm signals, personal branding, community monetization, and brand sponsorship pitching.',
    shortDescription: 'Grow organically on Instagram, LinkedIn, and YouTube Shorts with repeatable systems.',
    price: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['digital-marketing'],
    instructor: 'Rajesh Iyer',
    isPublished: true,
    modules: [
      { title: 'Platform Algorithms & Positioning', description: 'Content pillars, profile bio optimization, and audience retention.', order: 1 },
      { title: 'Hooks, Scripts & Short-Form Formats', description: 'Storytelling frameworks for Reels, Shorts, and LinkedIn carousels.', order: 2 },
      { title: 'Analytics & Creator Monetization', description: 'Reading reach/save metrics, brand media kits, and digital products.', order: 3 }
    ],
    assignments: [
      { title: '14-Day Multi-Platform Content Sprint', description: 'Plan 14 posts across Instagram and LinkedIn with scripted hooks and CTAs.', dueDaysFromNow: 6 }
    ]
  },
  {
    title: 'Public Speaking, Corporate English & Presentation Skills',
    slug: 'public-speaking-corporate-english-presentation-skills',
    description: 'Elevate your spoken English and stage presence for corporate leadership, client demos, and webinars. Practice pronunciation clarity, persuasive slide narration, impromptu speaking, and executive Q&A handling.',
    shortDescription: 'Master corporate English fluency, stage presence, and executive presentations.',
    price: 1299,
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'English',
    level: 'Beginner',
    category: cats['career-productivity'],
    instructor: 'Meera Joshi',
    isPublished: true,
    modules: [
      { title: 'Fluency, Tone & Pronunciation', description: 'Pacing, vocal clarity, common corporate phrases, and active listening.', order: 1 },
      { title: 'Slide Storytelling & Visual Delivery', description: 'Framing insights before showing charts and keeping audiences engaged.', order: 2 },
      { title: 'Impromptu Speaking & Tough Q&A', description: 'Handling interruptions, executive briefings, and live demo practice.', order: 3 }
    ],
    assignments: [
      { title: 'Executive 5-Slide Briefing Practice', description: 'Deliver a 4-minute recorded briefing walking through a mock quarterly business deck.', dueDaysFromNow: 6 }
    ]
  },
  {
    title: 'Google Data Analytics & Spreadsheet Insights Bootcamp',
    slug: 'google-data-analytics-spreadsheet-insights-bootcamp',
    description: 'Hands-on analytics foundation built around Google Sheets, SQL, Looker Studio, and Tableau. Learn structured problem framing, data cleaning, trend analysis, and stakeholder-ready dashboard storytelling.',
    shortDescription: 'Clean, analyze, and visualize data using Google Sheets, SQL & Looker Studio.',
    price: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&auto=format&fit=crop&q=60',
    duration: '6 Weeks',
    language: 'English',
    level: 'Beginner',
    category: cats['data-science'],
    instructor: 'Dr. Kavita Sharma',
    isPublished: true,
    modules: [
      { title: 'Ask, Prepare & Clean in Sheets', description: 'Google Sheets QUERY, IMPORTRANGE, data integrity checks, and cleaning.', order: 1 },
      { title: 'SQL Querying & Metric Definitions', description: 'Writing analytical SQL queries for conversion, retention, and churn.', order: 2 },
      { title: 'Looker Studio & Tableau Dashboards', description: 'Publishing interactive web dashboards and writing data-backed memos.', order: 3 }
    ],
    assignments: [
      { title: 'Marketing Funnel Analytics Report', description: 'Connect a cleaned Google Sheet to Looker Studio and build a 1-page insights report.', dueDaysFromNow: 8 }
    ]
  },
  {
    title: 'Remote Career, Personal Branding & LinkedIn Growth',
    slug: 'remote-career-personal-branding-linkedin-growth',
    description: 'Stand out to global remote employers and high-ticket clients. Build an inbound LinkedIn brand, craft proof-of-work case studies, optimize your GitHub/Behance portfolio, and master async remote work habits.',
    shortDescription: 'Attract remote jobs and clients with LinkedIn branding and proof-of-work.',
    price: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['career-productivity'],
    instructor: 'Vikramaditya Rao',
    isPublished: true,
    modules: [
      { title: 'LinkedIn Profile & Positioning', description: 'Headline SEO, featured proof-of-work, and compelling about stories.', order: 1 },
      { title: 'Content & Networking Engine', description: 'Writing value posts, commenting strategy, and warm DM outreach.', order: 2 },
      { title: 'Remote Job Hunt & Async Mastery', description: 'Global remote job boards, timezone etiquette, and documentation habits.', order: 3 }
    ],
    assignments: [
      { title: 'LinkedIn Makeover & 5-Post Sprint', description: 'Revamp your LinkedIn profile and draft 5 proof-of-work posts for your target role.', dueDaysFromNow: 6 }
    ]
  },
  {
    title: 'Short-Form Video Editing & Canva Pro Mastery',
    slug: 'short-form-video-editing-canva-pro-mastery',
    description: 'Master high-retention vertical video editing and social graphics for creators and brands. Learn CapCut, Premiere Pro essentials, kinetic captions, sound effects, and Canva Pro motion templates.',
    shortDescription: 'Edit high-retention Reels/Shorts and design social assets with CapCut & Canva.',
    price: 1499,
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60',
    duration: '4 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['ui-ux-design'],
    instructor: 'Nisha Kulkarni',
    isPublished: true,
    modules: [
      { title: 'Retention Editing & Pacing', description: 'Cut rhythm, J-cuts/L-cuts, pattern interrupts, and dynamic captions.', order: 1 },
      { title: 'Color, Audio & Motion Graphics', description: 'Audio ducking, SFX layering, keyframe animations, and LUTs.', order: 2 },
      { title: 'Canva Pro Thumbnails & Client Delivery', description: 'High-CTR YouTube/Reel covers and fast client revision workflows.', order: 3 }
    ],
    assignments: [
      { title: 'Edit a 45-Second Talking-Head Reel', description: 'Deliver a captioned vertical video with b-roll, SFX, and a custom Canva cover.', dueDaysFromNow: 6 }
    ]
  },
  {
    title: 'Python Automation: Automate the Boring Stuff',
    slug: 'python-automation-automate-the-boring-stuff',
    description: 'Use practical Python scripts to eliminate repetitive daily work. Automate Excel/CSV reporting, PDF merging, web scraping with BeautifulSoup/Playwright, email alerts, and scheduled folder organization.',
    shortDescription: 'Write Python scripts to automate Excel, PDFs, web scraping, and daily tasks.',
    price: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60',
    duration: '5 Weeks',
    language: 'Hindi + English',
    level: 'Beginner',
    category: cats['full-stack-development'],
    instructor: 'Prakash Kulkarni',
    isPublished: true,
    modules: [
      { title: 'Files, Regex & OS Automation', description: 'Pathlib, regex text extraction, bulk renaming, and scheduled scripts.', order: 1 },
      { title: 'Excel, Google Sheets & PDF Bots', description: 'openpyxl, Pandas report generation, and PDF text/invoice extraction.', order: 2 },
      { title: 'Web Scraping & Email Alerts', description: 'Requests, BeautifulSoup, Playwright browser automation, and SMTP alerts.', order: 3 }
    ],
    assignments: [
      { title: 'Automated Invoice & Price Tracker Bot', description: 'Build a Python script that scrapes or reads data and generates a formatted Excel report.', dueDaysFromNow: 8 }
    ]
  }
];
