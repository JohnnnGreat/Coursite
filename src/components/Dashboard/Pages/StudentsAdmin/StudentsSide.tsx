"use client";
import useCourseInformation from "@/actions/courseActions";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Link, User } from "lucide-react";
import React from "react";

const StudentsSide = ({ courses }: any) => {
   console.log(courses);
   return (
      <div className="py-[3rem] px-2">
         <h1 className="font-bold">Your Courses</h1>

         <div className="mt-[1rem]">
            {courses.map((course) => (
               <Card className="p-3">
                  <CardTitle className="leading-relaxed">{course.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                     {course.description}
                  </CardDescription>
                  <Button
                     variant="secondary"
                     className="w-full mt-3 hover:font-bold"
                  >
                     <User /> View Students
                  </Button>
               </Card>
            ))}
         </div>
      </div>
   );
};

export default StudentsSide;