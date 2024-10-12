import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  userUUID: string;
  name: string;
  email?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    userUUID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para hashear la contraseña antes de guardar
// userSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const bcrypt = await import("bcrypt");
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
