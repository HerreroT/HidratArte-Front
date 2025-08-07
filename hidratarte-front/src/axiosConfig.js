import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // sin /api
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Asegurate de usar el interceptor *después* de definir API
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ❌ NO agregar token en el login
  if (
    token &&
    !config.url.endsWith("/useradmin/token/") &&
    !config.url.endsWith("/api/token/")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
