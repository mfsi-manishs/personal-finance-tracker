/**
 * @file user.route.ts
 * @fileoverview This file contains the user routes
 */

import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";

/**
 * User routes
 * @returns {Router} Express router with user routes
 */
export default function userRoutes() {
  const router = express.Router();

  router.get("/all", getAllUsers);

  return router;
}
