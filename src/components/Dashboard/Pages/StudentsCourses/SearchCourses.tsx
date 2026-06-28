"use client";
import React, { useState, useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { filterCourses } from "@/serverActions/course";

const CATEGORIES = ["Development", "Data Science", "Design", "Marketing", "Business"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function SearchCourses() {
   const [search, setSearch] = useState("");
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
   const [showFilters, setShowFilters] = useState(false);

   const toggleItem = (arr: string[], item: string, setter: (v: string[]) => void) => {
      setter(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
   };

   const hasActiveFilters = selectedCategories.length > 0 || selectedLevels.length > 0;

   const clearAll = () => {
      setSelectedCategories([]);
      setSelectedLevels([]);
      setSearch("");
   };

   return (
      <div className="px-6 pt-6 space-y-4">
         {/* Search row */}
         <div className="flex gap-3">
            <div className="relative flex-1">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
               <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for courses, instructors, topics…"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder:text-zinc-300"
               />
               {search && (
                  <button
                     onClick={() => setSearch("")}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500"
                  >
                     <X className="w-4 h-4" />
                  </button>
               )}
            </div>
            <button
               onClick={() => setShowFilters(!showFilters)}
               className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  showFilters || hasActiveFilters
                     ? "bg-zinc-900 text-white border-zinc-900"
                     : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
               }`}
            >
               <SlidersHorizontal className="w-4 h-4" />
               Filters
               {hasActiveFilters && (
                  <span className="bg-blue-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                     {selectedCategories.length + selectedLevels.length}
                  </span>
               )}
            </button>
         </div>

         {/* Filter panel */}
         {showFilters && (
            <div className="bg-white border border-zinc-100 rounded-2xl p-5 space-y-5">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                     <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Category</p>
                     <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                           <button
                              key={cat}
                              onClick={() => toggleItem(selectedCategories, cat, setSelectedCategories)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                 selectedCategories.includes(cat)
                                    ? "bg-blue-600 text-white"
                                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                              }`}
                           >
                              {cat}
                           </button>
                        ))}
                     </div>
                  </div>
                  <div>
                     <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Level</p>
                     <div className="flex flex-wrap gap-2">
                        {LEVELS.map((lvl) => (
                           <button
                              key={lvl}
                              onClick={() => toggleItem(selectedLevels, lvl, setSelectedLevels)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                 selectedLevels.includes(lvl)
                                    ? "bg-blue-600 text-white"
                                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                              }`}
                           >
                              {lvl}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
               {hasActiveFilters && (
                  <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-600 font-medium">
                     Clear all filters
                  </button>
               )}
            </div>
         )}
      </div>
   );
}
