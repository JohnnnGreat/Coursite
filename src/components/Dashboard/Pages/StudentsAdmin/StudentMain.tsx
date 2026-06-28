import React from "react";
import { getAllCoursesByUser } from "@/serverActions/course";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";

const StudentMain = async () => {
   const response = await getAllCoursesByUser();
   const courses = response.courses ?? [];
   const totalStudents = courses.reduce((s: number, c: any) => s + (c.enrollments?.length || 0), 0);

   return (
      <div className="p-6 space-y-6">
         {/* Header */}
         <div>
            <h1 className="text-xl font-bold text-zinc-900">Students</h1>
            <p className="text-sm text-zinc-400 mt-0.5">Overview of all students enrolled in your courses</p>
         </div>

         {/* Stats */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
               { label: "Total students", value: totalStudents, icon: <Users className="w-4 h-4" />, color: "text-blue-600 bg-blue-50" },
               { label: "Courses", value: courses.length, icon: <BookOpen className="w-4 h-4" />, color: "text-violet-600 bg-violet-50" },
               { label: "Avg. per course", value: courses.length ? Math.round(totalStudents / courses.length) : 0, icon: <TrendingUp className="w-4 h-4" />, color: "text-emerald-600 bg-emerald-50" },
               { label: "Completion rate", value: "—", icon: <Award className="w-4 h-4" />, color: "text-amber-600 bg-amber-50" },
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

         {/* Per-course breakdown */}
         <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-50">
               <h2 className="font-semibold text-zinc-900 text-sm">Enrollment by course</h2>
            </div>
            {courses.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Users className="w-10 h-10 text-zinc-200 mb-3" />
                  <p className="text-sm text-zinc-400">No courses yet. Create a course to see student data here.</p>
               </div>
            ) : (
               <div className="divide-y divide-zinc-50">
                  {courses.map((course: any, i: number) => {
                     const count = course.enrollments?.length || 0;
                     const maxCount = Math.max(...courses.map((c: any) => c.enrollments?.length || 0), 1);
                     const pct = Math.round((count / maxCount) * 100);
                     return (
                        <div key={i} className="px-5 py-4 hover:bg-zinc-50 transition-colors">
                           <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3 min-w-0">
                                 <div className="w-8 h-8 rounded-lg bg-zinc-100 overflow-hidden shrink-0">
                                    {course.imageUrl && (
                                       <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                                    )}
                                 </div>
                                 <div className="min-w-0">
                                    <p className="text-sm font-medium text-zinc-900 truncate">{course.title}</p>
                                    <p className="text-xs text-zinc-400">{course.category || "Uncategorized"}</p>
                                 </div>
                              </div>
                              <div className="text-right shrink-0 ml-4">
                                 <p className="text-sm font-bold text-zinc-900">{count}</p>
                                 <p className="text-xs text-zinc-400">students</p>
                              </div>
                           </div>
                           <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                              <div
                                 className="h-full bg-blue-600 rounded-full transition-all"
                                 style={{ width: `${pct}%` }}
                              />
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
         </div>
      </div>
   );
};

export default StudentMain;
