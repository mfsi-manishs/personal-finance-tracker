/**
 * @file trans.route.ts
 * @fileoverview This file contains the transaction routes
 */

import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { TransController } from "./trans.controller.js";
import {
  listTransByDateRangeSchema,
  listTransByLastNMonthsSchema,
  listTransByLastNUnitsSchema,
  transactionSchema,
  updateTransBodySchema,
  updateTransParamsSchema,
} from "./trans.schema.js";

/**
 * Transaction routes
 * @description This function returns an express router with transaction routes
 * It contains routes to create a new transaction, list all transactions by date range, list all transactions by last N time units, get category summary by date range, get category summary by last N time units, get monthly category summary for last N months, delete a transaction, and update a transaction
 * @returns {Router} Express router with transaction routes
 */
export default function transRoutes() {
  const router = Router();

  router.post("/", authenticate, validateRequest({ body: transactionSchema }), TransController.create);
  router.get("/all", authenticate, TransController.list);
  router.get("/list-by-date-range", authenticate, validateRequest({ query: listTransByDateRangeSchema }), TransController.listByDateRange);
  router.get("/list-by-time-unit", authenticate, validateRequest({ query: listTransByLastNUnitsSchema }), TransController.listByLastNUnits);
  router.get(
    "/category-summary-date-range",
    authenticate,
    validateRequest({ query: listTransByDateRangeSchema }),
    TransController.getCategorySummaryByDateRange
  );
  router.get(
    "/category-summary-last-n-units",
    authenticate,
    validateRequest({ query: listTransByLastNUnitsSchema }),
    TransController.getCategorySummaryByLastNUnits
  );
  router.get(
    "/monthly-category-summary",
    authenticate,
    validateRequest({ query: listTransByLastNMonthsSchema }),
    TransController.getMonthlyCategorySummaryForLastNMonths
  );
  router.delete("/:id", authenticate, validateRequest({ params: updateTransParamsSchema }), TransController.delete);
  router.patch("/:id", authenticate, validateRequest({ params: updateTransParamsSchema, body: updateTransBodySchema }), TransController.update);

  return router;
}
