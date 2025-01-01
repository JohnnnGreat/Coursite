import React from "react";
import { Star, Users, Globe, Award } from "lucide-react";

const AboutPage = () => {
   const stats = [
      { number: "100K+", label: "Active Students" },
      { number: "1000+", label: "Expert Instructors" },
      { number: "500+", label: "Courses" },
      { number: "50+", label: "Countries" },
   ];

   const values = [
      {
         icon: <Star className="w-6 h-6" />,
         title: "Excellence",
         description:
            "We strive for the highest quality in education, ensuring our courses meet rigorous standards.",
      },
      {
         icon: <Users className="w-6 h-6" />,
         title: "Community",
         description: "Building strong connections between learners and educators worldwide.",
      },
      {
         icon: <Globe className="w-6 h-6" />,
         title: "Accessibility",
         description: "Making quality education accessible to everyone, everywhere.",
      },
      {
         icon: <Award className="w-6 h-6" />,
         title: "Innovation",
         description:
            "Continuously improving our platform with cutting-edge learning technologies.",
      },
   ];

   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
            <div className="container mx-auto px-4 py-16">
               <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl font-bold mb-6">Our Mission</h1>
                  <p className="text-xl mb-8">
                     Empowering individuals through accessible, high-quality online education
                  </p>
               </div>
            </div>
         </div>

         {/* Stats Section */}
         {/* Community Stats */}
         <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
               <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  <div className="text-center">
                     <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
                     <p className="text-gray-600">Active Members</p>
                  </div>
                  <div className="text-center">
                     <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                     <p className="text-gray-600">Study Groups</p>
                  </div>
                  <div className="text-center">
                     <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
                     <p className="text-gray-600">Daily Discussions</p>
                  </div>
                  <div className="text-center">
                     <div className="text-4xl font-bold text-purple-600 mb-2">45+</div>
                     <p className="text-gray-600">Countries</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Story Section */}
         <div className="bg-gray-50 py-16">
            <div className="max-w-[1100px] mx-auto px-4">
               <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
                  <div className="space-y-6 text-gray-600">
                     <p>
                        Founded in 2023, our platform emerged from a simple yet powerful idea:
                        education should be accessible to everyone, everywhere. We recognized the
                        growing need for flexible, high-quality online learning solutions that could
                        adapt to the busy lives of modern learners.
                     </p>
                     <p>
                        Today, we've grown into a global community of learners and educators, united
                        by our passion for knowledge and growth. Our platform has become a hub for
                        professionals, students, and lifelong learners seeking to expand their
                        horizons and achieve their goals.
                     </p>
                     <p>
                        We continue to innovate and evolve, always putting our community first and
                        striving to create the best possible learning experience for everyone who
                        joins us on this journey.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Values Section */}
         <div className="max-w-[1100px] mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {values.map((value, index) => (
                  <div
                     key={index}
                     className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                     <div className="text-green-600 mb-4">{value.icon}</div>
                     <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                     <p className="text-gray-600">{value.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default AboutPage;
