import React from "react";

function Placeholder({ nombre }) {
  return (
    <div className="container text-center mt-5">
      <h2 className="fw-bold" style={{ color: "#0a3d3f" }}>
        Página de {nombre} en construcción
      </h2>
      <p className="text-muted">Próximamente disponible</p>
    </div>
  );
}

export default Placeholder;
