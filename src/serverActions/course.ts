"use server";

import connectDB from "@/lib/mongodb";
import { Course } from "@/schema/Course";
import { Section } from "@/schema/Section";
import { Lesson } from "@/schema/Lesson";
import { Enrollment } from "@/schema/Enrollment";
import { User } from "@/schema/User";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";

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
   authorId?: {
      [key: string]: string;
   };
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
            path: "authorId enrollments",
         })
         .limit(5);

      // Return the formatted courses array dynamically
      return {
         success: true,
         courses: recentCourses.map((course: any): any => ({
            _id: course._id.toString(),
            title: course.title,
            imageUrl:
               course.imageUrl ??
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzb-tHLTy_x3v4ZB57K-ufNqxXyHPT3AARmQ&s",
            category: course.category,
            level: course.level,
            price: course.price,
            lessons: course.lessons,
            authorId: {
               name: course.authorId?.name ?? "Unknown Author",
               avatar: course.authorId?.avatar ?? "/api/placeholder/32/32",
            },
            enrollments: course?.enrollments.map((enrollment) => enrollment.userId.toString()),
         })),
         message: "Recent Courses Fetched",
      };
   } catch (error) {
      console.error("Error fetching recent courses:", error); // Improved logging
      return {
         success: false,
         message: error instanceof Error ? error.message : "An unexpected error occurred",
      };
   }
};

export const enrollCourse = async (courseId: string) => {
   try {
      // Validate session
      const session = await getServerSession(authOptions);
      if (!session || !session.user || !session.user.id) {
         throw new Error("User is not authenticated");
      }

      console.log("Session:", session);

      // Create new enrollment
      const newEnrollment = new Enrollment({
         courseId: courseId,
         userId: session.user.id,
      });

      await newEnrollment.save();
      console.log("New Enrollment:", newEnrollment);

      // Find course and update enrollments
      const course = await Course.findOne({ _id: courseId });
      if (!course) {
         throw new Error("Course not found");
      }

      course.enrollments.push(newEnrollment._id);
      await course.save();

      const updateUserEnrolledCourse = await User.findOne({ _id: session.user.id });
      updateUserEnrolledCourse.enrollments.push(newEnrollment);

      await updateUserEnrolledCourse.save();

      console.log("Updated Course:", course);

      revalidatePath("/courses");
      return {
         success: true,
         message: "Enrolled successfully",
      };
   } catch (error) {
      if (error instanceof Error) {
         console.error("Error:", error.message);
         throw new Error(error.message);
      } else {
         console.error("Unknown Error:", error);
         throw new Error("An unknown error occurred");
      }
   }
};

export const getUserInformation = async () => {
   try {
      const session = await getServerSession(authOptions);

      if (!session || !session.user || !session.user.id) {
         throw new Error("User is not authenticated");
      }
      const user = await User.findOne({ _id: session.user.id });
      return {
         success: true,
         user: JSON.parse(
            JSON.stringify({
               name: user.name,
               email: user.email,
               _id: user.id.toString(),
               imageUrl: user.imageUrl,
            }),
         ),
         message: "User fetched successfully",
      };
   } catch (error) {
      if (error instanceof Error) {
         console.error("Error:", error.message);
         throw new Error(error.message);
      } else {
         console.error("Unknown Error:", error);
         throw new Error("An unknown error occurred");
      }
   }
};

export interface CourseFilters {
   search?: string;
   categories?: string[];
   levels?: string[];
   priceRange?: {
      min?: number;
      max?: number;
   };
   rating?: number;
   sortBy?: "price_asc" | "price_desc" | "rating" | "newest" | "popular";
   page?: number;
   limit?: number;
}

export const filterCourses = async (filters: CourseFilters) => {
   console.log(filters);
   try {
      const query: any = {};

      // Search by title or description
      if (filters?.search) {
         query.$or = [
            { title: { $regex: filters.search, $options: "i" } },
            { description: { $regex: filters.search, $options: "i" } },
         ];
      }

      // Filter by categories
      if (filters.categories?.length) {
         query.category = { $in: filters.categories };
      }

      // Filter by levels
      if (filters.levels?.length) {
         query.level = { $in: filters.levels };
      }

      // Filter by price range
      if (filters.priceRange) {
         query.price = {};
         if (filters.priceRange.min !== undefined) {
            query.price.$gte = filters.priceRange.min;
         }
         if (filters.priceRange.max !== undefined) {
            query.price.$lte = filters.priceRange.max;
         }
      }

      // Filter by minimum rating
      if (filters.rating) {
         query.rating = { $gte: filters.rating };
      }

      // Prepare sort options
      let sortOptions: any = {};
      // switch (filters.sortBy) {
      //    case "price_asc":
      //       sortOptions.price = 1;
      //       break;
      //    case "price_desc":
      //       sortOptions.price = -1;
      //       break;
      //    case "rating":
      //       sortOptions.rating = -1;
      //       break;
      //    case "newest":
      //       sortOptions.createdAt = -1;
      //       break;
      //    case "popular":
      //       sortOptions = { "enrollments.length": -1 };
      //       break;
      //    default:
      //       sortOptions.createdAt = -1; // Default sort by newest
      // }

      // Pagination
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const skip = (page - 1) * limit;

      // Execute query with pagination
      const [courses, totalCount] = await Promise.all([
         Course.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .populate("authorId", "name avatar")
            .lean(),
         Course.countDocuments(query),
      ]);

      return {
         courses: courses.map((course: any) => course),
         pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCourses: totalCount,
            hasMore: page * limit < totalCount,
         },
      };
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(error.message);
      }
   }
};

export const getStudentEnrolledCourses = async (): Promise<GetAllCourseResponse> => {
   try {
      const session = await getServerSession(authOptions);

      if (!session || !session.user || !session.user.id) {
         throw new Error("Unauthorized: No user session found");
      }
      const userId = session.user.id;

      const enrollments = await Enrollment.find({ userId: userId }).populate({
         path: "courseId",
      });

      const courses = enrollments.map((enrollment) => enrollment.courseId);

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

export const getCourseById = async (courseId: string) => {
   try {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
         throw new Error("Invalid course ID format");
      }

      const course = await Course.findById(courseId)
         .populate([
            { path: "authorId" },
            {
               path: "sections",
               populate: {
                  path: "lessons",
               },
            },
         ])
         .lean();

      if (!course) {
         throw new Error("Course not found");
      }

      return {
         success: true,
         course: JSON.parse(JSON.stringify(course)),
         message: "Course fetched successfully",
      };
   } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch course by ID");
   }
};

const getPropularCourses = () => {};
