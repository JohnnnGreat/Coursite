import CreateCourse from "@/components/Dashboard/Pages/Courses/CreateCourse";
import { getSession } from "next-auth/react";
import React from "react";

const CreateCoursePage = async () => {
   return <CreateCourse />;
};

export default CreateCoursePage;
