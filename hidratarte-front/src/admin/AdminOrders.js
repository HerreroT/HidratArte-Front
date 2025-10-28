// src/admin/AdminOrders.js
import { useEffect, useMemo, useState } from "react";
/* eslint-disable unicode-bom */
import API from "../axiosConfig";
import { toast } from "react-toastify";
import { normalizeOrderStatus, STATUS_BADGE, STATUS_LABEL_ES } from "../constants/orderStatus";

const endpoint = "/main/model/orders/";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL");

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

  const counts = useMemo(() => {
    const acc = { PENDING: 0, ACCEPTED: 0, PREPARING: 0, SHIPPED: 0, DELIVERED: 0, CANCELED: 0 };
    for (const o of orders) {
      acc[normalizeOrderStatus(o.status)]++;
    }
    return acc;
  }, [orders]);

  const filtered = useMemo(() => {
    if (filter === "ALL") return orders;
    return orders.filter((o) => normalizeOrderStatus(o.status) === filter);
  }, [orders, filter]);

  const handleAccept = async (id) => {
    try {
      await API.post(`${endpoint}${id}/accept/`);
      toast.success("Pedido aceptado correctamente");
      load();
    } catch (e) {
      console.error(e);
      toast.error("Error al aceptar el pedido");
    }
  };

  const handleCancel = async (id) => {
    try {
      await API.post(`${endpoint}${id}/cancel/`);
      toast.success("Pedido cancelado correctamente");
      load();
    } catch (e) {
      console.error(e);
      toast.error("Error al cancelar el pedido");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-start align-items-sm-center mb-3 gap-2 gap-sm-3">
        <h3 className="mb-0">Pedidos</h3>
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2 gap-sm-3">
          {/* Contadores por estado */}
          <div className="d-flex flex-wrap gap-1 gap-sm-2">
            {Object.entries(counts).map(([k, v]) => (
              <span key={k} className={`badge bg-${STATUS_BADGE[k]}`} style={{ fontSize: '0.75rem' }}>
                {STATUS_LABEL_ES[k]}: {v}
              </span>
            ))}
          </div>
          {/* Filtro */}
          <select className="form-select form-select-sm" style={{ width: '100%', maxWidth: 180 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="ALL">Todos</option>
            <option value="PENDING">Pendiente</option>
            <option value="ACCEPTED">Aceptado</option>
            <option value="PREPARING">En preparación</option>
            <option value="SHIPPED">Enviado</option>
            <option value="DELIVERED">Entregado</option>
            <option value="CANCELED">Cancelado</option>
          </select>
        </div>
      </div>

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
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => {
              const norm = normalizeOrderStatus(o.status);
              const badge = STATUS_BADGE[norm] || "secondary";
              return (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.user?.username ?? "-"}</td>
                  <td>{o.date}</td>
                  <td>${Number(o.total ?? 0).toFixed(2)}</td>
                  <td><span className={`badge bg-${badge}`}>{STATUS_LABEL_ES[norm]}</span></td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-success"
                        onClick={() => handleAccept(o.id)}
                        disabled={norm !== "PENDING"}
                        title={norm !== "PENDING" ? "Solo pedidos pendientes" : "Aceptar"}
                      >
                        Aceptar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(o.id)}
                        disabled={norm === "CANCELED" || norm === "DELIVERED"}
                        title={(norm === "CANCELED" || norm === "DELIVERED") ? "No cancelable" : "Cancelar"}
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
