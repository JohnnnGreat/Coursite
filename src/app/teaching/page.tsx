import React from "react";
import { BookOpen, Users, Trophy, Clock } from "lucide-react";
import Link from "next/link";
const TeachPage = () => {
   const benefits = [
      {
         icon: <BookOpen className="w-6 h-6" />,
         title: "Share Your Expertise",
         description:
            "Transform your knowledge into engaging online courses that reach students worldwide.",
      },
      {
         icon: <Users className="w-6 h-6" />,
         title: "Build Your Community",
         description:
            "Connect with learners and fellow educators in our vibrant teaching community.",
      },
      {
         icon: <Trophy className="w-6 h-6" />,
         title: "Earn While Teaching",
         description: "Create multiple revenue streams through course sales and premium content.",
      },
      {
         icon: <Clock className="w-6 h-6" />,
         title: "Flexible Schedule",
         description: "Teach on your own terms and schedule, with full control over your content.",
      },
   ];

   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="max-w-[1000px] mx-auto px-4 py-16">
               <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl font-bold mb-6">Become an Instructor</h1>
                  <p className="text-xl mb-8">
                     Join thousands of educators and share your knowledge with students worldwide
                  </p>
                  <Link
                     href="/register"
                     className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                     Start Teaching Today
                  </Link>
               </div>
            </div>
         </div>

         {/* Benefits Section */}
         <div className="max-w-[1100px] mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Teach With Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {benefits.map((benefit, index) => (
                  <div
                     key={index}
                     className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                     <div className="text-blue-600 mb-4">{benefit.icon}</div>
                     <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                     <p className="text-gray-600">{benefit.description}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* Steps Section */}
         <div className="bg-gray-50 py-16">
            <div className="max-w-[1100px] mx-auto px-4">
               <h2 className="text-3xl font-bold text-center mb-12">How to Get Started</h2>
               <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-8">
                     <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                           1
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Apply to Teach</h3>
                        <p className="text-gray-600">
                           Complete our simple application process to become an instructor
                        </p>
                     </div>
                     <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                           2
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Create Your Course</h3>
                        <p className="text-gray-600">
                           Use our intuitive course builder to design your curriculum
                        </p>
                     </div>
                     <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                           3
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Start Teaching</h3>
                        <p className="text-gray-600">
                           Launch your course and connect with students globally
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TeachPage;
