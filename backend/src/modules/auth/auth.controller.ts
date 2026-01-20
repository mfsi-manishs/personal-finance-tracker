/**
 * @file auth.controller.ts
 * @fileoverview This file contains the auth controller
 */

import type { Request, Response } from "express";
import { toLoginResponseDTO, toRegisterResponseDTO } from "./auth.mapper.js";
import type { LoginInput, RegisterInput } from "./auth.schema.js";
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
   * @throws {Error} If there is an error registering the user
   * @returns {Promise<Response>} A promise containing the response object
   */
  static async register(req: Request<{}, {}, RegisterInput>, res: Response) {
    const user = await AuthService.register(req.body);
    res.status(201).json(toRegisterResponseDTO(user));
  }

  /**
   * Logs in an existing user
   * @param {Request<{}, {}, LoginInput>} req - Express request object
   * @param {Response} res - Express response object
   * @throws {Error} If there is an error logging in the user
   * @returns {Promise<Response>} A promise containing the response object
   */
  static async login(req: Request<{}, {}, LoginInput>, res: Response) {
    try {
      const { accessToken, refreshToken } = await AuthService.login(req.body);
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .json(toLoginResponseDTO(req.user, accessToken));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
