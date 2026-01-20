/**
 * @file user.controller.ts
 * @fileoverview This file contains the user controller
 */

import type { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";

/**
 * Retrieves all users from the database
 * @returns {Promise<Response>} A promise containing the response object
 * @throws {Error} If there is an error retrieving the users
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    UserModel.find().then((users) => res.status(200).json(users));
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
