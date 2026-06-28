import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const MONGO_URI: string =
   process.env.MONGO_URI ||
   "mongodb+srv://JohnGreat:John-2001@cluster0.yfacnts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

/**
 * Connect to MongoDB with caching to reuse the connection if it already exists
 */
const connectDB = async (): Promise<void> => {
   try {
      // Check if the connection is already established
      if (mongoose.connection.readyState >= 1) {
         console.log("Using cached MongoDB connection");
         return;
      }

      // Establish a new connection if there isn't one
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected successfully");
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the process with failure
   }
};

export default connectDB;
