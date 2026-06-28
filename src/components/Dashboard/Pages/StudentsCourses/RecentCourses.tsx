import { getRecentCourses } from "@/serverActions/course";
import { Star, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function RecentCourses() {
   const { courses } = await getRecentCourses();

   const levelColor: Record<string, string> = {
      Beginner: "text-emerald-700 bg-emerald-50",
      Intermediate: "text-blue-700 bg-blue-50",
      Advanced: "text-violet-700 bg-violet-50",
   };

   return (
      <div className="p-6 space-y-5">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="font-bold text-zinc-900 text-lg">Available courses</h2>
               <p className="text-sm text-zinc-400 mt-0.5">Explore and enroll for free</p>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-500 flex items-center gap-1">
               View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {courses?.map((course: any) => (
               <div
                  key={course._id}
                  className="bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-zinc-200 transition-all group"
               >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-100">
                     <img
                        src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-1 rounded-md">FREE</span>
                     </div>
                     {course.level && (
                        <div className="absolute top-3 right-3">
                           <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${levelColor[course.level] || "text-zinc-600 bg-zinc-50"}`}>
                              {course.level}
                           </span>
                        </div>
                     )}
                  </div>

                  <div className="p-4">
                     {course.category && (
                        <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-1.5">
                           {course.category}
                        </p>
                     )}
                     <h3 className="font-bold text-zinc-900 text-sm leading-snug mb-1 line-clamp-2">
                        {course.title}
                     </h3>
                     <p className="text-xs text-zinc-400 mb-3">
                        by {course.authorId?.name || "Instructor"}
                     </p>

                     {/* Rating */}
                     <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                           {[1,2,3,4,5].map((s) => (
                              <Star key={s} className={`w-3 h-3 ${s <= 4 ? "fill-amber-400 text-amber-400" : "fill-zinc-200 text-zinc-200"}`} />
                           ))}
                        </div>
                        <span className="text-xs font-semibold text-zinc-700">4.8</span>
                        <span className="text-xs text-zinc-400">({course.enrollments?.length || 0})</span>
                     </div>

                     <div className="flex items-center justify-between pt-3 border-t border-zinc-50">
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
      </div>
   );
}
