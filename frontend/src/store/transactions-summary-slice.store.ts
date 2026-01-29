/**
 * @file transactions-summary-slice.store.ts
 * @fileoverview This file contains the transactions summary slice
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

/**
 * @interface TransactionsSummary
 * @description Transactions summary
 */
interface TransactionsSummary {
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  currency: string;
}

const initialState: TransactionsSummary = { totalIncome: 0, totalExpenses: 0, currentBalance: 0, currency: "INR" };

/**
 * @interface FetchTransactionsSummaryArgs
 * @description Fetch transactions summary arguments
 */
interface FetchTransactionsSummaryArgs {
  startDate?: string;
  endDate?: string;
}

/**
 * @function fetchTransactionsSummary
 * @description Fetches the transactions summary
 */
export const fetchTransactionsSummary = createAsyncThunk("transactions-summary/fetch", async (args: FetchTransactionsSummaryArgs) => {
  const { startDate, endDate } = args;

  // Axios will automatically serialize these into query parameters (?startDate=...&endDate=...)
  const response = await api.get("/trans/trans-summary", {
    params: {
      startDate,
      endDate,
    },
  });

  return {
    totalIncome: response.data.totalIncome,
    totalExpenses: response.data.totalExpenses,
    currentBalance: response.data.currentBalance,
    currency: response.data.currency,
  };
});

const transactionsSummarySlice = createSlice({
  name: "transactionsSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactionsSummary.fulfilled, (state: TransactionsSummary, action: PayloadAction<TransactionsSummary>) => {
      state.totalIncome = action.payload.totalIncome;
      state.totalExpenses = action.payload.totalExpenses;
      state.currentBalance = action.payload.currentBalance;
      state.currency = action.payload.currency;
    });
  },
});

export default transactionsSummarySlice.reducer;
