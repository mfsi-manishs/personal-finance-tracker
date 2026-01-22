/**
 * @file trans-category.service.ts
 * @fileoverview This file contains the transaction category service
 */
import type mongoose from "mongoose";
import { TransCategoryModel, type ITransCategory } from "../../models/trans-category.model.js";
import type { CreateTransCategoryInput } from "./trans-category.schema.js";

/**
 * @class TransCategoryService
 * @classdesc This class contains the transaction category service
 */
export class TransCategoryService {
  /**
   * Creates a new transaction category
   * @param {mongoose.Types.ObjectId} userId - Id of the user
   * @param {CreateTransCategoryInput} input - Input containing the transaction category details
   * @returns {Promise<Partial<ITransCategory>>} A promise containing the newly created transaction category
   * @description This function creates a new transaction category and returns a promise containing the newly created transaction category
   */
  static async create(userId: mongoose.Types.ObjectId, input: CreateTransCategoryInput) {
    return TransCategoryModel.create({ ...input, userId } as Partial<ITransCategory>);
  }

  /**
   * Retrieves all transaction categories associated with the user, including default ones
   * @param {string} userId - Id of the user
   * @returns {Promise<ITransCategory[]>} A promise containing the retrieved transaction categories
   * @description This function retrieves all transaction categories associated with the user, including default ones, and returns a promise containing the retrieved transaction categories
   */
  static async list(userId: string) {
    return TransCategoryModel.find({ $or: [{ userId }, { type: "default" }] });
  }
}
