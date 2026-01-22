import { TransCategoryModel } from "../models/trans-category.model.js";
import { defaultTransCategories } from "../seed-data/trans-categories.js";

export async function seedDefaultCategories() {
  for (const defCat of defaultTransCategories) {
    await TransCategoryModel.updateOne(
      { name: defCat.name, type: "default" }, // match criteria
      { $setOnInsert: defCat }, // insert only if not exists
      { upsert: true } // ensures idempotency
    );
  }
}
