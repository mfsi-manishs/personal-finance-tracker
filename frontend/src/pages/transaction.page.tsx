/**
 * @file transactions.page.tsx
 * @fileoverview This file contains the transactions page
 */

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ConfirmDialog from "../components/common/confirm-dialog.component"; // Custom confirm component
import TransactionModal from "../components/transaction-modal.component";
import { useAppDispatch } from "../hooks/use-app.hook";
import type { TransactionState } from "../store/store.type";
import { fetchCategories } from "../store/transaction-category-slice.store";
import { deleteTransaction, fetchTransactions, selectAllTransactions } from "../store/transaction-slice.store";
import { AppUtils } from "../utils/app.util";

/**
 * The transactions page component
 * @returns {JSX.Element} The rendered component
 */
export default function TransactionsPage() {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionState | null>(null);

  const dispatch = useAppDispatch();
  const rows = useSelector(selectAllTransactions);

  const columns: GridColDef<TransactionState>[] = [
    {
      field: "date",
      headerName: t("common.date"),
      width: 120,
      valueFormatter: (_value, row) => AppUtils.toLocalDateTimeString(new Date(row.date!)).split("T"),
    },
    { field: "description", headerName: t("common.description"), flex: 1 },
    {
      field: "transCategory",
      headerName: t("common.category"),
      width: 150,
      valueGetter: (_value, row) => row.transCategory?.name,
    },
    {
      field: "amount",
      headerName: t("common.amount"),
      headerAlign: "right",
      width: 130,
      align: "right",
      renderCell: (params) => `${params.row.currency} ${(params.value! / 100).toFixed(2)}`,
    },
    { field: "type", headerName: t("common.type"), headerAlign: "center", width: 120, align: "center" },
    {
      field: "actions",
      headerName: t("common.actions"),
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
          <IconButton size="small" onClick={() => handleDeleteClick(params.row)}>
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  /**
   * Opens the transaction modal to edit the given transaction
   * @param {TransactionState} transaction - The transaction to be edited
   */
  const handleEdit = (transaction: TransactionState) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  /**
   * Opens the delete dialog to delete the given transaction
   * @param {TransactionState} transaction - The transaction to be deleted
   */
  const handleDeleteClick = (transaction: TransactionState) => {
    setSelectedTransaction(transaction);
    setDeleteDialogOpen(true);
  };

  /**
   * Handles the confirmation of deleting a transaction
   * Dispatches the deleteTransaction thunk with the selected transaction's ID
   * Resets the delete dialog to be closed
   */
  const handleDeleteConfirm = () => {
    if (selectedTransaction) dispatch(deleteTransaction(selectedTransaction.id));
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Transactions</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedTransaction(null);
            setModalOpen(true);
          }}>
          {t("transModal.addTrans")}
        </Button>
      </Stack>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} />
      </Box>

      {/* Reusable Modal for Add/Edit */}
      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} initialData={selectedTransaction} />

      {/* Confirmation for Delete */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title={t("trans.deleteTrans")}
        text={t("trans.deleteTransConfirm")}
        confirmBtnText={t("common.delete")}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
