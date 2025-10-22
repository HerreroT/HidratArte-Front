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
          <Link key={o.id} to={`/order/confirmation/${o.id}`} className="list-group-item list-group-item-action d-flex justify-content-between">
            <div>
              <div>Pedido #{o.id}</div>
              <small className="text-muted">{o.date}</small>
            </div>
            <div className="text-end">
              <div>${Number(o.total).toFixed(2)}</div>
              <small className="text-muted">{o.status}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
