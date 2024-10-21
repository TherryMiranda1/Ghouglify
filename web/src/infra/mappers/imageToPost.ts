import { Post } from "../../types/Post";
import { CloudinaryImageDTO } from "./../../types/DTOs";
import { Transformation } from "./../../types/Transformation";

export const imageToPost = ({
  image,
  userUUID,
  transformation,
}: {
  image: CloudinaryImageDTO;
  userUUID: string;
  transformation?: Transformation;
}): Post => ({
  userId: userUUID,
  name: image.original_filename || `Ghougly-${new Date().toDateString()}`,
  cloudPublicId: image.public_id,
  originalImageUrl: image.secure_url,
  width: image.width,
  height: image.height,
  size: image.bytes,
  format: image.format,
  createdAt: new Date(image.created_at),
  updatedAt: new Date(),
  ...(transformation && { ...transformation }),
});

export const faceSwapToPost = ({
  image,
  userUUID,
  source,
  target,
}: {
  image: CloudinaryImageDTO;
  userUUID: string;
  source: string;
  target: string;
}): Post => ({
  userId: userUUID,
  name: image.original_filename || `Ghougly-${new Date().toDateString()}`,
  cloudPublicId: image.public_id,
  width: image.width,
  height: image.height,
  size: image.bytes,
  format: image.format,
  createdAt: new Date(image.created_at),
  updatedAt: new Date(),
  transformedImageUrl: image.secure_url,
  originalImageUrl: source,
  facePrompt: target,
});
