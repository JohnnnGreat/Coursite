"use client";
import React, { useState } from "react";
import { Upload, Plus, Trash2, DollarSign, Clock, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import Prerequisites from "./Prerequisites";
import Curriculum from "./Curriculum";
import Settings from "./Settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ImageUpload from "./Image";
import useCourseInformation from "@/actions/courseActions";
import { createCourse } from "@/serverActions/course";
import userState from "@/actions/userActions";
import CoursePreview from "./Preview";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
   const [publishState, setPublishState] = useState("draft");
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const handleSaveInformation = async () => {
      setIsLoading(true);
      try {
         const response = await createCourse({
            ...courseInformation,
            draft: publishState === "draft",
            authorId: userInformation?.id,
         });

         if (response?.courseId) {
            await Promise.resolve(addToCoursePayload({ id: response.courseId }));

            if (publishState === "published") {
               setCourseNull();
               router.push("/dashboard/courses");
            }
         }
      } catch (error) {
         console.error("Error saving course:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const { addToCoursePayload, courseInformation, setCourseNull } = useCourseInformation(
      (state) => state,
   );
   const userInformation = userState((state) => state.user);

   return (
      <div className="max-w-[98%] mx-auto p-6 space-y-6 bg-white">
         {/* Top Navigation */}
         <div className="flex items-center justify-between bg-white border p-4 rounded-lg shadow-sm">
            <Link
               href="/courses"
               className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
               <ArrowLeft className="h-4 w-4 mr-1" />
               Back to Courses
            </Link>
            <Badge variant={publishState === "draft" ? "secondary" : "default"}>
               {publishState === "draft" ? "Draft" : "Ready to Publish"}
            </Badge>
         </div>

         {/* Header Section */}
         <div className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
                  <p className="text-gray-500">Fill in the details to create your course</p>
               </div>
               <div className="flex items-center space-x-4">
                  <Select
                     value={publishState}
                     onValueChange={setPublishState}
                  >
                     <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Select state" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="draft">Save as Draft</SelectItem>
                        <SelectItem value="published">Publish Course</SelectItem>
                     </SelectContent>
                  </Select>
                  <button
                     onClick={handleSaveInformation}
                     disabled={isLoading}
                     className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <Save className="w-4 h-4 mr-2" />
                     {isLoading ? "Saving..." : "Save Information"}
                  </button>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div>
            <Tabs
               defaultValue="basic"
               className="w-full"
            >
               <TabsList className="flex w-full max-w-md p-1 mb-6">
                  <TabsTrigger
                     value="basic"
                     className="flex-1"
                  >
                     Basic Info
                  </TabsTrigger>
                  <TabsTrigger
                     value="curriculum"
                     className="flex-1"
                  >
                     Curriculum
                  </TabsTrigger>
                  <TabsTrigger
                     value="settings"
                     className="flex-1"
                  >
                     Settings
                  </TabsTrigger>
                  <TabsTrigger
                     value="preview"
                     className="flex-1"
                  >
                     Preview
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="basic">
                  <Card>
                     <CardHeader>
                        <CardTitle>Course Information</CardTitle>
                        <CardDescription>Add the main details of your course</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="space-y-4">
                           <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">
                                 Course Title
                              </label>
                              <input
                                 type="text"
                                 placeholder="e.g., Complete Web Development Bootcamp"
                                 className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                 onChange={(e) => {
                                    addToCoursePayload({ title: e.target.value });
                                 }}
                                 value={courseInformation?.title}
                              />
                           </div>

                           <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">
                                 Course Description
                              </label>
                              <textarea
                                 rows={4}
                                 placeholder="Describe what students will learn..."
                                 className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                 onChange={(e) => {
                                    addToCoursePayload({ description: e.target.value });
                                 }}
                                 value={courseInformation?.description}
                              />
                           </div>

                           <ImageUpload />

                           <div className="grid grid-cols-2 gap-6">
                              <div>
                                 <label className="block text-sm font-medium mb-2 text-gray-700">
                                    Category
                                 </label>
                                 <Select
                                    value={courseInformation?.category}
                                    onValueChange={(value) =>
                                       addToCoursePayload({ category: value })
                                    }
                                 >
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="Development">Development</SelectItem>
                                       <SelectItem value="Business">Business</SelectItem>
                                       <SelectItem value="Design">Design</SelectItem>
                                       <SelectItem value="Marketing">Marketing</SelectItem>
                                    </SelectContent>
                                 </Select>
                              </div>
                              <div>
                                 <label className="block text-sm font-medium mb-2 text-gray-700">
                                    Level
                                 </label>
                                 <Select
                                    value={courseInformation?.level}
                                    onValueChange={(value) => addToCoursePayload({ level: value })}
                                 >
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="Beginner">Beginner</SelectItem>
                                       <SelectItem value="Intermediate">Intermediate</SelectItem>
                                       <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                 </Select>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
                  <Prerequisites />
               </TabsContent>

               <TabsContent value="curriculum">
                  <Curriculum />
               </TabsContent>

               <TabsContent value="settings">
                  <Settings />
               </TabsContent>
               <TabsContent value="preview">
                  <CoursePreview courseInformation={courseInformation} />
               </TabsContent>
            </Tabs>
         </div>

         <Alert>
            <AlertDescription>
               Don't forget to preview your course before publishing. You can always make changes
               later.
            </AlertDescription>
         </Alert>
      </div>
   );
};

export default CreateCourse;
