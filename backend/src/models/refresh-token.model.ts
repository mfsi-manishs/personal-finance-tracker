/**
 * @file refreshToken.model.ts
 * @fileoverview This file contains the refresh token model
 */

import { Document, Schema, Types, model } from "mongoose";

/**
 * @interface IRefreshToken
 * @description Refresh token interface
 */
export interface IRefreshToken extends Document {
  userId: Types.ObjectId;
  tokenHash: string;
  ipAddress: string;
  userAgent: string;
  expiresAt: Date;
  createdAt: Date;
}

/**
 * @constant refreshTokenSchema
 * @description Refresh token schema
 */
const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshTokenModel = model<IRefreshToken>("RefreshToken", refreshTokenSchema);
