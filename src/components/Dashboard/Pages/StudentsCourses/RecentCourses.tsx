import React, { useState } from "react";
import { getRecentCourses } from "@/serverActions/course";
import CourseCard from "./MainCourseCard";

const RecentCourses = async () => {
   const recentCourses = await getRecentCourses();

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold md:text-3xl">Recent Courses</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
         </div>

         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentCourses?.courses.map((course, idx) => (
               <CourseCard
                  key={course.id || idx}
                  course={course}
               />
            ))}
         </div>
      </div>
   );
};

export default RecentCourses;
