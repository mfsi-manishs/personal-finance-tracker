/**
 * @file dashboard.tsx
 * @fileoverview This file contains the dashboard page to be displayed after user authentication/login.
 */

import { Box, Typography } from "@mui/material";

/**
 * Dashboard page to be displayed after user authentication/login.
 * This page contains the user name and last login date, as well as a logout button and a menu.
 */
export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box p={3}>
        <Typography variant="h4">Dashboard Content Area</Typography>
      </Box>
    </Box>
  );
}
