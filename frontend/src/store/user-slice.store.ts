/**
 * @file user-slice.store.ts
 * @fileoverview This file contains the user slice
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

/**
 * @interface UserState
 * @description User state
 */
interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  isLoggedIn: boolean;
  lastLoginAt: string | null;
  preferredCurrency: string | null;
}

/**
 * @constant initialState
 * @description Initial user state
 */
const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  role: null,
  isLoggedIn: false,
  lastLoginAt: null,
  preferredCurrency: null,
};

/**
 * @constant userSlice
 * @description User slice
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Set user state
     * @param {UserState} state - User state
     * @param {PayloadAction<{ id: string; name: string; email: string; role: string; lastLoginAt: string; preferredCurrency: string }>} action - Action to set user state
     * @description This function sets the user state
     * It takes a user state and an action to set the user state and returns the updated user state
     */
    setUser: (
      state,
      action: PayloadAction<{ id: string; name: string; email: string; role: string; lastLoginAt: string; preferredCurrency: string }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      state.lastLoginAt = action.payload.lastLoginAt;
      state.preferredCurrency = action.payload.preferredCurrency;
    },

    /**
     * Clears the user state
     * @description This function clears the user state by setting all of its properties to null or false
     */
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.isLoggedIn = false;
      state.lastLoginAt = null;
      state.preferredCurrency = null;
    },
  },
});

// Selectors

export const selectUser = (state: RootState) => state.user;
export const selectPreferredCurrency = (state: RootState) => state.user.preferredCurrency;

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
