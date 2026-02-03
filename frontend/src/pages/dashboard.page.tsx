/**
 * @file dashboard.page.tsx
 * @fileoverview This file contains the dashboard page
 */

import { Box, LinearProgress, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomCard from "../components/common/custom-card.component";
import { MonthSelector } from "../components/month-selector.component";
import { MonthlyTransactionSummary } from "../components/monthly-transactions-summary.component";
import { TransactionList } from "../components/tranasction-list.component";
import { useAppDispatch, useAppSelector } from "../hooks/use-app.hook";
import { fetchMonthlyTransactions, fetchTransactionYearMonths, selectMonthlyTransactions } from "../store/monthly-transaction-slice.store";
import { fetchTransactionsSummary } from "../store/transactions-summary-slice.store";
import { selectPreferredCurrency } from "../store/user-slice.store";

type MyFormValues = { yearMonth: string };

/**
 * Dashboard page component
 *
 * Displays a dashboard page to be displayed after user authentication/login.
 * The dashboard page displays a card for total income, total-expenses, and current-balance.
 * The card displays the amount in the preferred-currency of the user.
 * The dashboard page fetches the transactions summary when mounted.
 *
 * @returns {JSX.Element} The rendered component
 */
export default function Dashboard() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const transactionsSummary = useAppSelector((state) => state.transactionsSummary);
  const preferredCurrency = useAppSelector(selectPreferredCurrency);
  const { yearMonths, transactions, totalIncome, totalExpense, status } = useAppSelector(selectMonthlyTransactions);

  const { control, setValue } = useForm<MyFormValues>({
    defaultValues: {
      yearMonth: "",
    },
  });

  const selectedYearMonth = useWatch({
    control,
    name: "yearMonth",
  });

  // Auto-select latest month
  useEffect(() => {
    if (yearMonths.length) {
      const { year, month } = yearMonths[0];
      setValue("yearMonth", `${year}-${month}`);
    }
  }, [yearMonths, setValue]);

  // Fetch transactions on change
  useEffect(() => {
    if (!selectedYearMonth) return;

    const [year, month] = selectedYearMonth.split("-").map(Number);

    dispatch(fetchMonthlyTransactions({ year, month }));
  }, [selectedYearMonth, dispatch]);

  useEffect(() => {
    dispatch(fetchTransactionsSummary({}));
    dispatch(fetchTransactionYearMonths());
  }, [dispatch]);
  return (
    <Stack spacing={3}>
      <Box sx={{ flexGrow: 1 }}>
        <div className="card-row">
          <Grid container spacing={2} component="div">
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomCard
                title={t("dashboard.totalIncome")}
                description={`${preferredCurrency} ${(transactionsSummary.totalIncome / 100).toFixed(2)}`}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomCard
                title={t("dashboard.totalExpense")}
                description={`${preferredCurrency} ${(transactionsSummary.totalExpenses / 100).toFixed(2)}`}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomCard
                title={t("dashboard.currentBalance")}
                description={`${preferredCurrency} ${(transactionsSummary.totalIncome / 100).toFixed(2)}`}
              />
            </Grid>
          </Grid>
        </div>
      </Box>

      <MonthSelector<MyFormValues> control={control} months={yearMonths} />

      {status === "loading" && <LinearProgress />}

      <MonthlyTransactionSummary income={totalIncome} expense={totalExpense} currency={preferredCurrency} />

      <Box>
        <TransactionList transactions={transactions} />
      </Box>
    </Stack>
  );
}
