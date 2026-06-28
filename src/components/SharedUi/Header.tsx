"use client";
import React from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { getSession } from "next-auth/react";

const Header = () => {
   const [isOpen, setIsOpen] = React.useState(false);
   const [user, setUser] = React.useState(null);
   const [scrolled, setScrolled] = React.useState(false);

   React.useEffect(() => {
      async function getUser() {
         const session = await getSession();
         if (session?.user) setUser(session?.user);
      }
      getUser();

      const handleScroll = () => setScrolled(window.scrollY > 8);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <header
         className={`sticky top-0 z-50 w-full transition-all duration-200 ${
            scrolled
               ? "bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm"
               : "bg-white border-b border-zinc-100"
         }`}
      >
         <nav className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-zinc-900 tracking-tight">
               Coursite<span className="text-blue-600">.</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
               <Link href="/teaching" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
                  Teach
               </Link>
               <Link href="/learning-path" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
                  Learning Paths
               </Link>
               <Link href="/community" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
                  Community
               </Link>
               <Link href="/about" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
                  About
               </Link>
            </div>

            {user ? (
               <Link
                  href="/dashboard"
                  className="hidden md:inline-flex bg-zinc-900 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-zinc-700 transition-colors"
               >
                  Dashboard
               </Link>
            ) : (
               <div className="hidden md:flex items-center gap-3">
                  <Link href="/login" className="text-sm text-zinc-500 hover:text-zinc-900 font-medium transition-colors">
                     Log in
                  </Link>
                  <Link
                     href="/register"
                     className="bg-zinc-900 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-zinc-700 transition-colors"
                  >
                     Get started
                  </Link>
               </div>
            )}

            <button
               className="md:hidden text-zinc-600 hover:text-zinc-900"
               onClick={() => setIsOpen(!isOpen)}
               aria-label="Toggle menu"
            >
               {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
         </nav>

         {isOpen && (
            <div className="md:hidden border-t border-zinc-100 bg-white px-6 py-4 space-y-1">
               {[
                  { href: "/teaching", label: "Teach" },
                  { href: "/learning-path", label: "Learning Paths" },
                  { href: "/community", label: "Community" },
                  { href: "/about", label: "About" },
               ].map((link) => (
                  <Link
                     key={link.href}
                     href={link.href}
                     className="block py-2 text-sm text-zinc-600 hover:text-zinc-900 font-medium"
                     onClick={() => setIsOpen(false)}
                  >
                     {link.label}
                  </Link>
               ))}
               <div className="pt-3 flex flex-col gap-2 border-t border-zinc-100 mt-2">
                  <Link href="/login" className="text-sm text-center text-zinc-600 py-2 font-medium">
                     Log in
                  </Link>
                  <Link
                     href="/register"
                     className="text-sm text-center bg-zinc-900 text-white py-2 rounded-lg font-medium"
                  >
                     Get started
                  </Link>
               </div>
            </div>
         )}
      </header>
   );
};

export default Header;
