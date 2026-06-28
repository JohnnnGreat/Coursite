import React from "react";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

const ContactPage = () => {
   const contactMethods = [
      {
         icon: <Phone className="w-5 h-5" />,
         title: "Phone",
         detail: "+1 (555) 123-4567",
         sub: "Mon – Fri, 9am – 6pm",
      },
      {
         icon: <Mail className="w-5 h-5" />,
         title: "Email",
         detail: "support@coursite.io",
         sub: "Response within 24 hours",
      },
      {
         icon: <MessageCircle className="w-5 h-5" />,
         title: "Live chat",
         detail: "Start a conversation",
         sub: "Available 24/7",
      },
      {
         icon: <MapPin className="w-5 h-5" />,
         title: "Office",
         detail: "123 Learning Street",
         sub: "Suite 100, San Francisco",
      },
   ];

   return (
      <div className="min-h-screen bg-white">

         {/* Hero */}
         <section className="bg-zinc-950 text-white">
            <div className="max-w-[1100px] mx-auto px-6 pt-20 pb-24">
               <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Contact</p>
               <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-xl mb-6">
                  We're here to help.
               </h1>
               <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                  Whether you have a question, feedback, or just want to say hello — we read every message
                  and respond quickly.
               </p>
            </div>
         </section>

         {/* Contact methods */}
         <section className="py-16 bg-zinc-50 border-b border-zinc-100">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {contactMethods.map((m) => (
                     <div
                        key={m.title}
                        className="bg-white border border-zinc-100 rounded-2xl p-6 hover:border-zinc-200 hover:shadow-sm transition-all"
                     >
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                           {m.icon}
                        </div>
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">{m.title}</p>
                        <p className="font-semibold text-zinc-900 text-sm">{m.detail}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{m.sub}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Form */}
         <section className="py-24 bg-white">
            <div className="max-w-[1100px] mx-auto px-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                  <div>
                     <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Send a message</p>
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
                        Tell us what's on your mind.
                     </h2>
                     <p className="text-zinc-500 text-[15px] leading-relaxed">
                        We respond to every inquiry within one business day. For urgent technical issues,
                        use live chat — it's the fastest way to get help.
                     </p>
                  </div>

                  <form className="space-y-5">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-medium text-zinc-600 mb-1.5">First name</label>
                           <input
                              type="text"
                              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                              placeholder="Alex"
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-medium text-zinc-600 mb-1.5">Last name</label>
                           <input
                              type="text"
                              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                              placeholder="Rivera"
                           />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1.5">Email address</label>
                        <input
                           type="email"
                           className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                           placeholder="alex@example.com"
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1.5">Subject</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none">
                           <option>General inquiry</option>
                           <option>Technical support</option>
                           <option>Course content</option>
                           <option>Instructor application</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1.5">Message</label>
                        <textarea
                           rows={5}
                           className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                           placeholder="What can we help you with?"
                        />
                     </div>
                     <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors"
                     >
                        Send message
                     </button>
                  </form>
               </div>
            </div>
         </section>
      </div>
   );
};

export default ContactPage;
