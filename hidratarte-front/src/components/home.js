import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../style/custom.css";

function Home() {
  const navigate = useNavigate();
  const { userName } = useContext(AuthContext);
  const [showAgeModal, setShowAgeModal] = useState(false);

  const categorias = [
    { nombre: "agua", ruta: "/agua" },
    { nombre: "jugo", ruta: "/jugo" },
    { nombre: "gaseosa", ruta: "/gaseosa" },
  ];

  const handleAlcoholClick = () => setShowAgeModal(true);
  const handleAceptar18 = () => {
    setShowAgeModal(false);
    navigate("/alcohol");
  };
  const handleRechazar18 = () => setShowAgeModal(false);

  return (
    <div style={{ backgroundColor: "#f9fbfc", minHeight: "calc(100vh - 200px)" }}>
      {/* HERO SECTION */}
      <section className="hero-section fade-in">
        <div className="container">
          <h1 className="hero-title">
            🌊 Bienvenido a HidratArte {userName && `, ${userName}`}
          </h1>
          <p className="hero-subtitle">
            Descubre las mejores bebidas refrescantes para mantenerte hidratado y lleno de energía
          </p>

          {/* SEARCH BAR */}
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar bebidas, marcas o categorías..."
            />
            <button className="btn btn-primary search-btn">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS SECTION */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-2" style={{ color: "#0a3d3f" }}>
          Explora Nuestras Categorías
        </h2>
        <p className="text-center mb-5" style={{ color: "#6c757d" }}>
          Selecciona tu categoría favorita y encuentra la bebida perfecta
        </p>

        <div className="row justify-content-center g-4">
          {categorias.map((cat) => (
            <div key={cat.nombre} className="col-6 col-md-3">
              <Link
                to={cat.ruta}
                className="categoria-item text-decoration-none d-block"
              >
                <div className="text-center">
                  <img
                    src={`/images/${cat.nombre}.png`}
                    alt={cat.nombre}
                    className="categoria-icono"
                  />
                  <p className="categoria-nombre">
                    {cat.nombre}
                  </p>
                </div>
              </Link>
            </div>
          ))}

          {/* Alcohol con modal */}
          <div className="col-6 col-md-3">
            <div
              onClick={handleAlcoholClick}
              className="categoria-item text-decoration-none d-block"
              style={{ cursor: "pointer" }}
            >
              <div className="text-center">
                <img
                  src="/images/alcohol.png"
                  alt="Alcohol"
                  className="categoria-icono"
                />
                <p className="categoria-nombre">
                  Alcohol
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE CARACTERÍSTICAS */}
      <section className="container py-5 mb-5">
        <div className="row g-4">
          <div className="col-md-4 text-center fade-in">
            <div className="p-4 rounded shadow-soft bg-white">
              <div className="mb-3" style={{ fontSize: "3rem" }}>💧</div>
              <h5 style={{ color: "#0a3d3f" }}>Frescura Garantizada</h5>
              <p style={{ color: "#6c757d", fontSize: "0.95rem" }}>
                Productos seleccionados con los más altos estándares de calidad
              </p>
            </div>
          </div>
          <div className="col-md-4 text-center fade-in">
            <div className="p-4 rounded shadow-soft bg-white">
              <div className="mb-3" style={{ fontSize: "3rem" }}>🚚</div>
              <h5 style={{ color: "#0a3d3f" }}>Entrega Rápida</h5>
              <p style={{ color: "#6c757d", fontSize: "0.95rem" }}>
                Recibe tus bebidas favoritas en la puerta de tu casa
              </p>
            </div>
          </div>
          <div className="col-md-4 text-center fade-in">
            <div className="p-4 rounded shadow-soft bg-white">
              <div className="mb-3" style={{ fontSize: "3rem" }}>🎯</div>
              <h5 style={{ color: "#0a3d3f" }}>Variedad Única</h5>
              <p style={{ color: "#6c757d", fontSize: "0.95rem" }}>
                Amplia selección de bebidas para todos los gustos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DE VERIFICACIÓN DE EDAD 18+ */}
      {showAgeModal && (
        <>
          <div
            className="modal-overlay position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 1050 }}
            onClick={handleRechazar18}
          ></div>
          <div
            className="position-fixed top-50 start-50 translate-middle"
            style={{ zIndex: 1051, width: "90%", maxWidth: "400px" }}
          >
            <div className="modal-content bg-white rounded shadow-lg p-4">
              <div className="modal-header border-0 pb-3 flex-column">
                <div className="mb-3" style={{ fontSize: "3rem" }}>🔞</div>
                <h4 className="modal-title text-center mb-2" style={{ color: "#0a3d3f" }}>
                  Verificación de Edad
                </h4>
                <p className="text-center mb-0" style={{ color: "#6c757d", fontSize: "0.95rem" }}>
                  Para acceder a esta sección, debes ser mayor de 18 años
                </p>
              </div>
              <div className="modal-body text-center pt-3">
                <p className="mb-4 fw-semibold" style={{ color: "#0a3d3f" }}>
                  ¿Eres mayor de 18 años?
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <button
                    onClick={handleAceptar18}
                    className="btn btn-primary px-4"
                  >
                    Sí, soy mayor
                  </button>
                  <button
                    onClick={handleRechazar18}
                    className="btn btn-secondary px-4"
                  >
                    No, volver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
