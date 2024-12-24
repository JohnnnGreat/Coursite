import React from "react";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
   return (
      <header className="h-16 border-b bg-white flex items-center justify-between px-6">
         <div className="flex-1 max-w-xl">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000000a0]" />
               <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-[.9rem] bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
            </div>
         </div>

         <div className="flex items-center gap-4">
            <button className="relative">
               <Bell className="h-5 w-5 text-[#000000a0]" />
               <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] font-medium text-white flex items-center justify-center">
                  2
               </span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l">
               <div className="text-right">
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-[#000000a0]">Instructor</div>
               </div>
               <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2">
                     <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                     </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                     align="end"
                     className="w-56"
                  >
                     <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>Dashboard</DropdownMenuItem>
                     <DropdownMenuItem>My Courses</DropdownMenuItem>
                     <DropdownMenuItem>Settings</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </header>
   );
};

export default Header;
