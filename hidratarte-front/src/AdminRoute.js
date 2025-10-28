// src/AdminRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin, loading } = useContext(AuthContext);
  
  // Esperar a que termine de validar la sesión
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }
  
  if (!isLoggedIn) return <Navigate to="/login" />;
  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
