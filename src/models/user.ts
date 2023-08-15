/**
 * user.ts
 * @description :: model of a database collection user
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  name: string;
  role: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type: String },
    name: { type: String },
    role: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

userSchema.pre<IUser>("save", async function (next) {
  // any logic before saving the document
  next();
});

const User: Model<IUser> = mongoose.model<IUser>("users", userSchema);
export default User;
