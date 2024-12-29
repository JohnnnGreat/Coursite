import GlobalErrorHandler from "./error";
import "./globals.css";

export const metadata = {
   title: "Skill Gap Assessment Tool",
   description: "A SaaS for identifying skill gaps",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <GlobalErrorHandler>
         <html lang="en">
            <body>
               <nav className="bg-white shadow-sm fixed w-full z-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="flex justify-between h-16">
                        <div className="flex items-center">
                           <span className="text-2xl font-bold text-indigo-600">LearnHub</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                           <a
                              href="#"
                              className="text-gray-600 hover:text-gray-900"
                           >
                              Features
                           </a>
                           <a
                              href="#"
                              className="text-gray-600 hover:text-gray-900"
                           >
                              Pricing
                           </a>
                           <a
                              href="#"
                              className="text-gray-600 hover:text-gray-900"
                           >
                              For Instructors
                           </a>
                           <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                              Get Started
                           </button>
                        </div>
                     </div>
                  </div>
               </nav>
               <div>{children}</div>
            </body>
         </html>
      </GlobalErrorHandler>
   );
}
