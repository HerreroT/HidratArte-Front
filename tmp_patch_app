// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

import Layout   from "./Layout";
import Home     from "./components/home";
import Agua     from "./components/Agua";
import Jugo     from "./components/Jugo";
import Gaseosa  from "./components/Gaseosa";
import Alcohol  from "./components/Alcohol";
import Carrito  from "./components/Carrito";
import Explorar from "./components/Explorar";
import Perfil   from "./components/Perfil";
import Login    from "./components/Login";
import Register from "./components/Register";

import PrivateRoute from "./PrivateRoute"; // ✅ Asegurate que esté correctamente ubicado

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* --- Rutas con Navbar + Footer --- */}
            <Route element={<Layout />}>
              <Route path="/"         element={<Home />}     />
              <Route path="/agua"     element={<Agua />}     />
              <Route path="/jugo"     element={<Jugo />}     />
              <Route path="/gaseosa"  element={<Gaseosa />}  />
              <Route path="/alcohol"  element={<Alcohol />}  />
              <Route path="/explorar" element={<Explorar />} />

              {/* Rutas protegidas */}
              <Route path="/carrito" element={
                <PrivateRoute>
                  <Carrito />
                </PrivateRoute>
              } />
              <Route path="/perfil" element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              } />
            </Route>

            {/* --- Rutas sin Navbar (ej: auth) --- */}
            <Route path="/login"    element={<Login />}    />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>

        {/* Contenedor global de notificaciones */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
