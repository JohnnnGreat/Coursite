import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
   ArrowRight,
   BookOpen,
   Users,
   Award,
   MessageSquare,
   Play,
   ChevronRight,
} from "lucide-react";
// In a server component
async function ProfilePage() {
   const session = await getServerSession(authOptions);

   if (!session) {
      return <p>Please log in</p>;
   }

   return (
      <>
         <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r h-screen flex items-center from-blue-600 to-indigo-700 text-white">
               <div className="max-w-[1100px] mx-auto px-6 py-24">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                           Share Your Knowledge, Transform Lives
                        </h1>
                        <p className="text-lg mb-8">
                           Create and share courses effortlessly. Connect with learners worldwide
                           and make an impact.
                        </p>
                        <div className="flex gap-4">
                           <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100">
                              Start Teaching <ArrowRight className="w-5 h-5" />
                           </button>
                           <button className="border border-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10">
                              Browse Courses <ChevronRight className="w-5 h-5" />
                           </button>
                        </div>
                     </div>
                     <div className="hidden md:block">
                        <img
                           src="/api/placeholder/600/400"
                           alt="Learning Platform"
                           className="rounded-lg shadow-xl"
                        />
                     </div>
                  </div>
               </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
               <div className="max-w-[1100px] mx-auto px-6">
                  <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our Platform</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-white p-8 rounded-xl shadow-sm">
                        <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-4">Rich Course Creation Tools</h3>
                        <p className="text-gray-600">
                           Build engaging courses with our intuitive tools. Add videos, quizzes, and
                           more.
                        </p>
                     </div>
                     <div className="bg-white p-8 rounded-xl shadow-sm">
                        <Users className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-4">Growing Community</h3>
                        <p className="text-gray-600">
                           Join thousands of instructors and learners. Share knowledge and grow
                           together.
                        </p>
                     </div>
                     <div className="bg-white p-8 rounded-xl shadow-sm">
                        <Award className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold mb-4">Free Access</h3>
                        <p className="text-gray-600">
                           All courses are free. Focus on learning without any financial barriers.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20">
               <div className="max-w-[1100px] mx-auto px-6">
                  <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div>
                        <div className="mb-8">
                           <div className="flex items-center gap-4 mb-4">
                              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                 1
                              </div>
                              <h3 className="text-xl font-semibold">Create Your Course</h3>
                           </div>
                           <p className="text-gray-600 ml-12">
                              Design your curriculum and upload content using our easy-to-use tools.
                           </p>
                        </div>
                        <div className="mb-8">
                           <div className="flex items-center gap-4 mb-4">
                              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                 2
                              </div>
                              <h3 className="text-xl font-semibold">Share Your Knowledge</h3>
                           </div>
                           <p className="text-gray-600 ml-12">
                              Publish your course and reach students worldwide.
                           </p>
                        </div>
                        <div>
                           <div className="flex items-center gap-4 mb-4">
                              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                 3
                              </div>
                              <h3 className="text-xl font-semibold">Engage with Students</h3>
                           </div>
                           <p className="text-gray-600 ml-12">
                              Interact with learners through discussions and feedback.
                           </p>
                        </div>
                     </div>
                     <div>
                        <img
                           src="/api/placeholder/600/400"
                           alt="How It Works"
                           className="rounded-lg shadow-xl"
                        />
                     </div>
                  </div>
               </div>
            </section>

            {/* Stats Section */}
            <section className="bg-blue-600 text-white py-20">
               <div className="max-w-[1100px] mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                     <div>
                        <div className="text-4xl font-bold mb-2">10K+</div>
                        <div className="text-blue-100">Active Students</div>
                     </div>
                     <div>
                        <div className="text-4xl font-bold mb-2">500+</div>
                        <div className="text-blue-100">Free Courses</div>
                     </div>
                     <div>
                        <div className="text-4xl font-bold mb-2">200+</div>
                        <div className="text-blue-100">Expert Instructors</div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Featured Courses Section */}
            <section className="py-20">
               <div className="max-w-[1100px] mx-auto px-6">
                  <h2 className="text-3xl font-bold text-center mb-16">Featured Courses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[1, 2, 3].map((item) => (
                        <div
                           key={item}
                           className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                           <img
                              src={`/api/placeholder/400/250`}
                              alt="Course"
                              className="w-full"
                           />
                           <div className="p-6">
                              <div className="text-sm text-blue-600 mb-2">Development</div>
                              <h3 className="text-xl font-semibold mb-2">
                                 Complete Web Development Course
                              </h3>
                              <p className="text-gray-600 mb-4">
                                 Learn web development from scratch with practical projects.
                              </p>
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

            {/* Testimonials Section */}
            <section className="bg-gray-50 py-20">
               <div className="max-w-[1100px] mx-auto px-6">
                  <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[1, 2].map((item) => (
                        <div
                           key={item}
                           className="bg-white p-8 rounded-xl shadow-sm"
                        >
                           <div className="flex items-center gap-4 mb-6">
                              <img
                                 src={`/api/placeholder/64/64`}
                                 alt="User"
                                 className="w-16 h-16 rounded-full"
                              />
                              <div>
                                 <div className="font-semibold">John Doe</div>
                                 <div className="text-gray-500">Web Developer</div>
                              </div>
                           </div>
                           <p className="text-gray-600">
                              "The platform has been incredible for both teaching and learning. The
                              tools are intuitive, and the community is super supportive."
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
               <div className="max-w-[1100px] mx-auto px-6 text-center">
                  <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                     Join our community of learners and instructors. Create or enroll in courses for
                     free today.
                  </p>
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-blue-700">
                     Get Started Now <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
            </section>
         </div>
      </>
   );
}

export default ProfilePage;
