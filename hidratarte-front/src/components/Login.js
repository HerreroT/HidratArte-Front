// src/components/Login.js
import React, { useState, useContext, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dismissTimer, setDismissTimer] = useState(null);

  useEffect(() => {
    return () => {
      if (dismissTimer) {
        clearTimeout(dismissTimer);
      }
    };
  }, [dismissTimer]);

  const clearError = () => {
    if (errorMessage) {
      setErrorMessage("");
    }
    if (dismissTimer) {
      clearTimeout(dismissTimer);
      setDismissTimer(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username: email, password });
      navigate("/");
      clearError();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      const status = error?.response?.status;
      if (status === 400 || status === 401) {
        setErrorMessage("Incorrect email or password");
      } else {
        setErrorMessage("Unable to login. Please try again later.");
      }
      if (dismissTimer) {
        clearTimeout(dismissTimer);
      }
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      setDismissTimer(timer);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        {errorMessage && (
          <Alert variant="danger" className="py-2">
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
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
