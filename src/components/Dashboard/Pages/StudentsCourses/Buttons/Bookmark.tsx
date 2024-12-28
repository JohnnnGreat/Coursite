"use client";
import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
const BookmarkButton = ({ course }) => {
   const [isBookmarked, setIsBookmarked] = useState(false);

   const handleBookmark = async () => {
      setIsBookmarked(!isBookmarked);
      // Implement bookmark logic
      console.log("Toggling bookmark for course:", course?.id);
   };
   return (
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
   );
};

export default BookmarkButton;
