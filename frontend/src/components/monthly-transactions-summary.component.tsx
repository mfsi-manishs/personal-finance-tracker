/**
 * @file monthly-transactions-summary.component.tsx
 * @fileoverview This file contains the monthly transactions summary
 */

import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { t } from "i18next";

/**
 * @interface MonthlyTransactionSummaryProps
 * @description Props for MonthlyTransactionSummary component
 */
interface MonthlyTransactionSummaryProps {
  income: number;
  expense: number;
  currency: string | null;
}

/**
 * A React component to display the monthly transactions summary.
 * It displays the income and expense of the given month.
 * The props are the income, expense and currency of the given month.
 * The component displays the income and expense in separate cards with a caption and a value.
 * The income card displays the income amount with a green color.
 * The expense card displays the expense amount with a red color.
 * @param {MonthlyTransactionSummaryProps} props - The props for the component
 * @returns {JSX.Element} The rendered component
 */
export const MonthlyTransactionSummary = ({ income, expense, currency }: MonthlyTransactionSummaryProps) => {
  return (
    <Grid container spacing={2} component="div">
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="caption">{t("common.income")}</Typography>
            <Typography variant="h6" color="success.main">
              {`${currency} ${(income / 100).toFixed(2)}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 6, sm: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="caption">{t("common.expense")}</Typography>
            <Typography variant="h6" color="error.main">
              {`${currency} ${(expense / 100).toFixed(2)}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="caption">{t("dashboard.monthlyBalance")}</Typography>
            <Typography variant="h6" color="primary">
              {`${currency} ${((income - expense) / 100).toFixed(2)}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
