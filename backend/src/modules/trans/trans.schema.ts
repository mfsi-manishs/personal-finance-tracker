/**
 * @file trans.schema.ts
 * @fileoverview This file contains the transaction schema
 */

import { z } from "zod";
import { idSchema } from "../../schema/base.schema.js";

export const amountSchema = z.number().positive("Amount must be positive");
export const currencySchema = z
  .string()
  .length(3, "Currency code(ISO 4217) must be 3 characters")
  .uppercase("Currency code(ISO 4217) must be uppercase");
export const transTypeSchema = z.enum(["income", "expense"], "Type must be either 'income' or 'expense'");
export const descriptionSchema = z.string().max(128, "Description is too long (128 characters max)");
export const dateSchema = z.iso.datetime().pipe(z.coerce.date());

/**
 * @constant transactionSchema
 * @description Transaction schema
 */
export const transactionSchema = z.object({
  transCategoryId: idSchema.refine((val) => val, {
    message: "Invalid Transaction Category",
  }),
  amount: amountSchema,
  currency: currencySchema,
  type: transTypeSchema,
  description: descriptionSchema.optional(),
  date: dateSchema.optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;

/**
 * @constant listTransByDateRangeSchema
 * @description List transaction by date range request data schema
 */
export const listTransByDateRangeSchema = z.object({
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
});

export type ListTransByDateRangeInput = z.infer<typeof listTransByDateRangeSchema>;

/**
 * @constant listTransByLastNUnitsSchema
 * @description List transaction by last N time units request data schema
 */
const baseObject = z.object({
  timeUnit: z.enum(["hour", "day", "week", "month", "year", "fy"], "Time unit must be either 'hour', 'day', 'week', 'month', 'year' or 'fy'"),
  units: z.coerce.number().min(0).int("units must be a non-negative integer"),
});
export const listTransByLastNUnitsSchema = baseObject.superRefine((data, ctx) => {
  const timeUnitLimits: Record<string, number> = { day: 90, week: 12, month: 36, year: 5, fy: 5 };
  const maxAllowed = timeUnitLimits[data.timeUnit];

  if (maxAllowed && data.units > maxAllowed) {
    ctx.addIssue({
      code: "custom",
      message: `Maximum units for ${data.timeUnit} is ${maxAllowed}`,
      path: ["units"], // This highlights the 'units' field as the source of error
    });
  }
});

export type ListTransByLastNUnitsInput = z.infer<typeof baseObject>;

/**
 * @constant listTransByLastNMonthsSchema
 * @description List transaction by last N months request data schema
 */
export const listTransByLastNMonthsSchema = z.object({
  months: z.coerce.number().min(0).int("months must be a non-negative integer"),
});

export type ListTransByLastNMonthsInput = z.infer<typeof listTransByLastNMonthsSchema>;

/**
 * @constant updateTransParamsSchema
 * @description Update transaction params schema
 */
export const updateTransParamsSchema = z.object({
  id: idSchema,
});

export type UpdateTransParamsInput = z.infer<typeof updateTransParamsSchema>;

/**
 * @constant updateTransBodySchema
 * @description Update transaction body schema
 */
export const updateTransBodySchema = z.object({
  amount: amountSchema.optional(),
  currency: currencySchema.optional(),
  type: transTypeSchema.optional(),
  description: descriptionSchema.optional(),
  date: dateSchema.optional(),
});

export type UpdateTransBodyInput = z.infer<typeof updateTransBodySchema>;

/**
 * @constant categorySummaryResponseSchema
 * @description Category summary response schema
 */
export const categorySummaryResponseSchema = z.object({
  transCategoryName: z.string(),
  totalAmount: z.number(),
  count: z.number(),
  type: transTypeSchema,
});

// Infer the TypeScript type (DTO)
export type CategorySummaryResponseDTO = z.infer<typeof categorySummaryResponseSchema>;
