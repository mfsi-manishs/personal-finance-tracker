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
  isRevoked: boolean;
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
      match: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    },
    userAgent: {
      type: String,
      required: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
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
