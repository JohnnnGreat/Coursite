import React from "react";
import StudentsSide from "./StudentsSide";
import { getAllCoursesByUser } from "@/serverActions/course";

const StudentMain = async () => {
   const response = await getAllCoursesByUser();
   const courses = response.courses;
   return (
      <div className="flex h-full">
         <div className="w-[300px] border-r">
            <StudentsSide courses={courses} />
         </div>

         <main className="w-full">Students Main</main>
      </div>
   );
};

export default StudentMain;
