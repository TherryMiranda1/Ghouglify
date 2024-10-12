import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

export const connectDB = async () => {
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
