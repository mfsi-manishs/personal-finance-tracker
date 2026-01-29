import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";
import type { RootState } from "./store";

export interface TransactionCategory {
  id: string;
  name: string;
  type: "custom" | "default";
  description: string;
}

// Fetch all categories
export const fetchCategories = createAsyncThunk("transactionCategories/fetchCategories", async () => {
  const response = await api.get<TransactionCategory[]>("/trans-categories");
  return response.data;
});

// Add new category (backend generates id)
export const createCategory = createAsyncThunk("transactionCategory/createCategory", async (category: Omit<TransactionCategory, "id">) => {
  const response = await api.post<TransactionCategory>("/trans-categories", category);
  return response.data;
});

// Update category
export const editCategory = createAsyncThunk("transactionCategories/editCategory", async (category: TransactionCategory) => {
  const response = await api.patch<TransactionCategory>(`/trans-categories/${category.id}`, category);
  return response.data;
});

// Delete category
export const removeCategory = createAsyncThunk("transactionCategories/removeCategory", async (id: string) => {
  await api.delete(`/trans-categories/${id}`);
  return id;
});

// Adapter
export const transactionCategoryAdapter = createEntityAdapter<TransactionCategory>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Initial state
const initialState = transactionCategoryAdapter.getInitialState({ status: "idle", error: null as string | null });

// Slice
const transactionCategorySlice = createSlice({
  name: "transactionCategories",
  initialState,
  reducers: {
    // Add category from backend response
    addCategory: transactionCategoryAdapter.addOne,

    // Add multiple categories (e.g., bulk fetch from backend)
    addCategories: transactionCategoryAdapter.addMany,

    // Replace all categories (e.g., after fetching list)
    setCategories: transactionCategoryAdapter.setAll,

    // Update category (backend usually returns updated object)
    updateCategory: transactionCategoryAdapter.updateOne,

    // Delete category by id
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
