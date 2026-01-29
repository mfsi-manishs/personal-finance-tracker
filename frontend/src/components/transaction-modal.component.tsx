/**
 * @file transaction-modal.component.tsx
 * @fileoverview This file contains the transaction modal
 */

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks/use-app.hook";
import { selectAllCategories } from "../store/transaction-category-slice.store";
import { createTransaction, editTransaction, type Transaction } from "../store/transaction-slice.store";
import { selectPreferredCurrency } from "../store/user-slice.store";
import { AppUtils } from "../utils/app.util";
import TransactionCategorySelect from "./common/transaction-category-select.component";

/**
 * @interface TransactionModalProps
 * @description Transaction modal props
 */
export interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  initialData: Transaction | null;
}

/**
 * @interface TransactionFormData
 * @description Transaction form data
 */
export interface TransactionFormData {
  amount: string;
  type: "income" | "expense";
  description: string;
  date: string;
  transCategoryId: string;
  currency: string;
}

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
export default function TransactionModal({ open, onClose, initialData }: TransactionModalProps) {
  const { t } = useTranslation();

  const preferredCurrency = useAppSelector(selectPreferredCurrency);
  const transCategories = useAppSelector(selectAllCategories);

  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    values: initialData
      ? {
          ...initialData,
          amount: (initialData.amount / 100).toFixed(2),
          date: initialData.date ? AppUtils.toLocalDateTimeString(new Date(initialData.date)) : "",
          type: initialData.type as "income" | "expense",
          transCategoryId: initialData.transCategory.id,
        }
      : { amount: "", type: "expense" as "income" | "expense", description: "", date: "", transCategoryId: "", currency: preferredCurrency || "INR" },
  });

  /**
   * Submits the transaction form data to the store.
   * If the modal is updating an existing transaction, it will call the editTransaction thunk.
   * If the modal is adding a new transaction, it will call the createTransaction thunk.
   * After the store has been updated, it will call the onClose function to close the modal.
   * @param {object} formData - The form data to be submitted
   */
  const onSubmit = (formData: TransactionFormData) => {
    const selectedCategory = transCategories.find((cat) => cat.id === formData.transCategoryId);
    const sanitizedData = {
      ...formData,
      transCategory: selectedCategory!,
      amount: Number(formData.amount) * 100,
      date: formData.date ? new Date(formData.date).toISOString() : "",
      currency: preferredCurrency ? preferredCurrency : "INR",
    };
    if (initialData) {
      // Update existing
      dispatch(editTransaction({ ...initialData, ...sanitizedData }));
    } else {
      // Add new with temp generated ID
      dispatch(createTransaction({ ...sanitizedData }));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{initialData ? t("transModal.editTrans") : t("transModal.addTrans")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => <TextField {...field} label={t("common.amount")} type="number" fullWidth />}
          />
          <Controller
            name="currency"
            control={control}
            render={({ field }) => <TextField {...field} label={t("common.currency")} disabled fullWidth />}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField {...field} label={t("common.type")} select fullWidth>
                <MenuItem value="income">{t("common.income")}</MenuItem>
                <MenuItem value="expense">{t("common.expense")}</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField {...field} label={t("common.description")} fullWidth />}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField {...field} label={t("common.date")} type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} />
            )}
          />
          <TransactionCategorySelect name="transCategoryId" control={control} label={t("common.category")} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.cancel")}</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          {t("common.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
