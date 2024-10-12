import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async (uri: string) => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
