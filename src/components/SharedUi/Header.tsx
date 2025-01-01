"use client";
import React from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getSession } from "next-auth/react";

const Header = () => {
   const [isOpen, setIsOpen] = React.useState(false);

   const [user, setUser] = React.useState(null);

   React.useEffect(() => {
      async function getUser() {
         const session = await getSession();
         if (session?.user) {
            setUser(session?.user);
         }
      }

      getUser();
   }, []);
   return (
      <header className="bg-white border-b border-gray-100  w-full top-0 z-50">
         <nav className="max-w-[1100px] mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
               {/* Logo */}
               <div className="flex items-center">
                  <a
                     href="/"
                     className="text-2xl font-bold text-blue-600"
                  >
                     Coursite.
                  </a>
               </div>

               {/* Desktop Navigation */}
               <div className="hidden md:flex items-center space-x-8">
                  <div className="relative group">
                     <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                        <span>Courses</span>
                        <ChevronDown className="w-4 h-4" />
                     </button>
                     <div className="absolute top-full -left-4 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-2 hidden group-hover:block">
                        <a
                           href="#"
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                           Web Development
                        </a>
                        <a
                           href="#"
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                           Design
                        </a>
                        <a
                           href="#"
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                           Business
                        </a>
                     </div>
                  </div>
                  <Link
                     href="/teaching"
                     className="text-gray-600 hover:text-gray-900"
                  >
                     Teach
                  </Link>
                  <Link
                     href="/community"
                     className="text-gray-600 hover:text-gray-900"
                  >
                     Community
                  </Link>
                  <Link
                     href="/about"
                     className="text-gray-600 hover:text-gray-900"
                  >
                     About
                  </Link>
               </div>

               {user ? (
                  <Link
                     href="/dashboard"
                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                     Dashboard
                  </Link>
               ) : (
                  <div className="hidden md:flex items-center space-x-4">
                     <Link
                        href="/login"
                        className="text-gray-600 hover:text-gray-900"
                     >
                        Login
                     </Link>
                     <Link
                        href="/register"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                     >
                        Sign Up
                     </Link>
                  </div>
               )}
               {/* Auth Buttons */}

               {/* Mobile Menu Button */}
               <button
                  className="md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
               >
                  {isOpen ? (
                     <X className="w-6 h-6 text-gray-600" />
                  ) : (
                     <Menu className="w-6 h-6 text-gray-600" />
                  )}
               </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
               <div className="md:hidden mt-4 pb-4">
                  <a
                     href="#"
                     className="block py-2 text-gray-600 hover:text-gray-900"
                  >
                     Courses
                  </a>
                  <Link
                     href="/teaching"
                     className="block py-2 text-gray-600 hover:text-gray-900"
                  >
                     Teach
                  </Link>
                  <Link
                     href="/community"
                     className="block py-2 text-gray-600 hover:text-gray-900"
                  >
                     Community
                  </Link>
                  <Link
                     href="/about"
                     className="block py-2 text-gray-600 hover:text-gray-900"
                  >
                     About
                  </Link>
                  <div className="mt-4 space-y-2">
                     <a
                        href="/login"
                        className="block w-full text-center py-2 text-gray-600 hover:text-gray-900"
                     >
                        Login
                     </a>
                     <a
                        href="/signup"
                        className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                     >
                        Sign Up
                     </a>
                  </div>
               </div>
            )}
         </nav>
      </header>
   );
};

export default Header;
