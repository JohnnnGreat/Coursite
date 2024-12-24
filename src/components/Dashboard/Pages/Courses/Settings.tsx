import { useState, useEffect } from "react";
import useCourseInformation from "@/actions/courseActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
const Settings = () => {
   const { addToCoursePayload, courseInformation } = useCourseInformation((state) => state);

   const [courseCert, setCourseCert] = useState(courseInformation?.courseCertification || false);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCourseCert(event.target.checked);
   };

   useEffect(() => {
      addToCoursePayload({ courseCertification: courseCert });
   }, [courseCert]);

   return (
      <div className="space-y-2">
         <Card>
            <CardHeader>
               <CardTitle>Course Settings</CardTitle>
               <CardDescription>Configure your course settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               {/* Pricing */}
               <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <div className="relative">
                     <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                     <input
                        type="text"
                        placeholder="99.99"
                        className="w-full pl-10 p-2 border rounded-lg"
                        value={courseInformation?.price}
                        onChange={(e) => {
                           addToCoursePayload({ price: e.target.value });
                        }}
                     />
                  </div>
               </div>

               {/* Welcome Message */}
               <div>
                  <label className="block text-sm font-medium mb-2">Welcome Message</label>
                  <textarea
                     rows={3}
                     placeholder="Message to display to enrolled students..."
                     className="w-full p-2 border rounded-lg"
                     onChange={(e) => {
                        addToCoursePayload({ welcomeMessage: e.target.value });
                     }}
                     value={courseInformation?.welcomeMessage}
                  />
               </div>

               {/* Course Certificate */}
               <div className="flex items-start space-x-2">
                  <input
                     type="checkbox"
                     className="mt-1"
                     onChange={handleChange}
                     checked={courseCert}
                  />
                  <div>
                     <label className="block text-sm font-medium">Enable Course Certificate</label>
                     <p className="text-sm text-gray-500">
                        Students will receive a certificate upon course completion
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* SEO Settings */}
         <Card>
            <CardHeader>
               <CardTitle>SEO Settings</CardTitle>
               <CardDescription>Optimize your course for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <label className="block text-sm font-medium mb-2">SEO Title</label>
                  <input
                     type="text"
                     placeholder="SEO optimized title"
                     className="w-full p-2 border rounded-lg"
                     onChange={(e) => {
                        addToCoursePayload({ seoTitle: e.target.value });
                     }}
                     value={courseInformation?.seoTitle}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <textarea
                     rows={3}
                     placeholder="Brief description for search engines..."
                     className="w-full p-2 border rounded-lg"
                     onChange={(e) => {
                        addToCoursePayload({ metaDescription: e.target.value });
                     }}
                     value={courseInformation?.metaDescription}
                  />
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default Settings;
