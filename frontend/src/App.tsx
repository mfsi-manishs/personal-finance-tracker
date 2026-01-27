/**
 * @file App.tsx
 * @fileoverview This file contains the app
 */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/error-boundary.components";
import LoginForm from "./components/login-form.component";
import ProtectedRoute from "./components/protected-route.component";
import Dashboard from "./pages/dashboard";

/**
 * Renders the login form if there is no token or the dashboard if there is a token.
 * @returns {JSX.Element} The rendered component
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ErrorBoundary>
                <Dashboard />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
