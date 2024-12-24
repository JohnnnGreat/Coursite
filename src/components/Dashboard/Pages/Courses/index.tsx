import React from "react";
import {
   Search,
   Plus,
  
} from "lucide-react";
import { getAllCoursesByUser } from "@/serverActions/course";
import Link from "next/link";
import CoursesView from "./CoursesView";
import FilteredCourses from "./FilteredCourses";

const CoursesComponent = async () => {
   const response = await getAllCoursesByUser();
   const courses = response.courses;

   return (
      <div className="space-y-6 p-6">
         {/* Header Section */}
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Courses</h1>
            <Link
               href="/dashboard/courses/create"
               className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-[10px] hover:bg-[#000]/70"
            >
               <Plus className="h-5 w-5" />
               Create Course
            </Link>
         </div>
         <FilteredCourses />
         <CoursesView courses={courses} />
      </div>
   );
};

export default CoursesComponent;
