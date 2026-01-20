/**
 * @file Database configuration
 * @fileoverview This file contains the configuration for the database
 */

import mongoose from "mongoose";
import { env } from "../env.js";

/**
 * @class MongoDB
 * @classdesc This class is used to connect to the database
 */
export class MongoDB {
  private constructor() {}

  /**
   * Connects to the MongoDB database
   * @throws {Error} If connection fails
   * @returns {Promise<void>} Resolves when connection is established
   */
  public static async connectDB() {
    try {
      await mongoose.connect(env.mongoUri);
      console.log("MongoDB connected...");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    }
  }

  /**
   * Disconnects from the MongoDB database
   * @throws {Error} If disconnection fails
   * @returns {Promise<void>} Resolves when disconnection is established
   */
  public static async disconnectDB() {
    try {
      await mongoose.disconnect();
      console.log("MongoDB disconnected");
    } catch (err) {
      console.error("MongoDB disconnection error:", err);
      process.exit(1);
    }
  }
}
