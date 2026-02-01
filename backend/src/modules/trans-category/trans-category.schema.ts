/**
 * @file transaction-category.schema.ts
 * @fileoverview This file contains the transaction category schema
 */

import { z } from "zod";
import { idSchema } from "../../schema/base.schema.js";

const nameSchema = z
  .string()
  .min(1, "Name is required")
  .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces");

const descSchema = z.string().max(128, "Description is too long (128 characters max)");

/**
 * @constant createTransCategorySchema
 * @description Create transaction category schema
 */
export const createTransCategorySchema = z.object({
  name: nameSchema,
  type: z.enum(["default", "custom"]),
  description: z.string().max(128, "Description is too long (128 characters max)").optional(),
});

export type CreateTransCategoryInput = z.infer<typeof createTransCategorySchema>;

export const updateTransCategorySchema = z.object({
  name: nameSchema.optional(),
  description: descSchema.optional(),
});

export type UpdateTransCategoryInput = z.infer<typeof updateTransCategorySchema>;

export const updateTransCategoryParamsSchema = z.object({
  id: idSchema,
});

export type UpdateTransCategoryParamsInput = z.infer<typeof updateTransCategoryParamsSchema>;

export const deleteTransCategorySchema = z.object({
  id: idSchema,
});

export type DeleteTransCategoryInput = z.infer<typeof deleteTransCategorySchema>;
