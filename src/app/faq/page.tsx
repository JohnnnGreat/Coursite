"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FAQPage = () => {
   const [openIndex, setOpenIndex] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");

   const faqCategories = [
      {
         category: "Getting Started",
         questions: [
            {
               q: "How do I create an account?",
               a: "Creating an account is simple. Click the 'Sign Up' button, enter your email address, create a password, and follow the verification process.",
            },
            {
               q: "What payment methods do you accept?",
               a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Some courses also offer payment plans.",
            },
            {
               q: "Can I try a course before buying?",
               a: "Yes! Many of our courses offer free preview lessons. Additionally, we have a 30-day money-back guarantee if you're not satisfied.",
            },
         ],
      },
      {
         category: "Course Access",
         questions: [
            {
               q: "How long do I have access to a course?",
               a: "Once you purchase a course, you have lifetime access to the content, including any future updates.",
            },
            {
               q: "Can I download course materials?",
               a: "Yes, most course materials are available for download, including PDFs, worksheets, and exercise files.",
            },
         ],
      },
      {
         category: "Technical Support",
         questions: [
            {
               q: "What do I do if I'm having technical issues?",
               a: "Our support team is available 24/7. You can reach us through the help center, email, or live chat for immediate assistance.",
            },
            {
               q: "Are the courses mobile-friendly?",
               a: "Yes, all our courses are fully responsive and can be accessed on any device through our website or mobile app.",
            },
         ],
      },
   ];

   const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
   };

   const filteredCategories = faqCategories
      .map((category) => ({
         ...category,
         questions: category.questions.filter(
            (q) =>
               q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase()),
         ),
      }))
      .filter((category) => category.questions.length > 0);

   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <div className="container mx-auto px-4 py-16">
               <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
                  <p className="text-xl mb-8">
                     Find answers to common questions about our platform
                  </p>
               </div>
            </div>
         </div>

         {/* Search Section */}
         <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto relative">
               <input
                  type="text"
                  placeholder="Search FAQ..."
                  className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
               <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            </div>
         </div>

         {/* FAQ Accordion */}
         <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
               {filteredCategories.map((category, categoryIndex) => (
                  <div
                     key={categoryIndex}
                     className="mb-8"
                  >
                     <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                     <div className="space-y-4">
                        {category.questions.map((faq, index) => {
                           const actualIndex = `${categoryIndex}-${index}`;
                           return (
                              <div
                                 key={index}
                                 className="border rounded-lg overflow-hidden"
                              >
                                 <button
                                    className="w-full p-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                                    onClick={() => toggleAccordion(actualIndex)}
                                 >
                                    <span className="font-medium">{faq.q}</span>
                                    {openIndex === actualIndex ? (
                                       <ChevronUp className="w-5 h-5 text-teal-600" />
                                    ) : (
                                       <ChevronDown className="w-5 h-5 text-teal-600" />
                                    )}
                                 </button>
                                 {openIndex === actualIndex && (
                                    <div className="p-4 bg-gray-50 border-t">
                                       <p className="text-gray-600">{faq.a}</p>
                                    </div>
                                 )}
                              </div>
                           );
                        })}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default FAQPage;
