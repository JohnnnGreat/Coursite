import { getStudentEnrolledCourses } from "@/serverActions/course";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, BookOpen, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProgressOverview = async () => {
   const { courses } = await getStudentEnrolledCourses();
   const calculateProgress = (course) => {
      const completedSections = course.sections.filter((section) => section.completed).length;
      return Math.round((2 / 10) * 100);
   };
   return (
      <div className="p-4 shadow-md rounded-md bg-white">
         <h1>Progress Overview</h1>

         <Card className="bg-blue-50">
            <CardContent className="p-6">
               <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Active Courses</h3>
               </div>
               <p className="text-2xl font-bold mt-2">{courses.length}</p>
            </CardContent>
         </Card>
         <div className="space-y-4">
            <h2 className="text-xl font-semibold">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {courses.map((course) => (
                  <Card
                     key={course._id}
                     className="hover:shadow-lg transition-shadow"
                  >
                     <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <h3 className="font-semibold text-lg">{course.title}</h3>
                              <p className="text-sm text-gray-500">{course.category}</p>
                           </div>
                           <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              {course.level}
                           </span>
                        </div>

                        <div className="space-y-2">
                           <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{calculateProgress(course)}%</span>
                           </div>
                           <Progress
                              value={calculateProgress(course)}
                              className="h-2"
                           />
                        </div>

                        <div className="mt-4 flex justify-between text-sm text-gray-500">
                           <span>
                              Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                           </span>
                           <span>{course.sections.length} sections</span>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ProgressOverview;
