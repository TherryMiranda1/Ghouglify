// deno-lint-ignore-file no-explicit-any
import { Context } from "hono";
import { IPost } from "../models/postModel.ts";
import Joi from "joi";
import { ObjectId } from "mongodb";

const postSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  cloudPublicId: Joi.string().optional(),
  originalImageUrl: Joi.string().uri().required(),
  transformedImageUrl: Joi.string().uri().optional(),
  backgroundPrompt: Joi.string().optional(),
  objectsPrompt: Joi.string().optional(),
  facePrompt: Joi.string().optional(),
  replaceImageUrl: Joi.string().optional(),
  isPublic: Joi.boolean().optional(),
  width: Joi.number().optional(),
  height: Joi.number().optional(),
  size: Joi.number().optional(),
  format: Joi.string().optional(),
  isLoading: Joi.boolean().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export const createPost = async (c: Context) => {
  const postData: Partial<IPost> = await c.req.json();

  const { error } = postSchema.validate(postData);
  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const db = c.get("db");
    const newPost = {
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("posts").insertOne(newPost);
    return c.json(newPost, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating post" }, 500);
  }
};

export const getPosts = async (c: Context) => {
  const { userId, isPublic } = c.req.query();

  const filter: any = {};

  if (userId) {
    filter.userId = userId;
    if (isPublic) {
      filter.isPublic = isPublic;
    }
  } else {
    filter.isPublic = true;
  }

  try {
    const db = c.get("db");
    const posts = await db.collection("posts").find(filter).toArray();
    return c.json(posts, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching posts" }, 500);
  }
};

export const getPost = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json(post, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching post" }, 500);
  }
};

export const updatePost = async (c: Context) => {
  const id = c.req.param("id");
  const updatedData: Partial<IPost> = await c.req.json();

  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    const result = await db.collection("posts").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updatedData, updatedAt: new Date() } },
      { returnDocument: "after" } // Obtiene el documento actualizado
    );
    if (!result) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json(result, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error updating post" }, 500);
  }
};

export const deletePost = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    await db.collection("posts").findOneAndDelete({ _id: new ObjectId(id) });

    return c.json({ message: "Post deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error deleting post" }, 500);
  }
};
