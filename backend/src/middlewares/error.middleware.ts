import type { NextFunction, Request, Response } from "express";
import { env } from "../env.js";
import { z } from "zod";

/**
 * Global error handler middleware
 * @description This middleware catches all errors and formats them into a standardized response
 * @param {any} err - The error object
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 */
export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose Duplicate Key Error (Mongo Code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate field value entered";
  }

  // Handle invalid JSON parsing errors
  if (err.type === "entity.parse.failed") {
    res.status(400).json({
      status: "fail",
      error: "Invalid JSON payload",
      details: err.message,
    });
    return;
  }

  // Handle Zod Request Data Validation Errors
  if (err instanceof z.ZodError) {
    const { fieldErrors, formErrors } = z.flattenError(err);
    res.status(400).json({
      status: "fail",
      error: "Invalid request data",
      details: fieldErrors,
      global: formErrors.length > 0 ? formErrors : undefined,
    });
    return;
  }

  res.status(statusCode).json({
    status: statusCode < 500 ? "fail" : "error",
    message,
    // Include stack trace only in development mode
    stack: env.nodeEnv === "development" ? err.stack : undefined,
  });
};
