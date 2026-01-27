/**
 * @file App.tsx
 * @fileoverview This file contains the app
 */

import { useSelector } from "react-redux";
import LoginForm from "./components/login-form.component";
import Dashboard from "./pages/dashboard";
import { type RootState } from "./store/store";
import { ErrorBoundary } from "./components/error-boundary.components";

/**
 * Renders the login form if there is no token or the dashboard if there is a token.
 * @returns {JSX.Element} The rendered component
 */
function App() {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  ) : (
    <LoginForm />
  );
}

export default App;
