/**
 * @file store.type.ts
 * @fileoverview This file contains the store types
 */

/**
 * @interface AuthState
 * @description Auth state
 */
export interface AuthState {
  token: string | null;
}

/**
 * @interface UserState
 * @description User state
 */
export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  isLoggedIn: boolean;
  lastLoginAt: string | null;
  preferredCurrency: string | null;
}

/**
 * @interface TransactionCategoryState
 * @description Transaction category state
 */
export interface TransactionCategoryState {
  id: string;
  name: string;
  type: "custom" | "default";
  description: string;
}

/**
 * @interface Transaction
 * @description Transaction interface
 */
export interface TransactionState {
  id: string;
  transCategory: TransactionCategoryState;
  amount: number;
  currency: string;
  type: "income" | "expense";
  description: string;
  date: string;
}

/**
 * @interface TransactionsSummary
 * @description Transactions summary
 */
export interface TransactionsSummary {
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  currency: string;
}

/**
 * @interface YearMonth
 * @description Year month
 */
export interface YearMonthPair {
  year: number;
  month: number;
}

/**
 * @interface MonthlyTransactionState
 * @description Monthly transaction state
 */
export interface MonthlyTransactionState {
  yearMonths: Array<YearMonthPair>;
  totalIncome: number;
  totalExpense: number;
  transactions: TransactionState[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}
