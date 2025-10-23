// src/admin/AdminOrders.js
import { useEffect, useState } from "react";
import API from "../axiosConfig";

const endpoint = "/main/model/orders/";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get(endpoint);
      const list = Array.isArray(data) ? data : data?.results ?? [];
      setOrders(list);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los pedidos");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-3">Pedidos</h3>
      {loading && <p className="text-muted">Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive">
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user?.username ?? "-"}</td>
                <td>{o.date}</td>
                <td>${Number(o.total ?? 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
