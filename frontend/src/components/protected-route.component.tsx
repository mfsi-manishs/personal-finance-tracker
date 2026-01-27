/**
 * @file protected-route.component.tsx
 * @fileoverview This file contains the protected route component
 */

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { type RootState } from "../store/store";
import type { JSX } from "react";

/**
 * @interface Props
 * @description Props
 */
interface Props {
  children: JSX.Element;
}

/**
 * A protected route component that will redirect to the login page if there is no token.
 * It will save the current location in the state, so that the user can be redirected back to that page after they have logged in.
 * @param {Props} props - The props object
 * @param {JSX.Element} props.children - The children to render if there is a token
 * @returns {JSX.Element} The rendered component
 */
const ProtectedRoute = ({ children }: Props) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    // Redirect to login, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
