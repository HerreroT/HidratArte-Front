import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register";
import Agua from "./components/Agua";
import Jugo from "./components/Jugo";
import Alcohol from "./components/Alcohol";
import Gaseosa from "./components/Gaseosa";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import PrivateRoute from "./PrivateRoute";
import Layout from "./Layout";
import Carrito from "./components/Carrito";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/agua" element={<PrivateRoute><Agua /></PrivateRoute>} />
              <Route path="/jugo" element={<PrivateRoute><Jugo /></PrivateRoute>} />
              <Route path="/gaseosa" element={<PrivateRoute><Gaseosa /></PrivateRoute>} />
              <Route path="/alcohol" element={<PrivateRoute><Alcohol /></PrivateRoute>} />
              <Route path="/carrito" element={<Carrito />} />

            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
