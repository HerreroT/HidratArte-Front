// src/components/Navbar.js
/* eslint-disable unicode-bom */
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { CartContext } from "../CartContext";
import "../style/custom.css";
import useNotificationsCounter from "../hooks/useNotificationsCounter";

function Navbar() {
  const { isLoggedIn, isAdmin, userName, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.qty ?? 0), 0);
  const navigate = useNavigate();
  const { count: notifCount } = useNotificationsCounter(isLoggedIn);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/images/logo.png"
            alt="HidratArte Logo"
            style={{ height: "60px", objectFit: "contain" }}
          />
        </Link>

        {/* Toggle button para mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/explorar" className="nav-link">
                Explorar
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
            )}

            {/* Carrito */}
            <li className="nav-item">
              {isLoggedIn ? (
                <Link to="/carrito" className="nav-link position-relative d-inline-flex align-items-center">
                  <img
                    src="/icons/carrito.png"
                    alt="Carrito"
                    className="cart-icon"
                  />
                  {totalItems > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                      style={{ backgroundColor: "#4db8a8" }}
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              ) : (
                <Link to="/login" className="nav-link">
                  <img
                    src="/icons/carrito.png"
                    alt="Carrito"
                    className="cart-icon"
                  />
                </Link>
              )}
            </li>

            {/* Usuario o Login */}
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/perfil"
                    className="nav-link"
                  >
                    👤 {userName}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link">
                    Mis pedidos
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-primary btn-sm"
                    style={{ borderRadius: "20px", padding: "6px 20px" }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="btn btn-primary btn-sm">
                  Iniciar sesión
                </Link>
              </li>
            )}

            {/* Notificaciones */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link to="/notificaciones" className="nav-link position-relative d-inline-flex align-items-center">
                  <img
                    src="/icons/notification.png"
                    alt="Notificaciones"
                    className="notification-icon"
                  />
                  {notifCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                      style={{ backgroundColor: "#ff7a1a" }}
                    >
                      {notifCount}
                    </span>
                  )}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
