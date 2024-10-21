// deno-lint-ignore-file no-explicit-any
import { Context } from "hono";
import { IAsset } from "../models/assetModel.ts";
import Joi from "joi";
import { ObjectId } from "mongodb";

const assetSchema = Joi.object({
  name: Joi.string().min(3).required(),
  cloudPublicId: Joi.string().optional(),
  type: Joi.string().required(),
  description: Joi.string().optional(),
  originalImageUrl: Joi.string().uri().required(),
  isPublic: Joi.boolean().optional(),
  width: Joi.number().optional(),
  height: Joi.number().optional(),
  size: Joi.number().optional(),
  format: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export const createAsset = async (c: Context) => {
  const assetData: Partial<IAsset> = await c.req.json();

  const { error } = assetSchema.validate(assetData);
  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const db = c.get("db");
    const newAsset = {
      ...assetData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("assets").insertOne(newAsset);
    return c.json(newAsset, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating asset" }, 500);
  }
};

export const getAssets = async (c: Context) => {
  const { type } = c.req.query();

  const filter: any = {};

  if (type) {
    filter.type = type;
  }

  try {
    const db = c.get("db");
    const assets = await db.collection("assets").find(filter).toArray();
    return c.json(assets, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching assets" }, 500);
  }
};

export const getAsset = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    const asset = await db
      .collection("assets")
      .findOne({ _id: new ObjectId(id) });
    if (!asset) {
      return c.json({ error: "Asset not found" }, 404);
    }
    return c.json(asset, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching asset" }, 500);
  }
};

export const updateAsset = async (c: Context) => {
  const id = c.req.param("id");
  const updatedData: Partial<IAsset> = await c.req.json();

  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    const result = await db.collection("assets").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updatedData, updatedAt: new Date() } },
      { returnDocument: "after" } // Obtiene el documento actualizado
    );
    if (!result) {
      return c.json({ error: "Asset not found" }, 404);
    }

    return c.json(result, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error updating asset" }, 500);
  }
};

export const deleteAsset = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    await db.collection("assets").findOneAndDelete({ _id: new ObjectId(id) });

    return c.json({ message: "Asset deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error deleting asset" }, 500);
  }
};
