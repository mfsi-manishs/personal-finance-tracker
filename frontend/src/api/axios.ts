/**
 * @file axios.ts
 * @fileoverview This file contains the axios api
 */

import axios from "axios";
import { clearToken, setToken } from "../store/auth-slice.store";
import { store } from "../store/store";

console.log(import.meta.env);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // backend
  withCredentials: true, // allow cookies (refresh token)
});

// Attach token to requests
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest.url !== "/auth/login" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/auth/refresh-token"); // backend uses cookie
        store.dispatch(setToken(res.data.token));
        originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
        return api(originalRequest);
      } catch (err) {
        store.dispatch(clearToken());
        console.log(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
