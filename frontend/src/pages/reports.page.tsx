/**
 * @file reports.page.tsx
 * @fileoverview This file contains the reports page
 */

import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import SpendingPieChart from "../components/spending-pie-chart.component";
import MonthlyCategoryTrends from "../components/spending-trends-chart.component";
import { useAppDispatch, useAppSelector } from "../hooks/use-app.hook";
import { fetchMonthlyCategorySummaries, selectAllMonthlyCategorySummaries } from "../store/monthly-category-summary-slice.store";
import type { MonthlyCategorySummary } from "../store/store.type";
import { selectPreferredCurrency } from "../store/user-slice.store";

/**
 * @interface MonthlyCategoryTrendsProps
 * @description Monthly category trends props
 */
export interface MonthlyCategoryTrendsProps {
  summaries: MonthlyCategorySummary[];
  currency: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

/**
 * Reports page component
 *
 * This component renders the reports page, which includes a monthly category trends chart and a spending pie chart.
 * It fetches the monthly category summaries from the store and passes them to the charts as props.
 * The component is wrapped in a Stack component with spacing set to 2.
 * The charts are wrapped in Box components.
 * The component uses the useAppDispatch and useAppSelector hooks from the app hooks to fetch the summaries and get the status from the store.
 * @returns {JSX.Element} Reports page
 */
export default function Reports() {
  const dispatch = useAppDispatch();

  const summaries = useAppSelector(selectAllMonthlyCategorySummaries);
  const preferredCurrency = useAppSelector(selectPreferredCurrency);
  const status = useAppSelector((state) => state.monthlyCategorySummary.status);

  useEffect(() => {
    dispatch(fetchMonthlyCategorySummaries());
  }, [dispatch]);

  return (
    <Stack spacing={2}>
      <Box>
        <MonthlyCategoryTrends summaries={summaries} currency={preferredCurrency} status={status} />
      </Box>
      <Box>
        <SpendingPieChart summaries={summaries} currency={preferredCurrency} status={status}></SpendingPieChart>
      </Box>
    </Stack>
  );
}
