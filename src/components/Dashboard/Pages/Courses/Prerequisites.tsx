"use client";
import TextField from "@/components/SharedUi/TextField";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useCourseInformation from "@/actions/courseActions";

interface Prerequisite {
   id: string;
   text: string;
   createdAt: Date;
}

const Prerequisites = () => {
   const courseInformation = useCourseInformation((state) => state.courseInformation);
   console.log(courseInformation);
   const [prerequisites, setPrerequisites] = useState<Prerequisite[]>(
      courseInformation?.prerequisites,
   );
   const [error, setError] = useState<string | null>(null);
   const addToCoursePayload = useCourseInformation((state) => state.addToCoursePayload);

   const prerequisiteSchema = z.object({
      prerequisite: z
         .string()
         .min(5, { message: "Prerequisites must be at least 5 characters long" })
         .max(200, { message: "Prerequisites must not exceed 200 characters" })
         .refine(
            (value) => !prerequisites.some((p) => p?.text?.toLowerCase() === value.toLowerCase()),
            {
               message: "This prerequisite already exists",
            },
         ),
   });

   const form = useForm<z.infer<typeof prerequisiteSchema>>({
      resolver: zodResolver(prerequisiteSchema),
      defaultValues: { prerequisite: "" },
   });

   const addPrerequisite = (text: string) => {
      try {
         setPrerequisites((prev) => [
            ...prev,
            { id: crypto.getRandomValues(new Uint16Array(1))[0], text, createdAt: new Date() },
         ]);
         form.reset();
         setError(null);
      } catch (err) {
         setError("Failed to add prerequisite. Please try again.");
      }
   };

   const handleSubmit = (values: z.infer<typeof prerequisiteSchema>) => {
      if (prerequisites.length >= 10) {
         setError("You can add up to 10 prerequisites only.");
         return;
      }
      addPrerequisite(values.prerequisite);
   };

   useEffect(() => {
      console.log(addToCoursePayload({ prerequisites: prerequisites }));
   }, [prerequisites]);

   const handleDelete = (id: string) => {
      setPrerequisites((prev) => prev.filter((item) => item?.id !== id));
      setError(null);
   };

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
         e.preventDefault();
         form.handleSubmit(handleSubmit)();
      }
   };

   return (
      <div className="border rounded-[10px]">
         <CardHeader className="border-b">
            <CardTitle className="text-xl font-bold">Prerequisites</CardTitle>
            <CardDescription>What should students know before taking this course?</CardDescription>
         </CardHeader>
         <CardContent className="p-6">
            <div className="space-y-4">
               {error && (
                  <Alert variant="destructive">
                     <AlertCircle className="h-4 w-4" />
                     <AlertDescription>{error}</AlertDescription>
                  </Alert>
               )}

               <div>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex items-end gap-2"
                     >
                        <div className="flex-1">
                           <TextField
                              label="Add Prerequisite"
                              name="prerequisite"
                              form={form}
                              placeholder="Enter a prerequisite..."
                              onKeyDown={handleKeyDown}
                              classname="w-full"
                           />
                        </div>
                        <button
                           type="submit"
                           disabled={prerequisites?.length >= 10}
                           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-10 flex items-center gap-2"
                        >
                           <Plus className="h-4 w-4" />
                           Add
                        </button>
                     </form>
                  </Form>
               </div>

               <div className="space-y-2">
                  {prerequisites?.length === 0 ? (
                     <div className="text-center py-8 text-gray-500">
                        No prerequisites added yet. Add some requirements that students should meet
                        before taking this course.
                     </div>
                  ) : (
                     <div className="space-y-2">
                        {prerequisites?.map((item) => (
                           <div
                              key={item?.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                           >
                              <span className="flex-1">{item?.text}</span>
                              <button
                                 onClick={() => handleDelete(item?.id)}
                                 className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100"
                                 aria-label="Delete prerequisite"
                              >
                                 <Trash2 className="h-4 w-4" />
                              </button>
                           </div>
                        ))}
                     </div>
                  )}

                  {prerequisites?.length > 0 && (
                     <p className="text-sm text-gray-500 mt-2">
                        {prerequisites?.length}/10 prerequisites added
                     </p>
                  )}
               </div>
            </div>
         </CardContent>
      </div>
   );
};

export default Prerequisites;
