import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Users, Share2, Heart } from "lucide-react";

const CommunityPage = () => {
   const features = [
      {
         icon: <MessageCircle className="w-5 h-5" />,
         title: "Discussion forums",
         description:
            "Engage in deep, meaningful conversations with peers and experts across every discipline.",
      },
      {
         icon: <Users className="w-5 h-5" />,
         title: "Study groups",
         description:
            "Find your people. Join or create focused study groups to collaborate and stay accountable.",
      },
      {
         icon: <Share2 className="w-5 h-5" />,
         title: "Resource sharing",
         description:
            "Share articles, tools, and materials with the community — and discover what others are using.",
      },
      {
         icon: <Heart className="w-5 h-5" />,
         title: "Peer support",
         description:
            "Get real help from real people on your learning journey. The community has your back.",
      },
   ];

   const stats = [
      { number: "50K+", label: "Active members" },
      { number: "100+", label: "Study groups" },
      { number: "1,000+", label: "Daily discussions" },
      { number: "45+", label: "Countries represented" },
   ];

   return (
      <div className="min-h-screen bg-white">

         {/* Hero */}
         <section className="bg-zinc-950 text-white">
            <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-24">
               <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Community</p>
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-2xl mb-6">
                  Learning is better<br />
                  <span className="text-blue-400">together.</span>
               </h1>
               <p className="text-zinc-400 text-lg max-w-xl leading-relaxed mb-10">
                  Connect with tens of thousands of learners and educators from around the world. Ask
                  questions, share resources, and grow faster than you would alone.
               </p>
               <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors text-sm"
               >
                  Join the community <ArrowRight className="w-4 h-4" />
               </Link>
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

         {/* Features */}
         <section className="py-24 bg-white">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="mb-12">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">What you get</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 max-w-lg">
                     Built-in tools to connect and collaborate.
                  </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((f) => (
                     <div
                        key={f.title}
                        className="flex gap-5 p-7 border border-zinc-100 rounded-2xl hover:border-zinc-200 hover:shadow-sm transition-all"
                     >
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                           {f.icon}
                        </div>
                        <div>
                           <h3 className="font-semibold text-zinc-900 mb-1.5">{f.title}</h3>
                           <p className="text-sm text-zinc-500 leading-relaxed">{f.description}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Quote block */}
         <section className="py-24 bg-zinc-50">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="max-w-2xl mx-auto text-center">
                  <p className="text-2xl md:text-3xl font-medium text-zinc-900 leading-snug mb-8">
                     &ldquo;The study groups on Coursite kept me accountable when I was learning on my own.
                     I wouldn't have finished my course without them.&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-3">
                     <div className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center text-sm font-bold text-zinc-600">
                        K
                     </div>
                     <div className="text-left">
                        <p className="text-sm font-semibold text-zinc-900">Keiko Tanaka</p>
                        <p className="text-xs text-zinc-400">Data Science student</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA */}
         <section className="bg-zinc-950 text-white py-20">
            <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Find your people.</h2>
                  <p className="text-zinc-400 text-[15px]">Your community is already waiting. Come join the conversation.</p>
               </div>
               <Link
                  href="/register"
                  className="shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors text-sm"
               >
                  Join for free <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         </section>
      </div>
   );
};

export default CommunityPage;
