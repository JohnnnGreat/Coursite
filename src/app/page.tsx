import { ArrowRight, Search, Star, Users, BookOpen, Award, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import FeaturedCourses from "@/components/SharedUi/Courses";

const categories = [
   { label: "Development", emoji: "💻" },
   { label: "Data Science", emoji: "📊" },
   { label: "Design", emoji: "🎨" },
   { label: "Marketing", emoji: "📣" },
   { label: "Business", emoji: "💼" },
   { label: "Photography", emoji: "📷" },
];

const trustedBy = ["Google", "Microsoft", "Stripe", "Shopify", "Airbnb", "Netflix"];

async function HomePage() {
   return (
      <>
         <title>Coursite — Learn anything. Teach everything.</title>
         <div className="min-h-screen bg-white">

            {/* Hero */}
            <section className="bg-zinc-950 text-white relative overflow-hidden">
               <div
                  className="absolute inset-0 opacity-[0.025]"
                  style={{
                     backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                     backgroundSize: "32px 32px",
                  }}
               />
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />

               <div className="relative max-w-[1100px] mx-auto px-6 pt-20 pb-16">
                  <div className="max-w-2xl">
                     <div className="flex items-center gap-2 mb-6">
                        <div className="flex -space-x-2">
                           {["A", "B", "C"].map((l) => (
                              <div key={l} className="w-7 h-7 rounded-full bg-zinc-700 border-2 border-zinc-950 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                                 {l}
                              </div>
                           ))}
                        </div>
                        <span className="text-zinc-400 text-sm">
                           Join <span className="text-white font-semibold">10,000+</span> learners already on Coursite
                        </span>
                     </div>

                     <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
                        Learn anything.<br />
                        <span className="text-blue-400">Teach everything.</span>
                     </h1>
                     <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg">
                        Free, world-class courses taught by real practitioners. No subscription,
                        no paywalls — just learning.
                     </p>

                     {/* Search bar */}
                     <div className="flex gap-2 mb-8 max-w-lg">
                        <div className="relative flex-1">
                           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                           <input
                              type="text"
                              placeholder="What do you want to learn?"
                              className="w-full bg-white text-zinc-900 text-sm pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                           />
                        </div>
                        <button className="bg-blue-600 text-white px-5 py-3.5 rounded-xl font-medium text-sm hover:bg-blue-500 transition-colors whitespace-nowrap">
                           Search
                        </button>
                     </div>

                     {/* Category pills */}
                     <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                           <Link
                              key={cat.label}
                              href="#courses"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700 text-zinc-300 text-xs hover:border-zinc-500 hover:text-white transition-colors"
                           >
                              <span>{cat.emoji}</span>
                              {cat.label}
                           </Link>
                        ))}
                     </div>
                  </div>

                  {/* Hero image */}
                  <div className="mt-14 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/60">
                     <img src="/sh.jpeg" alt="Coursite platform" className="w-full object-cover" />
                  </div>
               </div>
            </section>

            {/* Trusted by */}
            <section className="border-b border-zinc-100 py-6 bg-zinc-50">
               <div className="max-w-[1100px] mx-auto px-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                     <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest shrink-0">
                        Trusted by learners from
                     </span>
                     <div className="flex flex-wrap justify-center sm:justify-start gap-x-8 gap-y-2">
                        {trustedBy.map((c) => (
                           <span key={c} className="text-sm font-bold text-zinc-300">{c}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* Stats strip */}
            <section className="border-b border-zinc-100 bg-white">
               <div className="max-w-[1100px] mx-auto px-6 py-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {[
                        { value: "10K+", label: "Active learners", icon: <Users className="w-4 h-4" /> },
                        { value: "500+", label: "Free courses", icon: <BookOpen className="w-4 h-4" /> },
                        { value: "200+", label: "Expert instructors", icon: <Award className="w-4 h-4" /> },
                        { value: "50+", label: "Countries", icon: <Zap className="w-4 h-4" /> },
                     ].map((s) => (
                        <div key={s.label} className="flex items-center gap-3">
                           <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                              {s.icon}
                           </div>
                           <div>
                              <p className="text-xl font-bold text-zinc-900 leading-none">{s.value}</p>
                              <p className="text-xs text-zinc-400 mt-0.5">{s.label}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Featured Courses */}
            <div id="courses">
               <FeaturedCourses />
            </div>

            {/* Why Coursite */}
            <section className="py-24 bg-zinc-50">
               <div className="max-w-[1100px] mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                     <div>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Why Coursite</p>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6">
                           Learning the way it should be.
                        </h2>
                        <div className="space-y-5">
                           {[
                              { title: "100% free, always", desc: "Every course on Coursite is free to access. No trials, no upsells." },
                              { title: "Taught by practitioners", desc: "Instructors are working professionals, not just academics." },
                              { title: "Learn at your pace", desc: "Lifetime access to all courses. Come back whenever you're ready." },
                              { title: "Community-backed", desc: "Forums, study groups, and peer support built into every course." },
                           ].map((f) => (
                              <div key={f.title} className="flex gap-3">
                                 <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                 <div>
                                    <p className="font-semibold text-zinc-900 text-sm">{f.title}</p>
                                    <p className="text-sm text-zinc-500 mt-0.5">{f.desc}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <Link
                           href="/about"
                           className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                        >
                           Learn more about us <ArrowRight className="w-4 h-4" />
                        </Link>
                     </div>
                     <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-lg">
                        <img src="/creat.png" alt="Creating a course on Coursite" className="w-full object-cover" />
                     </div>
                  </div>
               </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white">
               <div className="max-w-[1100px] mx-auto px-6">
                  <div className="mb-12">
                     <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Reviews</p>
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                        What our learners say.
                     </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                        {
                           quote: "The JavaScript bootcamp was better than any paid course I've taken. The projects are real and the community always helps when you're stuck.",
                           name: "Marcus T.",
                           role: "Frontend Developer",
                           rating: 5,
                        },
                        {
                           quote: "I went from zero Python knowledge to building my own data pipelines in three months. Completely free, completely worth it.",
                           name: "Priya S.",
                           role: "Data Analyst",
                           rating: 5,
                        },
                        {
                           quote: "The UI/UX course helped me land my first design contract. The Figma sections especially are gold — I rewatch them constantly.",
                           name: "Emeka O.",
                           role: "Freelance Designer",
                           rating: 5,
                        },
                     ].map((t) => (
                        <div key={t.name} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6">
                           <div className="flex mb-4">
                              {[...Array(t.rating)].map((_, i) => (
                                 <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                              ))}
                           </div>
                           <p className="text-zinc-700 text-sm leading-relaxed mb-5">
                              &ldquo;{t.quote}&rdquo;
                           </p>
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
                                 {t.name[0]}
                              </div>
                              <div>
                                 <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                                 <p className="text-xs text-zinc-400">{t.role}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Teach CTA */}
            <section className="py-20 bg-zinc-50 border-y border-zinc-100">
               <div className="max-w-[1100px] mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">For instructors</p>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
                           Share what you know with the world.
                        </h2>
                        <p className="text-zinc-500 text-[15px] leading-relaxed mb-6">
                           Build your course once, teach thousands of students forever. Our creator tools
                           make it easy to get started in an afternoon.
                        </p>
                        <Link
                           href="/teaching"
                           className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-zinc-700 transition-colors"
                        >
                           Start teaching <ArrowRight className="w-4 h-4" />
                        </Link>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        {[
                           { value: "200+", label: "Active instructors" },
                           { value: "500+", label: "Courses published" },
                           { value: "10K+", label: "Students reached" },
                           { value: "Free", label: "To get started" },
                        ].map((s) => (
                           <div key={s.label} className="bg-white border border-zinc-100 rounded-2xl p-5">
                              <p className="text-3xl font-bold text-zinc-900">{s.value}</p>
                              <p className="text-sm text-zinc-400 mt-1">{s.label}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* Final CTA */}
            <section className="bg-zinc-950 text-white py-24">
               <div className="max-w-[1100px] mx-auto px-6 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                     Your next skill is one click away.
                  </h2>
                  <p className="text-zinc-400 mb-8 max-w-md mx-auto text-[15px]">
                     No credit card. No subscription. Just learning.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                     <Link
                        href="/register"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl font-medium hover:bg-blue-500 transition-colors text-sm"
                     >
                        Create free account <ArrowRight className="w-4 h-4" />
                     </Link>
                     <Link
                        href="#courses"
                        className="inline-flex items-center justify-center border border-zinc-700 text-zinc-300 px-7 py-3.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors text-sm"
                     >
                        Browse courses first
                     </Link>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
}

export default HomePage;
