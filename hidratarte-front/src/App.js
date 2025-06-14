import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register"; // ⬅️ IMPORTANTE

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ⬅️ NUEVA RUTA */}
      </Routes>
    </Router>
  );
}

export default App;
