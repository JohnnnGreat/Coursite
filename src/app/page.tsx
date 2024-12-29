import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// In a server component
async function ProfilePage() {
   const session = await getServerSession(authOptions);

   if (!session) {
      return <p>Please log in</p>;
   }

   return (
      <>
         <div className="pt-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
               <div className="text-center">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                     <span className="block">Transform Your Knowledge</span>
                     <span className="block text-indigo-600">Into Online Courses</span>
                  </h1>
                  <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                     The all-in-one platform to create, sell, and manage online courses. Join
                     thousands of instructors earning while sharing their expertise.
                  </p>
                  <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                     <div className="rounded-md shadow">
                        <a
                           href="#"
                           className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                           Start Teaching
                        </a>
                     </div>
                     <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                        <a
                           href="#"
                           className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                        >
                           Browse Courses
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default ProfilePage;
