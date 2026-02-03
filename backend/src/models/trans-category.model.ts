/**
 * @file transaction-category.model.ts
 * @fileoverview This file contains the transaction category model
 */

import mongoose from "mongoose";

export type TransCategoryType = "default" | "custom";

const transCategorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: function () {
      return this.type === "custom";
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 64,
    minLength: 2,
    match: /^[A-Za-z ]+$/,
  },
  description: {
    type: String,
    maxLength: 128,
  },
  type: {
    type: String,
    enum: ["default", "custom"],
    default: "custom",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type TransCategoryDoc = Partial<ITransCategory> & { _id?: mongoose.Types.ObjectId; __v?: number; createdAt?: Date };

transCategorySchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret: TransCategoryDoc) => {
    delete ret._id;
    delete ret.createdAt;
    delete ret.__v;
    return ret;
  },
});

transCategorySchema.index({ name: 1, type: 1, userId: 1 }, { unique: true });

export type ITransCategory = mongoose.InferSchemaType<typeof transCategorySchema>;

export const TransCategoryModel = mongoose.model<ITransCategory>("TransCategory", transCategorySchema);
