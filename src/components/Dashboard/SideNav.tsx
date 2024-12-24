"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Users, BarChart, Settings, GraduationCap } from "lucide-react";

const SideNav = ({ userRole = "INSTRUCTOR" }) => {
   const pathname = usePathname();

   const isActive = (path: string) => {
      if (path === "/dashboard") {
         return pathname === "/dashboard";
      }
      return pathname?.startsWith(path);
   };

   const instructorLinks = [
      {
         href: "/dashboard",
         label: "Overview",
         icon: LayoutDashboard,
      },
      {
         href: "/dashboard/courses",
         label: "My Courses",
         icon: BookOpen,
      },
      {
         href: "/dashboard/students",
         label: "Students",
         icon: Users,
      },
      {
         href: "/dashboard/analytics",
         label: "Analytics",
         icon: BarChart,
      },
   ];

   const studentLinks = [
      {
         href: "/dashboard",
         label: "My Learning",
         icon: GraduationCap,
      },
      {
         href: "/courses",
         label: "Browse Courses",
         icon: BookOpen,
      },
   ];

   const links = userRole === "INSTRUCTOR" ? instructorLinks : studentLinks;

   return (
      <nav className="space-y-1">
         {links.map((link) => {
            const Icon = link.icon;
            return (
               <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-[1rem] py-4 text-[.9rem] font-medium rounded-md transition-colors ${
                     isActive(link.href)
                        ? "bg-gray-50 text-black font-bold"
                        : "text-[#000000a0] hover:bg-gray-50 hover:text-gray-900"
                  }`}
               >
                  <Icon className="mr-3 h-5 w-5" />
                  {link.label}
               </Link>
            );
         })}

         <Link
            href="/settings"
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
               isActive("/settings")
                  ? "bg-gray-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
         >
            <Settings className="mr-3 h-5 w-5" />
            Settings
         </Link>
      </nav>
   );
};

export default SideNav;
