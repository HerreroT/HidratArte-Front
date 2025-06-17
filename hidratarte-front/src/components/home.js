// src/components/Home.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, userName, logout } = useContext(AuthContext); // ⬅️  Auth

  const [showAgeModal, setShowAgeModal] = useState(false);

  // --- CATEGORÍAS COMUNES ---
  const categorias = [
    { nombre: "agua", ruta: "/agua" },
    { nombre: "jugo", ruta: "/jugo" },
    { nombre: "gaseosa", ruta: "/gaseosa" },
  ];

  // --- HANDLERS ---
  const handleAlcoholClick = () => setShowAgeModal(true);
  const handleAceptar18   = () => { setShowAgeModal(false); navigate("/alcohol"); };
  const handleRechazar18  = () => setShowAgeModal(false);

  return (
    <div
      className={`bg-light min-vh-100 d-flex flex-column ${
        showAgeModal ? "blur" : ""
      }`}
    >
      {/* ---------- NAVBAR ---------- */}
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
            <Link
              to="/explorar"
              className="nav-link fw-semibold"
              style={{ color: "#0a3d3f" }}
            >
              Explorar
            </Link>
            <Link
              to="/"
              className="nav-link fw-semibold"
              style={{ color: "#0a3d3f" }}
            >
              Home
            </Link>

            {/* Login / Logout dinámico */}
            {isLoggedIn ? (
              <>
                <span className="me-2 fw-semibold text-dark">Hola, {userName}</span>
                <button
                  onClick={logout}
                  className="btn btn-outline-danger btn-sm fw-semibold"
                >
                Cerrar sesión
                </button> 
              </>
            ) : (
              <Link
                to="/login"
                className="nav-link fw-semibold"
                style={{ color: "#0a3d3f" }}
  >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ---------- CONTENIDO ---------- */}
      <main className="flex-grow-1 text-center py-5 px-3">
        <h2 className="fw-bold mb-2" style={{ color: "#0a3d3f" }}>
          BEBIDAS REFRESCANTES
        </h2>
        <p className="text-muted mb-4">
          Descubre tus bebidas favoritas para mantenerte hidratado.
        </p>

        <input
          type="text"
          className="form-control rounded-pill w-50 mx-auto mb-5"
          placeholder="🔍 Buscar productos"
        />

        {/* GRID DE CATEGORÍAS */}
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {categorias.map((cat) => (
            <Link
              key={cat.nombre}
              to={cat.ruta}
              className="text-center text-decoration-none"
            >
              <img
                src={`/images/${cat.nombre}.png`}
                alt={cat.nombre}
                style={{ width: 90, height: 90, objectFit: "contain" }}
              />
              <p
                className="fw-semibold mt-2 text-capitalize"
                style={{ color: "#0a3d3f" }}
              >
                {cat.nombre}
              </p>
            </Link>
          ))}

          {/* Alcohol con confirmación */}
          <button
            onClick={handleAlcoholClick}
            className="border-0 bg-transparent p-0 text-center"
          >
            <img
              src="/images/alcohol.png"
              alt="Alcohol"
              style={{ width: 90, height: 90, objectFit: "contain" }}
            />
            <p className="fw-semibold mt-2" style={{ color: "#0a3d3f" }}>
              Alcohol
            </p>
          </button>
        </div>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer
        className="text-white py-3 px-4 mt-auto"
        style={{ backgroundColor: "#0a3d3f" }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <p className="mb-2 mb-md-0">
            &copy; 2025 HidratArte. Todos los derechos reservados.
          </p>
          <div className="d-flex gap-3">
            {["instagram", "facebook", "gmail"].map((icon) => (
              <a key={icon} href="#">
                <img
                  src={`/icons/${icon}.png`}
                  alt={icon}
                  style={{ width: 24, filter: "brightness(0) invert(1)" }}
                />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ---------- MODAL 18+ ---------- */}
      {showAgeModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 2000 }}
        >
          <div
            className="bg-white p-4 rounded shadow text-center"
            style={{ maxWidth: 320 }}
          >
            <h5 className="mb-3">¿Eres mayor de 18 años?</h5>
            <div className="d-flex justify-content-center gap-3">
              <button onClick={handleAceptar18} className="btn btn-success">
                Sí
              </button>
              <button onClick={handleRechazar18} className="btn btn-danger">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
