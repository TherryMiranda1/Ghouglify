// userController.ts
import { Context } from "hono";
import { connectDB } from "../config/db";
import { IUser } from "../models/userModel";
import Joi from "joi";

const userSchema = Joi.object({
  userUUID: Joi.string().required(),
  name: Joi.string().min(3),
  email: Joi.string().email({ tlds: { allow: false } }),
});

export const createUser = async (c: Context) => {
  const userData: Partial<IUser> = await c.req.json();
  const { error } = userSchema.validate(userData);

  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const db = await connectDB(c.env.MONGODB_URI);
    const existingUser = await db.collection("users").findOne({ userUUID: userData.userUUID });

    if (existingUser) {
      return c.json(existingUser, 200);
    }

    const newUser = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);
    return c.json(newUser, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating user" }, 500);
  }
};

export const getUsers = async (c: Context) => {
  try {
    const db = await connectDB(c.env.MONGODB_URI);
    const users = await db.collection("users").find().toArray();
    return c.json(users, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching users" }, 500);
  }
};

export const getUser = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = await connectDB(c.env.MONGODB_URI);
    const user = await db.collection("users").findOne({ userUUID: id });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json(user, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching user" }, 500);
  }
};

export const updateUser = async (c: Context) => {
  const id = c.req.param("id");
  const updatedData: Partial<IUser> = await c.req.json();

  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = await connectDB(c.env.MONGODB_URI);
    const user = await db.collection("users").findOneAndUpdate(
      { userUUID: id },
      { $set: { ...updatedData, updatedAt: new Date() } },
      { returnDocument: "after" } // `returnDocument: "after"` es para obtener el documento actualizado
    );

    if (!user.value) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(user.value, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error updating user" }, 500);
  }
};

export const deleteUser = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = await connectDB(c.env.MONGODB_URI);
    const result = await db.collection("users").findOneAndDelete({ userUUID: id });

    if (!result.value) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json({ message: "User deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error deleting user" }, 500);
  }
};
