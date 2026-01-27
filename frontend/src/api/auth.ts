/**
 * @file auth.ts
 * @fileoverview This file contains the auth api
 */

import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { clearToken, setToken } from "../store/auth-slice.store";
import { setUser, clearUser } from "../store/user-slice.store";
import { type RootState } from "../store/store";

/**
 * Returns an object containing the auth token, login function, and logout function.
 * The login function logs in an existing user and returns an access token and a refresh token.
 * The logout function logs out the user by clearing the refresh token cookie.
 * @returns {{token: string|null, login: (email: string, password: string) => Promise<void>, logout: () => Promise<void>}}}
 */
export function useAuth() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    dispatch(setToken(res.data.token));
    dispatch(
      setUser({
        id: res.data.id as string,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        lastLoginAt: res.data.lastLoginAt,
        preferredCurrency: res.data.preferredCurrency,
      })
    );
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      dispatch(clearToken());
      dispatch(clearUser());
    }
  };

  return { token, login, logout };
}
