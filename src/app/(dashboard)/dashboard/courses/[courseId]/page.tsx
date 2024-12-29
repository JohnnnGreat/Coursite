import { headers } from "next/headers";

const CoursePage = async () => {
   const headersList = headers();
   const domain = headersList.get("host");
   const fullUrl = headersList.get("referer");
   return <div>Single course page</div>;
};

export default CoursePage;
