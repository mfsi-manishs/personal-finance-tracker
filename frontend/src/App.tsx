/**
 * @file App.tsx
 * @fileoverview This file contains the app
 */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/common/dashboard-layout.component";
import { LoadingOverlay } from "./components/common/loading-overlay.component";
import { ErrorBoundary } from "./components/error-boundary.components";
import LoginForm from "./components/login-form.component";
import ProtectedRoute from "./components/protected-route.component";
import { SIDE_NAVBAR_ITEMS } from "./constants/side-navbar-items.constant";
import { useAuthCheck } from "./hooks/use-auth-check.hook";
import Dashboard from "./pages/dashboard.page";
import TransactionsPage from "./pages/transaction.page";

/**
 * Renders the login form if there is no token or the dashboard if there is a token.
 * @returns {JSX.Element} The rendered component
 */
function App() {
  const isChecking = useAuthCheck();
  if (isChecking) return <LoadingOverlay type="fullscreen" />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route
          element={
            <ProtectedRoute>
              <ErrorBoundary>
                <DashboardLayout menuItems={SIDE_NAVBAR_ITEMS} />
              </ErrorBoundary>
            </ProtectedRoute>
          }>
          {/* All pages inside here will have the Sidebar and Navbar */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          {/* <Route path="/categories" element={<Categories />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
