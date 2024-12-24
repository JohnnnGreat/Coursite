import mongoose, { Schema, Document, Model } from "mongoose";

interface ILessonCompletion extends Document {
   userId: mongoose.Types.ObjectId;
   lessonId: mongoose.Types.ObjectId;
   completed: boolean;
   completedAt?: Date;
}

const LessonCompletionSchema: Schema<ILessonCompletion> = new Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
   },
   completed: {
      type: Boolean,
      default: false,
   },
   completedAt: { type: Date },
});

export const LessonCompletion = mongoose.model<ILessonCompletion>(
   "LessonCompletion",
   LessonCompletionSchema,
);
