import React from "react";
import { MessageCircle, Users, Share2, Heart } from "lucide-react";

const CommunityPage = () => {
   const features = [
      {
         icon: <MessageCircle className="w-6 h-6" />,
         title: "Discussion Forums",
         description:
            "Engage in meaningful discussions with peers and experts in your field of interest.",
      },
      {
         icon: <Users className="w-6 h-6" />,
         title: "Study Groups",
         description: "Join or create study groups to collaborate with fellow learners.",
      },
      {
         icon: <Share2 className="w-6 h-6" />,
         title: "Resource Sharing",
         description: "Share and access valuable learning resources within the community.",
      },
      {
         icon: <Heart className="w-6 h-6" />,
         title: "Peer Support",
         description: "Get help and support from community members on your learning journey.",
      },
   ];

   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <div className="max-w-[1100px] mx-auto px-4 py-16">
               <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl font-bold mb-6">Join Our Learning Community</h1>
                  <p className="text-xl mb-8">
                     Connect, collaborate, and grow with fellow learners from around the world
                  </p>
                  <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                     Join Community
                  </button>
               </div>
            </div>
         </div>

         {/* Features Section */}
         <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Community Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {features.map((feature, index) => (
                  <div
                     key={index}
                     className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                     <div className="text-purple-600 mb-4">{feature.icon}</div>
                     <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                     <p className="text-gray-600">{feature.description}</p>
                  </div>
               ))}
            </div>
         </div>

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
      </div>
   );
};

export default CommunityPage;
