"use client";
import Header from "@/components/SharedUi/Header";
import { ToastContainer, toast } from "react-toastify";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";
import userState from "@/actions/userActions";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const { user } = userState((state) => state);
   const router = useRouter();

   useEffect(() => {
      if (user) {
         router.push("/dashboard");
      }
   }, [user]);

   return (
      <html lang="en">
         <body>
            {!user && <Header />}

            <div>{children}</div>

            {!user && (
               <footer className="bg-gray-900 text-white">
                  <div className="container mx-auto px-6 py-12">
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="space-y-4">
                           <h3 className="text-2xl font-bold">LearnHub</h3>
                           <p className="text-gray-400">
                              Empowering learners worldwide with free educational resources.
                           </p>
                           <div className="flex space-x-4">
                              <a
                                 href="#"
                                 className="text-gray-400 hover:text-white"
                              >
                                 Twitter
                              </a>
                              <a
                                 href="#"
                                 className="text-gray-400 hover:text-white"
                              >
                                 LinkedIn
                              </a>
                              <a
                                 href="#"
                                 className="text-gray-400 hover:text-white"
                              >
                                 Facebook
                              </a>
                           </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                           <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                           <ul className="space-y-2">
                              <li>
                                 <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                 >
                                    Find Courses
                                 </a>
                              </li>
                              <li>
                                 <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                 >
                                    Become an Instructor
                                 </a>
                              </li>
                              <li>
                                 <a
                                    href="/learning-path"
                                    className="text-gray-400 hover:text-white"
                                 >
                                    Learning Path
                                 </a>
                              </li>
                              <li>
                                 <a
                                    href="/success-stories"
                                    className="text-gray-400 hover:text-white"
                                 >
                                    Success Stories
                                 </a>
                              </li>
                           </ul>
                        </div>

                        {/* Support */}
                        <div>
                           <h4 className="text-lg font-semibold mb-4">Support</h4>
                           <ul className="space-y-2">
                              <li>
                                 <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                 >
                                    Help Center
                                 </a>
                              </li>
                              <li>
                                 <a
                                    href="/contact"
                                    className="text-gray-400 hover:text-white"
                                 >
                                    Contact Us
                                 </a>
                              </li>
                              <li>
                                 <a
                                    href="/faq"
                                    className="text-gray-400 hover:text-white"
                                 >
                                    FAQ
                                 </a>
                              </li>
                              <li>
                                 <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                 >
                                    Terms of Service
                                 </a>
                              </li>
                           </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                           <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                           <p className="text-gray-400 mb-4">
                              Subscribe to our newsletter for the latest updates and courses.
                           </p>
                           <form className="space-y-2">
                              <input
                                 type="email"
                                 placeholder="Enter your email"
                                 className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                 type="submit"
                                 className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                              >
                                 Subscribe
                              </button>
                           </form>
                        </div>
                     </div>

                     <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Coursite. All rights reserved.</p>
                     </div>
                  </div>
               </footer>
            )}

            <ToastContainer />
         </body>
      </html>
   );
}
