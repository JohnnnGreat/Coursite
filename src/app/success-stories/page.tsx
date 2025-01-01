import React from "react";
import { Star, Quote } from "lucide-react";

const SuccessStoriesPage = () => {
   const stories = [
      {
         name: "Sarah Johnson",
         role: "Web Developer at Google",
         image: "/api/placeholder/80/80",
         course: "Full Stack Development",
         story: "After completing the web development path, I landed my dream job at Google. The practical projects and mentor support made all the difference.",
         achievement: "Secured position at top tech company",
         rating: 5,
      },
      {
         name: "Michael Chen",
         role: "Data Scientist",
         image: "/api/placeholder/80/80",
         course: "Data Science Bootcamp",
         story: "The structured learning approach and real-world projects helped me transition from finance to data science in just 6 months.",
         achievement: "Career transition success",
         rating: 5,
      },
      {
         name: "Emma Davis",
         role: "Freelance Designer",
         image: "/api/placeholder/80/80",
         course: "UI/UX Design",
         story: "The skills I learned allowed me to start my own freelance business. I now work with clients worldwide and have tripled my income.",
         achievement: "Started successful business",
         rating: 5,
      },
   ];

   const metrics = [
      { number: "89%", label: "Job Placement Rate" },
      { number: "94%", label: "Course Completion" },
      { number: "3x", label: "Average Salary Increase" },
      { number: "45 Days", label: "Average Time to Job Offer" },
   ];

   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
            <div className="container mx-auto px-4 py-16">
               <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl font-bold mb-6">Student Success Stories</h1>
                  <p className="text-xl mb-8">
                     Real stories from students who transformed their careers through our platform
                  </p>
               </div>
            </div>
         </div>

         {/* Success Metrics */}
         <div className="max-w-[1100px] mx-auto px-4 py-16">
            <div className="grid md:grid-cols-4 gap-8">
               {metrics.map((metric, index) => (
                  <div
                     key={index}
                     className="text-center"
                  >
                     <div className="text-4xl font-bold text-orange-500 mb-2">{metric.number}</div>
                     <p className="text-gray-600">{metric.label}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* Success Stories */}
         <div className="bg-gray-50 py-16">
            <div className="max-w-[1100px] mx-auto px-4">
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {stories.map((story, index) => (
                     <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-6"
                     >
                        <div className="flex items-center gap-4 mb-6">
                           <img
                              src={story.image}
                              alt={story.name}
                              className="w-16 h-16 rounded-full"
                           />
                           <div>
                              <h3 className="font-semibold">{story.name}</h3>
                              <p className="text-gray-600">{story.role}</p>
                           </div>
                        </div>
                        <div className="mb-4">
                           <Quote className="w-8 h-8 text-orange-500 mb-2" />
                           <p className="text-gray-600">{story.story}</p>
                        </div>
                        <div className="border-t pt-4">
                           <p className="text-sm text-gray-500">Course: {story.course}</p>
                           <div className="flex mt-2">
                              {[...Array(story.rating)].map((_, i) => (
                                 <Star
                                    key={i}
                                    className="w-4 h-4 fill-current text-yellow-400"
                                 />
                              ))}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SuccessStoriesPage;
