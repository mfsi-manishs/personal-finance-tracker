/**
 * @file store.ts
 * @fileoverview This file contains the store
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice.store";
import userReducer from "./user-slice.store";

/**
 * @constant store
 * @description Store
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
