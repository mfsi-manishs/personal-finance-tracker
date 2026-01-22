/**
 * @file user.schema.ts
 * @fileoverview This file contains the user schema
 */

import { z } from "zod";
import { emailSchema, nameSchema } from "../../schema/base.schema.js";

/**
 * @constant userByIdSchema
 * @description User by id schema
 */
export const userByIdSchema = z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId") });

export type UserByIdInput = z.infer<typeof userByIdSchema>;

/**
 * @constant userByEmailSchema
 * @description User by email schema
 */
export const userByEmailSchema = z.object({ email: emailSchema });

export type UserByEmailInput = z.infer<typeof userByEmailSchema>;

/**
 * @constant updateUserSchema
 * @description Update user schema
 */
export const updateUserSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
