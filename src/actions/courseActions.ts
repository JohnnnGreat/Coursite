import { Section } from "@/components/Dashboard/Pages/Courses/Curriculum";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

// Types
interface Prerequisites {
   id: string;
   text: string;
   createdAt: Date;
}

export interface CourseInfo {
   id?: string;
   title?: string;
   description?: string;
   imageUrl?: string;
   published?: boolean;
   draft?: boolean;
   category?: string;
   level?: string;
   prerequisites?: Prerequisites[];
   price?: string;
   welcomeMessage?: string;
   courseCertification?: boolean;
   seoTitle?: string;
   metaDescription?: string;
   createdAt?: Date;
   updatedAt?: Date;
   sections?: Section[];
   authorId?: string;
}

interface CourseFilters {
   isDraft?: boolean;
   isPublished?: boolean;
}

// State interface
interface CourseState {
   // State
   courses: CourseInfo[];
   courseInformation: CourseInfo | null;
   isLoading: boolean;
   filteredCourses: CourseInfo[];

   // Actions
   updateCourses: (course: CourseInfo) => void;
   updateCourseInformation: (course: CourseInfo) => void;
   deleteCourse: () => void;
   addToCoursePayload: (options: CourseInfo, isSection?: boolean) => CourseInfo | null;
   setCourseNull: () => void;
   setAuthorsCourses: (courses: CourseInfo[]) => void;
   filterCourses: (filters: CourseFilters) => void;
}

// Store
const useCourseInformation = create<CourseState>()(
   persist(
      immer((set, get) => ({
         // Initial state
         courses: [],
         courseInformation: null,
         isLoading: false,
         filteredCourses: [],

         // Actions
         updateCourses: (course) => {
            set((state) => {
               state.courses.push(course);
            });
         },

         addToCoursePayload: (options, isSection) => {
            set((state) => {
               state.courseInformation = {
                  ...state.courseInformation,
                  ...options,
               };
            });
            return get().courseInformation;
         },

         updateCourseInformation: (course) => {
            set((state) => {
               state.courseInformation = course;
            });
         },

         deleteCourse: () => {
            set((state) => {
               state.courseInformation = null;
            });
         },

         filterCourses: ({ isDraft, isPublished }) => {
            set((state) => {
               state.filteredCourses = state.courses.filter((course) => {
                  if (isDraft !== undefined && course.draft !== isDraft) return false;
                  if (isPublished !== undefined && course.published !== isPublished) return false;
                  return true;
               });
            });
         },

         setCourseNull: () => {
            set({ courseInformation: null });
         },

         setAuthorsCourses: (courses) => {
            set((state) => {
               state.courses = courses;
               state.filteredCourses = courses;
            });
         },
      })),
      {
         name: "Course Information",
         partialize: (state: CourseState) => ({
            courseInformation: state.courseInformation,
         }),
      },
   ),
);

export default useCourseInformation;
