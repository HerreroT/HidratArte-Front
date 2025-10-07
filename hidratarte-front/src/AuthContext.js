// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import API from "./axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const persistSession = (user, accessToken) => {
    setIsLoggedIn(true);
    setUserName(user.username);
    localStorage.setItem("registeredUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const login = async (credentials) => {
    try {
      const { data } = await API.post("/useradmin/token/", credentials);
      localStorage.setItem("token", data.access);
      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
      }
      API.defaults.headers.common.Authorization = `Bearer ${data.access}`;

      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (localCart.length > 0) {
        await API.post("/api/cart/merge/", { items: localCart });
        localStorage.removeItem("cart");
      }

      const resUser = await API.get("/useradmin/profile/");
      persistSession(resUser.data, data.access);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    delete API.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("registeredUser");
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      delete API.defaults.headers.common.Authorization;
      return;
    }

    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    API.get("/useradmin/profile/")
      .then((res) => {
        persistSession(res.data, token);
      })
      .catch((error) => {
        console.warn("Sesión inválida, cerrando.", error);
        logout();
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
