import { MongoClient } from "mongodb";

let client: MongoClient;
let db: any;
let isConnected = false;

export const connectDB = async (uri: string) => {
  if (isConnected) {
    return db;
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
    isConnected = true;
    console.log("MongoDB connected successfully");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
