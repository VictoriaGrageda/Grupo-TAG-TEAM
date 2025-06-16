// src/PrivateRoutes.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function RutaPrivada({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
