"use client";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2 } from "lucide-react";

const ShareDropdown = ({ course }) => {
   const handleShare = async (platform: string) => {
      console.log("Sharing via:", platform);
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
         </DropdownMenuTrigger>
         <DropdownMenuContent
            align="end"
            className="w-40"
         >
            <DropdownMenuItem onClick={() => handleShare("twitter")}>Twitter</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("facebook")}>Facebook</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("linkedin")}>LinkedIn</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("copy")}>Copy Link</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default ShareDropdown;
