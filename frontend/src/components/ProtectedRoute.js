import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({ children, loggedIn }) {
  if (!loggedIn) {
    return <Navigate to="/signin" />;
  }
  return children;
}

export default ProtectedRoute;
