"use client";
import useCourseInformation from "@/actions/courseActions";
import { Search } from "lucide-react";
import React, { useState } from "react";

const tabs = [
   { value: "all", label: "All" },
   { value: "published", label: "Published" },
   { value: "draft", label: "Drafts" },
];

const FilteredCourses = () => {
   const [active, setActive] = useState("all");
   const [search, setSearch] = useState("");
   const { filterCourses } = useCourseInformation((state) => state);

   const handleTab = (value: string) => {
      setActive(value);
      if (value === "draft") filterCourses({ isDraft: true });
      else if (value === "published") filterCourses({ isPublished: true });
      else filterCourses({});
   };

   return (
      <div className="flex flex-col sm:flex-row gap-3">
         {/* Tab filter */}
         <div className="flex items-center gap-1 bg-zinc-100 rounded-xl p-1">
            {tabs.map((tab) => (
               <button
                  key={tab.value}
                  onClick={() => handleTab(tab.value)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                     active === tab.value
                        ? "bg-white text-zinc-900 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700"
                  }`}
               >
                  {tab.label}
               </button>
            ))}
         </div>

         {/* Search */}
         <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
               type="text"
               placeholder="Search your courses…"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder:text-zinc-300"
            />
         </div>
      </div>
   );
};

export default FilteredCourses;
