/**
 * @file trans.model.ts
 * @fileoverview This file contains the transaction model
 */

import mongoose from "mongoose";

/**
 * @enum TransType
 * @description Transaction type
 */
export type TransType = "income" | "expense";

/**
 * @interface ITransaction
 * @description Transaction interface
 */
export interface ITransaction extends mongoose.Document {
  userId: mongoose.Types.ObjectId; // reference to User
  transCategoryId: mongoose.Types.ObjectId; // reference to Category
  amount: number;
  currency: string;
  type: TransType;
  description?: string;
  date: Date;
}

/**
 * @constant transactionSchema
 * @description Transaction schema
 */
const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TransCategory",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      length: 3,
      uppercase: true,
      default: "INR",
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

transactionSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret: any) => {
    if (ret.transCategoryId) {
      ret.transCategory = ret.transCategoryId;
      delete ret.transCategoryId;
    }
    delete ret._id;
    delete ret.createdAt;
    delete ret.userId;
    delete ret.__v;
    return ret;
  },
});

transactionSchema.index({ userId: 1, date: 1 });

/**
 * @constant TransactionModel
 * @description Transaction model
 */
export const TransactionModel = mongoose.model<ITransaction>("Transaction", transactionSchema);
