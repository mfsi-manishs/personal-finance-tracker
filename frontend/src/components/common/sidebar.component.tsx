/**
 * @file sidebar.component.tsx
 * @fileoverview This file contains the sidebar
 */

import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { type ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @interface NavItem
 * @description Navigation item
 */
export interface NavItem {
  label: string;
  path: string;
  icon: ReactElement;
}

/**
 * @interface SidebarProps
 * @description Props for Sidebar
 */
interface SidebarProps {
  items: NavItem[]; // Pass the array here
  mobileOpen: boolean;
  width: number;
  handleDrawerToggle: () => void;
}

/**
 * Sidebar component
 *
 * @description This component renders a sidebar that is
 *   responsive to mobile and desktop screens.
 *   On mobile, it renders a temporary drawer that can be
 *   opened/closed by clicking on the hamburger menu icon.
 *   On desktop, it renders a permanent sidebar that is always
 *   visible.
 *
 * @param {SidebarProps} props - Props for Sidebar
 * @property {NavItem[]} items - Navigation items
 * @property {boolean} mobileOpen - Whether the mobile drawer is open
 * @property {number} width - Width of the sidebar
 * @property {() => void} handleDrawerToggle - Toggle the mobile drawer open state
 *
 * @returns {JSX.Element} Sidebar component
 */
export const Sidebar = ({ items, mobileOpen, width, handleDrawerToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const drawerContent = (
    <Box>
      <Toolbar /> {/* Empty toolbar as spacer to push content below the fixed Navbar */}
      <Divider />
      <List>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  navigate(item.path);
                  if (mobileOpen) handleDrawerToggle(); // Auto-close on mobile
                }}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  "&.Mui-selected": {
                    backgroundColor: "primary.light",
                    color: "primary.main",
                    "& .MuiListItemIcon-root": { color: "primary.main" },
                  },
                }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}>
      {/* Mobile Drawer (Temporary) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better mobile performance
        sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: width } }}>
        {drawerContent}
      </Drawer>
      {/* Desktop Sidebar (Permanent) */}
      <Drawer variant="permanent" sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: width, boxSizing: "border-box" } }} open>
        {drawerContent}
      </Drawer>
    </Box>
  );
};
