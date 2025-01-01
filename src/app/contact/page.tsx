import React from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const ContactPage = () => {
   const contactMethods = [
      {
         icon: <Phone className="w-6 h-6" />,
         title: "Phone Support",
         description: "Monday to Friday, 9am to 6pm",
         contact: "+1 (555) 123-4567",
      },
      {
         icon: <Mail className="w-6 h-6" />,
         title: "Email",
         description: "We'll respond within 24 hours",
         contact: "support@example.com",
      },
      {
         icon: <MessageCircle className="w-6 h-6" />,
         title: "Live Chat",
         description: "Available 24/7",
         contact: "Start a conversation",
      },
      {
         icon: <MapPin className="w-6 h-6" />,
         title: "Office",
         description: "Visit us in person",
         contact: "123 Learning Street, Suite 100",
      },
   ];

   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <div className="container mx-auto px-4 py-16">
               <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                  <p className="text-xl mb-8">We're here to help with any questions you may have</p>
               </div>
            </div>
         </div>

         {/* Contact Methods */}
         <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
               {contactMethods.map((method, index) => (
                  <div
                     key={index}
                     className="p-6 text-center rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                     <div className="text-purple-600 mx-auto mb-4">{method.icon}</div>
                     <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                     <p className="text-gray-600 mb-2">{method.description}</p>
                     <p className="font-medium text-purple-600">{method.contact}</p>
                  </div>
               ))}
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
               <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                           First Name
                        </label>
                        <input
                           type="text"
                           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                           Last Name
                        </label>
                        <input
                           type="text"
                           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                     </label>
                     <input
                        type="email"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                     <select className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Billing Question</option>
                        <option>Course Content</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                     <textarea
                        rows={6}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                     ></textarea>
                  </div>
                  <button
                     type="submit"
                     className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                     Send Message
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default ContactPage;
