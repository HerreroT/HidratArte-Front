import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../axiosConfig";
import OrderStatusTimeline from './OrderStatusTimeline';

function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    API.get(`/main/model/orders/${id}/`)
      .then((res) => {
        if (!mounted) return;
        setOrder(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="container py-5">Cargando...</div>;
  if (!order) return <div className="container py-5">No se encontró la orden.</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">✅ Pedido #{order.id} — {order.status}</h2>
      <OrderStatusTimeline
        steps={[
          { key: 'confirmado', label: 'confirmado' },
          { key: 'pago_recibido', label: 'pago recibido' },
          { key: 'en_preparacion', label: 'en preparación' },
          { key: 'enviado', label: 'enviado' },
        ]}
        activeKey={order.status}
        timestamps={{ confirmado: order.date }}
      />
      <p>Gracias por tu compra. Aquí el resumen:</p>

      <div className="mb-3">
        <strong>Total:</strong> ${Number(order.total).toFixed(2)}
      </div>

      <div className="mb-3">
        <strong>Dirección de envío:</strong>
        <div className="p-2 bg-light rounded">{order.shipping_address || <em>No especificada</em>}</div>
      </div>

      <div className="mb-3">
        <strong>Detalles:</strong>
        <ul>
          {order.order_detail && order.order_detail.map((d) => (
            <li key={d.id}>{d.amount} x {d.product?.name} — ${Number(d.subtotal).toFixed(2)}</li>
          ))}
        </ul>
      </div>

      <Link to="/explorar" className="btn btn-outline-primary me-2">Seguir comprando</Link>
      <Link to="/orders" className="btn btn-primary">Ver mis pedidos</Link>
    </div>
  );
}

export default OrderConfirmation;
