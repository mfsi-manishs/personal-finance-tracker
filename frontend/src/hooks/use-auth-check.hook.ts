/**
 * @file use-auth-check.hook.ts
 * @fileoverview This file contains the use auth check hook
 */

import { useEffect, useState } from "react";
import { useAuth } from "../api/auth";

export const useAuthCheck = () => {
  const [isChecking, setIsChecking] = useState(true);
  const { refreshToken } = useAuth();

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        // This triggers the refresh token logic to get a new access token via cookie
        await refreshToken();
      } catch (err) {
        console.error(err);
      } finally {
        setIsChecking(false);
      }
    };

    bootstrapAuth();
  }, [refreshToken]);

  return isChecking;
};
