import { useEffect, useState } from "react";
import API from "../axiosConfig";
import { Link } from "react-router-dom";
import { normalizeOrderStatus, STATUS_BADGE, STATUS_LABEL_ES } from "../constants/orderStatus";
import { toast } from "react-toastify";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    API.get('/main/model/orders/mine/')
      .then((res) => mounted && setOrders(res.data))
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="container py-5">Cargando...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Mis pedidos</h2>
      {orders.length === 0 && <p>No tenés pedidos aún.</p>}
      <div className="list-group">
        {orders.map(o => (
          <div key={o.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/order/confirmation/${o.id}`} className="flex-grow-1 text-decoration-none text-dark">
              <div>Pedido #{o.id}</div>
              <small className="text-muted">{o.date}</small>
            </Link>
            {(() => {
              const norm = normalizeOrderStatus(o.status);
              const badge = STATUS_BADGE[norm] || "secondary";
              return (
                <>
                  <div className="text-end me-3">
                    <div>${Number(o.total).toFixed(2)}</div>
                    <span className={`badge bg-${badge}`}>{STATUS_LABEL_ES[norm]}</span>
                  </div>
                  {!(norm === 'SHIPPED' || norm === 'DELIVERED' || norm === 'CANCELED') && (
                    <button className="btn btn-sm btn-outline-danger" onClick={async () => {
                      if (!window.confirm('¿Cancelar pedido?')) return;
                      try {
                        await API.post(`/main/model/orders/${o.id}/cancel/`);
                        const { data } = await API.get('/main/model/orders/mine/');
                        setOrders(data);
                        toast.success('Pedido cancelado');
                      } catch (err) {
                        console.error('Cancel error', err);
                        const serverMsg = err?.response?.data?.detail || err?.response?.data || err?.message || 'No se pudo cancelar';
                        toast.error(serverMsg);
                      }
                    }}>Cancelar</button>
                  )}
                </>
              );
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
