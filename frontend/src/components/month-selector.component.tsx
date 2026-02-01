/**
 * @file month-selector.component.tsx
 * @fileoverview This file contains the month selector
 */

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { Controller, type Control } from "react-hook-form";

/**
 * @interface MonthSelectorProps
 * @description Month selector props
 */
interface MonthSelectorProps {
  control: Control<any>;
  months: Array<{ year: number; month: number }>;
}

/**
 * A reusable React component to select a month from a list of available months.
 * The component will render a Material UI Select component with the given list of months.
 * The selected month will be stored in the given control.
 * @param {control} React-hook-form control to bind the state of the form field
 * @param {months} List of months to display in the select
 * @returns {JSX.Element} The rendered component
 */
export const MonthSelector = ({ control, months }: MonthSelectorProps) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{t("common.month")}</InputLabel>

      <Controller
        name="yearMonth"
        control={control}
        render={({ field }) => (
          <Select {...field} label="Month">
            {months.map(({ year, month }) => (
              <MenuItem key={`${year}-${month}`} value={`${year}-${month}`}>
                {dayjs(`${year}-${month}-01`).format("MMMM YYYY")}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
