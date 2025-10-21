// src/admin/AdminDashboard.js
import { useEffect, useState } from "react";
/* eslint-disable unicode-bom */
import API from "../axiosConfig";
import { Link } from "react-router-dom";

function StatCard({ title, value, children }) {
  return (
    <div className="col-md-3">
      <div className="p-3 rounded shadow-soft bg-white h-100">
        <h6 className="text-muted">{title}</h6>
        <div style={{ fontSize: "1.6rem", color: "#0a3d3f" }} className="fw-bold">{value}</div>
        {children}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    API.get("/main/model/admin-metrics/")
      .then((res) => {
        if (!mounted) return;
        setMetrics(res.data);
      })
      .catch((err) => {
        console.error("No se pudieron cargar métricas", err);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Panel de Administración</h2>
        <div>
          <Link to="/admin/products" className="btn btn-outline-primary me-2">Productos</Link>
          <Link to="/admin/orders" className="btn btn-outline-secondary">Pedidos</Link>
        </div>
      </div>

      {loading && <div>Cargando métricas...</div>}

      {metrics && (
        <>
          <div className="row g-3 mb-4">
            <StatCard title="Productos totales" value={metrics.total_products} />
            <StatCard title="Usuarios" value={metrics.total_users} />
            <StatCard title="Pedidos" value={metrics.total_orders} />
            <StatCard title="Ventas totales" value={`$${Number(metrics.total_sales).toFixed(2)}`} />
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 rounded shadow-soft bg-white">
                <h5>Productos con bajo stock</h5>
                {metrics.low_stock.length === 0 && <p className="text-muted">Ninguno</p>}
                <ul className="list-unstyled mb-0">
                  {metrics.low_stock.map((p) => (
                    <li key={p.id} className="d-flex justify-content-between py-1 border-bottom">
                      <span>{p.name}</span>
                      <small className="text-danger">{p.stock}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded shadow-soft bg-white">
                <h5>Top productos (por unidades vendidas)</h5>
                {metrics.top_products.length === 0 && <p className="text-muted">Sin datos</p>}
                <ol className="mb-0">
                  {metrics.top_products.map((t) => (
                    <li key={t.product_id} className="py-1">
                      {t.name} <small className="text-muted">({t.sold})</small>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
