import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./home.css"; // Asegurate de tener esto

function Home() {
  const navigate = useNavigate();
  const { userName } = useContext(AuthContext);
  const [showAgeModal, setShowAgeModal] = useState(false);

  const categorias = [
    { nombre: "agua", ruta: "/agua" },
    { nombre: "jugo", ruta: "/jugo" },
    { nombre: "gaseosa", ruta: "/gaseosa" },
  ];

  const redes = [
    { nombre: "instagram", url: "https://www.instagram.com/tucuenta" },
    { nombre: "facebook", url: "https://www.facebook.com/tucuenta" },
    { nombre: "gmail", url: "mailto:tucorreo@gmail.com" },
  ];

  const handleAlcoholClick = () => setShowAgeModal(true);
  const handleAceptar18 = () => {
    setShowAgeModal(false);
    navigate("/alcohol");
  };
  const handleRechazar18 = () => setShowAgeModal(false);

  return (
    <div className={`bg-light ${showAgeModal ? "blur" : ""}`}>
      {/* CONTENIDO */}
      <main className="container text-center py-5 mb-5">
        <h2 className="fw-bold mb-3" style={{ color: "#0a3d3f" }}>
          BEBIDAS REFRESCANTES
        </h2>
        <p className="text-muted mb-4">
          Descubre tus bebidas favoritas para mantenerte hidratado.
        </p>

        <div className="position-relative w-50 mx-auto mb-5">
          <input
            type="text"
            className="form-control rounded-pill ps-5"
            placeholder="🔍 Buscar productos"
          />
        </div>

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
                className="categoria-icono"
              />
              <p
                className="fw-semibold mt-2 text-capitalize"
                style={{ color: "#0a3d3f" }}
              >
                {cat.nombre}
              </p>
            </Link>
          ))}

          <button
            onClick={handleAlcoholClick}
            className="border-0 bg-transparent p-0 text-center"
          >
            <img
              src="/images/alcohol.png"
              alt="Alcohol"
              className="categoria-icono"
            />
            <p className="fw-semibold mt-2" style={{ color: "#0a3d3f" }}>
              Alcohol
            </p>
          </button>
        </div>
      </main>

      {/* FOOTER FIJO */}
      <footer
        className="text-white py-3 px-4 w-100 position-fixed bottom-0 start-0"
        style={{ backgroundColor: "#0a3d3f", zIndex: 1000 }}
      >
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <p className="mb-2 mb-md-0">
            &copy; 2025 HidratArte. Todos los derechos reservados.
          </p>
          <div className="d-flex gap-3">
            {redes.map(({ nombre, url }) => (
              <a key={nombre} href={url} target="_blank" rel="noreferrer">
                <img
                  src={`/icons/${nombre}.png`}
                  alt={nombre}
                  style={{ width: 24, filter: "brightness(0) invert(1)" }}
                />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* MODAL 18+ */}
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
