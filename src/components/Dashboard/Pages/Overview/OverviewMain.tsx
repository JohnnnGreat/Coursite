import { getAllCoursesByUser } from "@/serverActions/course";
import AdminDashboard from "./Charts/OverviewCharts";

const OverviewMain = async () => {
   const response = await getAllCoursesByUser();
   const courses = response?.courses ?? [];

   return <AdminDashboard courses={courses} />;
};

export default OverviewMain;
