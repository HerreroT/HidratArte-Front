/* eslint-disable unicode-bom */
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
import OrderConfirmation from "./components/OrderConfirmation";
import MyOrders from "./components/MyOrders";
import CheckoutShipping from "./components/CheckoutShipping";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";

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
              <Route path="/checkout" element={
                <PrivateRoute>
                  <CheckoutShipping />
                </PrivateRoute>
              } />
              <Route path="/orders" element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              } />
              <Route path="/perfil" element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              } />

              {/* Rutas de administración */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/products" element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              } />
              <Route path="/admin/orders" element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              } />
              <Route path="/order/confirmation/:id" element={<OrderConfirmation />} />
            </Route>

            {/* --- Rutas sin Navbar (auth) --- */}
            <Route path="/login"    element={<Login />}    />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>

        {/* Contenedor global de notificaciones (discreto y elegante) */}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
