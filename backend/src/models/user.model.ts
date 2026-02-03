/**
 * @file user.model.ts
 * @fileoverview This file contains the user model
 */

import { Document, Schema, model } from "mongoose";

/**
 * @enum UserRole
 */
export type UserRole = "user" | "admin";

/**
 * @interface IUser
 * @description User interface
 */
export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isEmailVerified: boolean;
  lastLoginAt: Date;
  loginAttempts: number;
  lockUntil: Date;
  preferredCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @constant userSchema
 * @description User schema
 */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 64,
      minLength: 2,
      match: /^[A-Za-z ]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^.+@.+\..+$/,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    preferredCurrency: {
      type: String,
      required: true,
      default: "INR",
      uppercase: true,
      length: 3,
    },
  },
  { timestamps: true }
);

type UserDocument = Partial<IUser> & { __v?: number };

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret: UserDocument) => {
    delete ret._id;
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

export const UserModel = model<IUser>("User", userSchema);
