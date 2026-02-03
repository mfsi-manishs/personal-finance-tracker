/**
 * @file spending-pie-chart.component.tsx
 * @fileoverview This file contains the spending pie chart
 */

import { Box, Card, CardContent, LinearProgress } from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { t } from "i18next";
import { Pie } from "react-chartjs-2";
import type { MonthlyCategoryTrendsProps } from "../pages/reports.page";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * A React component to display the spending pie chart.
 * It fetches the monthly category summaries and extracts the expense categories and their corresponding expenses.
 * The component renders a Pie chart with the expense categories as labels and the expenses as data.
 * The Pie chart displays the expenses in a circular format with a random color for each category.
 * The component also displays a loading indicator when the summaries are being fetched.
 * @param {MonthlyCategoryTrendsProps} props - The props for the component
 * @returns {JSX.Element} The rendered component
 */
export default function SpendingPieChart({ summaries, status }: MonthlyCategoryTrendsProps) {
  const expenseCategories = Array.from(new Set(summaries.flatMap((m) => m.transactions.map((t) => t.categoryName))));
  const categoryExpenses = expenseCategories.map((cat) => {
    return summaries
      .map((m) => {
        const tx = m.transactions.filter((t) => t.categoryName === cat && t.type === "expense");
        return tx ? tx.reduce((total, t) => total + t.totalAmount, 0) : 0;
      })
      .reduce((total, amount) => total + amount, 0);
  });

  const data = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Expenses",
        data: categoryExpenses.map((amount) => amount / 100),
        backgroundColor: categoryExpenses.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`),
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: t("report.pieChartTitle"),
      },
    },
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ width: "60%", margin: "auto" }}>
            {status && status === "loading" && (
              <p>
                <LinearProgress color="secondary" />
              </p>
            )}
            <Pie data={data} options={chartOptions} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
