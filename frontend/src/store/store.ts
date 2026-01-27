/**
 * @file store.ts
 * @fileoverview This file contains the store
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice.store";

/**
 * @constant store
 * @description Store
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
