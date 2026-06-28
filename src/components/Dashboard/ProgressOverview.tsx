import { getStudentEnrolledCourses } from "@/serverActions/course";
import { BookOpen, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const ProgressOverview = async () => {
   const { courses } = await getStudentEnrolledCourses();

   return (
      <div className="p-6 space-y-6">
         {/* Header */}
         <div>
            <h1 className="text-xl font-bold text-zinc-900">My Learning</h1>
            <p className="text-sm text-zinc-400 mt-0.5">Track your progress across all enrolled courses</p>
         </div>

         {/* Stats */}
         <div className="grid grid-cols-3 gap-4">
            {[
               { label: "Enrolled", value: courses.length, icon: <BookOpen className="w-4 h-4" />, color: "text-blue-600 bg-blue-50" },
               { label: "In progress", value: courses.length, icon: <Clock className="w-4 h-4" />, color: "text-amber-600 bg-amber-50" },
               { label: "Completed", value: 0, icon: <CheckCircle2 className="w-4 h-4" />, color: "text-emerald-600 bg-emerald-50" },
            ].map((s) => (
               <div key={s.label} className="bg-white border border-zinc-100 rounded-xl p-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                     {s.icon}
                  </div>
                  <p className="text-2xl font-bold text-zinc-900">{s.value}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{s.label}</p>
               </div>
            ))}
         </div>

         {/* Courses */}
         {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white border-2 border-dashed border-zinc-200 rounded-2xl text-center">
               <BookOpen className="w-10 h-10 text-zinc-200 mb-3" />
               <h3 className="font-semibold text-zinc-900 mb-1">No courses yet</h3>
               <p className="text-sm text-zinc-400 mb-5">Browse our catalog and enroll in your first course</p>
               <Link
                  href="/dashboard/courses"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm px-5 py-2.5 rounded-xl font-medium hover:bg-blue-500 transition-colors"
               >
                  Browse courses <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         ) : (
            <div className="space-y-3">
               <h2 className="font-semibold text-zinc-900">Active courses</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course: any) => {
                     const progress = 20;
                     return (
                        <div
                           key={course._id}
                           className="bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-sm hover:border-zinc-200 transition-all group"
                        >
                           {/* Thumbnail */}
                           <div className="relative aspect-video overflow-hidden bg-zinc-100">
                              <img
                                 src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"}
                                 alt={course.title}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {/* Progress overlay */}
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                                 <div
                                    className="h-full bg-blue-500"
                                    style={{ width: `${progress}%` }}
                                 />
                              </div>
                           </div>

                           <div className="p-4">
                              {course.category && (
                                 <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-1">
                                    {course.category}
                                 </p>
                              )}
                              <h3 className="font-semibold text-zinc-900 text-sm leading-snug mb-1 line-clamp-1">
                                 {course.title}
                              </h3>
                              {course.level && (
                                 <p className="text-xs text-zinc-400 mb-3">{course.level}</p>
                              )}

                              {/* Progress bar */}
                              <div className="mb-3">
                                 <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-xs text-zinc-400">Progress</span>
                                    <span className="text-xs font-semibold text-zinc-700">{progress}%</span>
                                 </div>
                                 <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                    <div
                                       className="h-full bg-blue-600 rounded-full transition-all"
                                       style={{ width: `${progress}%` }}
                                    />
                                 </div>
                              </div>

                              <div className="flex items-center justify-between">
                                 <span className="text-xs text-zinc-400">
                                    {course.sections?.length || 0} sections
                                 </span>
                                 <Link
                                    href={`/dashboard/courses/${course._id}`}
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                                 >
                                    Continue →
                                 </Link>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
};

export default ProgressOverview;
