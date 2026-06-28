"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
   LayoutDashboard,
   BookOpen,
   Users,
   BarChart2,
   Settings,
   GraduationCap,
   FileText,
} from "lucide-react";

const DashboardNav = ({ userRole }: { userRole: string }) => {
   const pathname = usePathname();

   const isActive = (path: string) => {
      if (path === "/dashboard") return pathname === "/dashboard";
      return pathname?.startsWith(path);
   };

   const instructorLinks = [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
      { href: "/dashboard/students", label: "Students", icon: Users },
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
      { href: "/dashboard/files", label: "Files", icon: FileText },
      { href: "/settings", label: "Settings", icon: Settings },
   ];

   const studentLinks = [
      { href: "/dashboard", label: "My Learning", icon: GraduationCap },
      { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
   ];

   const links = userRole === "INSTRUCTOR" ? instructorLinks : studentLinks;

   return (
      <>
         {/* Desktop Sidebar */}
         <nav className="hidden md:flex flex-col h-full py-4">
            {/* Logo */}
            <Link href="/" className="px-5 mb-6 block">
               <span className="text-lg font-bold text-zinc-900 tracking-tight">
                  Coursite<span className="text-blue-600">.</span>
               </span>
            </Link>

            <div className="flex-1 space-y-0.5 px-3">
               {links.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                     <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                           active
                              ? "bg-zinc-900 text-white"
                              : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                        }`}
                     >
                        <Icon className="h-4 w-4 shrink-0" />
                        {link.label}
                     </Link>
                  );
               })}
            </div>

            {/* Bottom help link */}
            <div className="px-3 mt-4">
               <Link
                  href="/faq"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
               >
                  Help & FAQ
               </Link>
            </div>
         </nav>

         {/* Mobile Bottom Navigation */}
         <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white z-40 border-t border-zinc-100 px-2 py-2 safe-area-bottom">
            <div className="flex justify-around items-center">
               {links.slice(0, 5).map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                     <Link
                        key={link.href}
                        href={link.href}
                        className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                           active ? "text-blue-600" : "text-zinc-400"
                        }`}
                     >
                        <Icon className="h-5 w-5" />
                        <span className="text-[10px] font-medium">{link.label}</span>
                     </Link>
                  );
               })}
            </div>
         </nav>
      </>
   );
};

export default DashboardNav;
