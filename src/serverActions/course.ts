"use server";

import connectDB from "@/lib/mongodb";
import { Course } from "@/schema/Course";
import { Section } from "@/schema/Section";
import { Lesson } from "@/schema/Lesson";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface LessonData {
   title: string;
   content?: string;
   duration?: number;
   [key: string]: any;
}

interface Prerequisites {
   prerequisite: string;
}

interface SectionData {
   title: string;
   lessons?: LessonData[];
   [key: string]: any;
}

interface CourseData {
   id?: string;
   title: string;
   description?: string;
   sections?: SectionData[];
   authorId?: string;
   draft?: boolean;
   [key: string]: any;
}

interface CourseResponse {
   success: boolean;
   courseId?: string;
   message: string;
}

interface GetAllCourseResponse {
   success: boolean;
   courses: CourseData[] | any;
   message: string;
}

await connectDB();

const isLessonDuplicate = async (
   lessonData: LessonData,
   sectionId: mongoose.Types.ObjectId,
): Promise<boolean> => {
   const existingLesson = await Lesson.findOne({
      title: lessonData.title,
      sectionId: sectionId,
   });
   return !!existingLesson;
};

const isSectionDuplicate = async (
   sectionData: SectionData,
   courseId: mongoose.Types.ObjectId,
): Promise<boolean> => {
   const existingSection = await Section.findOne({
      title: sectionData.title,
      courseId: courseId,
   });
   return !!existingSection;
};

const createLessons = async (
   lessonsData: LessonData[] | undefined,
   sectionId: mongoose.Types.ObjectId,
): Promise<mongoose.Types.ObjectId[]> => {
   const lessonIds: mongoose.Types.ObjectId[] = [];

   for (const lessonData of lessonsData || []) {
      if (await isLessonDuplicate(lessonData, sectionId)) {
         continue;
      }

      const lesson = new Lesson({
         ...lessonData,
         sectionId,
      });
      await lesson.save();
      lessonIds.push(lesson._id);
   }

   return lessonIds;
};

const createSections = async (
   sectionsData: SectionData[] | undefined,
   courseId: mongoose.Types.ObjectId,
): Promise<mongoose.Types.ObjectId[]> => {
   const sectionIds: mongoose.Types.ObjectId[] = [];

   for (const sectionData of sectionsData || []) {
      if (await isSectionDuplicate(sectionData, courseId)) {
         continue;
      }

      const section = new Section({
         title: sectionData.title,
         courseId,
         lessons: [],
      });

      const lessonIds = await createLessons(sectionData.lessons, section._id);
      section.lessons = lessonIds;
      await section.save();
      sectionIds.push(section._id);
   }

   return sectionIds;
};

const updateExistingCourse = async (courseData: CourseData): Promise<mongoose.Document | null> => {
   console.log("Updating");
   if (!courseData.id || !mongoose.Types.ObjectId.isValid(courseData.id)) {
      throw new Error("Invalid course ID");
   }

   console.log(courseData);
   const course = await Course.findByIdAndUpdate(
      courseData.id,
      { ...courseData, sections: [] },
      { new: true },
   );

   if (!course) {
      return null;
   }

   const sectionIds = await createSections(courseData.sections, course._id);
   course.sections = [...(course.sections || []), ...sectionIds];
   await course.save();

   return course;
};

const createNewCourse = async (courseData: CourseData): Promise<mongoose.Document> => {
   const course = new Course({
      ...courseData,
      sections: [],
   });
   await course.save();

   const sectionIds = await createSections(courseData.sections, course._id);
   course.sections = sectionIds;
   await course.save();

   return course;
};

export const createCourse = async (courseData: CourseData): Promise<CourseResponse> => {
   try {
      let course: mongoose.Document | null;

      if (courseData.id) {
         course = await updateExistingCourse(courseData);
         if (!course) {
            course = await createNewCourse(courseData);
         }
      } else {
         course = await createNewCourse(courseData);
      }

      return {
         success: true,
         courseId: course._id.toString(),
         message: `Course ${courseData.id ? "updated" : "created"} successfully`,
      };
   } catch (error) {
      console.error(error);
      throw new Error(error instanceof Error ? error.message : "Failed to create course");
   }
};

export const getAllCoursesByUser = async (): Promise<GetAllCourseResponse> => {
   try {
      const session = await getServerSession(authOptions);

      if (!session || !session.user || !session.user.id) {
         throw new Error("Unauthorized: No user session found");
      }
      const userId = session.user.id;

      const courses = await Course.find({ authorId: userId }).populate({
         path: "sections",
      });

      return {
         success: true,
         courses: JSON.parse(JSON.stringify(courses)),
         message: "Courses Fetched Successfully",
      };
   } catch (error) {
      throw new Error(
         error instanceof Error ? error.message : "Failed to Fetch all courses by user",
      );
   }
};

interface DeleteCourseResponse {
   success: boolean;
   message: string;
}

export async function deleteCourse(courseId: string): Promise<DeleteCourseResponse> {
   try {
      // Validate if the courseId is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
         return {
            success: false,
            message: "Invalid course ID format",
         };
      }

      // Find and delete the course
      const deletedCourse = await Course.findByIdAndDelete(courseId);

      if (!deletedCourse) {
         return {
            success: false,
            message: "Course not found",
         };
      }

      // Revalidate the courses page
      revalidatePath("/courses");

      return {
         success: true,
         message: "Course deleted successfully",
      };
   } catch (error) {
      console.error("Error deleting course:", error);
      return {
         success: false,
         message: "Failed to delete course",
      };
   }
}

// Students Sections
export const getRecentCourses = async () => {
   try {
      const recentCourses = await Course.find({ draft: false })
         .sort({ createdAt: -1 })
         .populate({
            path: "authorId",
         })
         .limit(5);

      console.log(recentCourses);
      return {
         success: true,
         courses: recentCourses,
         message: "Recent Courses Fetched",
      };
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(error.message);
      }
   }
};

export const getStudentEnrolledCourses = async () => {
   try {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
         throw new Error("Unauthorized: No user session found");
      }
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(error.message);
      }
   }
};

const getPropularCourses = () => {};
