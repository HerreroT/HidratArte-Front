import { useEffect, useState } from "react";
import API from "../axiosConfig";
import { Link } from "react-router-dom";

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
          <Link 
            key={o.id} 
            to={`/order/confirmation/${o.id}`} 
            className="list-group-item list-group-item-action"
            style={{ padding: '1rem' }}
          >
            <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
              <div className="flex-grow-1">
                <div className="fw-semibold">Pedido #{o.id}</div>
                <small className="text-muted d-block">{o.date}</small>
              </div>
              <div className="d-flex flex-sm-column align-items-start align-items-sm-end gap-2 gap-sm-1">
                <div className="fw-bold" style={{ fontSize: '1.1rem' }}>${Number(o.total).toFixed(2)}</div>
                <small className="badge bg-secondary">{o.status}</small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
