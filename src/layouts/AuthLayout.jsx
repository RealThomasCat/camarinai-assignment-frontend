import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Restrict access based on authentication status
export function AuthLayout({ requiresAuth }) {
  const { user } = useContext(AuthContext);

  // If user is logged in, prevent access to login/register
  if (!requiresAuth && user) return <Navigate to="/" replace />;

  // If user is NOT logged in, prevent access to homepage
  if (requiresAuth && !user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
