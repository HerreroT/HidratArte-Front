// src/axiosConfig.js
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((config) => {
  config.headers = { ...(config.headers || {}) };

  const token = localStorage.getItem("token");
  const url = config.url || "";
  const isAuthEndpoint =
    url.endsWith("/useradmin/token/") ||
    url.endsWith("/api/token/") ||
    url.endsWith("/useradmin/token/refresh/") ||
    url.endsWith("/api/token/refresh/");

  if (token && !isAuthEndpoint) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

let isRefreshing = false;
let pending = [];

API.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const status = error?.response?.status;
    const original = error.config;

    if (!status || original?._retry) return Promise.reject(error);

    if (status === 401) {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pending.push({ resolve, reject });
        })
          .then((newToken) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            return API(original);
          })
          .catch(Promise.reject);
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${baseURL}/api/token/refresh/`,
          { refresh },
          { headers: { "Content-Type": "application/json" } }
        );

        const newToken = data.access;
        const newRefresh = data.refresh ?? refresh;
        localStorage.setItem("token", newToken);
        localStorage.setItem("refresh", newRefresh);
        API.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        pending.forEach((p) => p.resolve(newToken));
        pending = [];

        original.headers.Authorization = `Bearer ${newToken}`;
        return API(original);
      } catch (e) {
        pending.forEach((p) => p.reject(e));
        pending = [];
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;

