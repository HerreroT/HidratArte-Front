import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register";
import Agua from "./components/Agua";
import Jugo from "./components/Jugo";
import Alcohol from "./components/Alcohol";
import Gaseosa from "./components/Gaseosa";

import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/agua"
            element={
              <PrivateRoute>
                <Agua />
              </PrivateRoute>
            }
          />
          <Route
            path="/jugo"
            element={
              <PrivateRoute>
                <Jugo />
              </PrivateRoute>
            }
          />
          <Route
            path="/gaseosa"
            element={
              <PrivateRoute>
                <Gaseosa />
              </PrivateRoute>
            }
          />
          <Route
            path="/alcohol"
            element={
              <PrivateRoute>
                <Alcohol />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

