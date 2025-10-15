import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const { userName } = useContext(AuthContext);
  const [showAgeModal, setShowAgeModal] = useState(false);

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

          {/* BUSCADOR */}
          <div className="home-search-wrap position-relative mb-5">
            <div className="home-search position-relative">
              <span className="home-search-icon">🔍</span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos"
              />
              <button className="btn btn-primary" type="button">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS SECTION */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-2 home-title">
          Explora Nuestras Categorías
        </h2>
        <p className="text-center mb-5" style={{ color: "#6c757d" }}>
          Selecciona tu categoría favorita y encuentra la bebida perfecta
        </p>

        {/* CATEGORÍAS */}
        <div className="categorias-wrap">
          {/* Agua */}
          <Link to="/agua" className="categoria-item" aria-label="Agua">
            <div className="categoria-fig">
              <img src="/images/agua.png" alt="Agua" className="categoria-icono" />
            </div>
            <div className="categoria-label">Agua</div>
          </Link>

          {/* Jugo */}
          <Link to="/jugo" className="categoria-item" aria-label="Jugo">
            <div className="categoria-fig">
              <img src="/images/jugo.png" alt="Jugo" className="categoria-icono" />
            </div>
            <div className="categoria-label">Jugo</div>
          </Link>

          {/* Gaseosa */}
          <Link to="/gaseosa" className="categoria-item" aria-label="Gaseosa">
            <div className="categoria-fig">
              <img src="/images/gaseosa.png" alt="Gaseosa" className="categoria-icono" />
            </div>
            <div className="categoria-label">Gaseosa</div>
          </Link>

          {/* Alcohol: MISMO MARKUP + interceptar click para modal 18+ */}
          <a
            href="/alcohol"
            className="categoria-item"
            aria-label="Alcohol"
            onClick={(e) => {
              e.preventDefault();
              setShowAgeModal(true);
            }}
          >
            <div className="categoria-fig">
              <img src="/images/alcohol.png" alt="Alcohol" className="categoria-icono" />
            </div>
            <div className="categoria-label">Alcohol</div>
          </a>
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
