import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OverviewMain from "@/components/Dashboard/Pages/Overview/OverviewMain";
import StudentsOverview from "@/components/Dashboard/StudentsOverview";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardIndexPage = async () => {
   const session = await getServerSession(authOptions);
   console.log("jk", session?.user);

   if (session?.user?.role == "STUDENT") {
      return <StudentsOverview />;
   } else {
      return <OverviewMain />;
   }
};

export default DashboardIndexPage;
