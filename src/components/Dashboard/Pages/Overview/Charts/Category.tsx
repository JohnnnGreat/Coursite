"use client";

import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   Legend,
} from "recharts";
const Category = ({ categoryData }: any) => {
   const catData = categoryData.map((course: any) => ({
      name: course.category || "Uncategorized",
      value: 1,
   }));
   const levelData = categoryData.map((course: any) => ({
      name: course.level || "Unknown Level",
      value: 1,
   }));
   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
   return (
      <div>
         {" "}
         <ResponsiveContainer
            width="30%"
            height={300}
         >
            <PieChart>
               <Pie
                  data={catData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
               >
                  {categoryData.map((_: any, index: number) => (
                     <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                     />
                  ))}
               </Pie>
               <Tooltip />
            </PieChart>
         </ResponsiveContainer>
         <ResponsiveContainer
            width="30%"
            height={300}
         >
            <BarChart data={levelData}>
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Legend />
               <Bar
                  dataKey="value"
                  fill="#82ca9d"
               />
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
};

export default Category;
