"use client";
import { Button } from "@/components/ui/button";
import { deleteCourse } from "@/serverActions/course";
import { Edit, Trash } from "lucide-react";


// Actions Buttons
const AltButtons = ({ courseInformation }: any) => {
   return (
      <div className="flex gap-3 mt-4">
         <Button
            variant="outline"
            className="flex items-center justify-center w-full border-gray-300 hover:border-gray-400"
         >
            <Edit className="mr-2" />
            Edit
         </Button>
         <Button
            variant="default"
            onClick={() => {
               deleteCourse(courseInformation._id);
            }}
            className="flex items-center justify-center w-full bg-red-500 text-white hover:bg-red-400"
         >
            <Trash className="mr-2" />
            Delete
         </Button>
      </div>
   );
};

export default AltButtons;
