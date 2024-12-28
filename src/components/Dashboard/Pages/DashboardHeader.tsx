"use client";
import React, { useState } from "react";
import { Bell, Search, Menu, X } from "lucide-react";
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

const Header = () => {
   const { user } = userState((state) => state);
   const [isSearchVisible, setIsSearchVisible] = useState(false);

   const handleSignOut = () => {
      signOut();
   };

   return (
      <div className="relative">
         <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-6">
            {/* Mobile Menu Button (if needed) */}
            <button className="md:hidden p-2">
               <Menu className="h-5 w-5 text-gray-600" />
            </button>

            {/* Search - Desktop */}
            <div className="hidden md:block flex-1 max-w-xl">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                     type="text"
                     placeholder="Search..."
                     className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
               </div>
            </div>

            {/* Mobile Search Toggle */}
            <button
               className="md:hidden p-2"
               onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
               <Search className="h-5 w-5 text-gray-600" />
            </button>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-4">
               {/* Notifications */}
               <button className="relative p-2">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] font-medium text-white flex items-center justify-center">
                     2
                  </span>
               </button>

               {/* User Menu */}
               <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l">
                  <div className="hidden md:block text-right">
                     <div className="text-sm font-medium">{user?.name}</div>
                     <div className="text-xs text-gray-500">{user?.role}</div>
                  </div>
                  <DropdownMenu>
                     <DropdownMenuTrigger className="flex items-center">
                        <Avatar className="h-8 w-8">
                           <AvatarImage src="/placeholder-avatar.jpg" />
                           <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        align="end"
                        className="w-56"
                     >
                        <DropdownMenuLabel className="text-sm">
                           {user?.name}
                           <div className="text-xs text-gray-500">{user?.role}</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-sm">Dashboard</DropdownMenuItem>
                        <DropdownMenuItem className="text-sm">My Courses</DropdownMenuItem>
                        <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                           onClick={handleSignOut}
                           className="text-sm text-red-600"
                        >
                           Logout
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
         </header>

         {/* Mobile Search Bar - Expandable */}
         {isSearchVisible && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b p-4 z-10">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                     type="text"
                     placeholder="Search..."
                     className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     autoFocus
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default Header;
