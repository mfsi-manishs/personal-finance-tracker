/**
 * @file transaction-category.schema.ts
 * @fileoverview This file contains the transaction category schema
 */

import { z } from "zod";

/**
 * @constant createTransCategorySchema
 * @description Create transaction category schema
 */
export const createTransCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),
  type: z.enum(["default", "custom"]),
  description: z.string().max(128, "Description is too long (128 characters max)").optional(),
});

export type CreateTransCategoryInput = z.infer<typeof createTransCategorySchema>;
