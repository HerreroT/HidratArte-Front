import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register";
import Alcohol from "./components/Alcohol";
import Placeholder from "./components/Placeholder"; // Asegurate de crearlo

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agua" element={<Placeholder nombre="Agua" />} />
        <Route path="/jugo" element={<Placeholder nombre="Jugo" />} />
        <Route path="/gaseosa" element={<Placeholder nombre="Gaseosa" />} />
        <Route path="/alcohol" element={<Alcohol />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
