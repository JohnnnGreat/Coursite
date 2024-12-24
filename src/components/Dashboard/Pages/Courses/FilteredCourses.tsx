"use client";
import useCourseInformation from "@/actions/courseActions";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseSearch from "./CourseSearch";

const FilteredCourses = () => {
   const [filterState, setFilterState] = useState("all"); // 'all' | 'draft' | 'published'

   const { setAuthorsCourses, filteredCourses, filterCourses, courses } = useCourseInformation(
      (state) => state,
   );

   console.log(courses);
   const handleFilterChange = (value: string) => {
      setFilterState(value);

      switch (value) {
         case "draft":
            filterCourses({ isDraft: true });
            break;
         case "published":
            filterCourses({ isPublished: true });
            break;
         default:
            // Reset filters
            filterCourses({});
      }
   };

   const handleCourseSelect = (course) => {
      // Handle course selection - maybe navigate to course details
      console.log("Selected course:", course);
   };

   return (
      <>
         {/* Search and Filter Bar */}
         <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
               <CourseSearch
                  courses={courses}
                  onCourseSelect={handleCourseSelect}
                  className="flex-grow"
               />
            </div>
            <div className="flex gap-2">
               <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  Filter
               </button>
               <Select
                  value={filterState}
                  onValueChange={handleFilterChange}
               >
                  <SelectTrigger>
                     <SelectValue placeholder="Filter courses" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Courses</SelectItem>
                     <SelectItem value="draft">Drafts</SelectItem>
                     <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>
         {filterState === "all" && <h1 className="font-bold text-xl">All Courses</h1>}
         {filterState === "draft" && <h1 className="font-bold text-xl">Your Drafts</h1>}
         {filterState === "published" && <h1 className="font-bold text-xl">Published</h1>}
      </>
   );
};

export default FilteredCourses;
