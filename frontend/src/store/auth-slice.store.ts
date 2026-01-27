/**
 * @file auth-slice.store.ts
 * @fileoverview This file contains the auth slice
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * @interface AuthState
 * @description Auth state
 */
interface AuthState {
  token: string | null;
}

/**
 * @constant initialState
 * @description Initial auth state
 */
const initialState: AuthState = {
  token: null,
};

/**
 * @constant authSlice
 * @description Auth slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
