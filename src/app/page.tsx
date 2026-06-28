import { ArrowRight, BookOpen, Users, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import FeaturedCourses from "@/components/SharedUi/Courses";

async function HomePage() {
   return (
      <>
         <title>Coursite — Share Knowledge, Transform Lives</title>
         <div className="min-h-screen bg-white">

            {/* Hero */}
            <section className="bg-zinc-950 text-white relative overflow-hidden">
               <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                     backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                     backgroundSize: "40px 40px",
                  }}
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/50" />

               <div className="relative max-w-[1100px] mx-auto px-6 pt-24 pb-32">
                  <div className="max-w-3xl">
                     <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 uppercase tracking-widest mb-8 border border-zinc-800 rounded-full px-4 py-1.5">
                        Free courses · Global community
                     </span>
                     <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                        Where knowledge becomes your{" "}
                        <span className="text-blue-400">edge.</span>
                     </h1>
                     <p className="text-lg text-zinc-400 max-w-xl leading-relaxed mb-10">
                        Create and share courses with thousands of learners worldwide — no paywalls,
                        no gatekeeping. Just learning.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                           href="/dashboard"
                           className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors text-sm"
                        >
                           Start teaching free <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                           href="#courses"
                           className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 px-6 py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors text-sm"
                        >
                           Explore courses
                        </Link>
                     </div>
                  </div>

                  <div className="mt-20 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/50">
                     <img src="/sh.jpeg" alt="Coursite platform" className="w-full object-cover" />
                  </div>
               </div>
            </section>

            {/* Social proof strip */}
            <section className="border-b border-zinc-100 bg-zinc-50">
               <div className="max-w-[1100px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-8">
                  {[
                     { value: "10K+", label: "Active learners" },
                     { value: "500+", label: "Free courses" },
                     { value: "200+", label: "Expert instructors" },
                     { value: "50+", label: "Countries" },
                  ].map((s) => (
                     <div key={s.label} className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-zinc-900">{s.value}</span>
                        <span className="text-sm text-zinc-500">{s.label}</span>
                     </div>
                  ))}
               </div>
            </section>

            {/* Why Coursite */}
            <section className="py-24 bg-white">
               <div className="max-w-[1100px] mx-auto px-6">
                  <div className="mb-14">
                     <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Why Coursite</p>
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 max-w-lg">
                        Built for people who take learning seriously.
                     </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
                     {[
                        {
                           icon: <BookOpen className="w-5 h-5" />,
                           title: "Rich course tools",
                           desc: "Build engaging courses with video, quizzes, and structured lessons using an intuitive creator.",
                        },
                        {
                           icon: <Users className="w-5 h-5" />,
                           title: "Thriving community",
                           desc: "Connect with thousands of instructors and learners. Collaborate, discuss, and grow together.",
                        },
                        {
                           icon: <Zap className="w-5 h-5" />,
                           title: "Always free",
                           desc: "All courses are free to access. Zero financial barriers between you and your next skill.",
                        },
                     ].map((f) => (
                        <div key={f.title} className="bg-white p-8 hover:bg-zinc-50 transition-colors">
                           <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-5">
                              {f.icon}
                           </div>
                           <h3 className="font-semibold text-zinc-900 mb-2">{f.title}</h3>
                           <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* How it works */}
            <section className="py-24 bg-zinc-50">
               <div className="max-w-[1100px] mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                     <div>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">How it works</p>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-10">
                           From idea to course in three steps.
                        </h2>
                        <div className="space-y-8">
                           {[
                              {
                                 n: "01",
                                 title: "Create your course",
                                 desc: "Design your curriculum and upload content using our easy-to-use course builder.",
                              },
                              {
                                 n: "02",
                                 title: "Publish and share",
                                 desc: "Go live instantly. Your course is discoverable by learners from day one.",
                              },
                              {
                                 n: "03",
                                 title: "Engage and grow",
                                 desc: "Interact with students through discussions, feedback, and live Q&A sessions.",
                              },
                           ].map((step) => (
                              <div key={step.n} className="flex gap-6">
                                 <span className="text-xs font-bold text-zinc-300 pt-1 w-6 shrink-0">{step.n}</span>
                                 <div>
                                    <h3 className="font-semibold text-zinc-900 mb-1">{step.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-lg">
                        <img src="/creat.png" alt="Course creation" className="w-full object-cover" />
                     </div>
                  </div>
               </div>
            </section>

            {/* Featured Courses */}
            <div id="courses">
               <FeaturedCourses />
            </div>

            {/* Testimonials */}
            <section className="py-24 bg-zinc-50">
               <div className="max-w-[1100px] mx-auto px-6">
                  <div className="mb-14">
                     <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Testimonials</p>
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                        What our community says.
                     </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[
                        {
                           quote: "The platform completely changed how I think about online education. The tools are intuitive and the community is genuinely supportive.",
                           name: "Alex Rivera",
                           role: "Full-Stack Developer",
                        },
                        {
                           quote: "I published my first course in a weekend. The experience was smooth and the student engagement has been incredible since day one.",
                           name: "Priya Sharma",
                           role: "UX Designer & Instructor",
                        },
                     ].map((t) => (
                        <div
                           key={t.name}
                           className="bg-white border border-zinc-100 rounded-2xl p-8"
                        >
                           <p className="text-zinc-700 leading-relaxed mb-6 text-[15px]">
                              &ldquo;{t.quote}&rdquo;
                           </p>
                           <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
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

            {/* CTA */}
            <section className="bg-zinc-950 text-white py-24">
               <div className="max-w-[1100px] mx-auto px-6 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                     Ready to start learning?
                  </h2>
                  <p className="text-zinc-400 mb-8 max-w-md mx-auto text-[15px]">
                     Join thousands of learners and instructors. Free access, forever.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                     <Link
                        href="/register"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors text-sm"
                     >
                        Create free account <ArrowRight className="w-4 h-4" />
                     </Link>
                     <Link
                        href="/about"
                        className="inline-flex items-center justify-center border border-zinc-700 text-zinc-300 px-6 py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors text-sm"
                     >
                        Learn more about us
                     </Link>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
}

export default HomePage;
