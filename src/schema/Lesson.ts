import mongoose, { Schema, Document, Model } from "mongoose";

interface ILesson extends Document {
   title: string;
   content?: string;
   type?: string;
   resourceUrl?: number;
   sectionId: mongoose.Types.ObjectId;
   completion: mongoose.Types.ObjectId[];
   lessonDuration: string;
}

const LessonSchema: Schema<ILesson> = new Schema({
   title: {
      type: String,
      required: true,
   },
   content: { type: String },
   resourceUrl: { type: String },
   lessonDuration: { type: String },
   type: { type: String },
   sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
   },
   completed: {
      type: Boolean,
      default: false,
   },
});

export const Lesson = mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", LessonSchema);
