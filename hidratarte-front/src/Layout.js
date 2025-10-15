import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import "./style/custom.css";

export default function Layout() {
  const redes = [
    { nombre: "instagram", url: "https://www.instagram.com/bajbuj_tomi" },
    { nombre: "facebook", url: "https://www.facebook.com/tucuenta" },
    { nombre: "gmail", url: "mailto:tomasbajbuj@gmail.com" },
  ];

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#f9fbfc" }}>
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      
      {/* Footer moderno */}
      <footer className="footer mt-auto" style={{ backgroundColor: "#0a3d3f" }}>
        <div className="container py-4">
          <div className="row align-items-center">
            {/* Columna izquierda: Copyright */}
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-1 fw-semibold" style={{ color: "#ffffff" }}>
                &copy; {new Date().getFullYear()} HidratArte
              </p>
              <p className="mb-0" style={{ color: "#7eccc0", fontSize: "0.9rem" }}>
                Todos los derechos reservados
              </p>
            </div>

            {/* Columna derecha: Redes sociales */}
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-2" style={{ color: "#ffffff", fontSize: "0.95rem" }}>
                Síguenos en nuestras redes
              </p>
              <div className="d-flex justify-content-center justify-content-md-end gap-3">
                {redes.map(({ nombre, url }) => (
                  <a
                    key={nombre}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="d-inline-block"
                  >
                    <img
                      src={`/icons/${nombre}.png`}
                      alt={nombre}
                      className="social-icon"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="row mt-3">
            <div className="col-12">
              <hr style={{ borderColor: "#7eccc0", opacity: 0.3 }} />
            </div>
          </div>

          {/* Enlaces adicionales */}
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0" style={{ color: "#ffffff", fontSize: "0.85rem" }}>
                <a href="mailto:tomasbajbuj@gmail.com" className="text-decoration-none" style={{ color: "#7eccc0" }}>
                  Contacto
                </a>
                {" | "}
                <span style={{ color: "#ffffff" }}>Bebidas refrescantes para todos</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
