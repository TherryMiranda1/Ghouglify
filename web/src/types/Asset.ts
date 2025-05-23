export interface Asset {
    _id?: string;
    name: string;
    type:string;
    cloudPublicId?: string;
    description?: string;
    originalImageUrl: string;
    width?: number;
    height?: number;
    size?: number;
    format?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  