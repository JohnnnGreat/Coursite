"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
   LayoutDashboard,
   BookOpen,
   Users,
   BarChart,
   Settings,
   GraduationCap,
   Menu,
   X,
} from "lucide-react";

const DashboardNav = ({ userRole }: { userRole: string }) => {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const pathname = usePathname();

   const isActive = (path) => {
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
         label: "Courses",
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
      {
         href: "/settings",
         label: "Settings",
         icon: Settings,
      },
   ];

   const studentLinks = [
      {
         href: "/dashboard",
         label: "Learning",
         icon: GraduationCap,
      },
      {
         href: "/dashboard/courses",
         label: "Courses",
         icon: BookOpen,
      },
      {
         href: "/dashboard/settings",
         label: "Settings",
         icon: Settings,
      },
   ];

   const links = userRole === "INSTRUCTOR" ? instructorLinks : studentLinks;

   const NavLink = ({ link, isMobile = false }) => {
      const Icon = link.icon;
      return (
         <Link
            href={link.href}
            className={`flex items-center transition-colors ${
               isMobile
                  ? `flex-col justify-center text-xs p-1 w-full ${
                       isActive(link.href) ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                    }`
                  : `px-4 py-3 rounded-lg mx-2 ${
                       isActive(link.href)
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
         >
            <Icon className={`${isMobile ? "h-6 w-6 mb-1" : "h-5 w-5 mr-3"}`} />
            <span className={`${isMobile ? "text-center" : "font-medium"}`}>{link.label}</span>
         </Link>
      );
   };

   return (
      <>
         {/* Desktop Sidebar */}
         <nav className="hidden md:flex flex-col h-screen bg-white  border-gray-200">
            <div className="space-y-1">
               {links.map((link) => (
                  <NavLink
                     key={link.href}
                     link={link}
                  />
               ))}
            </div>
         </nav>

         {/* Mobile Bottom Navigation */}
         <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white z-[40] border-t border-gray-200 px-2 py-2">
            <div className="flex justify-around items-center">
               {links.slice(0, 4).map((link) => (
                  <NavLink
                     key={link.href}
                     link={link}
                     isMobile={true}
                  />
               ))}
            </div>
         </nav>
      </>
   );
};

export default DashboardNav;
