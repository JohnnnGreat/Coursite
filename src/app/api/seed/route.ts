import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/schema/User";
import { Course } from "@/schema/Course";
import { Section } from "@/schema/Section";
import { Lesson } from "@/schema/Lesson";

const SEED_COURSES = [
   {
      title: "Complete JavaScript Bootcamp 2024",
      description:
         "Master JavaScript from scratch. Learn ES6+, async programming, DOM manipulation, and build real-world projects that employers love.",
      imageUrl:
         "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
      category: "Development",
      level: "Beginner",
      price: "0",
      published: true,
      draft: false,
      courseCertification: true,
      welcomeMessage: "Welcome! You're about to master JavaScript. Let's get started.",
      sections: [
         {
            title: "Getting Started with JavaScript",
            description: "Foundations of the language — syntax, types, and control flow.",
            lessons: [
               { title: "Introduction to JavaScript", type: "video", lessonDuration: "08:30" },
               { title: "Variables & Data Types", type: "video", lessonDuration: "12:45" },
               { title: "Control Flow & Loops", type: "video", lessonDuration: "15:20" },
            ],
         },
         {
            title: "Functions & Objects",
            description: "Deep dive into functions, closures, and object-oriented JS.",
            lessons: [
               { title: "Functions Deep Dive", type: "video", lessonDuration: "18:10" },
               { title: "Objects & Arrays", type: "video", lessonDuration: "22:00" },
               { title: "ES6+ Modern Features", type: "video", lessonDuration: "19:35" },
            ],
         },
         {
            title: "Async JavaScript",
            description: "Promises, async/await, and working with APIs.",
            lessons: [
               { title: "Promises Explained", type: "video", lessonDuration: "14:00" },
               { title: "Async / Await Pattern", type: "video", lessonDuration: "16:55" },
               { title: "Fetch API & REST Calls", type: "video", lessonDuration: "20:10" },
            ],
         },
      ],
   },
   {
      title: "Python for Data Science & Machine Learning",
      description:
         "Learn Python for data analysis and machine learning. Master NumPy, Pandas, Matplotlib, and scikit-learn through hands-on projects.",
      imageUrl:
         "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
      category: "Data Science",
      level: "Intermediate",
      price: "0",
      published: true,
      draft: false,
      courseCertification: true,
      welcomeMessage: "Welcome to Python for Data Science. This will transform how you work with data.",
      sections: [
         {
            title: "Python Fundamentals for Data",
            description: "Python syntax, data structures, and libraries overview.",
            lessons: [
               { title: "Python Setup & Jupyter Notebooks", type: "video", lessonDuration: "10:00" },
               { title: "NumPy Arrays & Operations", type: "video", lessonDuration: "18:30" },
               { title: "Pandas DataFrames", type: "video", lessonDuration: "24:15" },
            ],
         },
         {
            title: "Data Analysis & Cleaning",
            description: "Real-world data wrangling techniques.",
            lessons: [
               { title: "Loading & Inspecting Data", type: "video", lessonDuration: "12:00" },
               { title: "Cleaning Missing Values", type: "video", lessonDuration: "15:40" },
               { title: "Grouping & Aggregation", type: "video", lessonDuration: "17:25" },
            ],
         },
         {
            title: "Machine Learning Basics",
            description: "Intro to ML with scikit-learn.",
            lessons: [
               { title: "ML Concepts & Workflow", type: "video", lessonDuration: "14:50" },
               { title: "Linear Regression", type: "video", lessonDuration: "20:00" },
               { title: "Classification with scikit-learn", type: "video", lessonDuration: "22:10" },
            ],
         },
      ],
   },
   {
      title: "UI/UX Design Masterclass",
      description:
         "Design beautiful, user-centered digital products. Learn Figma, design thinking, wireframing, prototyping, and usability testing from scratch.",
      imageUrl:
         "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      category: "Design",
      level: "Beginner",
      price: "0",
      published: true,
      draft: false,
      courseCertification: true,
      welcomeMessage: "Welcome! Great design starts with understanding people. Let's begin.",
      sections: [
         {
            title: "Design Thinking & Research",
            description: "Understanding users and defining problems.",
            lessons: [
               { title: "What is UX Design?", type: "video", lessonDuration: "09:00" },
               { title: "User Research Methods", type: "video", lessonDuration: "16:20" },
               { title: "Creating User Personas", type: "video", lessonDuration: "13:45" },
            ],
         },
         {
            title: "Wireframing & Prototyping",
            description: "From sketches to interactive prototypes.",
            lessons: [
               { title: "Sketching & Low-Fi Wireframes", type: "video", lessonDuration: "18:00" },
               { title: "Figma Fundamentals", type: "video", lessonDuration: "25:30" },
               { title: "Building Clickable Prototypes", type: "video", lessonDuration: "22:15" },
            ],
         },
         {
            title: "Visual Design Principles",
            description: "Typography, color, and layout fundamentals.",
            lessons: [
               { title: "Typography in UI", type: "video", lessonDuration: "14:00" },
               { title: "Color Theory for Designers", type: "video", lessonDuration: "17:35" },
               { title: "Building a Design System", type: "video", lessonDuration: "28:00" },
            ],
         },
      ],
   },
   {
      title: "React & Next.js — The Complete Guide",
      description:
         "Build production-ready full-stack web applications with React 19 and Next.js 15. Covers TypeScript, the App Router, server actions, and deployment.",
      imageUrl:
         "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
      category: "Development",
      level: "Intermediate",
      price: "0",
      published: true,
      draft: false,
      courseCertification: true,
      welcomeMessage: "Welcome to the most complete React & Next.js course. Let's build something real.",
      sections: [
         {
            title: "React Fundamentals",
            description: "Components, state, props, and hooks.",
            lessons: [
               { title: "JSX & Components", type: "video", lessonDuration: "12:00" },
               { title: "State with useState", type: "video", lessonDuration: "15:30" },
               { title: "useEffect & Side Effects", type: "video", lessonDuration: "18:45" },
            ],
         },
         {
            title: "Next.js App Router",
            description: "File-based routing, layouts, and server components.",
            lessons: [
               { title: "App Router Explained", type: "video", lessonDuration: "16:00" },
               { title: "Server vs Client Components", type: "video", lessonDuration: "20:10" },
               { title: "Server Actions & Forms", type: "video", lessonDuration: "22:30" },
            ],
         },
         {
            title: "Full Stack Features",
            description: "Authentication, database, and deployment.",
            lessons: [
               { title: "Authentication with NextAuth", type: "video", lessonDuration: "28:00" },
               { title: "MongoDB & Mongoose", type: "video", lessonDuration: "24:15" },
               { title: "Deploying to Vercel", type: "video", lessonDuration: "14:00" },
            ],
         },
      ],
   },
   {
      title: "Digital Marketing Strategy 2024",
      description:
         "Master SEO, social media marketing, email campaigns, and Google Ads. Build a complete digital marketing strategy that drives real traffic and conversions.",
      imageUrl:
         "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
      category: "Marketing",
      level: "Beginner",
      price: "0",
      published: true,
      draft: false,
      courseCertification: false,
      welcomeMessage: "Welcome! Marketing is storytelling with strategy. Let's make yours count.",
      sections: [
         {
            title: "SEO Fundamentals",
            description: "Rank higher on Google and drive organic traffic.",
            lessons: [
               { title: "How Search Engines Work", type: "video", lessonDuration: "11:00" },
               { title: "Keyword Research Strategy", type: "video", lessonDuration: "19:20" },
               { title: "On-Page SEO Best Practices", type: "video", lessonDuration: "23:45" },
            ],
         },
         {
            title: "Social Media Marketing",
            description: "Grow your brand across platforms.",
            lessons: [
               { title: "Building a Content Strategy", type: "video", lessonDuration: "15:00" },
               { title: "Instagram & LinkedIn Growth", type: "video", lessonDuration: "17:30" },
               { title: "Paid Social Ads", type: "video", lessonDuration: "21:00" },
            ],
         },
         {
            title: "Email Marketing & Analytics",
            description: "Email campaigns and measuring what matters.",
            lessons: [
               { title: "Building Your Email List", type: "video", lessonDuration: "13:30" },
               { title: "Writing High-Converting Emails", type: "video", lessonDuration: "16:45" },
               { title: "Google Analytics 4 Basics", type: "video", lessonDuration: "20:00" },
            ],
         },
      ],
   },
   {
      title: "Machine Learning A-Z: AI, Python & R",
      description:
         "Hands-on machine learning with Python and R. Build models for regression, classification, clustering, and deep learning — with real datasets throughout.",
      imageUrl:
         "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
      category: "Data Science",
      level: "Advanced",
      price: "0",
      published: true,
      draft: false,
      courseCertification: true,
      welcomeMessage: "Welcome to Machine Learning A-Z. This is going to change how you see the world.",
      sections: [
         {
            title: "Supervised Learning",
            description: "Regression and classification algorithms.",
            lessons: [
               { title: "Linear & Polynomial Regression", type: "video", lessonDuration: "25:00" },
               { title: "Logistic Regression", type: "video", lessonDuration: "22:30" },
               { title: "Decision Trees & Random Forest", type: "video", lessonDuration: "28:45" },
            ],
         },
         {
            title: "Unsupervised Learning",
            description: "Clustering and dimensionality reduction.",
            lessons: [
               { title: "K-Means Clustering", type: "video", lessonDuration: "18:00" },
               { title: "Hierarchical Clustering", type: "video", lessonDuration: "16:30" },
               { title: "PCA & Dimensionality Reduction", type: "video", lessonDuration: "20:15" },
            ],
         },
         {
            title: "Deep Learning",
            description: "Neural networks and TensorFlow.",
            lessons: [
               { title: "Introduction to Neural Networks", type: "video", lessonDuration: "24:00" },
               { title: "Building ANNs with TensorFlow", type: "video", lessonDuration: "30:20" },
               { title: "Convolutional Neural Networks", type: "video", lessonDuration: "35:00" },
            ],
         },
      ],
   },
];

