/**
 * @file trans.service.ts
 * @fileoverview This file contains the transaction service
 */

import mongoose from "mongoose";
import { z } from "zod";
import { TransactionModel, type ITransaction } from "../../models/trans.model.js";
import { BadRequestError, NotFoundError } from "../../utils/error.utils.js";
import { Utils, type TimeUnit } from "../../utils/utils.js";
import { categorySummaryResponseSchema, type CategorySummaryResponseDTO, type TransactionInput, type UpdateTransBodyInput } from "./trans.schema.js";

/**
 * @class TransService
 * @classdesc This class contains the transaction service
 */
export class TransService {
  /**
   * Creates a new transaction
   * @param {string} userId - Id of the user
   * @param {TransactionInput} input - Input containing the transaction details
   * @returns {Promise<Partial<ITransaction>>} A promise containing the newly created transaction
   * @description This function creates a new transaction and returns a promise containing the newly created transaction
   */
  static async create(userId: string, input: TransactionInput) {
    const objId = new mongoose.Types.ObjectId(userId);
    const trans = await TransactionModel.create({ ...input, objId } as Partial<ITransaction>);
    return trans.populate("transCategoryId", "name description type id");
  }

  /**
   * Retrieves all transactions associated with the user
   * @param {string} userId - Id of the user
   * @returns {Promise<ITransaction[]>} A promise containing the retrieved transactions
   * @description This function retrieves all transactions associated with the user and returns a promise containing the retrieved transactions
   */
  static async list(userId: string) {
    return TransactionModel.find({ userId }).sort({ date: -1 }).populate("transCategoryId", "name description type id");
  }

  /**
   * Retrieves all transactions associated with the user in the given date range
   * @param {string} userId - Id of the user
   * @param {Date} startDate - Start date of the range (inclusive)
   * @param {Date} endDate - End date of the range (inclusive)
   * @returns {Promise<ITransaction[]>} A promise containing the retrieved transactions
   * @description This function retrieves all transactions associated with the user in the given date range and returns a promise containing the retrieved transactions
   */
  static async listByDateRange(userId: string, startDate?: Date, endDate?: Date) {
    const query: { userId: string; date?: { $gte?: Date; $lte?: Date } } = { userId };

    // Apply date range filter if dates are provided
    if (startDate && endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }

    return TransactionModel.find(query).sort({ date: -1 }).populate("transCategoryId", "name description type id");
  }

  /**
   * Retrieves all transactions associated with the user in the last N time units
   * @param {string} userId - Id of the user
   * @param {string} timeUnit - Time unit (e.g. 'day', 'week', 'month', 'year')
   * @param {number} lastNUnits - Number of time units to retrieve (e.g. 1, 2, 3)
   * @returns {Promise<ITransaction[]>} A promise containing the retrieved transactions
   * @description This function retrieves all transactions associated with the user in the last N time units and returns a promise containing the retrieved transactions
   */
  static async listByLastNUnits(userId: string, timeUnit: TimeUnit, lastNUnits: number) {
    if ((lastNUnits as unknown) instanceof String) lastNUnits = parseInt(lastNUnits as unknown as string);
    if (isNaN(lastNUnits)) throw new BadRequestError("Invalid units(should be a number)");
    const { start, end } = Utils.getDateRange(timeUnit, lastNUnits);
    return TransService.listByDateRange(userId, start, end);
  }

  /**
   * Updates a transaction by ID in the database
   * @param {mongoose.Types.ObjectId} transId - Id of the transaction to be updated
   * @param {UpdateTransBodyInput} data - Input containing the updated transaction details
   * @returns {Promise<Partial<ITransaction>>} A promise containing the updated transaction
   * @description This function updates a transaction by ID in the database and returns a promise containing the updated transaction
   */
  static async update(transId: mongoose.Types.ObjectId, data: UpdateTransBodyInput) {
    const trans = await TransactionModel.findByIdAndUpdate(transId, data, { new: true }).populate("transCategoryId", "name description type id");
    if (!trans) {
      throw new NotFoundError("Transaction not found");
    }
    return trans;
  }

