"use client";
import useCourseInformation, { CourseInfo } from "@/actions/courseActions";
import React, { useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus, CheckCircle2, Clock, Users, Edit, Trash2, BarChart2 } from "lucide-react";
import { deleteCourse } from "@/serverActions/course";
import Link from "next/link";

const CoursesView = ({ courses }: { courses: CourseInfo[] }) => {
   const { setAuthorsCourses, filteredCourses } = useCourseInformation((state) => state);

   useEffect(() => {
      setAuthorsCourses(courses);
   }, [courses]);

   if (!Array.isArray(filteredCourses) || filteredCourses.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-zinc-200 rounded-2xl bg-white">
            <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center mb-4">
               <Plus className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 mb-1">No courses yet</h3>
            <p className="text-sm text-zinc-400 mb-6">Create your first course to get started</p>
            <Link
               href="/dashboard/courses/create"
               className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm px-5 py-2.5 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
            >
               <Plus className="h-4 w-4" />
               Create a course
            </Link>
         </div>
      );
   }

   return (
      <div className="space-y-3">
         <p className="text-sm text-zinc-400">
            Showing <span className="font-semibold text-zinc-700">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? "s" : ""}
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredCourses.map((course: CourseInfo, idx: number) => (
               <div
                  key={idx}
                  className="bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-zinc-200 transition-all group"
               >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-100">
                     <img
                        src={course?.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute top-3 left-3">
                        {course.published ? (
                           <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-500 text-white px-2 py-1 rounded-lg">
                              <CheckCircle2 className="w-3 h-3" /> Live
                           </span>
                        ) : (
                           <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-400 text-white px-2 py-1 rounded-lg">
                              <Clock className="w-3 h-3" /> Draft
                           </span>
                        )}
                     </div>
                     <div className="absolute top-3 right-3">
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <button className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                                 <MoreVertical className="w-3.5 h-3.5 text-zinc-600" />
                              </button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuItem asChild>
                                 <Link href={`/dashboard/courses/${course._id}`} className="flex items-center gap-2 text-sm cursor-pointer">
                                    <Edit className="w-3.5 h-3.5 text-zinc-400" /> Edit course
                                 </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer">
                                 <BarChart2 className="w-3.5 h-3.5 text-zinc-400" /> View analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 onClick={() => deleteCourse(course._id)}
                                 className="flex items-center gap-2 text-sm text-red-500 focus:text-red-500 cursor-pointer"
                              >
                                 <Trash2 className="w-3.5 h-3.5" /> Delete
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                     {course.category && (
                        <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-1.5">
                           {course.category}
                        </p>
                     )}
                     <h3 className="font-semibold text-zinc-900 text-sm leading-snug mb-1 line-clamp-2">
                        {course.title}
                     </h3>
                     <p className="text-xs text-zinc-400 line-clamp-2 mb-4">{course.description}</p>

                     <div className="flex items-center justify-between pt-3 border-t border-zinc-50">
                        <div className="flex items-center gap-1 text-xs text-zinc-400">
                           <Users className="w-3.5 h-3.5" />
                           <span>{(course as any).enrollments?.length || 0} students</span>
                        </div>
                        <span className="text-xs font-semibold text-zinc-700">
                           {course.price === "0" || !course.price ? "Free" : `$${course.price}`}
                        </span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default CoursesView;
