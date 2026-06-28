import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SuccessStoriesPage = () => {
   const stories = [
      {
         name: "Sarah Johnson",
         role: "Web Developer at Google",
         course: "Full Stack Development",
         story:
            "After completing the full-stack path, I landed my dream job at Google. The hands-on projects and structured curriculum made all the difference in my interview preparation.",
         achievement: "Secured a role at a top-tier tech company",
      },
      {
         name: "Michael Chen",
         role: "Data Scientist",
         course: "Data Science Bootcamp",
         story:
            "I moved from a finance background to data science in just six months. The learning path was clear, the content was current, and the community kept me going when things got tough.",
         achievement: "Successful career pivot in 6 months",
      },
      {
         name: "Emma Davis",
         role: "Freelance Designer",
         course: "UI/UX Design",
         story:
            "The design skills I built on Coursite gave me the confidence to go freelance. I now work with clients worldwide and my income has more than tripled since I started.",
         achievement: "Built a six-figure freelance business",
      },
   ];

   const metrics = [
      { number: "89%", label: "Job placement rate" },
      { number: "94%", label: "Course completion rate" },
      { number: "3×", label: "Average salary increase" },
      { number: "45", label: "Days to first job offer (avg.)" },
   ];

   return (
      <div className="min-h-screen bg-white">

         {/* Hero */}
         <section className="bg-zinc-950 text-white">
            <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-24">
               <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Success stories</p>
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-2xl mb-6">
                  Real people.<br />
                  <span className="text-blue-400">Real results.</span>
               </h1>
               <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                  These aren't highlight reels — they're honest accounts from learners who put in the work
                  and came out transformed on the other side.
               </p>
            </div>
         </section>

         {/* Metrics */}
         <section className="border-b border-zinc-100 bg-zinc-50">
            <div className="max-w-[1100px] mx-auto px-6 py-12">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {metrics.map((m) => (
                     <div key={m.label}>
                        <p className="text-4xl font-bold text-zinc-900 mb-1">{m.number}</p>
                        <p className="text-sm text-zinc-500">{m.label}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Stories */}
         <section className="py-24 bg-white">
            <div className="max-w-[1100px] mx-auto px-6 space-y-8">
               {stories.map((story, i) => (
                  <div
                     key={story.name}
                     className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 border border-zinc-100 rounded-2xl p-8 hover:border-zinc-200 hover:shadow-sm transition-all"
                  >
                     <div>
                        <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-xl font-bold text-zinc-500 mb-4">
                           {story.name[0]}
                        </div>
                        <p className="font-semibold text-zinc-900 text-sm">{story.name}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{story.role}</p>
                        <p className="text-xs text-blue-600 mt-3 font-medium">{story.course}</p>
                     </div>
                     <div className="flex flex-col justify-between gap-6">
                        <p className="text-zinc-700 text-[15px] leading-relaxed">
                           &ldquo;{story.story}&rdquo;
                        </p>
                        <div className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 bg-zinc-50 px-4 py-2 rounded-full w-fit border border-zinc-100">
                           <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                           {story.achievement}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* CTA */}
         <section className="bg-zinc-950 text-white py-20">
            <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Write your own story.</h2>
                  <p className="text-zinc-400 text-[15px]">Your next chapter starts with a single course.</p>
               </div>
               <Link
                  href="/register"
                  className="shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors text-sm"
               >
                  Start learning free <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         </section>
      </div>
   );
};

export default SuccessStoriesPage;
