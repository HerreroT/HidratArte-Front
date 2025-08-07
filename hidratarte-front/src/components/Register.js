// src/components/Register.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../axiosConfig";
import { AuthContext } from "../AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/useradmin/register/", {
        username,
        email,
        address,
        password,
      });

      const user = res.data;

      // Loguear automáticamente (si querés)
      alert("Registro exitoso. Ahora podés iniciar sesión.");
      navigate("/login");

      // O si querés loguearlo directo:
      // login(user);
      // navigate("/");

    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error);
      alert("No se pudo registrar. Verificá los datos.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Registrarse</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
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
