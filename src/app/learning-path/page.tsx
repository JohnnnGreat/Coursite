import React from "react";
import { BookOpen, Code, Briefcase, ChevronRight } from "lucide-react";

const LearningPathPage = () => {
   const paths = [
      {
         title: "Web Development",
         description: "Master modern web development from basics to advanced concepts",
         levels: [
            {
               level: "Beginner",
               courses: ["HTML & CSS Fundamentals", "JavaScript Basics", "Responsive Design"],
               duration: "3 months",
            },
            {
               level: "Intermediate",
               courses: ["React Fundamentals", "Node.js Basics", "Database Design"],
               duration: "4 months",
            },
            {
               level: "Advanced",
               courses: ["Full Stack Development", "Cloud Deployment", "Performance Optimization"],
               duration: "5 months",
            },
         ],
         icon: <Code className="w-6 h-6" />,
      },
      {
         title: "Data Science",
         description: "Learn to analyze and interpret complex data sets",
         levels: [
            {
               level: "Beginner",
               courses: ["Python Basics", "Statistics Fundamentals", "Data Visualization"],
               duration: "3 months",
            },
            {
               level: "Intermediate",
               courses: ["Machine Learning Basics", "SQL & Databases", "Data Analysis"],
               duration: "4 months",
            },
            {
               level: "Advanced",
               courses: ["Deep Learning", "Big Data Processing", "Production Deployment"],
               duration: "5 months",
            },
         ],
         icon: <BookOpen className="w-6 h-6" />,
      },
   ];

   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
            <div className="max-w-[1100px] mx-auto px-4 py-16">
               <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl font-bold mb-6">Learning Paths</h1>
                  <p className="text-xl mb-8">
                     Structured curricula to help you achieve your career goals
                  </p>
               </div>
            </div>
         </div>

         {/* Paths Section */}
         <div className="max-w-[1100px] mx-auto px-4 py-16">
            <div className="space-y-12">
               {paths.map((path, pathIndex) => (
                  <div
                     key={pathIndex}
                     className="border rounded-lg overflow-hidden"
                  >
                     <div className="bg-gray-50 p-6 border-b">
                        <div className="flex items-center gap-4">
                           <div className="text-indigo-600">{path.icon}</div>
                           <div>
                              <h2 className="text-2xl font-bold mb-2">{path.title}</h2>
                              <p className="text-gray-600">{path.description}</p>
                           </div>
                        </div>
                     </div>
                     <div className="p-6">
                        <div className="space-y-8">
                           {path.levels.map((level, levelIndex) => (
                              <div
                                 key={levelIndex}
                                 className="relative pl-8"
                              >
                                 {levelIndex !== path.levels.length - 1 && (
                                    <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-200"></div>
                                 )}
                                 <div className="flex items-center gap-4 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                                       {levelIndex + 1}
                                    </div>
                                    <h3 className="text-xl font-semibold">{level.level}</h3>
                                    <span className="text-gray-500 ml-auto">{level.duration}</span>
                                 </div>
                                 <div className="space-y-3">
                                    {level.courses.map((course, courseIndex) => (
                                       <div
                                          key={courseIndex}
                                          className="flex items-center gap-2 text-gray-600"
                                       >
                                          <ChevronRight className="w-4 h-4" />
                                          <span>{course}</span>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
               <h2 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
               <p className="text-gray-600 mb-8">
                  Choose a path and begin your transformation today
               </p>
               <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Explore All Paths
               </button>
            </div>
         </div>
      </div>
   );
};

export default LearningPathPage;
