/**
 * @file auth.mapper.ts
 * @fileoverview This file contains the auth mapper
 */

import type { IUser } from "../../models/user.model.js";
import type { LoginResponseDTO, RefreshTokenResponseDTO, RegisterResponseDTO } from "./auth.types.js";

/**
 * Maps a user to a register response
 * @param {IUser} user - User to map
 * @returns {RegisterResponseDTO} Mapped user
 */
export const toRegisterResponseDTO = (user: IUser): RegisterResponseDTO => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  preferredCurrency: user.preferredCurrency,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

/**
 * Maps a user to a login response
 * @param {IUser} user - User to map
 * @param {string} token - Access token
 * @returns {LoginResponseDTO} Mapped user
 * @description This function maps a user to a login response
 * It takes a user and an access token and returns a login response
 * The login response contains the user's id, name, email, role, token, isEmailVerified, lastLoginAt, loginAttempts, lockUntil, createdAt, and updatedAt
 */
export const toLoginResponseDTO = (user: IUser, token: string): LoginResponseDTO => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  token,
  isEmailVerified: user.isEmailVerified,
  preferredCurrency: user.preferredCurrency,
  lastLoginAt: user.lastLoginAt,
  loginAttempts: user.loginAttempts,
  lockUntil: user.lockUntil,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

/**
 * Maps an access token to a refresh token response
 * @param {string} token - Access token to map
 * @returns {RefreshTokenResponseDTO} Mapped access token
 */
export const toRefreshTokenResponseDTO = (user: IUser, token: string): RefreshTokenResponseDTO => toLoginResponseDTO(user, token);
