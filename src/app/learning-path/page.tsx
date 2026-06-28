import React from "react";
import Link from "next/link";
import { ArrowRight, Code, BookOpen } from "lucide-react";

const LearningPathPage = () => {
   const paths = [
      {
         title: "Web Development",
         description: "Master modern web development from the fundamentals to full-stack production apps.",
         icon: <Code className="w-5 h-5" />,
         duration: "12 months",
         levels: [
            {
               level: "Beginner",
               duration: "3 months",
               courses: ["HTML & CSS Fundamentals", "JavaScript Basics", "Responsive Design"],
            },
            {
               level: "Intermediate",
               duration: "4 months",
               courses: ["React Fundamentals", "Node.js Basics", "Database Design"],
            },
            {
               level: "Advanced",
               duration: "5 months",
               courses: ["Full Stack Development", "Cloud Deployment", "Performance Optimization"],
            },
         ],
      },
      {
         title: "Data Science",
         description: "Go from zero to analyzing complex datasets and building machine learning models.",
         icon: <BookOpen className="w-5 h-5" />,
         duration: "12 months",
         levels: [
            {
               level: "Beginner",
               duration: "3 months",
               courses: ["Python Basics", "Statistics Fundamentals", "Data Visualization"],
            },
            {
               level: "Intermediate",
               duration: "4 months",
               courses: ["Machine Learning Basics", "SQL & Databases", "Data Analysis"],
            },
            {
               level: "Advanced",
               duration: "5 months",
               courses: ["Deep Learning", "Big Data Processing", "Production Deployment"],
            },
         ],
      },
   ];

   const levelColors: Record<string, string> = {
      Beginner: "text-emerald-600 bg-emerald-50 border-emerald-100",
      Intermediate: "text-blue-600 bg-blue-50 border-blue-100",
      Advanced: "text-violet-600 bg-violet-50 border-violet-100",
   };

   return (
      <div className="min-h-screen bg-white">

         {/* Hero */}
         <section className="bg-zinc-950 text-white">
            <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-24">
               <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Learning paths</p>
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-2xl mb-6">
                  A structured road to<br />
                  <span className="text-blue-400">your career goals.</span>
               </h1>
               <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                  No more wondering what to learn next. Our learning paths give you a clear, sequenced
                  curriculum — from your first lesson to job-ready skills.
               </p>
            </div>
         </section>

         {/* Paths */}
         <section className="py-24 bg-white">
            <div className="max-w-[1100px] mx-auto px-6 space-y-12">
               {paths.map((path, pi) => (
                  <div key={pi} className="border border-zinc-100 rounded-2xl overflow-hidden">

                     {/* Path header */}
                     <div className="bg-zinc-50 border-b border-zinc-100 px-8 py-6 flex items-start gap-5">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                           {path.icon}
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center justify-between gap-4 flex-wrap">
                              <h2 className="text-xl font-bold text-zinc-900">{path.title}</h2>
                              <span className="text-xs text-zinc-400 font-medium">{path.duration} total</span>
                           </div>
                           <p className="text-sm text-zinc-500 mt-1">{path.description}</p>
                        </div>
                     </div>

                     {/* Levels */}
                     <div className="divide-y divide-zinc-100">
                        {path.levels.map((level, li) => (
                           <div key={li} className="px-8 py-7 hover:bg-zinc-50 transition-colors">
                              <div className="flex items-center gap-3 mb-4">
                                 <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${levelColors[level.level]}`}
                                 >
                                    {level.level}
                                 </span>
                                 <span className="text-xs text-zinc-400">{level.duration}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                 {level.courses.map((course, ci) => (
                                    <span
                                       key={ci}
                                       className="text-sm text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-lg"
                                    >
                                       {course}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* How paths work */}
         <section className="py-24 bg-zinc-50">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="mb-12">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">How it works</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 max-w-md">
                     Progress at your own pace.
                  </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                  {[
                     {
                        n: "01",
                        title: "Pick a path",
                        desc: "Choose based on your goal — career switch, skill upgrade, or something new.",
                     },
                     {
                        n: "02",
                        title: "Start at your level",
                        desc: "No need to start from scratch. Jump in at beginner, intermediate, or advanced.",
                     },
                     {
                        n: "03",
                        title: "Advance and certify",
                        desc: "Complete each level to unlock the next. Earn a certificate when you finish.",
                     },
                  ].map((s) => (
                     <div key={s.n} className="bg-white p-8">
                        <p className="text-xs font-bold text-zinc-300 mb-4">{s.n}</p>
                        <h3 className="font-semibold text-zinc-900 mb-2">{s.title}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA */}
         <section className="bg-zinc-950 text-white py-20">
            <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Pick a path. Start today.</h2>
                  <p className="text-zinc-400 text-[15px]">Free access, forever. No commitments required.</p>
               </div>
               <Link
                  href="/register"
                  className="shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors text-sm"
               >
                  Get started free <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         </section>
      </div>
   );
};

export default LearningPathPage;
