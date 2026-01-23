/**
 * @file base.schema.ts
 * @fileoverview This file contains the base schema
 */

import { z } from "zod";

export const emailSchema = z.email({ message: "Invalid email address" }).transform((val) => val.trim().toLowerCase());
export const passwordSchema = z.string().trim().min(1, "Password is required");
export const nameSchema = z.string().trim().min(2, "Name is required and can not be too short").max(64, "Name is required and can not be too long");
export const currencySchema = z.string().length(3).uppercase();
