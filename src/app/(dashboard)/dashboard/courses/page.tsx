import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CoursesComponent from "@/components/Dashboard/Pages/Courses";
import MainPage from "@/components/Dashboard/Pages/StudentsCourses/MainPage";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";

const DashboardIndexPage = async () => {
   const session = await getServerSession(authOptions);

   if (session?.user?.role == "STUDENT") {
      return <MainPage />;
   } else {
      return <CoursesComponent />;
   }
};

export default DashboardIndexPage;
