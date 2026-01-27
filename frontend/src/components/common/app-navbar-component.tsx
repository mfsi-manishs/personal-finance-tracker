/**
 * @file app-navbar-component.tsx
 * @fileoverview This file contains the app navbar
 */

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../api/auth";
import { type RootState } from "../../store/store";

/**
 * @interface AppNavbarProps
 * @description Props for AppNavbar
 */
interface AppNavbarProps {
  label: string;
  onMenuClick: () => void; // Opens Sidebar on mobile
}

/**
 * AppNavbar component
 *
 * @param {AppNavbarProps} props - Props for AppNavbar
 * @property {string} label - Label for the navbar
 * @property {() => void} onMenuClick - Opens Sidebar on mobile
 *
 * Renders the app navbar with user info and a logout button
 */
export default function AppNavbar({ label, onMenuClick }: AppNavbarProps) {
  const user = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout } = useAuth();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Hamburger Icon - Only shows on mobile */}
        <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 2, display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>

        {/* User Info Section */}
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Welcome, {user.name}
              </Typography>
              <Typography variant="caption" display="block">
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
  );
}
