// models/File.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
   fileName: {
      type: String,
      required: true,
   },
   fileUrl: {
      type: String,
      required: true,
   },
   fileType: {
      type: String,
      required: true,
   },
   fileSize: {
      type: Number,
      required: true,
   },
   uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const File = mongoose?.models?.File || mongoose.model("File", fileSchema);
export default File;
