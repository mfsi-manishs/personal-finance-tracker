/**
 * @file use-app-dispatch.hook.ts
 * @fileoverview This file contains the use app dispatch hook
 */
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

// Use throughout the app instead of plain `useDispatch` for better type checking in TypeScript based projects
// export const useAppDispatch = () => useDispatch.withTypes<AppDispatch>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Use throughout the app instead of plain `useSelector` for better type checking in TypeScript based projects
export const useAppSelector = useSelector.withTypes<RootState>();
