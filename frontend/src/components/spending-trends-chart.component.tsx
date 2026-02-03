/**
 * @file spending-trends-chart.component.tsx
 * @fileoverview This file contains the spending trends chart
 */

import { Box, Card, CardContent, Typography } from "@mui/material";
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { t } from "i18next";
import { Line } from "react-chartjs-2";
import type { MonthlyCategoryTrendsProps } from "../pages/reports.page";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/**
 * A React component to display the monthly category-wise spending trends chart.
 * It fetches the monthly category summaries and renders a line chart with the expense amounts.
 * The chart displays the category-wise expense amounts for each month.
 * @returns {JSX.Element} The rendered component
 */
export default function MonthlyCategoryTrends({ summaries, currency, status }: MonthlyCategoryTrendsProps) {
  // Collect unique categories across months
  const categories = Array.from(new Set(summaries.flatMap((m) => m.transactions.map((t) => t.categoryName))));

  // Create labels for each month
  const labels = summaries.map((m) => m.month);

  // Create datasets for each category from the above unique categories for each month
  const datasets = categories.map((cat) => {
    return {
      label: cat,
      data: summaries.map((m) => {
        const tx = m.transactions.find((t) => t.categoryName === cat && t.type === "expense");
        return tx ? tx.totalAmount / 100 : 0;
      }),
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      backgroundColor: "transparent",
    };
  });

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: t("report.title"),
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t("report.yearMonth"), // X-axis label
        },
      },
      y: {
        title: {
          display: true,
          text: `${t("common.amount")} (${currency})`, // Y-axis label
        },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("report.title")}
        </Typography>
        {status === "loading" && <Typography>{t("common.loading")}</Typography>}
        {status === "failed" && <Typography color="error">{t("report.error")}</Typography>}
        {status === "succeeded" && (
          <Box>
            <Line data={chartData} options={chartOptions} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
