"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Users, Star, Share2, Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { enrollCourse } from "@/serverActions/course";
import userState from "@/actions/userActions";
import Link from "next/link";

// Types
interface CourseCardProps {
   _id: string;
   title: string;
   imageUrl: string;
   category: string;
   level: string;
   price: number;
   lessons: number;
   authorId: {
      name: string;
      avatar: string;
   };
   enrollments: string[];
}

interface LoadingState {
   enroll: boolean;
   bookmark: boolean;
   share: boolean;
}

// Components
const CourseImage: React.FC<{
   imageUrl: string;
   title: string;
   level: string;
   isEnrolled: boolean;
}> = ({ imageUrl, title, level, isEnrolled }) => (
   <div className="relative aspect-video overflow-hidden">
      <img
         src={imageUrl || "/api/placeholder/400/225"}
         alt={title}
         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      {isEnrolled && (
         <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
               Enrolled
            </span>
         </div>
      )}
      <div className="absolute top-3 right-3">
         <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full">
            {level}
         </span>
      </div>
   </div>
);

const ActionButtons: React.FC<{
   isBookmarked: boolean;
   isLoading: LoadingState;
   onBookmark: () => void;
   onShare: (platform: string) => void;
}> = ({ isBookmarked, isLoading, onBookmark, onShare }) => {
   const shareOptions = [
      { name: "Twitter", action: "twitter" },
      { name: "Facebook", action: "facebook" },
      { name: "LinkedIn", action: "linkedin" },
      { name: "WhatsApp", action: "whatsapp" },
      { name: "Email", action: "email" },
      { name: "Copy Link", action: "copy" },
   ];

   return (
      <div className="flex gap-2">
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <button
                     onClick={onBookmark}
                     disabled={isLoading.bookmark}
                     className="p-1.5 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                     {isLoading.bookmark ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                     ) : isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-blue-600" />
                     ) : (
                        <Bookmark className="w-4 h-4 text-gray-600" />
                     )}
                  </button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>{isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>

         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <DropdownMenu>
                     <DropdownMenuTrigger
                        disabled={isLoading.share}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                     >
                        {isLoading.share ? (
                           <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                           <Share2 className="w-4 h-4 text-gray-600" />
                        )}
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        align="end"
                        className="w-40"
                     >
                        {shareOptions.map((option) => (
                           <DropdownMenuItem
                              key={option.action}
                              onClick={() => onShare(option.action)}
                           >
                              {option.name}
                           </DropdownMenuItem>
                        ))}
                     </DropdownMenuContent>
                  </DropdownMenu>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Share this course</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>
   );
};

const CourseStats: React.FC<{
   enrollmentsCount: number;
   lessonsCount: number;
}> = ({ enrollmentsCount, lessonsCount }) => (
   <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-1 text-sm text-gray-600">
         <Users className="w-4 h-4" />
         <span>{enrollmentsCount || 0}</span>
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-600">
         <BookOpen className="w-4 h-4" />
         <span>{lessonsCount || 0} lessons</span>
      </div>
   </div>
);

// Main Component
const CourseCard: React.FC<CourseCardProps> = ({
   _id,
   title,
   imageUrl,
   category,
   level,
   price,
   lessons,
   authorId,
   enrollments,
}) => {
   const [isBookmarked, setIsBookmarked] = useState(false);
   const [isEnrolled, setIsEnrolled] = useState(false);
   const [isLoading, setIsLoading] = useState<LoadingState>({
      enroll: false,
      bookmark: false,
      share: false,
   });
   const { user } = userState((state) => state);

   const handleEnroll = async () => {
      try {
         setIsLoading((prev) => ({ ...prev, enroll: true }));
         const response = await enrollCourse(_id);
         console.log(response);
      } catch (error) {
         console.error("Enrollment failed:", error);
      } finally {
         setIsLoading((prev) => ({ ...prev, enroll: false }));
      }
   };

   const handleBookmark = async () => {
      try {
         setIsLoading((prev) => ({ ...prev, bookmark: true }));
         await new Promise((resolve) => setTimeout(resolve, 500));
         setIsBookmarked(!isBookmarked);
      } catch (error) {
         console.error("Bookmark failed:", error);
      } finally {
         setIsLoading((prev) => ({ ...prev, bookmark: false }));
      }
   };

   const handleShare = async (platform: string) => {
      setIsLoading((prev) => ({ ...prev, share: true }));
      try {
         switch (platform) {
            case "copy":
               await navigator.clipboard.writeText(window.location.href);
               break;
            case "twitter":
               window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                     window.location.href,
                  )}&text=${encodeURIComponent(title)}`,
               );
               break;
         }
      } catch (error) {
         console.error("Share failed:", error);
      } finally {
         setIsLoading((prev) => ({ ...prev, share: false }));
      }
   };

   useEffect(() => {
      console.log("user", user);
      console.log("enrollments", enrollments, "id", user?.id);
      setIsEnrolled(enrollments.includes(user?.id));
   }, [enrollments, user?.id]);

   return (
      <div
         className={`group bg-white rounded-xl border transition-all duration-300 overflow-hidden
      ${isEnrolled ? "border-blue-200 bg-blue-50/30" : "border-gray-200 hover:shadow-lg"}`}
      >
         <CourseImage
            imageUrl={imageUrl}
            title={title}
            level={level}
            isEnrolled={isEnrolled}
         />

         <div className="p-5">
            <div className="flex items-center justify-between mb-3">
               <span className="bg-gray-100 text-xs px-2.5 py-1 rounded-full">{category}</span>
               <ActionButtons
                  isBookmarked={isBookmarked}
                  isLoading={isLoading}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
               />
            </div>

            <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-blue-600 transition-colors">
               {title}
            </h3>

            <div className="flex items-center gap-2 mb-4">
               <img
                  src={authorId?.avatar || "/api/placeholder/32/32"}
                  alt={authorId?.name}
                  className="w-6 h-6 rounded-full"
               />
               <span className="text-sm text-gray-600">{authorId?.name}</span>
            </div>

            <CourseStats
               enrollmentsCount={enrollments?.length}
               lessonsCount={lessons}
            />

            <div className="flex items-center justify-between pt-4 border-t">
               <span className="text-xl font-bold">${price?.toLocaleString()}</span>
               {isEnrolled ? (
                  <Link
                     href={`/dashboard/courses/${_id}`}
                     className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                  >
                     Continue Learning
                  </Link>
               ) : (
                  <button
                     onClick={handleEnroll}
                     disabled={isLoading.enroll}
                     className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {isLoading.enroll ? (
                        <div className="flex items-center gap-2">
                           <Loader2 className="w-4 h-4 animate-spin" />
                           Enrolling...
                        </div>
                     ) : (
                        "Enroll Now"
                     )}
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default CourseCard;
