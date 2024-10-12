// userModel.ts
export interface IUser {
    userUUID: string;
    name: string;
    email?: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  