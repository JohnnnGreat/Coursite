import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardHeader from "@/components/Dashboard/Pages/DashboardHeader";
import SideNav from "@/components/Dashboard/SideNav";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
   const session = await getServerSession(authOptions);
   if (!session?.user) redirect("/login");

   return (
      <div className="flex h-screen bg-zinc-50 overflow-hidden">
         {/* Sidebar */}
         <aside className="hidden md:flex flex-col w-[220px] shrink-0 bg-white border-r border-zinc-100 h-full">
            <SideNav userRole={session?.user?.role?.toUpperCase()} />
         </aside>

         {/* Main */}
         <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <DashboardHeader />
            <main className="flex-1 overflow-y-auto">
               {children}
            </main>
         </div>
      </div>
   );
};

export default layout;
