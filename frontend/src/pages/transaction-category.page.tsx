/**
 * @file transaction-category.component.tsx
 * @description Component to list, add, edit, and delete transaction categories
 */

import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/use-app.hook";
import type { TransactionCategoryState } from "../store/store.type";
import { createCategory, editCategory, fetchCategories, removeCategory, selectAllCategories } from "../store/transaction-category-slice.store";

/**
 * @interface TransactionCategoryFormInputs
 * @description Transaction category form inputs
 */
interface TransactionCategoryFormInputs {
  id?: string;
  name: string;
  description: string;
}

/**
 * This component is used to list, add, edit, and delete transaction categories.
 * It renders a list of categories, and a form to add a new category.
 * The list is fetched from the backend on mount.
 * The form is controlled by React Hook Form.
 * The component dispatches an action to fetch the list of categories on mount.
 * The component also handles the submission of the form to add a new category.
 * The component renders a button to open the form, and another button to submit the form.
 * The component also renders a dialog to confirm the deletion of a category.
 * The component dispatches an action to delete a category when the user confirms the deletion.
 * @returns {JSX.Element} The rendered component
 */
export default function TransactionCategory() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);

  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TransactionCategoryState | null>(null);

  const { control, handleSubmit, reset } = useForm<TransactionCategoryFormInputs>({
    defaultValues: { name: "", description: "" },
  });

  /**
   * Handles the opening of the transaction category form
   * @param {TransactionCategoryState} The transaction category to open the form for
   */
  const handleOpen = (category?: TransactionCategoryState) => {
    if (category) {
      setEditingCategory(category);
      reset(category);
    } else {
      setEditingCategory(null);
      reset({ name: "", description: "" });
    }
    setOpen(true);
  };

  /**
   * Close the transaction category form modal
   * Reset the transaction category to be edited to null
   * @param {void} No parameters
   * @returns {void}
   */
  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  /**
   * Submits the transaction category form data to the store.
   * If the modal is updating an existing transaction, it will call the editTransaction thunk.
   * If the modal is adding a new transaction, it will call the createTransaction thunk.
   * After the store has been updated, it will call the onClose function to close the modal.
   * @param {TransactionCategoryFormInputs} data - The form data to be submitted
   * @returns {void} No value is returned
   */
  const onSubmit = (data: TransactionCategoryFormInputs) => {
    if (editingCategory) {
      dispatch(editCategory({ ...data, id: editingCategory.id, type: "custom" }));
    } else {
      dispatch(createCategory({ ...data, type: "custom" }));
    }
    handleClose();
  };

  /**
   * Handles the deletion of a transaction category
   * @param {category} The transaction category to delete. If the category type is "custom", it will be deleted from the store.
   */
  const handleDelete = (category: TransactionCategoryState) => {
    if (category.type === "custom") {
      dispatch(removeCategory(category.id));
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" gutterBottom>
          {t("transCategory.title")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            handleOpen();
          }}>
          {t("transCategory.addCategory")}
        </Button>
      </Stack>
      <List>
        {categories.map((cat: TransactionCategoryState) => (
          <ListItem
            key={cat.id}
            secondaryAction={
              <>
                {cat.type === "custom" && (
                  <IconButton edge="end" onClick={() => handleOpen(cat)}>
                    <Edit />
                  </IconButton>
                )}
                {cat.type === "custom" && (
                  <IconButton edge="end" onClick={() => handleDelete(cat)}>
                    <Delete />
                  </IconButton>
                )}
              </>
            }>
            <ListItemText primary={cat.name} secondary={cat.description} />
          </ListItem>
        ))}
      </List>

      {/* Modal Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCategory ? t("transCategory.editCategory") : t("transCategory.addCategory")}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("transCategory.name")}
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => <TextField {...field} label={t("common.description")} fullWidth margin="normal" />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t("common.cancel")}</Button>
            <Button type="submit" variant="contained">
              {editingCategory ? t("transCategory.editCategory") : t("transCategory.addCategory")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
