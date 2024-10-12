export interface User {
  _id?: string;
  userUUID: string;
  name: string;
  email?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
