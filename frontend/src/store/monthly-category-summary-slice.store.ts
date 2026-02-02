/**
 * @file monthly-category-summary-slice.store.ts
 * @fileoverview This file contains the monthly category summary slice
 */

import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../api/axios";
import type { RootState } from "./store";
import type { MonthlyCategorySummary, MonthlyCategorySummaryState } from "./store.type";

/**
 * Async thunk to fetch consolidated monthly category summaries
 */
export const fetchMonthlyCategorySummaries = createAsyncThunk<MonthlyCategorySummary[]>("monthlyCategorySummary/fetch", async () => {
  const response = await api.get<MonthlyCategorySummary[]>("/trans/monthly-category-summary", {
    params: { months: 1200 },
  });
  return response.data;
});

const initialState: MonthlyCategorySummaryState = {
  data: [],
  status: "idle",
  error: undefined,
};

const monthlyCategorySummarySlice = createSlice({
  name: "monthlyCategorySummary",
  initialState,
  reducers: {
    clearSummaries(state) {
      state.data = [];
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyCategorySummaries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMonthlyCategorySummaries.fulfilled, (state, action: PayloadAction<MonthlyCategorySummary[]>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMonthlyCategorySummaries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectAllMonthlyCategorySummaries = (state: RootState) => state.monthlyCategorySummary.data;

export const { clearSummaries } = monthlyCategorySummarySlice.actions;
export default monthlyCategorySummarySlice.reducer;
