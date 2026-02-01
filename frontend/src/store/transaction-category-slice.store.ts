/**
 * @file transaction-category-slice.store.ts
 * @fileoverview This file contains the transaction category slice
 */

import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
import type { RootState } from "./store";
import type { TransactionCategoryState } from "./store.type";

/**
 * @function fetchCategories
 * @description Fetch transaction categories
 */
export const fetchCategories = createAsyncThunk("transactionCategories/fetchCategories", async () => {
  const response = await api.get<TransactionCategoryState[]>("/trans-categories");
  return response.data;
});

/**
 * @function createCategory
 * @description Creates a new transaction category
 */
export const createCategory = createAsyncThunk("transactionCategory/createCategory", async (category: Omit<TransactionCategoryState, "id">) => {
  const response = await api.post<TransactionCategoryState>("/trans-categories/create", category);
  return response.data;
});

/**
 * @function editCategory
 * @description Edits an existing transaction category
 */
export const editCategory = createAsyncThunk("transactionCategories/editCategory", async (category: TransactionCategoryState) => {
  const response = await api.patch<TransactionCategoryState>(`/trans-categories/${category.id}`, category);
  return response.data;
});

/**
 * @function removeCategory
 * @description Deletes a transaction category
 */
export const removeCategory = createAsyncThunk("transactionCategories/removeCategory", async (id: string) => {
  await api.delete(`/trans-categories/${id}`);
  return id;
});

// Adapter
export const transactionCategoryAdapter = createEntityAdapter<TransactionCategoryState>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Initial state
const initialState = transactionCategoryAdapter.getInitialState({ status: "idle", error: null as string | null });

// Slice
const transactionCategorySlice = createSlice({
  name: "transactionCategories",
  initialState,
  reducers: {
    addCategory: transactionCategoryAdapter.addOne,
    addCategories: transactionCategoryAdapter.addMany,
    setCategories: transactionCategoryAdapter.setAll,
    updateCategory: transactionCategoryAdapter.updateOne,
    deleteCategory: transactionCategoryAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        transactionCategoryAdapter.setAll(state, action.payload);
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        transactionCategoryAdapter.addOne(state, action.payload);
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        transactionCategoryAdapter.updateOne(state, { id: action.payload.id, changes: action.payload });
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        transactionCategoryAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectTotal: selectTotalCategories,
} = transactionCategoryAdapter.getSelectors((state: RootState) => state.transactionCategories);
export const selectCategoriesByType = (state: RootState, type: "custom" | "default") => selectAllCategories(state).filter((cat) => cat.type === type);

export const { addCategory, addCategories, setCategories, updateCategory, deleteCategory } = transactionCategorySlice.actions;

export default transactionCategorySlice.reducer;
