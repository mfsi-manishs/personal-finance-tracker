/**
 * @file monthly-transaction-slice.store.ts
 * @fileoverview This file contains the monthly transaction slice
 */

import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "../api/axios";
import type { RootState } from "./store";
import type { MonthlyTransactionState, TransactionState, YearMonthPair } from "./store.type";

/**
 * @function fetchTransactionYearMonths
 * @description Fetch transaction year months
 */
export const fetchTransactionYearMonths = createAsyncThunk("monthlyTransactions/fetchTransactionYearMonths", async () => {
  const res = await api.get("/trans/trans-year-month-list");
  return res.data;
});

/**
 * @function fetchMonthlyTransactions
 * @description Fetch monthly transactions
 */
export const fetchMonthlyTransactions = createAsyncThunk("monthlyTransactions/fetchMonthlyTransactions", async (yearMonth: YearMonthPair) => {
  const response = await api.get<TransactionState[]>("/trans/list-by-date-range", {
    params: {
      startDate: new Date(yearMonth.year, yearMonth.month - 1, 1).toISOString(),
      endDate: new Date(yearMonth.year, yearMonth.month, 0).toISOString(),
    },
  });
  return response.data;
});

const initialState: MonthlyTransactionState = { yearMonths: [], totalIncome: 0, totalExpense: 0, transactions: [], status: "idle" };

const monthlyTransactionsSlice = createSlice({
  name: "monthlyTransactions",
  initialState,
  reducers: {
    clearTransactions(state) {
      state.transactions = [];
      state.totalIncome = 0;
      state.totalExpense = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionYearMonths.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactionYearMonths.fulfilled, (state, action: PayloadAction<YearMonthPair[]>) => {
        state.yearMonths = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTransactionYearMonths.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch transaction year months";
      })
      .addCase(fetchMonthlyTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMonthlyTransactions.fulfilled, (state, action: PayloadAction<TransactionState[]>) => {
        state.transactions = action.payload;
        state.totalIncome = action.payload.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
        state.totalExpense = action.payload.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
        state.status = "succeeded";
      })
      .addCase(fetchMonthlyTransactions.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch monthly transactions";
      });
  },
});

// Selectors
export const selectMonthlyTransactions = (state: RootState) => state.monthlyTransactions;

export const { clearTransactions } = monthlyTransactionsSlice.actions;

export default monthlyTransactionsSlice.reducer;
