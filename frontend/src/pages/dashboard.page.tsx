/**
 * @file dashboard.page.tsx
 * @fileoverview This file contains the dashboard page
 */

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import CustomCard from "../components/common/custom-card.component";
import { useAppDispatch, useAppSelector } from "../hooks/use-app.hook";
import { fetchTransactionsSummary } from "../store/transactions-summary-slice.store";
import { useTranslation } from "react-i18next";

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
  const preferredCurrency = useAppSelector((state) => state.user.preferredCurrency);

  useEffect(() => {
    dispatch(fetchTransactionsSummary({}));
  }, [dispatch]);
  return (
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
  );
}
