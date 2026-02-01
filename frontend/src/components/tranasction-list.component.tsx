/**
 * @file transaction-list.component.tsx
 * @fileoverview This file contains the transaction list
 */

import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import dayjs from "dayjs";
import type { TransactionState } from "../store/store.type";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";

/**
 * @interface TransactionListProps
 * @description Transaction list props
 */
interface TransactionListProps {
  transactions: TransactionState[];
}

/**
 * A React component to display a list of transactions.
 * It displays the transactions in a list with the currency, description, category, date and amount.
 * If there are no transactions, it displays a message saying "No transactions found".
 * @param {TransactionListProps} props - The props for the component
 * @returns {JSX.Element} The rendered component
 */
export const TransactionList = ({ transactions }: TransactionListProps) => {
  if (!transactions.length) {
    return <Typography>No transactions found</Typography>;
  }

  return (
    <List>
      {transactions.map((tx) => (
        <ListItem key={tx.id} divider>
          <ListItemAvatar>
            <Avatar>{tx.type === "expense" ? <RemoveCircleOutlinedIcon /> : <AddCircleOutlinedIcon />}</Avatar>
          </ListItemAvatar>

          <ListItemText primary={tx.description || tx.transCategory?.name} secondary={dayjs(tx.date).format("DD MMM")} />

          <Typography fontWeight={500} color={tx.type === "expense" ? "error.main" : "success.main"}>
            {`${tx.currency} ${(tx.amount / 100).toFixed(2)}`}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};
