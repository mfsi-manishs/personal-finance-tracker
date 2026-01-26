/**
 * @file auth.types.ts
 * @fileoverview This file contains the auth types
 */

import type { JWTPayload } from "jose";
import { Types } from "mongoose";
import type { UserRole } from "../../models/user.model.js";

/**
 * @interface RegisterResponseDTO
 * @description Register response returned to client
 */
export interface RegisterResponseDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  preferredCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface LoginResponseDTO
 * @description Login response returned to client
 */
export interface LoginResponseDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
  isEmailVerified: boolean;
  preferredCurrency: string;
  lastLoginAt: Date;
  loginAttempts: number;
  lockUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface RefreshTokenResponseDTO
 * @description Refresh token response returned to client
 */
export interface RefreshTokenResponseDTO {
  token: string;
}

/**
 * @interface AuthTokens
 * @description Auth tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * @interface AccessTokenPayload
 * @description JWT payload for Access token
 */
export interface AccessTokenPayload extends JWTPayload {
  sub: string;
  role: UserRole;
}

/**
 * @interface RefreshTokenPayload
 * @description Refresh token payload
 */
export interface RefreshTokenPayload {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
}

/**
 * @interface AuthenticatedUser
 * @description Authenticated user
 */
export interface AuthenticatedUser {
  id: string;
  role: UserRole;
}
