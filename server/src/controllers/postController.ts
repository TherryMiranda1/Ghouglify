import { Context } from "hono";
import Post, { IPost } from "../models/postModel";
import { connectDB } from "../config/db";
import Joi from "joi";

const postSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  imageUrl: Joi.string().uri().required(),
  originalImageUrl: Joi.string().uri().required(),
  backgroundPrompt: Joi.string().optional(),
  objectsPrompt: Joi.string().optional(),
  facePrompt: Joi.string().optional(),
  isPublic: Joi.boolean().required(),
});

export const createPost = async (c: Context) => {
  const postData: Partial<IPost> = await c.req.json();

  const { error } = postSchema.validate(postData);
  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const post = new Post(postData);
    await post.save();
    return c.json(post, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating post" }, 500);
  }
};

export const getPosts = async (c: Context) => {
  const { userId, isPublic } = c.req.query();

  let filter: any = {};

  if (userId) {
    filter.userId = userId;
  }

  if (isPublic !== undefined) {
    filter.isPublic = isPublic === "true";
  }

  try {
    const posts = await Post.find(filter).lean();
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
    const post = await Post.findById(id).lean();
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
    const post = await Post.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json(post, 200);
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
    const result = await Post.findByIdAndDelete(id).lean();
    if (!result) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json({ message: "Post deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error deleting post" }, 500);
  }
};
