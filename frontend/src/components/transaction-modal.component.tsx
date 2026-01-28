/**
 * @file transaction-modal.component.tsx
 * @fileoverview This file contains the transaction modal
 */

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/use-app-dispatch.hook";
import { createTransaction, editTransaction } from "../store/transaction-slice.store";
import { AppUtils } from "../utils/app.util";

/**
 * Transaction Modal dialog component
 *
 * @description Transaction modal component. Displays a modal for adding or editing a transaction.
 * @param {object} props - Component props
 * @param {boolean} props.open - Whether the modal is open or not
 * @param {function} props.onClose - Function to be called when the modal is closed
 * @param {object} props.initialData - Initial data for the modal
 *
 * @returns {JSX.Element} The rendered component
 */
export default function TransactionModal({ open, onClose, initialData }: any) {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    values: initialData
      ? { ...initialData, date: initialData.date ? AppUtils.toLocalDateTimeString(new Date(initialData.date)) : "" }
      : { amount: "", type: "expense", description: "", date: "" },
  });

  /**
   * Submits the transaction form data to the store.
   * If the modal is updating an existing transaction, it will call the editTransaction thunk.
   * If the modal is adding a new transaction, it will call the createTransaction thunk.
   * After the store has been updated, it will call the onClose function to close the modal.
   * @param {object} formData - The form data to be submitted
   */
  const onSubmit = (formData: any) => {
    const sanitizedData = { ...formData, amount: Number(formData.amount), date: formData.date ? new Date(formData.date).toISOString() : null };
    if (initialData) {
      // Update existing
      dispatch(editTransaction({ ...initialData, ...sanitizedData }));
    } else {
      // Add new with temp generated ID
      dispatch(createTransaction({ ...sanitizedData, id: crypto.randomUUID() }));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{initialData ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Controller name="amount" control={control} render={({ field }) => <TextField {...field} label="Amount" type="number" fullWidth />} />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Type" select fullWidth>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </TextField>
            )}
          />
          <Controller name="description" control={control} render={({ field }) => <TextField {...field} label="Description" fullWidth />} />
          <Controller
            name="date"
            control={control}
            render={({ field }) => <TextField {...field} label="Date" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} />}
          />
          <Controller name="category" control={control} render={({ field }) => <TextField {...field} label="Category" fullWidth />} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
