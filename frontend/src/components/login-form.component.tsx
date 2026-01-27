/**
 * @file login-form.component.tsx
 * @fileoverview This file contains the login form component
 */

import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../api/auth";
import { useState } from "react";
import axios from "axios";

/**
 * @type LoginFormValues
 * @description Login form values
 */
type LoginFormValues = {
  email: string;
  password: string;
};

/**
 * A login form component that allows users to log in to their accounts.
 * It uses the `useForm` hook from `react-hook-form` to handle form state and validation.
 * The component also uses the `useAuth` hook from `../api/auth` to log in users.
 * If the login is successful, the user is redirected to the dashboard.
 * If the login fails, an error message is displayed to the user.
 * The component also includes a link to the register page.
 * @returns A JSX element representing the login form component.
 */
export default function LoginForm() {
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setFormError(null);
      await login(data.email, data.password);
    } catch (err: unknown) {
      // Axios error handling
      if (axios.isAxiosError(err) && err.response) {
        const backendErrors = err.response?.data?.details;
        if (backendErrors) {
          Object.entries(backendErrors).forEach(([field, message]) => {
            setError(field as keyof LoginFormValues, { type: "server", message: message as string });
          });
        } else if (err.response.data.message) {
          setFormError(err.response.data.message);
        }
      } else {
        setFormError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh", // full viewport height
        display: "flex",
        alignItems: "center", // vertical centering
        justifyContent: "center", // horizontal centering
      }}>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Personal Finance Tracker
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {formError && (
            <Typography color="error" align="center">
              {formError}
            </Typography>
          )}
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
