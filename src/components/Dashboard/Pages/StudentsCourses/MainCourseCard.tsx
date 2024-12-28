"use client";

import React, { useState } from "react";
import { BookOpen, Users, Star, Share2, Bookmark, BookmarkCheck } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CourseCard = ({ course }: any) => {
   const [isBookmarked, setIsBookmarked] = useState(false);

   const handleEnroll = async () => {
      // Implement enrollment logic
      console.log("Enrolling in course:", course?.id);
   };

   const handleBookmark = async () => {
      setIsBookmarked(!isBookmarked);
      // Implement bookmark logic
      console.log("Toggling bookmark for course:", course?.id);
   };

   const handleShare = async (platform: string) => {
      // Implement share logic
      console.log("Sharing via:", platform);
   };

   return (
      <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
         <div className="relative aspect-video overflow-hidden">
            <img
               src={course?.imageUrl || "/api/placeholder/400/225"}
               alt={course?.title}
               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 flex gap-2">
               <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full">
                  {course?.level}
               </span>
            </div>
         </div>

         <div className="p-5">
            <div className="flex items-center justify-between mb-3">
               <span className="bg-gray-100 text-xs px-2.5 py-1 rounded-full">
                  {course?.category}
               </span>
               <div className="flex gap-2">
                  <button
                     onClick={handleBookmark}
                     className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                     aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                  >
                     {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-blue-600" />
                     ) : (
                        <Bookmark className="w-4 h-4 text-gray-600" />
                     )}
                  </button>

                  <DropdownMenu>
                     <DropdownMenuTrigger className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                        <Share2 className="w-4 h-4 text-gray-600" />
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        align="end"
                        className="w-40"
                     >
                        <DropdownMenuItem onClick={() => handleShare("twitter")}>
                           Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("facebook")}>
                           Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                           LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("copy")}>
                           Copy Link
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>

            <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-blue-600 transition-colors">
               {course?.title}
            </h3>

            <div className="flex items-center gap-2 mb-4">
               <img
                  src={course?.authorId?.avatar || "/api/placeholder/32/32"}
                  alt={course?.authorId?.name}
                  className="w-6 h-6 rounded-full"
               />
               <span className="text-sm text-gray-600">{course?.authorId?.name}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
               <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{course?.enrollments?.length || 0}</span>
               </div>
               <div className="flex items-center gap-1 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>{course?.lessons || 0} lessons</span>
               </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
               <span className="text-xl font-bold">${course?.price?.toLocaleString()}</span>
               <button
                  onClick={handleEnroll}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
               >
                  Enroll Now
               </button>
            </div>
         </div>
      </div>
   );
};

export default CourseCard;
