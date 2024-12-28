"use client";
import useCourseInformation, { CourseInfo } from "@/actions/courseActions";
import React, { useEffect } from "react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { MoreVerticalIcon, Plus } from "lucide-react";
import AltButtons from "./AltButtons";
import Link from "next/link";

const CoursesView = ({ courses }: { courses: CourseInfo[] }) => {
   const { setAuthorsCourses, filteredCourses } = useCourseInformation((state) => state);

   useEffect(() => {
      setAuthorsCourses(courses);
   }, [courses]);

   return (
      <>
         {Array.isArray(filteredCourses) && filteredCourses.length === 0 ? (
            <div className="flex items-center justify-center h-[400px] border-2 border-dashed">
               <div className="text-center p-6">
                  <Plus className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-[1.2rem] md:text-lg font-medium text-gray-900">
                     Create a new course
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new course</p>
                  <Link
                     href="/dashboard/courses/create"
                     className="mt-4 inline-block px-4 py-2 bg-black text-white rounded-lg hover:bg-black"
                  >
                     Create Course
                  </Link>
               </div>
            </div>
         ) : (
            <div>
               <h1 className="text-gray-500 mb-2">
                  {" "}
                  <span className="font-bold  text-black">{filteredCourses.length ?? 0} </span>
                  courses found
               </h1>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredCourses?.map((course: CourseInfo, idx: number) => (
                     <div
                        key={idx}
                        className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 relative bg-white"
                     >
                        <div>
                           <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzb-tHLTy_x3v4ZB57K-ufNqxXyHPT3AARmQ&s"
                              alt={`Image for ${course.title}`}
                              className="w-full rounded-md object-cover"
                           />
                           <div className="flex justify-between items-center mt-4">
                              <CardTitle className="text-lg font-semibold text-gray-800">
                                 {course.title}
                              </CardTitle>
                              <DropdownMenu>
                                 <DropdownMenuTrigger>
                                    <button
                                       className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                       aria-label="More options"
                                    >
                                       <MoreVerticalIcon className="text-gray-500" />
                                    </button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent className="w-48 shadow-lg">
                                    <DropdownMenuItem>Remove from page</DropdownMenuItem>
                                    <DropdownMenuItem>View Post</DropdownMenuItem>
                                    <DropdownMenuItem>View Post's Analytics</DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </div>
                           <CardDescription className="text-sm text-gray-600 mt-2 leading-relaxed">
                              {course.description}
                           </CardDescription>
                           <AltButtons courseInformation={course} />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </>
   );
};

export default CoursesView;
