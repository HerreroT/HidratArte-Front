// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import API from "./axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const persistSession = (user, accessToken) => {
    setIsLoggedIn(true);
    setUserName(user.username);
    setIsAdmin(Boolean(user.is_staff));
    localStorage.setItem("registeredUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const login = async (credentials) => {
    try {
      const { data } = await API.post("/useradmin/token/", credentials);
      const accessToken = data.access;
      const refreshToken = data.refresh ?? null;
      API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      localStorage.setItem("token", accessToken);
      if (refreshToken) {
        localStorage.setItem("refresh", refreshToken);
      } else {
        localStorage.removeItem("refresh");
      }

      const resUser = await API.get("/useradmin/profile/");
      persistSession(resUser.data, accessToken);
    } catch (error) {
      console.error("Error en login:", error);
      delete API.defaults.headers.common.Authorization;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setIsAdmin(false);
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
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
