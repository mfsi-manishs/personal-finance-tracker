/**
 * @file confirm-dialog.component.tsx
 * @fileoverview This file contains the confirm dialog
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

/**
 * Confirm dialog component
 *
 * @description This component renders a confirm dialog with a
 *   title, text, cancel button and confirm button.
 *   When the confirm button is clicked, the `onConfirm` function
 *   is called and the dialog is closed.
 *
 * @param {object} props - Component props
 * @property {boolean} open - Whether the dialog is open or not
 * @property {string} title - Title of the dialog
 * @property {string} text - Text of the dialog
 * @property {string} confirmBtnText - Text of the confirm button
 * @property {function} onClose - Function to be called when the dialog is closed
 * @property {function} onConfirm - Function to be called when the confirm button is clicked
 *
 * @returns {JSX.Element} The rendered component
 */
export default function ConfirmDialog({ open, title, text, confirmBtnText, onClose, onConfirm }: any) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="error"
          variant="contained">
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
