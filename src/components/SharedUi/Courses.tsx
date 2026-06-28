import { getRecentCourses } from "@/serverActions/course";
import { Star, Users, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const levelColor: Record<string, string> = {
   Beginner: "text-emerald-700 bg-emerald-50 border-emerald-200",
   Intermediate: "text-blue-700 bg-blue-50 border-blue-200",
   Advanced: "text-violet-700 bg-violet-50 border-violet-200",
};

const FeaturedCourses = async () => {
   const { courses } = await getRecentCourses();

   if (!courses?.length) return null;

   return (
      <section className="py-24 bg-white">
         <div className="max-w-[1100px] mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
               <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Courses</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                     Start learning today.
                  </h2>
               </div>
               <Link
                  href="/dashboard/courses"
                  className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
               >
                  Browse all <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {courses.map((course, i) => (
                  <div
                     key={i}
                     className="group border border-zinc-100 rounded-2xl overflow-hidden hover:border-zinc-200 hover:shadow-md transition-all bg-white flex flex-col"
                  >
                     {/* Thumbnail */}
                     <div className="relative overflow-hidden aspect-video bg-zinc-100">
                        <img
                           src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"}
                           alt={course.title}
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                           <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-1 rounded-md uppercase tracking-wide">
                              Free
                           </span>
                        </div>
                        {course.level && (
                           <div className="absolute top-3 right-3">
                              <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${levelColor[course.level] || "text-zinc-600 bg-zinc-50 border-zinc-200"}`}>
                                 {course.level}
                              </span>
                           </div>
                        )}
                     </div>

                     {/* Content */}
                     <div className="p-5 flex flex-col flex-1">
                        {course.category && (
                           <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                              {course.category}
                           </p>
                        )}
                        <h3 className="font-bold text-zinc-900 text-[15px] leading-snug mb-1 line-clamp-2">
                           {course.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mb-3">
                           by {course.authorId?.name || "Coursite Instructor"}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mb-3">
                           <div className="flex">
                              {[1, 2, 3, 4, 5].map((s) => (
                                 <Star
                                    key={s}
                                    className={`w-3.5 h-3.5 ${s <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-200 text-amber-200"}`}
                                 />
                              ))}
                           </div>
                           <span className="text-xs font-semibold text-zinc-700">4.8</span>
                           <span className="text-xs text-zinc-400">
                              ({(course.enrollments?.length || 0) > 0
                                 ? `${course.enrollments.length.toLocaleString()} students`
                                 : "New"})
                           </span>
                        </div>

                        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                           {course.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                           <div className="flex items-center gap-1 text-xs text-zinc-400">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{(course.sections?.length || 0) * 3} lessons</span>
                           </div>
                           <Link
                              href="/register"
                              className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                           >
                              Enroll free →
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="mt-8 text-center md:hidden">
               <Link
                  href="/dashboard/courses"
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
               >
                  Browse all courses <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         </div>
      </section>
   );
};

export default FeaturedCourses;
