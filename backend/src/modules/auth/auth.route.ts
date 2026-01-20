/**
 * @file auth.route.ts
 * @fileoverview This file contains the auth routes
 */

import { Router } from "express";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { AuthController } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

/**
 * Registers a new user and logs in an existing user
 * @returns {Router} Express router with auth routes
 */
export default function authRoutes() {
  const router = Router();

  router.post("/register", validateRequest({ body: registerSchema }), AuthController.register);
  router.post("/login", validateRequest({ body: loginSchema }), AuthController.login);

  return router;
}
