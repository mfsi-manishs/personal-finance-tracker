/**
 * @file passwordReset.model.ts
 * @fileoverview This file contains the password reset model
 */

import mongoose from "mongoose";

/**
 * @interface IPasswordReset
 * @description Password reset interface
 */
export interface IPasswordReset {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
}

/**
 * @constant passwordResetSchema
 * @description Password reset schema
 */
const passwordResetSchema = new mongoose.Schema<IPasswordReset>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PasswordResetModel = mongoose.model<IPasswordReset>("PasswordReset", passwordResetSchema);
