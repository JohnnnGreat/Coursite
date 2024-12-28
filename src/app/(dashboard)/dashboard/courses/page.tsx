import CoursesComponent from "@/components/Dashboard/Pages/Courses";
import MainPage from "@/components/Dashboard/Pages/StudentsCourses/MainPage";
import { getServerSession } from "next-auth";
import React from "react";

const DashboardIndexPage = async () => {
   const session = await getServerSession();

   if (session?.user?.role !== "instructor") {
      return <MainPage />;
   } else {
      return <CoursesComponent />;
   }
};

export default DashboardIndexPage;
