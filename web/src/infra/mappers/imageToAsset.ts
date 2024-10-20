import { Asset } from "../../types/Asset";
import { CloudinaryImageDTO } from "../../types/DTOs";

export const imageToAsset = ({
  image,
  name,
  type,
  description,
}: {
  image: CloudinaryImageDTO;
  name: string;
  type: string;
  description?: string;
}): Asset => ({
  name,
  type,
  description: description || "-",
  cloudPublicId: image.public_id,
  originalImageUrl: image.secure_url,
  width: image.width,
  height: image.height,
  size: image.bytes,
  format: image.format,
  createdAt: new Date(image.created_at),
  updatedAt: new Date(),
});
