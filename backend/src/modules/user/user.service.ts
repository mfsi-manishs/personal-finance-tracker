/**
 * @file user.service.ts
 * @fileoverview This file contains the user service
 */

import { UserModel, type IUser } from "../../models/user.model.js";
import { NotFoundError } from "../../utils/error.utils.js";
import type { UpdateUserInput, UserByEmailInput, UserByIdInput } from "./user.schema.js";

/**
 * @class UserService
 * @classdesc This class contains the user service
 */
export class UserService {
  /**
   * Gets all users from the database
   * @returns {Promise<IUser[]>} A promise containing all users
   * @throws {NotFoundError} If no users are found
   */
  static async getAllUsers(): Promise<IUser[]> {
    const users = await UserModel.find();
    if (!users) {
      throw new NotFoundError("No users found");
    }
    return users;
  }

  /**
   * Gets a user by ID from the database
   * @param {UserByIdInput} input - Input containing the ID of the user to retrieve
   * @returns {Promise<IUser>} A promise containing the retrieved user
   * @throws {NotFoundError} If the user is not found
   */
  static async getUserById({ id }: UserByIdInput): Promise<IUser> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  /**
   * Retrieves a user by email from the database
   * @param {UserByEmailInput} input - Input containing the email of the user to retrieve
   * @returns {Promise<IUser>} A promise containing the retrieved user
   * @throws {NotFoundError} If the user is not found
   * @description This function retrieves a user by email from the database
   */
  static async getUserByEmail({ email }: UserByEmailInput): Promise<IUser> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  /**
   * Updates a user by ID in the database
   * @param {UserByIdInput} input - Input containing the ID of the user to update
   * @param {UpdateUserInput} data - Data to update the user with
   * @returns {Promise<IUser>} A promise containing the updated user
   * @throws {NotFoundError} If the user is not found
   * @description This function updates a user by ID in the database
   */
  static async updateUserById({ id }: UserByIdInput, data: UpdateUserInput): Promise<IUser> {
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}
