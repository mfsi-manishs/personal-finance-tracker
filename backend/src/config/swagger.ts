/**
 * @file swagger.ts
 * @fileoverview This file contains the swagger configuration
 */

import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Personal Finance Tracker API",
    version: "1.0.0",
    description: "API documentation for Personal Finance Tracker Node + Express + MongoDB app",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      RegisterInput: {
        type: "object",
        properties: {
          name: { type: "string", example: "John Doe" },
          email: { type: "string", example: "john@example.com" },
          password: { type: "string", example: "strongPassword123" },
          preferredCurrency: { type: "string", example: "USD" },
        },
      },
      RegisterResponseDTO: {
        type: "object",
        properties: {
          id: { type: "string", example: "1234567890" },
          name: { type: "string", example: "John Doe" },
          email: { type: "string", example: "john@example.com" },
          role: { type: "string", example: "user" },
          isEmailVerified: { type: "boolean", example: true },
          preferredCurrency: { type: "string", example: "USD" },
          createdAt: { type: "string", example: "2022-01-01T00:00:00.000Z" },
          updatedAt: { type: "string", example: "2022-01-01T00:00:00.000Z" },
        },
      },
      LoginInput: {
        type: "object",
        properties: {
          email: { type: "string", example: "john@example.com" },
          password: { type: "string", example: "strongPassword123" },
        },
      },
      LoginResponseDTO: {
        type: "object",
        properties: {
          id: { type: "string", example: "1234567890" },
          name: { type: "string", example: "John Doe" },
          email: { type: "string", example: "john@example.com" },
          role: { type: "string", example: "user" },
          token: { type: "string", example: "token123" },
          isEmailVerified: { type: "boolean", example: true },
          preferredCurrency: { type: "string", example: "USD" },
          lastLoginAt: { type: "string", example: "2022-01-01T00:00:00.000Z" },
          loginAttempts: { type: "number", example: 0 },
          lockUntil: { type: "string", example: "2022-01-01T00:00:00.000Z" },
          createdAt: { type: "string", example: "2022-01-01T00:00:00.000Z" },
          updatedAt: { type: "string", example: "2022-01-01T00:00:00.000Z" },
        },
      },
      RefreshTokenResponseDTO: {
        type: "object",
        properties: {
          token: { type: "string", example: "abcdefghijklmnopqrstuvwxyztoken123" },
        },
      },
      ForgotPasswordInput: {
        type: "object",
        properties: {
          email: { type: "string", example: "john@example.com" },
        },
      },
    },
  },
};

const routesGlob = [path.join(__dirname, "../modules/**/*.route.{ts,js}"), path.join(__dirname, "../routes/**/*.route.{ts,js}")];

console.log("Swagger will load routes from:", routesGlob);

const options = {
  swaggerDefinition,
  apis: routesGlob,
};

export const swaggerSpecDoc = swaggerJSDoc(options);

// TODO: Remove the above code and uncomment the following code to use zod-to-openapi.

// import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
// import { authRegistry } from "../modules/auth/auth.openapi.js";

// const registry = new OpenAPIRegistry();

// // Merge module registries
// registry.definitions.push(...authRegistry.definitions);

// const generator = new OpenApiGeneratorV3(registry.definitions);

// export const swaggerSpecDoc = generator.generateDocument({
//   openapi: "3.0.3",
//   info: {
//     title: "Personal Finance Tracker API",
//     version: "1.0.0",
//   },
// });
