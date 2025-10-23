import axios from "axios";

const BASE_URL =
  (process.env.REACT_APP_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Si ya hay token al cargar, setear header por defecto (además del interceptor)
const bootToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
if (bootToken) {
  API.defaults.headers.common.Authorization = `Bearer ${bootToken}`;
}

// -------- Interceptor de request: añade Bearer salvo en endpoints de auth
API.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = (config.url || "").replace(BASE_URL, "");
  const clean = url.startsWith("/") ? url : `/${url}`;

  const isAuthEndpoint =
    clean.endsWith("/useradmin/token/") ||
    clean.endsWith("/api/token/") ||
    clean.endsWith("/useradmin/token/refresh/") ||
    clean.endsWith("/api/token/refresh/");

  if (token && !isAuthEndpoint) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------- Manejo de refresh concurrente
let isRefreshing = false;
let pending = []; // {resolve, reject}

API.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const status = error?.response?.status;
    const original = error?.config || {};

    // Si no hay status (network) o ya reintenté, salir
    if (!status || original._retry) return Promise.reject(error);

    if (status === 401) {
      const refresh = typeof window !== "undefined" ? localStorage.getItem("refresh") : null;

      // Si no hay refresh, limpiar y rechazar
      if (!refresh) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
        }
        return Promise.reject(error);
      }

      // Si ya hay un refresh en curso, encolar y esperar
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pending.push({ resolve, reject });
        })
          .then((newToken) => {
            original.headers = original.headers || {};
            original.headers.Authorization = `Bearer ${newToken}`;
            return API(original);
          })
          .catch((e) => Promise.reject(e));
      }

      // Ejecutar refresh
      original._retry = true;
      isRefreshing = true;

      try {
        // Usamos axios base (no API) para no gatillar el mismo interceptor
        const { data } = await axios.post(
          `${BASE_URL}/api/token/refresh/`,
          { refresh },
          { headers: { "Content-Type": "application/json" } }
        );

        const newToken = data.access;
        const newRefresh = data.refresh ?? refresh;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", newToken);
          localStorage.setItem("refresh", newRefresh);
        }
        API.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        // Resolver pendientes
        pending.forEach((p) => p.resolve(newToken));
        pending = [];

        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newToken}`;
        return API(original);
      } catch (e) {
        // Falló el refresh → limpiar y propagar
        pending.forEach((p) => p.reject(e));
        pending = [];
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
        }
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    // Otros códigos (403, 419, 5xx, etc.) se propagan
    return Promise.reject(error);
  }
);

export default API;
