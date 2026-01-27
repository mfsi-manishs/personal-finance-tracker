/**
 * @file dashboard.tsx
 * @fileoverview This file contains the dashboard page
 */

import { Button, Typography } from "@mui/material";
import { useAuth } from "../api/auth";

/**
 * Dashboard page
 *
 * This page displays a welcome message and a logout button.
 * It uses the useAuth hook to get the logout function.
 */
export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <div>
      <Typography variant="h5">Welcome to Dashboard</Typography>
      <Button variant="outlined" color="secondary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
