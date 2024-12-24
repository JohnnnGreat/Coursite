import mongoose, { Schema, Document, Model } from "mongoose";

interface IEnrollment extends Document {
   userId: mongoose.Types.ObjectId;
   courseId: mongoose.Types.ObjectId;
   progress: number;
   startedAt: Date;
}

const EnrollmentSchema: Schema<IEnrollment> = new Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
   },
   progress: {
      type: Number,
      default: 0,
   },
   startedAt: {
      type: Date,
      default: Date.now,
   },
});
