import OverviewMain from "@/components/Dashboard/Pages/Overview/OverviewMain";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardIndexPage = async () => {
   const session = await getServerSession();

   if (session?.user?.role == "STUDENT") {
      return redirect("/dashboard/learning");
   } else {
      return <OverviewMain />;
   }
};

export default DashboardIndexPage;
