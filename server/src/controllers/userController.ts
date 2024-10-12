import { Context } from "hono";
import User, { IUser } from "../models/userModel";
import { connectDB } from "../config/db";
import Joi from "joi";

const userSchema = Joi.object({
  userUUID: Joi.string().required(),
  name: Joi.string().min(3),
  email: Joi.string().email(),
});

export const createUser = async (c: Context) => {
  const userData: Partial<IUser> = await c.req.json();

  const { error } = userSchema.validate(userData);
  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const existingUser = await User.findOne({ userUUID: userData.userUUID });
    if (existingUser) {
      return c.json(existingUser, 200);
    }

    const user = new User(userData);
    await user.save();
    return c.json(user, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating user" }, 500);
  }
};

export const getUsers = async (c: Context) => {
  try {
    const users = await User.find().lean();
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
    const user = await User.findById(id).lean();
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
    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(user, 200);
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
    const result = await User.findByIdAndDelete(id).lean();
    if (!result) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json({ message: "User deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error deleting user" }, 500);
  }
};
