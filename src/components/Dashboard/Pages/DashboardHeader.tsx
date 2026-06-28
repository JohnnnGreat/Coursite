"use client";
import React, { useState } from "react";
import { Bell, Search, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userState from "@/actions/userActions";
import { signOut } from "next-auth/react";
import Link from "next/link";

const DashboardHeader = () => {
   const { user } = userState((state) => state);
   const [searchOpen, setSearchOpen] = useState(false);

   const initials = user?.name
      ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
      : "U";

   return (
      <div className="relative">
         <header className="h-14 border-b border-zinc-100 bg-white flex items-center justify-between px-4 md:px-6">
            {/* Search */}
            <div className="hidden md:block flex-1 max-w-sm">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                     type="text"
                     placeholder="Search courses, students…"
                     className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder:text-zinc-400"
                  />
               </div>
            </div>

            {/* Mobile search toggle */}
            <button
               className="md:hidden p-2 text-zinc-500 hover:text-zinc-900"
               onClick={() => setSearchOpen(!searchOpen)}
            >
               <Search className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1 md:gap-2 ml-auto">
               {/* Notifications */}
               <button className="relative p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-colors">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-600 rounded-full" />
               </button>

               {/* User menu */}
               <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-zinc-50 transition-colors focus:outline-none border border-transparent hover:border-zinc-100">
                     <Avatar className="h-7 w-7">
                        <AvatarImage src={user?.image} />
                        <AvatarFallback className="text-xs bg-blue-600 text-white font-semibold">
                           {initials}
                        </AvatarFallback>
                     </Avatar>
                     <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-zinc-900 leading-none">{user?.name || "User"}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5 capitalize">
                           {user?.role?.toLowerCase() || "student"}
                        </p>
                     </div>
                     <ChevronDown className="hidden md:block h-3.5 w-3.5 text-zinc-400" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-52 mt-1">
                     <DropdownMenuLabel className="pb-1">
                        <p className="text-sm font-medium text-zinc-900">{user?.name}</p>
                        <p className="text-xs text-zinc-400 font-normal">{user?.email}</p>
                     </DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2 text-sm cursor-pointer">
                           <User className="h-3.5 w-3.5 text-zinc-400" /> Profile
                        </Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center gap-2 text-sm cursor-pointer">
                           <Settings className="h-3.5 w-3.5 text-zinc-400" /> Settings
                        </Link>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 text-sm text-red-500 focus:text-red-500 cursor-pointer"
                     >
                        <LogOut className="h-3.5 w-3.5" /> Sign out
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </header>

         {/* Mobile search dropdown */}
         {searchOpen && (
            <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-b border-zinc-100 px-4 py-3 z-10 shadow-sm">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                     type="text"
                     placeholder="Search…"
                     autoFocus
                     className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default DashboardHeader;
