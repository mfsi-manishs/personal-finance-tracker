/**
 * @file Auth schema
 * @fileoverview This file contains the auth schema
 */

import { z } from "zod";

export const emailSchema = z.email({ message: "Invalid email address" }).transform((val) => val.trim().toLowerCase());
export const passwordSchema = z.string().trim().min(1, "Password is required");
export const tokenSchema = z.string().trim().min(1, "Refresh Token is required");

/**
 * @constant registerSchema
 * @description Register schema
 */
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

/**
 * @constant loginSchema
 * @description Login schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginSchema> & { userAgent: string; ipAddress: string };

/**
 * @constant refreshTokenSchema
 * @description Refresh token schema
 */
export const refreshTokenSchema = z.object({ refreshToken: tokenSchema });

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema> & { userAgent: string; ipAddress: string };

/**
 * @constant forgotPasswordSchema
 * @description Forgot password schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

/**
 * @constant resetPasswordSchema
 * @description Reset password schema
 */
export const resetPasswordSchema = z.object({
  token: tokenSchema,
  newPassword: passwordSchema,
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
