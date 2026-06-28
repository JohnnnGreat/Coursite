"use client";
import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";

const FAQPage = () => {
   const [openIndex, setOpenIndex] = useState<string | null>(null);
   const [searchQuery, setSearchQuery] = useState("");

   const faqCategories = [
      {
         category: "Getting started",
         questions: [
            {
               q: "How do I create an account?",
               a: "Creating an account is simple. Click 'Get started', enter your email address, create a password, and follow the verification steps. The whole process takes under two minutes.",
            },
            {
               q: "Is Coursite really free?",
               a: "Yes, completely. All courses on Coursite are free to access. We believe education should be accessible to everyone, not gated behind paywalls.",
            },
            {
               q: "Can I try a course before committing?",
               a: "All courses are free, so there's nothing to commit to. Browse, enroll, and start learning anytime — with no strings attached.",
            },
         ],
      },
      {
         category: "Course access",
         questions: [
            {
               q: "How long do I have access to a course?",
               a: "Lifetime access. Once you enroll in a course, the content is yours forever — including any future updates the instructor makes.",
            },
            {
               q: "Can I download course materials?",
               a: "Most course materials including PDFs, worksheets, and resources are available for download from within the course player.",
            },
         ],
      },
      {
         category: "Technical support",
         questions: [
            {
               q: "What do I do if I'm having technical issues?",
               a: "Our support team is available 24/7 via live chat or email at support@coursite.io. For the fastest response, use live chat.",
            },
            {
               q: "Are courses mobile-friendly?",
               a: "Yes. All courses are fully responsive and work on any device — phone, tablet, or desktop — without needing a separate app.",
            },
         ],
      },
   ];

   const toggleAccordion = (index: string) => {
      setOpenIndex(openIndex === index ? null : index);
   };

   const filteredCategories = faqCategories
      .map((cat) => ({
         ...cat,
         questions: cat.questions.filter(
            (q) =>
               q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase()),
         ),
      }))
      .filter((cat) => cat.questions.length > 0);

   return (
      <div className="min-h-screen bg-white">

         {/* Hero */}
         <section className="bg-zinc-950 text-white">
            <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-24">
               <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Support</p>
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-xl mb-6">
                  Frequently asked questions.
               </h1>
               <p className="text-zinc-400 text-lg max-w-xl leading-relaxed mb-10">
                  Quick answers to the most common questions about Coursite. Can't find what you need?{" "}
                  <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                     Contact us.
                  </Link>
               </p>

               {/* Search */}
               <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                     type="text"
                     placeholder="Search questions…"
                     className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm placeholder:text-zinc-500 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
            </div>
         </section>

         {/* FAQ Accordion */}
         <section className="py-20 bg-white">
            <div className="max-w-[700px] mx-auto px-6">
               {filteredCategories.length === 0 && (
                  <div className="text-center py-16">
                     <p className="text-zinc-400 text-sm">No results for &ldquo;{searchQuery}&rdquo;</p>
                     <Link href="/contact" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                        Ask us directly →
                     </Link>
                  </div>
               )}

               {filteredCategories.map((category, ci) => (
                  <div key={ci} className="mb-12">
                     <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-6">
                        {category.category}
                     </p>
                     <div className="space-y-1">
                        {category.questions.map((faq, qi) => {
                           const key = `${ci}-${qi}`;
                           const isOpen = openIndex === key;
                           return (
                              <div
                                 key={qi}
                                 className="border border-zinc-100 rounded-xl overflow-hidden"
                              >
                                 <button
                                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-zinc-50 transition-colors"
                                    onClick={() => toggleAccordion(key)}
                                 >
                                    <span className="text-sm font-medium text-zinc-900">{faq.q}</span>
                                    <ChevronDown
                                       className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                                          isOpen ? "rotate-180" : ""
                                       }`}
                                    />
                                 </button>
                                 {isOpen && (
                                    <div className="px-6 pb-5 border-t border-zinc-100 bg-zinc-50">
                                       <p className="text-sm text-zinc-600 leading-relaxed pt-4">{faq.a}</p>
                                    </div>
                                 )}
                              </div>
                           );
                        })}
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Still need help */}
         <section className="bg-zinc-950 text-white py-20">
            <div className="max-w-[1100px] mx-auto px-6 text-center">
               <h2 className="text-3xl font-bold tracking-tight mb-3">Still have questions?</h2>
               <p className="text-zinc-400 text-[15px] mb-8 max-w-sm mx-auto">
                  Our support team is real, responsive, and ready to help.
               </p>
               <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors text-sm"
               >
                  Contact support
               </Link>
            </div>
         </section>
      </div>
   );
};

export default FAQPage;
