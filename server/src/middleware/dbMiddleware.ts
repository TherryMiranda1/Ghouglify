import { MiddlewareHandler } from "hono";
import { connectDB } from "../config/db";
import type { Env } from "../types";

export const dbMiddleware: MiddlewareHandler<{ Bindings: Env }> = async (
  c,
  next
) => {
  const { MONGODB_URI } = c.env;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  try {
    await connectDB(MONGODB_URI);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return c.json({ error: "Failed to connect to the database." }, 500);
  }

  await next();
};
