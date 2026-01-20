/**
 * @file Auth schema
 * @fileoverview This file contains the auth schema
 */

import { z } from "zod";

export const emailSchema = z.email({ message: "Invalid email address" }).transform((val) => val.trim().toLowerCase());
export const passwordSchema = z.string().trim().min(1, "Password is required");

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required and can not be too short")
    .max(64, "Name is required and can not be too long")
    .regex(/^[\p{L}\p{M}]+([ '.\-][\p{L}\p{M}]+)*$/u, "Name can only contain unicode letters, spaces, dots, hyphens and apostrophes"),
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
