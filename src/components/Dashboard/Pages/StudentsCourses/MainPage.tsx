import React from "react";
import RecentCourses from "@/components/Dashboard/Pages/StudentsCourses/RecentCourses";
import SearchCourses from "./SearchCourses";
const MainPage = () => {
   return (
      <div>
         <SearchCourses />
         <RecentCourses />
      </div>
   );
};

export default MainPage;
