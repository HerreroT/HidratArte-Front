// src/admin/AdminDashboard.js
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Panel de Administración</h2>
      <div className="list-group">
        <Link className="list-group-item list-group-item-action" to="/admin/products">
          Gestionar Productos
        </Link>
        <Link className="list-group-item list-group-item-action" to="/admin/orders">
          Ver Pedidos
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
