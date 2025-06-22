import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import Home from "./components/home";
import Agua from "./components/Agua";
import Jugo from "./components/Jugo";
import Gaseosa from "./components/Gaseosa";
import Alcohol from "./components/Alcohol";
import Carrito from "./components/Carrito";
import Register from "./components/Register";
import Login from "./components/Login";
import Explorar from "./components/Explorar";
import Layout from "./Layout";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Envolvemos en Layout para tener navbar/footer en todas */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/agua" element={<Agua />} />
              <Route path="/jugo" element={<Jugo />} />
              <Route path="/gaseosa" element={<Gaseosa />} />
              <Route path="/alcohol" element={<Alcohol />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/explorar" element={<Explorar />} />
            </Route>

            {/* Rutas fuera de Layout (si querés que no tengan navbar por ejemplo) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
