import { getAllCoursesByUser } from "@/serverActions/course";
import React from "react";
import Category from "./Charts/Category";

const OverviewMain = async () => {
   const response = await getAllCoursesByUser();
   const courses = response.courses;
   console.log(courses);
   const category = courses?.prerequisites;

   console.log(category);

   return <div>{/* <Category categoryData={category} /> */}</div>;
};

export default OverviewMain;
