import React from "react";
import { Plus, BookOpen } from "lucide-react";
import { getAllCoursesByUser } from "@/serverActions/course";
import Link from "next/link";
import CoursesView from "./CoursesView";
import FilteredCourses from "./FilteredCourses";

const CoursesComponent = async () => {
   const response = await getAllCoursesByUser();
   const courses = response.courses ?? [];
   const published = courses.filter((c: any) => c.published).length;
   const drafts = courses.filter((c: any) => c.draft).length;

   return (
      <div className="p-6 space-y-6">
         {/* Page header */}
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-xl font-bold text-zinc-900">My Courses</h1>
               <p className="text-sm text-zinc-400 mt-0.5">
                  {courses.length} total · {published} published · {drafts} drafts
               </p>
            </div>
            <Link
               href="/dashboard/courses/create"
               className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm px-4 py-2.5 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
            >
               <Plus className="h-4 w-4" />
               New course
            </Link>
         </div>

         {/* Stats strip */}
         <div className="grid grid-cols-3 gap-4">
            {[
               { label: "Total", value: courses.length, color: "text-zinc-900" },
               { label: "Published", value: published, color: "text-emerald-600" },
               { label: "Drafts", value: drafts, color: "text-amber-600" },
            ].map((s) => (
               <div key={s.label} className="bg-white border border-zinc-100 rounded-xl p-4">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{s.label}</p>
               </div>
            ))}
         </div>

         <FilteredCourses />
         <CoursesView courses={courses} />
      </div>
   );
};

export default CoursesComponent;
