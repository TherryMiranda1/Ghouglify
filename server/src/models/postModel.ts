import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  imageUrl: string;
  originalImageUrl: string;
  backgroundPrompt: string;
  objectsPrompt: string;
  facePrompt: string;
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    originalImageUrl: {
      type: String,
      required: true,
    },
    backgroundPrompt: {
      type: String,
      required: false,
    },
    objectsPrompt: {
      type: String,
      required: false,
    },
    facePrompt: {
      type: String,
      required: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
