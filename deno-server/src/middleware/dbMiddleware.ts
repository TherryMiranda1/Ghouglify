// deno-lint-ignore-file no-explicit-any
import { MiddlewareHandler } from "hono";
import { connectDB } from "../config/db.ts";
import type { AppContext } from "../../types.d.ts";

export const dbMiddleware: MiddlewareHandler<AppContext> = async (c, next) => {
  const MONGODB_URI = Deno.env.get("MONGODB_URI");

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  try {
    const db = await connectDB(MONGODB_URI);
    c.set("db", db);
  } catch (error: any) {
    console.error("Failed to connect to MongoDB:", error);
    return c.json(
      { error: "Failed to connect to the database: " + error.message },
      500
    );
  }

  await next();
};
