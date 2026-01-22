/**
 * @file user.route.ts
 * @fileoverview This file contains the user routes
 */

import express from "express";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { UserController } from "./user.controller.js";
import { updateUserSchema, userByEmailSchema, userByIdSchema } from "./user.schema.js";

/**
 * User routes
 * @returns {Router} Express router with user routes
 */
export default function userRoutes() {
  const router = express.Router();

  router.get("/all", UserController.getAllUsers);
  router.get("/email", validateRequest({ query: userByEmailSchema }), UserController.getUserByEmail);
  router.get("/:id", validateRequest({ params: userByIdSchema }), UserController.getUserById);
  router.patch("/:id", validateRequest({ params: userByIdSchema, body: updateUserSchema }), UserController.updateUserById);

  return router;
}
