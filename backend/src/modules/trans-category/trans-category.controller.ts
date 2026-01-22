/**
 * @file trans-category.model.ts
 * @fileoverview This file contains the transaction category model
 */

import type { Request, Response } from "express";
import type { CreateTransCategoryInput } from "./trans-category.schema.js";
import { TransCategoryService } from "./trans-category.service.js";

/**
 * @class TransCategoryController
 * @classdesc This class contains the transaction category controller
 */
export class TransCategoryController {
  /**
   * Creates a new transaction category
   * @param {Request<{}, {}, CreateTransCategoryInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function creates a new transaction category and returns a response containing the newly created transaction category
   */
  static async createTransCategory(req: Request<{}, {}, CreateTransCategoryInput>, res: Response) {
    const newTransCategory = await TransCategoryService.create(req.user.id, req.body);
    res.status(201).json(newTransCategory);
  }

  /**
   * Retrieves all transaction categories associated with the user
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function retrieves all transaction categories associated with the user and returns a response containing the transaction categories
   */
  static async list(req: Request, res: Response) {
    const categories = await TransCategoryService.list(req.user.id);
    return res.json(categories);
  }
}
