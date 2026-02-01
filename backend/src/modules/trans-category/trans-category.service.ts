/**
 * @file trans-category.service.ts
 * @fileoverview This file contains the transaction category service
 */
import mongoose from "mongoose";
import { TransCategoryModel, type ITransCategory } from "../../models/trans-category.model.js";
import { BadRequestError } from "../../utils/error.utils.js";
import type { UpdateTransBodyInput } from "../trans/trans.schema.js";
import type { CreateTransCategoryInput } from "./trans-category.schema.js";

/**
 * @class TransCategoryService
 * @classdesc This class contains the transaction category service
 */
export class TransCategoryService {
  /**
   * Creates a new transaction category
   * @param {string} userId - Id of the user
   * @param {CreateTransCategoryInput} input - Input containing the transaction category details
   * @returns {Promise<Partial<ITransCategory>>} A promise containing the newly created transaction category
   * @description This function creates a new transaction category and returns a promise containing the newly created transaction category
   */
  static async create(userId: string, input: CreateTransCategoryInput) {
    // Prevent users from creating default categories
    if (input.type === "default") {
      throw new BadRequestError("Users cannot create default categories. They are system-defined.");
    }

    // Ensure userId is attached for custom categories
    const objId = new mongoose.Types.ObjectId(userId);
    return TransCategoryModel.create({
      ...input,
      userId: objId,
    } as Partial<ITransCategory>);
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

  /**
   * Updates a transaction category by ID in the database
   * @param {mongoose.Types.ObjectId} id - Id of the transaction category to be updated
   * @param {UpdateTransBodyInput} input - Input containing the updated transaction category details
   * @param {string} userId - Id of the user
   * @returns {Promise<Partial<ITransactionCategory>>} A promise containing the updated transaction category
   * @description This function updates a transaction category by ID in the database and returns a promise containing the updated transaction category
   */
  static async update(id: mongoose.Types.ObjectId, input: UpdateTransBodyInput, userId: string) {
    return TransCategoryModel.findOneAndUpdate({ _id: id, userId: userId }, input, { new: true });
  }

  /**
   * Deletes a transaction category by ID
   * @param {string} id - Id of the transaction category to be deleted
   * @param {string} userId - Id of the user
   * @returns {Promise<void>} A promise containing no value
   * @description This function deletes a transaction category by ID and returns a promise containing no value
   */
  static async delete(id: mongoose.Types.ObjectId, userId: string) {
    return TransCategoryModel.findOneAndDelete({ _id: id, userId: userId });
  }
}
