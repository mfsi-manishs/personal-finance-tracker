/**
 * @file auth.controller.ts
 * @fileoverview This file contains the auth controller
 */

import type { Request, Response } from "express";
import { env } from "../../env.js";
import { toLoginResponseDTO, toRefreshTokenResponseDTO, toRegisterResponseDTO } from "./auth.mapper.js";
import type { ForgotPasswordInput, LoginInput, RegisterInput, ResetPasswordInput } from "./auth.schema.js";
import { AuthService } from "./auth.service.js";

/**
 * @class AuthController
 * @classdesc This class contains the auth controller
 */
export class AuthController {
  /**
   * Registers a new user
   * @param {Request<{}, {}, RegisterInput>} req - Express request object
   * @param {Response} res - Express response object
   * @throws {UnauthorizedError} If email or password is invalid
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function registers a new user and returns a response containing the newly created user
   */
  static async register(req: Request<{}, {}, RegisterInput>, res: Response) {
    const user = await AuthService.register(req.body);
    res.status(201).json(toRegisterResponseDTO(user));
  }

  /**
   * Logs in an existing user
   * @param {Request<{}, {}, LoginInput>} req - Express request object
   * @param {Response} res - Express response object
   * @throws {UnauthorizedError} If email or password is invalid
   * @description This function logs in an existing user and returns an access token and a refresh token
   */
  static async login(req: Request<{}, {}, LoginInput>, res: Response) {
    const ua = req.headers["user-agent"] as string;
    const ip = req.ip as string;
    const { accessToken, refreshToken, user } = await AuthService.login({ ...req.body, userAgent: ua, ipAddress: ip });
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.nodeEnv === "production",
        sameSite: "strict",
      })
      .json(toLoginResponseDTO(user, accessToken));
  }

  /**
   * Refreshes an access token
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @throws {UnauthorizedError} If refresh token is invalid
   * @description This function refreshes an access token and returns a new access token and a refresh token
   */
  static async refreshToken(req: Request, res: Response) {
    const ua = req.headers["user-agent"] as string;
    const ip = req.ip as string;
    const { accessToken, refreshToken, user } = await AuthService.refreshToken({
      refreshToken: req.cookies.refreshToken,
      userAgent: ua,
      ipAddress: ip,
    });
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.nodeEnv === "production",
        sameSite: "strict",
      })
      .json(toRefreshTokenResponseDTO(user, accessToken));
  }

  /**
   * Sends a password reset link to the user's registered email
   * @param {Request<{}, {}, ForgotPasswordInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function sends a password reset link to the user's registered email
   */
  static async forgotPassword(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
    await AuthService.forgotPassword(req.body.email);
    return res.status(200).json({ message: "Password reset link sent to your registered email." });
  }

  /**
   * Resets a user's password
   * @param {Request<{}, {}, ResetPasswordInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function resets a user's password
   */
  static async resetPassword(req: Request<{}, {}, ResetPasswordInput>, res: Response) {
    await AuthService.resetPassword(req.body.token, req.body.newPassword);
    return res.status(200).json({ message: "Password reset successful" });
  }

  /**
   * Logs out the user by clearing the refresh token cookie
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function logs out the user by clearing the refresh token cookie
   */
  static async logout(req: Request, res: Response) {
    await AuthService.logout(req.cookies.refreshToken);
    res.clearCookie("refreshToken").status(200).json({ message: "Successfully logged out" });
  }
}
