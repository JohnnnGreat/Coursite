"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Search, Filter, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { filterCourses } from "@/serverActions/course";

export default function SearchCourses() {
   // States for filters
   const [filters, setFilters] = useState({
      search: "",
      categories: [],
      levels: [],
      priceRange: [0, 100],
      duration: [],
      sort: "popular",
   });

   const [activeFilters, setActiveFilters] = useState([]);

   // Toggle filter selection
   const toggleFilter = (type: string, value: string | any) => {
      setFilters((prev) => {
         const current = prev[type];
         const updated = current.includes(value)
            ? current.filter((item: any) => item !== value)
            : [...current, value];
         return { ...prev, [type]: updated };
      });
   };

   const [filterResults, setFilterResults] = useState([]);

   useEffect(() => {
      async function filterResults() {
         const results = await filterCourses({
            search: filters?.search,
            categories: filters?.categories,
            levels: filters?.levels,
            priceRange: {
               min: 0,
               max: 10000,
            },
            //  sortBy: selectedSort,
            //  page: currentPage,
            //  limit: 12,
         });
         console.log(results?.courses);
         if (results?.courses.length > 0) {
            setFilterResults(results?.courses);
         } else {
            setFilterResults([]);
         }
      }
      filterResults();
   }, [filters]);
   return (
      <div className="max-w-7xl mx-auto p-6">
         {/* Main Search Bar with Filters */}
         <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div>
               <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <input
                        type="text"
                        value={filters.search}
                        onChange={(e) =>
                           setFilters((prev) => ({ ...prev, search: e.target.value }))
                        }
                        placeholder="Search for courses..."
                        className="w-full pl-12 pr-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                     />
                  </div>

                  {/* Mobile Filter Button */}
                  <Dialog>
                     <DialogTrigger className="md:hidden px-4 py-3 border rounded-xl hover:bg-gray-50">
                        <SlidersHorizontal className="w-5 h-5" />
                     </DialogTrigger>
                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>Filters</DialogTitle>
                        </DialogHeader>
                        {/* Mobile Filter Content */}
                        {/* ... Similar to desktop dropdowns but in a modal ... */}
                     </DialogContent>
                  </Dialog>
               </div>
               {/* <div className="p-[1rem] border rounded-[10px] mt-[.5rem]">
                  <h1>Search Results</h1>
                  <div>
                     {filterResults.map((item) => (
                        <div>
                           <h1 className="font-bold">{item?.title}</h1>
                           <p className="text-[.7rem] text-gray-500">{item.description}</p>
                           <p>{item?.enrollments?.length} enrollmens</p>
                        </div>
                     ))}
                  </div>
               </div> */}
            </div>

            {/* Filter Buttons Row */}
            <div className="hidden md:flex items-center gap-4">
               {/* Category Filter */}
               <DropdownMenu>
                  <DropdownMenuTrigger className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                     <span>Category</span>
                     <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-4">
                     <div className="space-y-2">
                        {["Web Development", "Design", "Business", "Marketing"].map((category) => (
                           <label
                              key={category}
                              className="flex items-center space-x-2"
                           >
                              <input
                                 type="checkbox"
                                 checked={filters.categories.includes(category)}
                                 onChange={() => toggleFilter("categories", category)}
                                 className="rounded border-gray-300"
                              />
                              <span className="text-sm">{category}</span>
                           </label>
                        ))}
                     </div>
                  </DropdownMenuContent>
               </DropdownMenu>

               {/* Level Filter */}
               <DropdownMenu>
                  <DropdownMenuTrigger className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                     <span>Level</span>
                     <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 p-4">
                     <div className="space-y-2">
                        {["Beginner", "Intermediate", "Advanced"].map((level) => (
                           <label
                              key={level}
                              className="flex items-center space-x-2"
                           >
                              <input
                                 type="checkbox"
                                 checked={filters.levels.includes(level)}
                                 onChange={() => toggleFilter("levels", level)}
                                 className="rounded border-gray-300"
                              />
                              <span className="text-sm">{level}</span>
                           </label>
                        ))}
                     </div>
                  </DropdownMenuContent>
               </DropdownMenu>

               {/* Price Range Filter */}
               <DropdownMenu>
                  <DropdownMenuTrigger className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                     <span>Price</span>
                     <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-4">
                     <Slider
                        value={filters.priceRange}
                        onValueChange={(value) =>
                           setFilters((prev) => ({ ...prev, priceRange: value }))
                        }
                        max={100}
                        step={1}
                        className="w-full"
                     />
                     <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                     </div>
                  </DropdownMenuContent>
               </DropdownMenu>

               {/* Duration Filter */}
               <DropdownMenu>
                  <DropdownMenuTrigger className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                     <span>Duration</span>
                     <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 p-4">
                     <div className="space-y-2">
                        {["0-2 hours", "3-6 hours", "6-12 hours", "12+ hours"].map((duration) => (
                           <label
                              key={duration}
                              className="flex items-center space-x-2"
                           >
                              <input
                                 type="checkbox"
                                 checked={filters.duration.includes(duration)}
                                 onChange={() => toggleFilter("duration", duration)}
                                 className="rounded border-gray-300"
                              />
                              <span className="text-sm">{duration}</span>
                           </label>
                        ))}
                     </div>
                  </DropdownMenuContent>
               </DropdownMenu>

               {/* Sort Dropdown */}
               <DropdownMenu>
                  <DropdownMenuTrigger className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                     <span>Sort by</span>
                     <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem
                        onClick={() => setFilters((prev) => ({ ...prev, sort: "popular" }))}
                     >
                        Most Popular
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => setFilters((prev) => ({ ...prev, sort: "rated" }))}
                     >
                        Highest Rated
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => setFilters((prev) => ({ ...prev, sort: "newest" }))}
                     >
                        Newest
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => setFilters((prev) => ({ ...prev, sort: "price-asc" }))}
                     >
                        Price: Low to High
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => setFilters((prev) => ({ ...prev, sort: "price-desc" }))}
                     >
                        Price: High to Low
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
               {Object.entries(filters).map(([key, value]) => {
                  if (Array.isArray(value) && value.length > 0) {
                     return value.map((item) => (
                        <div
                           key={`${key}-${item}`}
                           className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                           <span>{item}</span>
                           <button
                              onClick={() => toggleFilter(key, item)}
                              className="hover:text-blue-900"
                           >
                              <X className="w-4 h-4" />
                           </button>
                        </div>
                     ));
                  }
                  return null;
               })}
               {filters.priceRange[0] !== 0 || filters.priceRange[1] !== 100 ? (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                     <span>
                        ${filters.priceRange[0]} - ${filters.priceRange[1]}
                     </span>
                     <button
                        onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 100] }))}
                        className="hover:text-blue-900"
                     >
                        <X className="w-4 h-4" />
                     </button>
                  </div>
               ) : null}
            </div>
         </div>
      </div>
   );
}
