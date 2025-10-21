// src/admin/AdminOrders.js
import { useEffect, useState } from "react";
/* eslint-disable unicode-bom */
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

  const handleAccept = async (id) => {
    try {
      await API.post(`${endpoint}${id}/accept/`);
      alert("Pedido aceptado correctamente");
      load();
    } catch (e) {
      console.error(e);
      alert("Error al aceptar el pedido");
    }
  };

  const handleCancel = async (id) => {
    try {
      await API.post(`${endpoint}${id}/cancel/`);
      alert("Pedido cancelado correctamente");
      load();
    } catch (e) {
      console.error(e);
      alert("Error al cancelar el pedido");
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user?.username ?? "-"}</td>
                <td>{o.date}</td>
                <td>${Number(o.total ?? 0).toFixed(2)}</td>
                <td>
                  {o.status !== "cancelled" && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleAccept(o.id)}
                      >
                        Aceptar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(o.id)}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
