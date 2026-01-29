/**
 * @file dashboard-layout.component.tsx
 * @fileoverview This file contains the dashboard layout
 */

import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import AppNavbar from "./app-navbar-component"; // Your top bar with user info
import { Sidebar, type NavItem } from "./sidebar.component";

/**
 * @constant DRAWER_WIDTH
 * @description Width of the sidebar
 */
const DRAWER_WIDTH = 240;

/**
 * DashboardLayout component
 *
 * @param {Object} props - Props for DashboardLayout
 * @property {NavItem[]} menuItems - Menu items for the sidebar
 *
 * Renders the dashboard layout with a sidebar and main content area
 */
export const DashboardLayout = ({ menuItems }: { menuItems: NavItem[] }) => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex" }}>
      {/* 1. Navbar */}
      <AppNavbar label={t("topNav.title")} onMenuClick={handleDrawerToggle} />

      {/* 2. Sidebar */}
      <Sidebar items={menuItems} mobileOpen={mobileOpen} width={DRAWER_WIDTH} handleDrawerToggle={handleDrawerToggle} />

      {/* 3. Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Toolbar /> {/* Empty toolbar as spacer to push content below the fixed Navbar */}
        <Outlet /> {/* This is where the specific page content renders */}
      </Box>
    </Box>
  );
};
