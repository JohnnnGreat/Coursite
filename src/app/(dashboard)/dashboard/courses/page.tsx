import CoursesComponent from "@/components/Dashboard/Pages/Courses";
import MainPage from "@/components/Dashboard/Pages/StudentsCourses/MainPage";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";

const DashboardIndexPage = async () => {
   const session = await getServerSession();

   const s = await getSession();
   console.log("s", s);
   console.log(session);
   if (session?.user?.role !== "student") {
      return <MainPage />;
   } else {
      return <CoursesComponent />;
   }
};

export default DashboardIndexPage;
