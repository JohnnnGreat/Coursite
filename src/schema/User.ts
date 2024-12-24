import mongoose, { Schema, Document, Model } from "mongoose";

export enum UserRole {
   STUDENT = "STUDENT",
   INSTRUCTOR = "INSTRUCTOR",
   ADMIN = "ADMIN",
}

export enum AuthMethod {
   CREDENTIALS = "CREDENTIALS",
   GOOGLE = "GOOGLE",
   FACEBOOK = "FACEBOOK",
   TWITTER = "TWITTER",
}

// Interfaces for TypeScript type checking
interface IUser extends Document {
   name?: string;
   email: string;
   emailVerified?: Date;
   image?: string;
   role: UserRole;
   courses: mongoose.Types.ObjectId[];
   enrollments: mongoose.Types.ObjectId[];
   password?: String;
   authMethod?: AuthMethod;
}

const UserSchema: Schema<IUser> = new Schema(
   {
      name: { type: String },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      emailVerified: { type: Date },
      image: { type: String },
      password: { type: String },
      role: {
         type: String,
         enum: Object.values(UserRole),
         default: UserRole.STUDENT,
      },
      courses: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
         },
      ],
      enrollments: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enrollment",
         },
      ],
      authMethod: {
         type: String,
         enum: AuthMethod,
         required: true,
      },
   },
   { timestamps: true },
);

// Check if a User Model already exists in the database,
// then set it to the "User" variable, else create a new
// "User" model
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
