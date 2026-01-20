/**
 * @file auth.service.ts
 * @fileoverview This file contains the auth service
 */

import bcrypt from "bcrypt";
import { RefreshTokenModel } from "../../models/refreshToken.model.js";
import { UserModel, type IUser } from "../../models/user.model.js";
import { generateRandomToken, hashToken } from "../../utils/crypto.utils.js";
import { ConflictError, UnauthorizedError } from "../../utils/error.utils.js";
import { signAccessToken } from "../../utils/jwt.utils.js";
import type { LoginInput, RegisterInput } from "./auth.schema.js";

/**
 * @class AuthService
 * @classdesc This class contains the auth service
 */
export class AuthService {
  /**
   * Registers a new user
   * @param {RegisterInput} input - Input containing name, email and password
   * @throws {Error} If email already exists
   * @returns {Promise<IUser>} A promise containing the newly created user
   */
  static async register({ name, email, password }: RegisterInput): Promise<IUser> {
    // Check if email already exists
    const existingEmail = await UserModel.findOne({ email: email });
    if (existingEmail) {
      throw new ConflictError("Email is already registered");
    }
    const passwordHash = await bcrypt.hash(password, 12);

    return UserModel.create({ name, email, passwordHash });
  }

  /**
   * Logs in an existing user
   * @param {LoginInput} input - Input containing email and password
   * @throws {Error} If email or password is invalid
   * @returns {Promise<{ accessToken: string, refreshToken: string }>} A promise containing the access token and refresh token
   */
  static async login({ email, password }: LoginInput) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new UnauthorizedError("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new UnauthorizedError("Invalid credentials");

    const accessToken = await signAccessToken({
      sub: user.id,
      role: user.role,
    });

    const refreshToken = generateRandomToken();

    await RefreshTokenModel.create({
      userId: user._id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  }
}
