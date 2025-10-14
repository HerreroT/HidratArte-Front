// src/AdminRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  if (!isLoggedIn) return <Navigate to="/login" />;
  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
