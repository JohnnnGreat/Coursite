import mongoose, { Schema, Document, Model } from "mongoose";

interface ISection extends Document {
   title: string;
   description?: string;
   courseId: mongoose.Types.ObjectId;
   lessons: mongoose.Types.ObjectId[];
}

const SectionSchema: Schema<ISection> = new Schema({
   title: {
      type: String,
   },
   description: { type: String },

   courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
   },
   lessons: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Lesson",
      },
   ],
});

export const Section =
   mongoose.models.Section || mongoose.model<ISection>("Section", SectionSchema);
