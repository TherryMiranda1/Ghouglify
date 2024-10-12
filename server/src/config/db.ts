import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("MONGODB_URI is not defined in the environment variables.");
    return;
  }
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(uri);
      console.log("MongoDB connected successfully with Mongoose");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
};
