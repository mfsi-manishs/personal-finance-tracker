/**
 * @file use-app-dispatch.hook.ts
 * @fileoverview This file contains the use app dispatch hook
 */
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

// Use throughout the app instead of plain `useDispatch` for better type checking
export const useAppDispatch = () => useDispatch<AppDispatch>();
