/**
 * @file trans-category.route.ts
 * @fileoverview This file contains the transaction category routes
 */

import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { TransCategoryController } from "./trans-category.controller.js";
import { createTransCategorySchema } from "./trans-category.schema.js";

/**
 * Returns the router with transaction category routes
 * @description This function returns an express router with routes to create a new transaction category and to retrieve all transaction categories associated with the user
 * @returns {Router} Express router with transaction category routes
 */
export default function transCategoryRoutes() {
  const router = Router();

  router.post("/create", authenticate, validateRequest({ body: createTransCategorySchema }), TransCategoryController.createTransCategory);
  router.get("/", authenticate, TransCategoryController.list);

  return router;
}
