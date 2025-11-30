import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // 🔒 optionnel : on peut limiter par rôle
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🚫 Si pas connecté → retour login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Si un rôle est exigé et ne correspond pas → refus
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Sinon autoriser
  return children;
};

export default ProtectedRoute;
