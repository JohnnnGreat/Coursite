import { headers } from "next/headers";
import { getCourseById } from "@/serverActions/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import {
   Clock,
   BookOpen,
   BarChart,
   CheckCircle,
   PlayCircle,
   Video,
   FileText,
   Link,
} from "lucide-react";

const CoursePage = async () => {
   const headersList = await headers();
   const courseId = await headersList?.get("userId")?.split("/")[1];

   const { course } = await getCourseById(courseId);
   console.log(course);

   const isCompleted = true;

   const calculateProgress = (sections) => {
      const completed = sections.filter((section) => section.completed).length;
      return Math.round((completed / sections.length) * 100);
   };
   return (
      <div className=" space-y-6 p-6">
         <Card>
            <CardHeader>
               <div className="flex justify-between items-start">
                  <div>
                     <CardTitle className="text-2xl">{course?.title}</CardTitle>
                     <p className="text-gray-500 mt-2">{course?.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                        {course?.level}
                     </span>
                     <span className="text-sm text-gray-500 mt-2">{course?.category}</span>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-blue-600" />
                        <span>Overall Progress</span>
                     </div>
                     <span className="font-semibold">{calculateProgress(course.sections)}%</span>
                  </div>
                  <Progress
                     value={calculateProgress(course.sections)}
                     className="h-2"
                  />

                  <div className="grid grid-cols-3 gap-4">
                     <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <span>{course.duration} hours</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-gray-500" />
                        <span>{course.sections.length} sections</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-gray-500" />
                        <span>{course.courseCertification ? "Certificate" : "No Certificate"}</span>
                     </div>
                  </div>

                  <Accordion
                     type="single"
                     collapsible
                     className="mt-6"
                  >
                     {course.sections.map((section, index) => (
                        <AccordionItem
                           key={section._id}
                           value={`section-${index}`}
                        >
                           <AccordionTrigger>
                              <div className="flex items-center justify-between w-full">
                                 <div className="flex items-center gap-2">
                                    {section.completed ? (
                                       <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                       <PlayCircle className="h-5 w-5 text-blue-500" />
                                    )}
                                    <span>{section.title}</span>
                                 </div>
                                 <span className="text-sm text-gray-500">
                                    {section.duration} min
                                 </span>
                              </div>
                           </AccordionTrigger>
                           <AccordionContent>
                              <div className="pl-7 space-y-4">
                                 <p className="text-gray-600">{section.description}</p>
                                 {section.lessons.map((lesson) => (
                                    <Card className="mb-4">
                                       <CardHeader className="flex flex-row items-center justify-between">
                                          <div className="flex items-center gap-3">
                                             {lesson.type === "video" ? (
                                                <Video className="h-5 w-5 text-blue-500" />
                                             ) : (
                                                <FileText className="h-5 w-5 text-green-500" />
                                             )}
                                             <CardTitle className="text-4">
                                                {lesson.title}
                                             </CardTitle>
                                          </div>
                                          <span className="text-sm text-gray-500">
                                             {lesson.lessonDuration}
                                          </span>
                                       </CardHeader>
                                       <CardContent className="space-y-4">
                                          {lesson.content && (
                                             <p className="text-gray-600">{lesson.content}</p>
                                          )}

                                          {lesson.resourceUrl && (
                                             <div className="flex items-center gap-2 text-blue-600 hover:underline">
                                                <Link className="h-4 w-4" />
                                                <a
                                                   href={lesson.resourceUrl}
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                >
                                                   View Resource
                                                </a>
                                             </div>
                                          )}

                                          <div className="flex justify-between items-center pt-4">
                                             <div className="flex items-center gap-2">
                                                <CheckCircle
                                                   className={`h-5 w-5 ${
                                                      isCompleted
                                                         ? "text-green-500"
                                                         : "text-gray-300"
                                                   }`}
                                                />
                                                <span className="text-sm">
                                                   {isCompleted ? "Completed" : "Mark as complete"}
                                                </span>
                                             </div>
                                             <Progress
                                                value={isCompleted ? 100 : 0}
                                                className="w-24 h-2"
                                             />
                                          </div>
                                       </CardContent>
                                    </Card>
                                 ))}
                              </div>
                           </AccordionContent>
                        </AccordionItem>
                     ))}
                  </Accordion>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default CoursePage;
