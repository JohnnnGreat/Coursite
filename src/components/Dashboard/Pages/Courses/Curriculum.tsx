"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Clock, Trash2, Video, FileText, Link as LinkIcon } from "lucide-react";
import { z } from "zod";
import TextField from "@/components/SharedUi/TextField";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useCourseInformation from "@/actions/courseActions";

interface Lesson {
   id: number;
   title: string;
   duration: string;
   type: "video" | "article" | "link";
   description: string;
   resourceUrl: string;
}

export interface Section {
   id: number;
   title: string;
   lessons: Lesson[];
   isAddingLesson: boolean;
}

// Enhanced schema for lesson form
const lessonSchema = z.object({
   title: z.string().min(1, "Lesson title is required"),
   duration: z.string().regex(/^\d{2}:\d{2}$/, "Duration must be in MM:SS format"),
   type: z.enum(["video", "article", "link"], {
      required_error: "Please select a lesson type",
   }),
   description: z.string().min(1, "Description is required"),
   resourceUrl: z.string().url("Please enter a valid URL"),
});

type LessonFormData = z.infer<typeof lessonSchema>;

const Curriculum = () => {
   const courseInformation = useCourseInformation((state) => state.courseInformation);
   const [sections, setSections] = useState<Section[]>(courseInformation?.sections || []);

   const [activeSectionId, setActiveSectionId] = useState<number | null>(null);

   const form = useForm<LessonFormData>({
      resolver: zodResolver(lessonSchema),
      defaultValues: {
         title: "",
         duration: "00:00",
         type: "video",
         description: "",
         resourceUrl: "",
      },
   });

   const getLessonTypeIcon = (type: Lesson["type"]) => {
      switch (type) {
         case "video":
            return <Video className="h-4 w-4" />;
         case "article":
            return <FileText className="h-4 w-4" />;
         case "link":
            return <LinkIcon className="h-4 w-4" />;
      }
   };

   const addSection = () => {
      setSections((prev) => [
         ...prev,
         {
            id: Date.now(),
            title: `Section ${prev.length + 1}: New Section`,
            lessons: [],
            isAddingLesson: false,
         },
      ]);
   };

   const toggleAddLesson = (sectionId: number) => {
      setSections((prev) =>
         prev.map((section) =>
            section.id === sectionId
               ? { ...section, isAddingLesson: !section.isAddingLesson }
               : { ...section, isAddingLesson: false },
         ),
      );
      setActiveSectionId(sectionId);
      form.reset();
   };

   const updateSectionTitle = (sectionId: number, newTitle: string) => {
      setSections((prev) =>
         prev.map((section) =>
            section.id === sectionId ? { ...section, title: newTitle } : section,
         ),
      );
   };

   const addLesson = (sectionId: number, data: LessonFormData) => {
      setSections((prev) =>
         prev.map((section) =>
            section.id === sectionId
               ? {
                    ...section,
                    lessons: [
                       ...section.lessons,
                       {
                          id: Date.now(),
                          ...data,
                       },
                    ],
                    isAddingLesson: false,
                 }
               : section,
         ),
      );

      form.reset();
   };

   useEffect(() => {
      addToCoursePayload({ sections: sections }, true);
   }, [sections]);

   const deleteLesson = (sectionId: number, lessonId: number) => {
      setSections((prev) =>
         prev.map((section) =>
            section.id === sectionId
               ? {
                    ...section,
                    lessons: section.lessons.filter((lesson) => lesson.id !== lessonId),
                 }
               : section,
         ),
      );
   };

   const deleteSection = (sectionId: number) => {
      setSections((prev) => prev.filter((section) => section.id !== sectionId));
      if (activeSectionId === sectionId) {
         setActiveSectionId(null);
         form.reset();
      }
   };

   const addToCoursePayload = useCourseInformation((state) => state.addToCoursePayload);

   return (
      <div className="border rounded-[10px]">
         <CardHeader className="border-b">
            <CardTitle className="text-2xl font-bold">Course Curriculum</CardTitle>
            <CardDescription>Organize your course content</CardDescription>
         </CardHeader>
         <CardContent className="p-6">
            <div className="space-y-6">
               {sections.map((section) => (
                  <div
                     key={section.id}
                     className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                     <div className="flex justify-between items-center mb-4">
                        <input
                           type="text"
                           className="text-lg font-medium bg-transparent border-none focus:outline-none"
                           value={section.title}
                           onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        />
                        <div className="flex gap-2">
                           <button
                              className="text-blue-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
                              onClick={() => toggleAddLesson(section.id)}
                           >
                              <Plus className="h-5 w-5" />
                           </button>
                           <button
                              className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                              onClick={() => deleteSection(section.id)}
                           >
                              <Trash2 className="h-5 w-5" />
                           </button>
                        </div>
                     </div>

                     <div className="space-y-2">
                        {section.lessons.map((lesson) => (
                           <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                           >
                              <div className="flex items-center gap-3">
                                 <div className="flex items-center gap-2">
                                    {getLessonTypeIcon(lesson.type)}
                                    <div>
                                       <span className="font-medium">{lesson.title}</span>
                                       <p className="text-sm text-gray-500 mt-1">
                                          {lesson.description}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-4">
                                 <a
                                    href={lesson.resourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700"
                                 >
                                    <LinkIcon className="h-4 w-4" />
                                 </a>
                                 <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span>{lesson.duration}</span>
                                 </div>
                                 <button
                                    onClick={() => deleteLesson(section.id, lesson.id)}
                                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                                 >
                                    <Trash2 className="h-4 w-4" />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>

                     {section.isAddingLesson && (
                        <div className="mt-4 ml-8 p-4 bg-gray-50 rounded-lg">
                           <Form {...form}>
                              <form
                                 onSubmit={form.handleSubmit((data) => addLesson(section.id, data))}
                                 className="space-y-4"
                              >
                                 <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                       label="Lesson Title"
                                       name="title"
                                       placeholder="Enter Lesson Title"
                                       form={form}
                                       classname="w-full"
                                    />
                                    <TextField
                                       label="Duration (MM:SS)"
                                       name="duration"
                                       placeholder="00:00"
                                       form={form}
                                       classname="w-full"
                                    />
                                 </div>

                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="form-control w-full">
                                       <label className="label">
                                          <span className="label-text">Lesson Type</span>
                                       </label>
                                       <select
                                          {...form.register("type")}
                                          className="select select-bordered w-full"
                                       >
                                          <option value="video">Video</option>
                                          <option value="article">Article</option>
                                          <option value="link">External Link</option>
                                       </select>
                                    </div>

                                    <TextField
                                       label="Resource URL"
                                       name="resourceUrl"
                                       placeholder="https://"
                                       form={form}
                                       classname="w-full"
                                    />
                                 </div>

                                 <TextField
                                    label="Description"
                                    name="description"
                                    placeholder="Enter lesson description"
                                    form={form}
                                    classname="w-full"
                                    textarea
                                 />

                                 <div className="flex gap-2">
                                    <button
                                       type="submit"
                                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                       Add Lesson
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() => toggleAddLesson(section.id)}
                                       className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                       Cancel
                                    </button>
                                 </div>
                              </form>
                           </Form>
                        </div>
                     )}
                  </div>
               ))}

               <button
                  className="w-full mt-6 p-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
                  onClick={addSection}
               >
                  <Plus className="h-5 w-5 mx-auto" />
                  Add New Section
               </button>
            </div>
         </CardContent>
      </div>
   );
};

export default Curriculum;