export async function GET() {
   try {
      await connectDB();

      // Find or create the instructor user
      let user = await User.findOne({ email: "johnossai20@gmail.com" });

      if (!user) {
         user = await User.create({
            name: "John Great",
            email: "johnossai20@gmail.com",
            role: "INSTRUCTOR",
            authMethod: "CREDENTIALS",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
         });
      } else {
         // Make sure the user is an instructor
         user.role = "INSTRUCTOR";
         await user.save();
      }

      const createdCourses = [];

      for (const courseData of SEED_COURSES) {
         // Skip if course with same title already exists for this user
         const existing = await Course.findOne({ title: courseData.title, authorId: user._id });
         if (existing) {
            createdCourses.push({ title: courseData.title, status: "already exists" });
            continue;
         }

         const { sections: sectionsData, ...courseFields } = courseData;

         // Create course
         const course = await Course.create({
            ...courseFields,
            authorId: user._id,
         });

         // Create sections and lessons
         const sectionIds = [];
         for (const sectionData of sectionsData) {
            const { lessons: lessonsData, ...sectionFields } = sectionData;

            const section = await Section.create({
               ...sectionFields,
               courseId: course._id,
            });

            const lessonIds = [];
            for (const lessonData of lessonsData) {
               const lesson = await Lesson.create({
                  ...lessonData,
                  sectionId: section._id,
               });
               lessonIds.push(lesson._id);
            }

            section.lessons = lessonIds;
            await section.save();
            sectionIds.push(section._id);
         }

         course.sections = sectionIds;
         await course.save();

         // Add course to user's courses array
         await User.findByIdAndUpdate(user._id, {
            $addToSet: { courses: course._id },
         });

         createdCourses.push({ title: courseData.title, status: "created", id: course._id });
      }

      return NextResponse.json({
         success: true,
         userId: user._id,
         userEmail: user.email,
         courses: createdCourses,
      });
   } catch (error) {
      console.error("Seed error:", error);
      return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
   }
}
