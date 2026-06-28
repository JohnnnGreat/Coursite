"use client";
import Header from "@/components/SharedUi/Header";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState(null);
   const router = useRouter();

   useEffect(() => {
      async function getUser() {
         const session = await getSession();
         if (session?.user) setUser(session?.user);
      }
      getUser();
   }, []);

   useEffect(() => {
      if (user) router.push("/dashboard");
   }, [user]);

   return (
      <html lang="en">
         <body>
            {!user && <Header />}
            <div>{children}</div>

            {!user && (
               <footer className="bg-zinc-950 text-white">
                  <div className="max-w-[1100px] mx-auto px-6 py-16">
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-zinc-800">
                        <div className="md:col-span-1 space-y-4">
                           <Link href="/" className="text-xl font-bold tracking-tight">
                              Coursite<span className="text-blue-500">.</span>
                           </Link>
                           <p className="text-zinc-400 text-sm leading-relaxed">
                              Empowering learners worldwide with free, high-quality educational resources.
                           </p>
                           <div className="flex gap-4 pt-1">
                              {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                                 <a key={s} href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">
                                    {s}
                                 </a>
                              ))}
                           </div>
                        </div>

                        <div>
                           <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Learn</p>
                           <ul className="space-y-3">
                              {[
                                 { label: "Browse Courses", href: "#" },
                                 { label: "Learning Paths", href: "/learning-path" },
                                 { label: "Success Stories", href: "/success-stories" },
                                 { label: "Community", href: "/community" },
                              ].map((l) => (
                                 <li key={l.label}>
                                    <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                       {l.label}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </div>

                        <div>
                           <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Teach</p>
                           <ul className="space-y-3">
                              {[
                                 { label: "Become an Instructor", href: "/teaching" },
                                 { label: "Course Builder", href: "/dashboard" },
                                 { label: "Instructor FAQ", href: "/faq" },
                              ].map((l) => (
                                 <li key={l.label}>
                                    <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                       {l.label}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </div>

                        <div>
                           <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Company</p>
                           <ul className="space-y-3">
                              {[
                                 { label: "About Us", href: "/about" },
                                 { label: "Contact", href: "/contact" },
                                 { label: "FAQ", href: "/faq" },
                                 { label: "Terms of Service", href: "#" },
                              ].map((l) => (
                                 <li key={l.label}>
                                    <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                       {l.label}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>

                     <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-zinc-500">
                           &copy; {new Date().getFullYear()} Coursite. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                           <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy</a>
                           <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms</a>
                           <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Cookies</a>
                        </div>
                     </div>
                  </div>
               </footer>
            )}

            <ToastContainer />
         </body>
      </html>
   );
}
