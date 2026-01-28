/**
 * @file transaction-slice.store.ts
 * @fileoverview This file contains the transaction slice
 */

import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

/**
 * @interface Transaction
 * @description Transaction interface
 */
export interface Transaction {
  id: string;
  category: string;
  amount: number;
  currency: string;
  type: "income" | "expense";
  description: string;
  date: string;
}

/**
 * @constant transactionsAdapter
 * @description Entity adapter for transactions
 */
const transactionsAdapter = createEntityAdapter<Transaction>({
  sortComparer: (a, b) => b.date.localeCompare(a.date), // Sort by newest date
});

// Async thunks

/**
 * @const fetchTransactions
 * @description Fetches all transactions from the backend
 */
export const fetchTransactions = createAsyncThunk("transactions/fetchAll", async () => {
  const response = await api.get("/trans/all");
  return response.data;
});

/**
 * @const createTransaction
 * @description Creates a new transaction
 */
export const createTransaction = createAsyncThunk("transactions/create", async (data: Omit<Transaction, "id">) => {
  const response = await api.post("/trans", data);
  return response.data; // Backend returns the transaction with its new ID
});

/**
 * @const editTransaction
 * @description Edits an existing transaction
 */
export const editTransaction = createAsyncThunk("transactions/edit", async (data: Transaction) => {
  const response = await api.patch(`/trans/${data.id}`, data);
  return response.data;
});

/**
 * @const deleteTransaction
 * @description Deletes a transaction
 */
export const deleteTransaction = createAsyncThunk("transactions/delete", async (id: string) => {
  await api.delete(`/trans/${id}`);
  return id;
});

/**
 * @const transactionSlice
 * @description Creates a slice for transactions
 */
const transactionSlice = createSlice({
  name: "transactions",
  initialState: transactionsAdapter.getInitialState({ status: "idle" }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, transactionsAdapter.setAll)
      .addCase(createTransaction.fulfilled, transactionsAdapter.addOne)
      .addCase(editTransaction.fulfilled, (state, action) => {
        console.log(typeof action.payload.amount);
        const payload = { ...action.payload, amount: Number(action.payload.amount) };
        transactionsAdapter.updateOne(state, { id: action.payload.id, changes: payload });
      })
      .addCase(deleteTransaction.fulfilled, transactionsAdapter.removeOne);
  },
});

// Selectors

/**
 * @const selectAllTransactions
 * @description Selects all transactions
 */
export const { selectAll: selectAllTransactions } = transactionsAdapter.getSelectors((state: any) => state.transactions);

export default transactionSlice.reducer;
