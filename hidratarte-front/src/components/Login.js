// src/components/Login.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import API from "../axiosConfig";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Hacemos login para obtener el token
      const resToken = await API.post(
        "/useradmin/token/",
        {
          username: email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );



      const token = resToken.data.access;
      localStorage.setItem("token", token);

      // 2. Pedimos los datos del usuario logueado
      const resUser = await API.get("/useradmin/profile/");
      const user = resUser.data;

      localStorage.setItem("registeredUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      login(user); // actualiza el contexto
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas o error del servidor");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-decoration-none">Registrate</Link>
        </p>

        <div className="d-flex justify-content-center mt-2">
          <Link to="/" className="btn btn-outline-secondary btn-sm">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
