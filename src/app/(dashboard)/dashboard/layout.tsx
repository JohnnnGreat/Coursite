import DashboardHeader from "@/components/Dashboard/Pages/DashboardHeader";
import SideNav from "@/components/Dashboard/SideNav";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
   const session = await getServerSession();

   if (!session?.user) {
      redirect("/login");
   }

   return (
      <div className="flex gap-1 h-screen overflow-hidden">
         <div className="w-[300px] border-r px-[2rem]">
            <div className="h-[90px] flex items-center">
               <h1 className="text-[2rem] font-bold">Coursite.</h1>
            </div>
            <SideNav />
         </div>
         <div className="w-full overflow-y-scroll">
            <DashboardHeader />
            {children}
         </div>
      </div>
   );
};

export default layout;
