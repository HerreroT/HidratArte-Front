// src/components/Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { CartContext } from "../CartContext";

function Navbar() {
  const { isLoggedIn, isAdmin, userName, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.qty ?? 0), 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar px-4 py-3" style={{ backgroundColor: "#fafbfb" }}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/images/logo.png"
            alt="HidratArte"
            style={{ height: "65px", objectFit: "contain" }}
          />
        </Link>

        <div className="d-flex gap-4 align-items-center">
          <Link to="/explorar" className="nav-link fw-semibold" style={{ color: "#0a3d3f" }}>
            Explorar
          </Link>
          <Link to="/" className="nav-link fw-semibold" style={{ color: "#0a3d3f" }}>
            Home
          </Link>
          {isAdmin && (
            <Link to="/admin" className="nav-link fw-semibold" style={{ color: "#0a3d3f" }}>
              Admin
            </Link>
          )}

          {isLoggedIn ? (
            <Link to="/carrito" className="position-relative d-inline-block">
              <img
                src="/icons/carrito.png"
                alt="Carrito"
                style={{
                  width: 24,
                  height: 24,
                  objectFit: "contain",
                  filter: "brightness(0) invert(0.2)",
                  cursor: "pointer",
                }}
              />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              <img
                src="/icons/carrito.png"
                alt="Carrito"
                style={{
                  width: 24,
                  height: 24,
                  objectFit: "contain",
                  filter: "brightness(0) invert(0.2)",
                  cursor: "pointer",
                }}
              />
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <Link
                to="/perfil"
                className="me-3 text-decoration-none fw-semibold"
                style={{ color: "#0a3d3f" }}
              >
                Hola, {userName}
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm fw-semibold"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link fw-semibold" style={{ color: "#0a3d3f" }}>
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
