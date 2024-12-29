import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search, X, Clock, Loader2 } from "lucide-react";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import debounce from "lodash/debounce";
import { CourseInfo } from "@/actions/courseActions";


interface CourseSearchProps {
   courses: CourseInfo[];
   onCourseSelect?: (course: CourseInfo) => void;
   className?: string;
}

const MAX_RECENT_SEARCHES = 5;

const CourseSearch: React.FC<CourseSearchProps> = ({ courses, onCourseSelect, className }) => {
   const [open, setOpen] = useState<boolean>(false);
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [filteredCourses, setFilteredCourses] = useState<CourseInfo[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [recentSearches, setRecentSearches] = useState<string[]>(() => {
      const saved = localStorage.getItem("recentSearches");
      return saved ? JSON.parse(saved) : [];
   });


   const highlightText = (text: string, query: string) => {
      if (!query) return text;
      const parts = text.split(new RegExp(`(${query})`, "gi"));
      return (
         <span>
            {parts.map((part, i) =>
               part.toLowerCase() === query.toLowerCase() ? (
                  <span
                     key={i}
                     className="bg-blue-100 text-blue-900"
                  >
                     {part}
                  </span>
               ) : (
                  part
               ),
            )}
         </span>
      );
   };

   // Debounced search function
   const debouncedSearch = useMemo(
      () =>
         debounce((query: string) => {
            setIsLoading(true);
            const filtered = courses.filter(
               (course) =>
                  course.title?.toLowerCase().includes(query.toLowerCase()) ||
                  course.description?.toLowerCase().includes(query.toLowerCase()) ||
                  course.category?.toLowerCase().includes(query.toLowerCase()),
            );
            setFilteredCourses(filtered);
            setIsLoading(false);
         }, 300),
      [courses],
   );

   useEffect(() => {
      if (searchQuery) {
         debouncedSearch(searchQuery);
      } else {
         setFilteredCourses([]);
      }
      return () => {
         debouncedSearch.cancel();
      };
   }, [searchQuery, debouncedSearch]);

   // Save recent searches to localStorage
   const addToRecentSearches = (query: string) => {
      if (!query) return;
      const newRecent = [query, ...recentSearches.filter((item) => item !== query)].slice(
         0,
         MAX_RECENT_SEARCHES,
      );
      setRecentSearches(newRecent);
      localStorage.setItem("recentSearches", JSON.stringify(newRecent));
   };

   // Format date for display
   const formatDate = (date?: Date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
         year: "numeric",
      });
   };

   return (
      <div className={cn("relative w-full", className)}>
         <Popover
            open={open}
            onOpenChange={setOpen}
         >
            <PopoverTrigger asChild>
               <button className="w-full flex items-center gap-2 px-3 py-2 border rounded-lg text-left text-gray-500 hover:border-blue-500">
                  <Search className="h-4 w-4" />
                  <span>{searchQuery || "Search courses..."}</span>
               </button>
            </PopoverTrigger>
            <PopoverContent
               className="w-full p-0"
               align="start"
            >
               <Command>
                  <CommandInput
                     value={searchQuery}
                     onValueChange={setSearchQuery}
                     placeholder="Type to search..."
                     className="border-none focus:ring-0"
                  />
                  <CommandList>
                     <CommandEmpty className="py-6 text-center text-sm">
                        {isLoading ? (
                           <div className="flex items-center justify-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Searching...
                           </div>
                        ) : (
                           "No courses found."
                        )}
                     </CommandEmpty>

                     {!searchQuery && recentSearches.length > 0 && (
                        <CommandGroup heading="Recent Searches">
                           {recentSearches.map((query, index) => (
                              <CommandItem
                                 key={index}
                                 value={`recent-${query}`}
                                 onSelect={() => {
                                    setSearchQuery(query);
                                 }}
                                 className="flex items-center gap-2 py-2"
                              >
                                 <Clock className="h-4 w-4 text-gray-400" />
                                 <span>{query}</span>
                              </CommandItem>
                           ))}
                        </CommandGroup>
                     )}

                     {filteredCourses.length > 0 && (
                        <CommandGroup heading="Courses">
                           {filteredCourses.map((course) => (
                              <CommandItem
                                 key={course.id}
                                 value={course.title}
                                 onSelect={() => {
                                    onCourseSelect?.(course);
                                    addToRecentSearches(searchQuery);
                                    setOpen(false);
                                    setSearchQuery("");
                                 }}
                                 className="flex items-center justify-between py-3"
                              >
                                 <div className="flex flex-col gap-1">
                                    <span className="font-medium">
                                       {highlightText(course.title || "", searchQuery)}
                                    </span>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                       <span>{course.category}</span>
                                       <span>•</span>
                                       <span>{course.level}</span>
                                    </div>
                                    {course.description && (
                                       <span className="text-sm text-gray-500 line-clamp-1">
                                          {highlightText(course.description, searchQuery)}
                                       </span>
                                    )}
                                    <span className="text-xs text-gray-400">
                                       Last updated: {formatDate(course.updatedAt)}
                                    </span>
                                 </div>
                                 <div className="flex flex-col items-end gap-2">
                                    <Badge variant={course.draft ? "secondary" : "default"}>
                                       {course.draft ? "Draft" : "Published"}
                                    </Badge>
                                 </div>
                              </CommandItem>
                           ))}
                        </CommandGroup>
                     )}
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>
      </div>
   );
};

export default CourseSearch;
