/**
 * @file store.ts
 * @fileoverview This file contains the store
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice.store";
import transactionCategoriesReducer from "./transaction-category-slice.store";
import transactionsReducer from "./transaction-slice.store";
import transactionsSummaryReducer from "./transactions-summary-slice.store";
import userReducer from "./user-slice.store";
import monthlyTransactionsReducer from "./monthly-transaction-slice.store";

/**
 * @constant store
 * @description Store
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    transactionCategories: transactionCategoriesReducer,
    transactions: transactionsReducer,
    transactionsSummary: transactionsSummaryReducer,
    monthlyTransactions: monthlyTransactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
