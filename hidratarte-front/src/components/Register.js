import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Registrarse</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" required />
          </div>
          <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-decoration-none">Iniciá sesión</Link>
        </p>

        <div className="d-flex justify-content-center mt-2">
          <Link to="/" className="btn btn-outline-secondary btn-sm">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
