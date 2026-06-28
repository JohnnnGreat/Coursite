import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AboutPage = () => {
   const stats = [
      { number: "100K+", label: "Active learners" },
      { number: "1,000+", label: "Expert instructors" },
      { number: "500+", label: "Free courses" },
      { number: "50+", label: "Countries" },
   ];

   const values = [
      {
         title: "Excellence",
         description:
            "Every course on Coursite meets a rigorous quality standard. We believe learners deserve the best, always.",
      },
      {
         title: "Community",
         description:
            "Learning is social. We build tools and spaces that bring instructors and students closer together.",
      },
      {
         title: "Accessibility",
         description:
            "Knowledge shouldn't have a price tag. All content on Coursite is free — no exceptions.",
      },
      {
         title: "Innovation",
         description:
            "We constantly improve the platform based on what learners and instructors actually need.",
      },
   ];

   const team = [
      { name: "Jordan Lee", role: "Co-founder & CEO" },
      { name: "Maria Santos", role: "Head of Product" },
      { name: "David Kim", role: "Lead Engineer" },
      { name: "Aisha Patel", role: "Community Lead" },
   ];

   return (
      <div className="min-h-screen bg-white">

         {/* Hero */}
         <section className="bg-zinc-950 text-white">
            <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-24">
               <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">About Coursite</p>
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-2xl mb-6">
                  Education for everyone, everywhere.
               </h1>
               <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                  We started with a simple conviction: great education should be accessible to any person,
                  in any place, at any time. That hasn't changed.
               </p>
            </div>
         </section>

         {/* Stats */}
         <section className="border-b border-zinc-100 bg-zinc-50">
            <div className="max-w-[1100px] mx-auto px-6 py-12">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((s) => (
                     <div key={s.label}>
                        <p className="text-4xl font-bold text-zinc-900 mb-1">{s.number}</p>
                        <p className="text-sm text-zinc-500">{s.label}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Story */}
         <section className="py-24 bg-white">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div>
                     <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our story</p>
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-8">
                        Built from frustration with how education works.
                     </h2>
                  </div>
                  <div className="space-y-5 text-zinc-600 text-[15px] leading-relaxed">
                     <p>
                        Founded in 2023, Coursite emerged from a simple but powerful observation: the best
                        knowledge often lives in people, not institutions. Experts, practitioners, and
                        passionate learners all had something to teach — but no great place to do it.
                     </p>
                     <p>
                        We built Coursite to change that. Today we host a global community of educators and
                        students united by curiosity and a belief that learning never stops.
                     </p>
                     <p>
                        We're still early. But the vision has never been clearer — and the community keeps
                        pushing us forward every single day.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Values */}
         <section className="py-24 bg-zinc-50">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="mb-12">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our values</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                     What we stand for.
                  </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                  {values.map((v) => (
                     <div key={v.title} className="bg-white p-8 hover:bg-zinc-50 transition-colors">
                        <h3 className="text-lg font-semibold text-zinc-900 mb-2">{v.title}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">{v.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Team */}
         <section className="py-24 bg-white">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="mb-12">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">The team</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                     People behind the platform.
                  </h2>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {team.map((member) => (
                     <div key={member.name} className="group">
                        <div className="w-full aspect-square bg-zinc-100 rounded-2xl mb-4 flex items-center justify-center text-3xl font-bold text-zinc-400 group-hover:bg-zinc-200 transition-colors">
                           {member.name[0]}
                        </div>
                        <p className="font-semibold text-zinc-900 text-sm">{member.name}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{member.role}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA */}
         <section className="bg-zinc-950 text-white py-20">
            <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Want to be part of this?</h2>
                  <p className="text-zinc-400 text-[15px]">Join as a learner, an instructor, or both.</p>
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

export default AboutPage;
