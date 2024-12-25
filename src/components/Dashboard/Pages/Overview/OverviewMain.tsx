import { getAllCoursesByUser } from "@/serverActions/course";
import React from "react";
import Category from "./Charts/Category";

const OverviewMain = async () => {
   const response = await getAllCoursesByUser();
   const courses = response.courses;

   return (
      <div>
         <h1>Course Analytics</h1>
         <Category categoryData={courses} />
      </div>
   );
};

export default OverviewMain;
