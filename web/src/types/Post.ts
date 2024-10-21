export interface Post {
  _id?: string;
  userId: string;
  name: string;
  cloudPublicId?: string;
  description?: string;
  originalImageUrl: string;
  transformedImageUrl?: string;
  backgroundPrompt?: string;
  objectsPrompt?: string;
  facePrompt?: string;
  replaceImageUrl?: string;
  isPublic?: boolean;
  isTransformation?: boolean;
  width?: number;
  height?: number;
  size?: number;
  format?: string;
  isLoading?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
