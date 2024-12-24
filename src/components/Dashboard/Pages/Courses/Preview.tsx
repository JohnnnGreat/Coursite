import React from "react";
import { Clock, Users, Award, BookOpen, CheckCircle, Play, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CoursePreview = ({ courseInformation }: { courseInformation: any }) => {
   const totalLessons = courseInformation?.lessons?.length || 0;
   const totalSections = courseInformation?.sections?.length || 0;

   return (
      <div className="bg-gradient-to-br from-slate-50 to-white min-h-screen">
         {/* Hero Section */}
         <div className="relative bg-slate-900 py-16 rounded-md">
            <div className=" px-6">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                     <div className="flex gap-2">
                        <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
                           {courseInformation?.category || "Category"}
                        </Badge>
                        <Badge className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20">
                           {courseInformation?.level || "Level"}
                        </Badge>
                     </div>
                     <h1 className="text-4xl font-bold text-white leading-tight">
                        {courseInformation?.title || "Course Title"}
                     </h1>
                     <p className="text-slate-300 text-lg">
                        {courseInformation?.description || "Course description..."}
                     </p>
                     <div className="flex flex-wrap gap-6 text-slate-300">
                        <div className="flex items-center gap-2">
                           <Users className="w-5 h-5" />
                           <span>{courseInformation?.enrollments?.length || 0} enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <BookOpen className="w-5 h-5" />
                           <span>{totalLessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Clock className="w-5 h-5" />
                           <span>
                              Updated{" "}
                              {new Date(
                                 courseInformation?.updatedAt || Date.now(),
                              ).toLocaleDateString()}
                           </span>
                        </div>
                     </div>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                     {courseInformation?.imageUrl ? (
                        <img
                           src={courseInformation.imageUrl}
                           alt={courseInformation.title}
                           className="w-full h-full object-cover"
                        />
                     ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
                     )}
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                           <Play className="w-8 h-8 text-white" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content Section */}
         <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
               {/* Main Content */}
               <div className="lg:col-span-2 space-y-8">
                  {/* Course Structure */}
                  <Card className="border-0 shadow-lg">
                     <CardContent className="p-6">
                        <div className="grid grid-cols-3 gap-4">
                           <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="font-semibold text-2xl text-blue-600">
                                 {totalSections}
                              </div>
                              <div className="text-sm text-slate-600">Sections</div>
                           </div>
                           <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <div className="font-semibold text-2xl text-purple-600">
                                 {totalLessons}
                              </div>
                              <div className="text-sm text-slate-600">Lessons</div>
                           </div>
                           <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="font-semibold text-2xl text-green-600">
                                 {courseInformation?.courseCertification ? "Yes" : "No"}
                              </div>
                              <div className="text-sm text-slate-600">Certificate</div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Prerequisites */}
                  <Card className="border-0 shadow-lg">
                     <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Prerequisites</h3>
                        <div className="grid gap-3">
                           {courseInformation?.prerequisites?.map((prereq) => (
                              <div
                                 key={prereq?.id}
                                 className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
                              >
                                 <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                 <span>{prereq?.text}</span>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </div>

               {/* Sidebar */}
               <div>
                  <Card className="border-0 shadow-lg sticky top-6">
                     <CardContent className="p-6">
                        <div className="space-y-6">
                           <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold">
                                 {courseInformation?.price ? `$${courseInformation.price}` : "Free"}
                              </span>
                              {courseInformation?.price && (
                                 <span className="text-slate-500 line-through">$99.99</span>
                              )}
                           </div>
                           <button className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg shadow-blue-600/25">
                              Enroll Now
                           </button>
                           {courseInformation?.welcomeMessage && (
                              <div className="bg-slate-50 p-4 rounded-lg">
                                 <h4 className="font-medium mb-2">Welcome Message</h4>
                                 <p className="text-slate-600 text-sm">
                                    {courseInformation.welcomeMessage}
                                 </p>
                              </div>
                           )}
                           {courseInformation?.courseCertification && (
                              <div className="flex items-center gap-3 text-sm">
                                 <Award className="w-5 h-5 text-purple-600" />
                                 <span>Earn a certificate upon completion</span>
                              </div>
                           )}
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CoursePreview;
