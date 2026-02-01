/**
 * @file transaction-category-select.component.tsx
 * @fileoverview This file contains the transaction category select
 */

import { MenuItem, TextField } from "@mui/material";
import { Controller, type Control, type FieldPath } from "react-hook-form";
import { useAppSelector } from "../../hooks/use-app.hook";
import type { TransactionCategoryState } from "../../store/store.type";
import { selectAllCategories } from "../../store/transaction-category-slice.store";
import type { TransactionFormData } from "../transaction-modal.component";

/**
 * @interface TransactionCategorySelectProps
 * @description Transaction category select props
 */
interface TransactionCategorySelectProps {
  name: FieldPath<TransactionFormData>; // form field name
  control: Control<TransactionFormData>; // react-hook-form control
  label: string;
}

/**
 * A reusable React component to select a transaction category from a list of available categories.
 * @param {name} Name of the form field to select the transaction category
 * @param {control} React-hook-form control to bind the state of the form field
 * @param {label} label to display above the form field
 * @returns {JSX.Element} The rendered component
 */
export default function TransactionCategorySelect({ name, control, label }: TransactionCategorySelectProps) {
  const categories = useAppSelector(selectAllCategories);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField {...field} label={label} select fullWidth>
          {categories.map((cat: TransactionCategoryState) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
