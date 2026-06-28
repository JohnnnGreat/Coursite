"use client";
import React from "react";
import { Users, BookOpen, DollarSign, CheckCircle2, TrendingUp, Clock } from "lucide-react";
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

const PIE_COLORS = ["#2563EB", "#e4e4e7"];

const AdminDashboard = ({ courses = [] }: { courses: any[] }) => {
   const totalCourses = courses.length;
   const publishedCourses = courses.filter((c) => c.published).length;
   const draftCourses = courses.filter((c) => c.draft).length;
   const totalEnrollments = courses.reduce((s, c) => s + (c.enrollments?.length || 0), 0);
   const revenue = courses.reduce((s, c) => s + (parseFloat(c.price) || 0) * (c.enrollments?.length || 0), 0);

   const statCards = [
      {
         label: "Total courses",
         value: totalCourses,
         icon: <BookOpen className="w-4 h-4" />,
         sub: `${draftCourses} in draft`,
         color: "blue",
      },
      {
         label: "Active students",
         value: totalEnrollments,
         icon: <Users className="w-4 h-4" />,
         sub: "enrolled across all courses",
         color: "emerald",
      },
      {
         label: "Revenue",
         value: `$${revenue.toLocaleString()}`,
         icon: <DollarSign className="w-4 h-4" />,
         sub: "all time",
         color: "amber",
      },
      {
         label: "Published",
         value: publishedCourses,
         icon: <CheckCircle2 className="w-4 h-4" />,
         sub: `of ${totalCourses} total`,
         color: "violet",
      },
   ];

   const colorMap: Record<string, string> = {
      blue: "bg-blue-50 text-blue-600",
      emerald: "bg-emerald-50 text-emerald-600",
      amber: "bg-amber-50 text-amber-600",
      violet: "bg-violet-50 text-violet-600",
   };

   const enrollmentData = courses.map((c) => ({
      name: c.title?.substring(0, 12) + (c.title?.length > 12 ? "…" : ""),
      Students: c.enrollments?.length || 0,
      Revenue: parseFloat(c.price || 0) * (c.enrollments?.length || 0),
   }));

   const courseStatusData = [
      { name: "Published", value: publishedCourses || 1 },
      { name: "Draft", value: draftCourses || 0 },
   ];

   return (
      <div className="p-6 space-y-6 bg-zinc-50 min-h-full">

         {/* Stat cards */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card) => (
               <div
                  key={card.label}
                  className="bg-white border border-zinc-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
               >
                  <div className="flex items-start justify-between mb-4">
                     <p className="text-xs font-medium text-zinc-400">{card.label}</p>
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[card.color]}`}>
                        {card.icon}
                     </div>
                  </div>
                  <p className="text-2xl font-bold text-zinc-900 mb-0.5">{card.value}</p>
                  <p className="text-xs text-zinc-400">{card.sub}</p>
               </div>
            ))}
         </div>

         {/* Charts row */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Enrollment bar chart */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5">
               <div className="flex items-center justify-between mb-5">
                  <div>
                     <p className="font-semibold text-zinc-900 text-sm">Student enrollments</p>
                     <p className="text-xs text-zinc-400 mt-0.5">Per course</p>
                  </div>
                  <TrendingUp className="w-4 h-4 text-zinc-300" />
               </div>
               <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={enrollmentData} barSize={28}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                        <Tooltip
                           contentStyle={{ border: "1px solid #e4e4e7", borderRadius: "10px", fontSize: "12px" }}
                           cursor={{ fill: "#f4f4f5" }}
                        />
                        <Bar dataKey="Students" fill="#2563EB" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Revenue area chart */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5">
               <div className="flex items-center justify-between mb-5">
                  <div>
                     <p className="font-semibold text-zinc-900 text-sm">Revenue</p>
                     <p className="text-xs text-zinc-400 mt-0.5">By course</p>
                  </div>
                  <DollarSign className="w-4 h-4 text-zinc-300" />
               </div>
               <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={enrollmentData}>
                        <defs>
                           <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                        <Tooltip
                           contentStyle={{ border: "1px solid #e4e4e7", borderRadius: "10px", fontSize: "12px" }}
                        />
                        <Area type="monotone" dataKey="Revenue" stroke="#2563EB" strokeWidth={2} fill="url(#revGrad)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         {/* Bottom row: pie + recent courses */}
         <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
            {/* Pie chart */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5">
               <p className="font-semibold text-zinc-900 text-sm mb-1">Course status</p>
               <p className="text-xs text-zinc-400 mb-4">Published vs Draft</p>
               <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={courseStatusData} innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                           {courseStatusData.map((_, i) => (
                              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                           ))}
                        </Pie>
                        <Tooltip contentStyle={{ border: "1px solid #e4e4e7", borderRadius: "10px", fontSize: "12px" }} />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex gap-4 justify-center mt-2">
                  <div className="flex items-center gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                     <span className="text-xs text-zinc-500">Published ({publishedCourses})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                     <span className="text-xs text-zinc-500">Draft ({draftCourses})</span>
                  </div>
               </div>
            </div>

            {/* Recent courses */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5">
               <p className="font-semibold text-zinc-900 text-sm mb-4">Recent courses</p>
               {courses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                     <BookOpen className="w-8 h-8 text-zinc-200 mb-2" />
                     <p className="text-sm text-zinc-400">No courses yet</p>
                     <p className="text-xs text-zinc-300 mt-0.5">Create your first course to see it here</p>
                  </div>
               ) : (
                  <div className="space-y-2">
                     {courses.slice(0, 5).map((course, i) => (
                        <div
                           key={i}
                           className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-colors group"
                        >
                           <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${course.published ? "bg-emerald-50" : "bg-amber-50"}`}>
                                 {course.published
                                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    : <Clock className="w-4 h-4 text-amber-500" />
                                 }
                              </div>
                              <div className="min-w-0">
                                 <p className="text-sm font-medium text-zinc-900 truncate">{course.title}</p>
                                 <p className="text-xs text-zinc-400">
                                    {course.enrollments?.length || 0} students · {course.published ? "Live" : "Draft"}
                                 </p>
                              </div>
                           </div>
                           <div className="text-right shrink-0 ml-4">
                              <p className="text-sm font-semibold text-zinc-900">
                                 {course.price === "0" || !course.price ? "Free" : `$${course.price}`}
                              </p>
                              <p className="text-xs text-zinc-400">
                                 {new Date(course.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default AdminDashboard;
