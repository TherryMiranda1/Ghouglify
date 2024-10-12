
export interface IPost {
    userId: string; 
    name: string;
    description?: string;
    imageUrl: string;
    originalImageUrl: string;
    backgroundPrompt?: string;
    objectsPrompt?: string;
    facePrompt?: string;
    isPublic: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  