/**
 * @file loading-overlay.component.tsx
 * @fileoverview This file contains the loading overlay component
 */

import { Box, CircularProgress, Backdrop, Typography } from "@mui/material";

/**
 * @interface LoadingOverlayProps
 * @description Loading overlay component props
 */
interface LoadingOverlayProps {
  type?: "fullscreen" | "container";
  message?: string;
}

/**
 * Loading overlay component
 *
 * @param {LoadingOverlayProps} props - Component props
 * @param {"fullscreen" | "container"} [type="container"] - Type of loading overlay
 * @param {string} [message] - Message to be displayed
 * @returns {JSX.Element} - Rendered component
 *
 * @example
 * <LoadingOverlay type="fullscreen" message="Loading..." />
 */
export const LoadingOverlay = ({ type = "container", message }: LoadingOverlayProps) => {
  const content = (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <CircularProgress color="primary" size={type === "fullscreen" ? 50 : 40} />
      {message && <Typography variant="body2">{message}</Typography>}
    </Box>
  );

  if (type === "fullscreen") {
    return (
      <Backdrop
        open={true}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}>
        {content}
      </Backdrop>
    );
  }

  return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 4, width: "100%" }}>{content}</Box>;
};
