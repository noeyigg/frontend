import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ProtectedRoute = function ({ element: Element, ...rest }) {
  const { user } = useAuth();

  return user ? <Element {...rest} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
