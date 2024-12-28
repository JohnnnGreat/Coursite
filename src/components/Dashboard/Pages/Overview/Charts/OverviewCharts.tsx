"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Users,
   TrendingUp,
   BookOpen,
   Award,
   DollarSign,
   Clock,
   CheckCircle,
   BookMarked,
} from "lucide-react";
import {
   AreaChart,
   Area,
   BarChart,
   Bar,
   PieChart,
   Pie,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Cell,
} from "recharts";

const AdminDashboard = ({ courses = [] }: { courses: any }) => {
   const stats = {
      totalCourses: courses?.length,
      publishedCourses: courses?.filter((c) => c.published).length,
      draftCourses: courses?.filter((c) => c.draft).length,
      totalEnrollments: courses.reduce((sum, course) => sum + (course.enrollments?.length || 0), 0),
      revenue: courses?.reduce((sum, course) => {
         const price = parseFloat(course.price) || 0;
         return sum + price * (course.enrollments?.length || 0);
      }, 0),
   };

   const enrollmentData = courses?.map((course) => ({
      name: course.title?.substring(0, 15) + "...",
      enrollments: course.enrollments?.length || 0,
      revenue: parseFloat(course.price || 0) * (course.enrollments?.length || 0),
   }));

   const courseStatusData = [
      { name: "Published", value: stats.publishedCourses },
      { name: "Draft", value: stats.draftCourses },
   ];

   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

   const overviewCards = [
      {
         title: "Total Courses",
         value: stats.totalCourses,
         icon: <BookOpen />,
         color: "text-blue-500",
      },
      {
         title: "Active Students",
         value: stats.totalEnrollments,
         icon: <Users />,
         color: "text-green-500",
      },
      {
         title: "Total Revenue",
         value: `$${stats.revenue.toLocaleString()}`,
         icon: <DollarSign />,
         color: "text-yellow-500",
      },
      {
         title: "Published Courses",
         value: stats.publishedCourses,
         icon: <CheckCircle />,
         color: "text-purple-500",
      },
   ];

   return (
      <div className="space-y-6 p-6 bg-gray-50">
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {overviewCards.map((card, index) => (
               <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow"
               >
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                        <div
                           className={`rounded-full p-3 ${card.color.replace(
                              "text",
                              "bg",
                           )} bg-opacity-10`}
                        >
                           {React.cloneElement(card.icon, { className: `h-6 w-6 ${card.color}` })}
                        </div>
                        <div className="text-right">
                           <p className="text-2xl font-bold">{card.value}</p>
                           <p className="text-sm text-gray-500">{card.title}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
               <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="h-80">
                     <ResponsiveContainer
                        width="100%"
                        height="100%"
                     >
                        <AreaChart data={enrollmentData}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="name" />
                           <YAxis />
                           <Tooltip />
                           <Area
                              type="monotone"
                              dataKey="enrollments"
                              stroke="#8884d8"
                              fill="#8884d8"
                              fillOpacity={0.3}
                           />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
               <CardHeader>
                  <CardTitle>Revenue by Course</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="h-80">
                     <ResponsiveContainer
                        width="100%"
                        height="100%"
                     >
                        <BarChart data={enrollmentData}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="name" />
                           <YAxis />
                           <Tooltip />
                           <Bar
                              dataKey="revenue"
                              fill="#82ca9d"
                           />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
               <CardHeader>
                  <CardTitle>Course Status Distribution</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="h-80">
                     <ResponsiveContainer
                        width="100%"
                        height="100%"
                     >
                        <PieChart>
                           <Pie
                              data={courseStatusData}
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                           >
                              {courseStatusData.map((entry, index) => (
                                 <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                 />
                              ))}
                           </Pie>
                           <Tooltip />
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
               <CardHeader>
                  <CardTitle>Recent Courses</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {courses.slice(0, 5).map((course, index) => (
                        <div
                           key={index}
                           className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                        >
                           <div className="flex items-center gap-3">
                              <div
                                 className={`p-2 rounded-full ${
                                    course.published ? "bg-green-100" : "bg-yellow-100"
                                 }`}
                              >
                                 {course.published ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                 ) : (
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                 )}
                              </div>
                              <div>
                                 <p className="font-medium">{course.title}</p>
                                 <p className="text-sm text-gray-500">
                                    {course.enrollments?.length || 0} students
                                 </p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="font-medium">${course.price || "0"}</p>
                              <p className="text-sm text-gray-500">
                                 {new Date(course.createdAt).toLocaleDateString()}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default AdminDashboard;
