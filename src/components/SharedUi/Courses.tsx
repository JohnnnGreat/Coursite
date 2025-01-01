import { Play } from "lucide-react";
import { getRecentCourses } from "@/serverActions/course";
const FeaturedCourses = async () => {
   const { courses } = await getRecentCourses();

   console.log(courses);
   return (
      <section className="py-20">
         <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {courses?.map((course, item) => (
                  <div
                     key={item}
                     className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                     <img
                        src={course.imageUrl}
                        alt="Course"
                        className="w-full"
                     />
                     <div className="p-6">
                        <div className="text-sm text-blue-600 mb-2">{course.category}</div>

                        <h3 className="text-[1rem] font-semibold b-2">{course?.title}</h3>
                        <p className="text-sm text-gray-400 mb-2 font-medium">
                           Uploaded by {course.authorId.name}
                        </p>
                        <p className="text-gray-600 mb-4">{course?.description}</p>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <Play className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-500">24 Lessons</span>
                           </div>
                           <button className="text-blue-600 font-semibold hover:text-blue-700">
                              Enroll Now
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default FeaturedCourses;
