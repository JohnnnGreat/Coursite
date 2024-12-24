"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
const Category = ({ categoryData }) => {
   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
   return (
      <ResponsiveContainer
         width="30%"
         height={300}
      >
         <PieChart>
            <Pie
               data={categoryData}
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
   );
};

export default Category;
