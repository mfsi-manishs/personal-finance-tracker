/**
 * @file dashboard.tsx
 * @fileoverview This file contains the dashboard page to be displayed after user authentication/login.
 */

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../api/auth";
import { type RootState } from "../store/store";

/**
 * Dashboard page to be displayed after user authentication/login.
 * This page contains the user name and last login date, as well as a logout button and a menu.
 */
export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
                <Typography variant="body2">Welcome, {user.name}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Last login: {new Date(user.lastLoginAt as string).toLocaleString()}
                </Typography>
              </Box>

              <IconButton size="large" onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
                <AccountCircle />
              </IconButton>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box p={3}>
        <Typography variant="h4">Main Content Area</Typography>
      </Box>
    </Box>
  );
}
