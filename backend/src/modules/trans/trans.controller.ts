/**
 * @file trans.controller.ts
 * @fileoverview This file contains the transaction controller
 */

import type { Request, Response } from "express";
import type {
  ListTransByDateRangeInput,
  ListTransByLastNMonthsInput,
  ListTransByLastNUnitsInput,
  TransactionInput,
  UpdateTransBodyInput,
  UpdateTransParamsInput,
} from "./trans.schema.js";
import { TransService } from "./trans.service.js";

/**
 * @class TransController
 * @classdesc This class contains the transaction controller
 */
export class TransController {
  static async create(req: Request<{}, {}, TransactionInput>, res: Response) {
    const newTrans = await TransService.create(req.user!.id, req.body);
    res.status(201).json(newTrans);
  }

  /**
   * Retrieves all transactions associated with the user
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function retrieves all transactions associated with the user and returns a promise containing the response object
   */
  static async list(req: Request, res: Response) {
    const transactions = await TransService.list(req.user!.id);
    res.status(200).json(transactions);
  }

  /**
   * Retrieves all transactions associated with the user in the given date range
   * @param {Request<{}, {}, {}, ListTransByDateRangeInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function retrieves all transactions associated with the user in the given date range and returns a promise containing the response object
   */
  static async listByDateRange(req: Request<{}, {}, {}, ListTransByDateRangeInput>, res: Response) {
    const transactions = await TransService.listByDateRange(req.user!.id, req.query.startDate, req.query.endDate);
    res.status(200).json(transactions);
  }

  /**
   * Retrieves all transactions associated with the user in the last N time units
   * @param {Request<{}, {}, {}, ListTransByLastNUnitsInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function retrieves all transactions associated with the user in the last N time units and returns a promise containing the response object
   */
  static async listByLastNUnits(req: Request, res: Response) {
    const query = req.query as unknown as ListTransByLastNUnitsInput;
    const transactions = await TransService.listByLastNUnits(req.user!.id, query.timeUnit, query.units);
    res.status(200).json(transactions);
  }

  /**
   * Updates a transaction by ID in the database
   * @param {Request<UpdateTransParamsInput, {}, UpdateTransBodyInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function updates a transaction by ID in the database
   */
  static async update(req: Request, res: Response) {
    const params = req.params as unknown as UpdateTransParamsInput;
    const body = req.body as UpdateTransBodyInput;
    const updatedTrans = await TransService.update(params.id, body);
    res.status(200).json(updatedTrans);
  }

  /**
   * Retrieves the financial summary of the user
   * @description This function retrieves the financial summary of the user and returns a promise containing the response object
   * @returns {Promise<Response>} A promise containing the response object
   */
  static async getTransactionSummary(req: Request, res: Response) {
    const summary = await TransService.getTransactionSummary(req.user!.id);
    res.status(200).json(summary);
  }

  /**
   * Retrieves the list of transactions grouped by year and month
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function retrieves the list of transactions grouped by year and month and returns a promise containing the response object
   */
  static async getTrasactionYearMonthList(req: Request, res: Response) {
    const summary = await TransService.getTrasactionYearMonthList(req.user!.id);
    res.status(200).json(summary);
  }

  /**
   * Deletes a transaction by ID from the database
   * @param {Request<UpdateTransParamsInput>} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function deletes a transaction by ID from the database
   */
  static async delete(req: Request, res: Response) {
    const params = req.params as unknown as UpdateTransParamsInput;
    const deletedTrans = await TransService.delete(params.id);
    res.status(200).json(deletedTrans);
  }

  /**
   * Retrieves the category summary for the given date range
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function retrieves the category summary for the given date range and returns a promise containing the response object
   */
  static async getCategorySummaryByDateRange(req: Request, res: Response) {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    const categorySummary = await TransService.getCategorySummaryByDateRange(req.user!.id, startDate, endDate);
    res.status(200).json(categorySummary);
  }

  /**
   * Retrieves the category summary for the given last N time units
   * @description This function retrieves the category summary for the given last N time units and returns a promise containing the response object
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   */
  static async getCategorySummaryByLastNUnits(req: Request, res: Response) {
    const query = req.query as unknown as ListTransByLastNUnitsInput;
    const categorySummary = await TransService.getCategorySummaryByLastNUnits(req.user!.id, query.timeUnit, query.units);
    res.status(200).json(categorySummary);
  }

  /**
   * Retrieves the category summary for the given last N months
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} A promise containing the response object
   * @description This function retrieves the category summary for the given last N months and returns a promise containing the response object
   */
  static async getMonthlyCategorySummaryForLastNMonths(req: Request, res: Response) {
    const query = req.query as unknown as ListTransByLastNMonthsInput;
    const categorySummary = await TransService.getMonthlyCategorySummaryForLastNMonths(req.user!.id, query.months);
    res.status(200).json(categorySummary);
  }
}
