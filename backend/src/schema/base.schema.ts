/**
 * @file base.schema.ts
 * @fileoverview This file contains the base schema
 */

import { z } from "zod";
import mongoose from "mongoose";

export const emailSchema = z.email({ message: "Invalid email address" }).transform((val) => val.trim().toLowerCase());
export const passwordSchema = z.string().trim().min(1, "Password is required");
export const nameSchema = z.string().trim().min(2, "Name is required and can not be too short").max(64, "Name is required and can not be too long");
export const currencySchema = z.string().length(3).uppercase();
export const idSchema = z
  .string()
  // 1. Validate that the string is a valid 24-character hex ID
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectID",
  })
  // 2. Transform the string into an actual ObjectId instance
  .transform((val) => new mongoose.Types.ObjectId(val)); //z.instanceof(mongoose.Types.ObjectId, ); //z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
