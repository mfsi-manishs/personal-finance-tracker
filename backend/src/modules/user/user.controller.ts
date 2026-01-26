/**
 * @file user.controller.ts
 * @fileoverview This file contains the user controller
 */

import type { Request, Response } from "express";
import type { UpdateUserInput, UserByEmailInput, UserByIdInput } from "./user.schema.js";
import { UserService } from "./user.service.js";

export class UserController {
  /**
   * Retrieves all users from the database
   * @returns {Promise<Response>} A promise containing the response object
   * @throws {Error} If there is an error retrieving the users
   */
  static async getAllUsers(_req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  }

  /**
   * Retrieves a user by ID from the database
   * @param {Request<UserByIdInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @throws {NotFound} If the user is not found
   * @description This function retrieves a user by ID from the database
   */
  static async getUserById(req: Request, res: Response) {
    const params = req.params as unknown as UserByIdInput;
    const user = await UserService.getUserById(params);
    res.status(200).json(user);
  }

  /**
   * Retrieves a user by email from the database
   * @param {Request<UserByEmailInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @throws {NotFound} If the user is not found
   * @description This function retrieves a user by email from the database
   */
  static async getUserByEmail(req: Request<{}, {}, {}, UserByEmailInput>, res: Response) {
    const user = await UserService.getUserByEmail(req.query);
    res.status(200).json(user);
  }

  /**
   * Updates a user by ID in the database
   * @param {Request<UserByIdInput, {}, UpdateUserInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function updates a user by ID in the database
   */
  static async updateUserById(req: Request, res: Response) {
    const params = req.params as unknown as UserByIdInput;
    const body = req.body as UpdateUserInput;
    const user = await UserService.updateUserById(params, body);
    res.status(200).json(user);
  }
}
