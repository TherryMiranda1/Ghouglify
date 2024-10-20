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

