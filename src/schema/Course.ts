import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
   title: string;
   description?: string;
   imageUrl?: string;
   published?: boolean;
   draft?: boolean;
   category?: string;
   level?: string;
   prerequisites?: {
      id: string;
      text: string;
      createdAt: Date;
   }[];
   price?: string;
   welcomeMessage?: string;
   courseCertification?: boolean;
   seoTitle?: string;
   metaDescription?: string;
   authorId?: mongoose.Types.ObjectId | string;
   sections?: mongoose.Types.ObjectId[] | any[];
   lessons?: mongoose.Types.ObjectId[];
   enrollments?: mongoose.Types.ObjectId[] | any[];
   createdAt?: Date;
   updatedAt?: Date;
}

const CourseSchema: Schema<ICourse> = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
      },
      imageUrl: {
         type: String,
      },
      published: {
         type: Boolean,
         default: false,
      },
      draft: {
         type: Boolean,
         default: false,
      },
      category: {
         type: String,
      },
      level: {
         type: String,
      },
      prerequisites: {
         type: [
            {
               id: {
                  type: String,
                  required: true,
               },

               text: {
                  type: String,
                  required: true,
               },

               createdAt: {
                  type: Date,
                  required: true,
               },
            },
         ],
         default: [],
      },
      price: {
         type: String,
      },
      welcomeMessage: {
         type: String,
      },
      courseCertification: {
         type: Boolean,
         default: false,
      },
      seoTitle: {
         type: String,
      },
      metaDescription: {
         type: String,
      },
      authorId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      sections: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
         },
      ],

      enrollments: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enrollment",
         },
      ],
   },
   {
      timestamps: true,
   },
);

export const Course: Model<ICourse> =
   mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