  /**
   * Deletes a transaction by ID in the database
   * @param {mongoose.Types.ObjectId} transitId - Id of the transaction to be deleted
   * @returns {Promise<Partial<ITransaction>>} A promise containing the deleted transaction
   * @description This function deletes a transaction by ID in the database and returns a promise containing the deleted transaction
   * @throws {NotFoundError} If the transaction is not found
   */
  static async delete(transId: mongoose.Types.ObjectId) {
    const trans = await TransactionModel.findByIdAndDelete(transId).populate("transCategoryId", "name description type id");
    if (!trans) {
      throw new NotFoundError("Transaction not found");
    }
    return trans;
  }

  /**
   * Retrieves the category summary for the given date range
   * @param {string} userId - Id of the user
   * @param {Date} startDate - Start date of the range (inclusive)
   * @param {Date} endDate - End date of the range (inclusive)
   * @returns {Promise<CategorySummaryResponseDTO[]>} A promise containing the retrieved category summaries
   * @description This function retrieves the category summary for the given date range and returns a promise containing the retrieved category summaries
   */
  static async getCategorySummaryByDateRange(userId: string, startDate?: Date, endDate?: Date) {
    const results = await TransactionModel.aggregate<CategorySummaryResponseDTO>([
      {
        // 1. Initial filter: MUST be the first stage for index usage
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        // 2. Join with transcategories to get transaction category details
        $lookup: {
          from: "transcategories", // The collection name in MongoDB
          localField: "transCategoryId",
          foreignField: "_id",
          as: "transCategories",
        },
      },
      {
        // 3. Flatten the joined array to object to easily access properties
        $unwind: "$transCategories",
      },
      {
        // 4. Group by category name and sum amounts
        $group: {
          _id: {
            name: "$transCategories.name",
            type: "$type",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        // 5. Format the final output
        $project: {
          _id: 0,
          transCategoryName: "$_id.name",
          totalAmount: 1,
          count: 1,
          type: "$_id.type",
        },
      },
      {
        // 6. Sort by category name
        $sort: { transCategoryName: 1 },
      },
    ]);
    return z.array(categorySummaryResponseSchema).parse(results);
  }

  /**
   * Retrieves the category summary for the given last N time units
   * @description This function retrieves the category summary for the given last N time units and returns a promise containing the retrieved category summaries
   * @param {string} userId - Id of the user
   * @param {string} timeUnit - Time unit (e.g. 'day', 'week', 'month', 'year')
   * @param {number} lastNUnits - Number of time units to retrieve (e.g. 1, 2, 3)
   * @returns {Promise<CategorySummaryResponseDTO[]>} A promise containing the retrieved category summaries
   */
  static async getCategorySummaryByLastNUnits(userId: string, timeUnit: TimeUnit, lastNUnits: number) {
    const { start, end } = Utils.getDateRange(timeUnit, lastNUnits);
    return TransService.getCategorySummaryByDateRange(userId, start, end);
  }

  /**
   * Retrieves the category summary for the given date range, grouped by year-month
   * @description This function retrieves the category summary for the given date range, grouped by year-month, and returns a promise containing the retrieved category summaries
   * @param {string} userId - Id of the user
   * @param {Date} startDate - Start date of the range (inclusive)
   * @param {Date} endDate - End date of the range (inclusive)
   * @returns {Promise<CategorySummaryResponseDTO[]>} A promise containing the retrieved category summaries
   */
  static async getMonthCategorySummaryByDateRange(userId: string, startDate?: Date, endDate?: Date) {
    return await TransactionModel.aggregate([
      {
        // 1 Filter by User and Date Range
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        // 2. Join with transcategories to get transaction category details
        $lookup: {
          from: "transcategories",
          localField: "transCategoryId",
          foreignField: "_id",
          as: "transCategories",
        },
      },
      { $unwind: "$transCategories" },
      {
        // 3. Group by Year-Month, Category Name, and Type
        $group: {
          _id: {
            // Creates a string like "2026-01" for sorting and display
            month: { $dateToString: { format: "%Y-%m", date: "$date" } },
            name: "$transCategories.name",
            type: "$type",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        // 4. Sort by month DESC and categoryName ASC
        // This ensures the order of documents pushed into the array later
        $sort: { "_id.month": -1, "_id.name": 1 },
      },
      {
        // 5: Finally group everything by month
        $group: {
          _id: "$_id.month",
          transactions: {
            $push: {
              categoryName: "$_id.name",
              type: "$_id.type",
              totalAmount: "$totalAmount",
              count: "$count",
            },
          },
        },
      },
      {
        // 6. Final Reshape
        $project: {
          _id: 0,
          month: "$_id",
          transactions: 1,
        },
      },
      {
        // 7. Sort by month descending (e.g., 2026-01 before 2025-12)
        $sort: { month: -1 },
      },
    ]);
  }

  /**
   * Retrieves the monthly category summary for the given last N months
   * @param {string} userId - Id of the user
   * @param {number} lastNMonths - Number of months to retrieve (e.g. 1, 2, 3)
   * @returns {Promise<CategorySummaryResponseDTO[]>} A promise containing the retrieved category summaries
   * @description This function retrieves the monthly category summary for the given last N months and returns a promise containing the retrieved category summaries
   */
  static async getMonthlyCategorySummaryForLastNMonths(userId: string, lastNMonths: number) {
    if ((lastNMonths as unknown) instanceof String) lastNMonths = parseInt(lastNMonths as unknown as string);
    if (isNaN(lastNMonths)) throw new BadRequestError("Invalid units(should be a number)");
    const { start, end } = Utils.getDateRange("month", lastNMonths);
    return TransService.getMonthCategorySummaryByDateRange(userId, start, end);
  }

  /**
   * Retrieves the financial summary of the user for the given date range
   * @param {string} userId - Id of the user
   * @param {Date} startDate - Start date of the range (inclusive)
   * @param {Date} endDate - End date of the range (inclusive)
   * @returns {Promise<{ totalIncome: number, totalExpenses: number, remainingBalance: number, currency: string }>} A promise containing the financial summary
   * @description This function retrieves the financial summary of the user for the given date range and returns a promise containing the financial summary
   */
  static async getTransactionSummary(userId: string, startDate?: Date, endDate?: Date) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Build the match criteria dynamically
    const matchCriteria: { userId: mongoose.Types.ObjectId; date?: { $gte?: Date; $lte?: Date } } = { userId: userObjectId };

    if (startDate || endDate) {
      matchCriteria.date = {};
      if (startDate) matchCriteria.date.$gte = startDate;
      if (endDate) matchCriteria.date.$lte = endDate;
    }

    const summary = await TransactionModel.aggregate([
      // 1: Filter by user ID and date range
      { $match: matchCriteria },

      // 2: Group by type and calculate totals
      {
        $group: {
          _id: { type: "$type", currency: "$currency" },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Process the results into an object
    let totalIncome = 0;
    let totalExpenses = 0;

    summary.forEach((item) => {
      if (item._id.type === "income") {
        totalIncome = item.totalAmount;
      } else if (item._id.type === "expense") {
        totalExpenses = item.totalAmount;
      }
    });

    const currentBal = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, currentBalance: currentBal, currency: summary[0]?._id.currency };
  }

  /**
   * Retrieves a list of distinct year-month pairs from the user's transactions, sorted in descending order
   * @param {string} userId - Id of the user
   * @returns {Promise<{ year: number, month: number }[]>} A promise containing the list of year-month pairs
   * @description This function retrieves a list of distinct year-month pairs from the user's transactions, sorted in descending order
   */
  static async getTrasactionYearMonthList(userId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    return TransactionModel.aggregate([
      {
        $match: {
          userId: userObjectId,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
        },
      },
      {
        $sort: {
          year: -1,
          month: -1,
        },
      },
    ]);
  }
}
