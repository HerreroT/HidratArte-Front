// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import API from "./axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const login = (user) => {
    setIsLoggedIn(true);
    // Usamos username, pero si querés cambiar a first_name o email, podés
    setUserName(user.username); 
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("registeredUser");
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/useradmin/profile/")
        .then((res) => {
          setIsLoggedIn(true);

          // 👇 Mostramos el dato correcto del usuario (ajustalo si es necesario)
          // Opciones comunes: res.data.username, res.data.first_name, res.data.email
          setUserName(res.data.username);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
