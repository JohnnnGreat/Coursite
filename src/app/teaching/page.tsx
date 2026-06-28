import React from "react";
import Link from "next/link";
import { ArrowRight, PenLine, Globe, DollarSign, Clock } from "lucide-react";

const TeachPage = () => {
   const benefits = [
      {
         icon: <PenLine className="w-5 h-5" />,
         title: "Share your expertise",
         description:
            "Transform what you know into a structured course that reaches students everywhere in the world.",
      },
      {
         icon: <Globe className="w-5 h-5" />,
         title: "Build your audience",
         description:
            "Connect with a growing global community of learners who are ready to learn from you right now.",
      },
      {
         icon: <DollarSign className="w-5 h-5" />,
         title: "Earn while you teach",
         description:
            "Unlock multiple revenue streams through premium content and direct engagement with your students.",
      },
      {
         icon: <Clock className="w-5 h-5" />,
         title: "On your schedule",
         description:
            "You set the pace and timeline. Create when you want, teach how you want — full creative control.",
      },
   ];

   const steps = [
      {
         n: "01",
         title: "Apply to teach",
         desc: "Complete a quick application. We review every submission personally.",
      },
      {
         n: "02",
         title: "Build your course",
         desc: "Use our intuitive course builder to structure lessons, add content, and set quizzes.",
      },
      {
         n: "03",
         title: "Go live",
         desc: "Publish your course and start reaching students from day one.",
      },
   ];

   return (
      <div className="min-h-screen bg-white">

         {/* Hero */}
         <section className="bg-zinc-950 text-white">
            <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-24">
               <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Become an instructor</p>
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-2xl mb-6">
                  Teach what you know.<br />
                  <span className="text-blue-400">Impact thousands.</span>
               </h1>
               <p className="text-zinc-400 text-lg max-w-xl leading-relaxed mb-10">
                  Join hundreds of instructors who have turned their expertise into courses that learners around
                  the world rely on.
               </p>
               <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors text-sm"
               >
                  Start teaching today <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         </section>

         {/* Benefits */}
         <section className="py-24 bg-white">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="mb-12">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Why teach with us</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 max-w-lg">
                     Everything you need to succeed as an instructor.
                  </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((b) => (
                     <div
                        key={b.title}
                        className="flex gap-5 p-7 border border-zinc-100 rounded-2xl hover:border-zinc-200 hover:shadow-sm transition-all"
                     >
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                           {b.icon}
                        </div>
                        <div>
                           <h3 className="font-semibold text-zinc-900 mb-1.5">{b.title}</h3>
                           <p className="text-sm text-zinc-500 leading-relaxed">{b.description}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Steps */}
         <section className="py-24 bg-zinc-50">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="mb-12">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">How to get started</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                     Three steps to your first course.
                  </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                  {steps.map((step) => (
                     <div key={step.n} className="bg-white p-8">
                        <p className="text-xs font-bold text-zinc-300 mb-5">{step.n}</p>
                        <h3 className="font-semibold text-zinc-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Instructor quote */}
         <section className="py-24 bg-white">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="bg-zinc-950 text-white rounded-2xl p-10 md:p-14">
                  <p className="text-xl md:text-2xl leading-relaxed text-zinc-200 mb-8 max-w-2xl">
                     &ldquo;I had no idea how to package what I knew into a course. Coursite made the whole
                     process simple — and I had students enrolled within the first week.&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300">
                        T
                     </div>
                     <div>
                        <p className="font-semibold text-white text-sm">Tobi Adeyemi</p>
                        <p className="text-xs text-zinc-400">Backend Engineering Instructor</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA */}
         <section className="bg-zinc-950 text-white py-20">
            <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Ready to share what you know?</h2>
                  <p className="text-zinc-400 text-[15px]">It takes less than an hour to publish your first course.</p>
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

export default TeachPage;
