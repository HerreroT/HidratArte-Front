// src/admin/AdminDashboard.js
import { useEffect, useMemo, useState } from "react";
/* eslint-disable unicode-bom */
import API from "../axiosConfig";
import { Link } from "react-router-dom";

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(
    Number(value || 0)
  );

function StatCard({ title, value, children }) {
  return (
    <div className="col-md-4 col-lg-3">
      <div className="p-3 rounded shadow-soft bg-white h-100">
        <h6 className="text-muted mb-2">{title}</h6>
        <div style={{ fontSize: "1.6rem", color: "#0a3d3f" }} className="fw-bold">
          {value}
        </div>
        {children}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await API.get("/api/admin/metrics/");
        if (!mounted) return;
        setMetrics(data);
      } catch (err) {
        console.error("No se pudieron cargar métricas", err);
        if (!mounted) return;
        setError("No se pudieron cargar las métricas. Intenta nuevamente.");
      } finally {
        mounted && setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const ordersBreakdown = useMemo(() => {
    if (!metrics?.orders) {
      return { pending: 0, approved: 0, canceled: 0 };
    }
    const { pending = 0, approved = 0, canceled = 0 } = metrics.orders;
    return { pending, approved, canceled };
  }, [metrics]);

  const lowStockList = metrics?.low_stock ?? [];
  const topProducts = metrics?.top_products ?? [];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="mb-0">Panel de Administración</h2>
        <div className="d-flex gap-2">
          <Link to="/admin/products" className="btn btn-outline-primary">
            Productos
          </Link>
          <Link to="/admin/orders" className="btn btn-outline-secondary">
            Pedidos
          </Link>
        </div>
      </div>

      {loading && <div>Cargando métricas...</div>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && metrics && (
        <>
          <div className="row g-3 mb-4">
            <StatCard title="Productos totales" value={metrics.total_products} />
            <StatCard title="Usuarios" value={metrics.total_users} />
            <StatCard title="Ventas totales" value={formatCurrency(metrics.total_sales)}>
              <small className="text-muted">Solo pedidos aprobados</small>
            </StatCard>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-lg-4">
              <div className="p-3 rounded shadow-soft bg-white h-100">
                <h5 className="mb-3">Pedidos</h5>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-warning text-dark">Pendientes</span>
                    <strong>{ordersBreakdown.pending}</strong>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-success">Aprobados</span>
                    <strong>{ordersBreakdown.approved}</strong>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-danger">Cancelados</span>
                    <strong>{ordersBreakdown.canceled}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="p-3 rounded shadow-soft bg-white h-100">
                <h5 className="mb-3">Productos con bajo stock</h5>
                {lowStockList.length === 0 && <p className="text-muted mb-0">Ninguno</p>}
                {lowStockList.length > 0 && (
                  <ul className="list-unstyled mb-0">
                    {lowStockList.map((p) => (
                      <li
                        key={p.product_id}
                        className="d-flex justify-content-between py-1 border-bottom"
                      >
                        <span>{p.name}</span>
                        <small className="text-danger">{p.stock}</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="p-3 rounded shadow-soft bg-white h-100">
                <h5 className="mb-3">Top productos (aprobados)</h5>
                {topProducts.length === 0 && <p className="text-muted mb-0">Sin datos</p>}
                {topProducts.length > 0 && (
                  <ol className="mb-0">
                    {topProducts.map((product) => (
                      <li key={product.product_id} className="py-1">
                        {product.name}{" "}
                        <small className="text-muted">({product.units_sold} unidades)</small>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
