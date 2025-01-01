"use server";
import { Client, Storage, ID } from "appwrite";
import connectDB from "@/lib/mongodb";
import File from "@/schema/File";

const client = new Client()
   .setEndpoint("https://cloud.appwrite.io/v1")
   .setProject("67408c6e0002b22feb6a");

const storage = new Storage(client);

await connectDB();

export async function uploadFile(file) {
   console.log("file incoming", file);
   try {
      const newFile = new File(file);

      await newFile.save();
      return {
         message: "File Saved Successfully",
         file: JSON.parse(JSON.stringify(newFile)),
      };
   } catch (error) {
      console.error("Error in uploadFile:", error);
      throw error;
   }
}

export async function getInstructorFiles(userId) {
   try {
      const files = await File.find({ uploadedBy: userId }).sort({ createdAt: -1 });
      return files;
   } catch (error) {
      console.error("Error in getInstructorFiles:", error);
      throw error;
   }
}

export async function deleteFile(fileId, userId) {
   try {
      const file = await File.findOneAndDelete({
         _id: fileId,
         uploadedBy: userId,
      });

      if (file) {
         // Also delete from Appwrite
         await storage.deleteFile("67409170002d4b8b36b4", file.fileUrl.split("/").pop());
      }

      return file;
   } catch (error) {
      console.error("Error in deleteFile:", error);
      throw error;
   }
}
