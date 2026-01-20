/**
 * @file auth.types.ts
 * @fileoverview This file contains the auth types
 */

import type { JWTPayload } from "jose";
import { Types } from "mongoose";
import type { UserRole } from "../../models/user.model.js";

/**
 * @interface RegisterRequestDTO
 * @description Register request body
 */
export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
}

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
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface LoginRequestDTO
 * @description Login request body
 */
export interface LoginRequestDTO {
  email: string;
  password: string;
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
  lastLoginAt: Date;
  loginAttempts: number;
  lockUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface AuthResponseDTO
 * @description Auth response returned to client
 */
export interface AuthResponseDTO {
  accessToken: string;
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
