import mongoose from "mongoose";

// MongoDB connection URI
const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017/online-course";

/**
 * Connect to MongoDB
 */
const connectDB = async (): Promise<void> => {
   try {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected successfully");
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the process with failure
   }
};

export default connectDB;
