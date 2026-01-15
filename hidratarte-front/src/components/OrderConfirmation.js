import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../axiosConfig";
import OrderStatusTimeline from './OrderStatusTimeline';
import { normalizeOrderStatus, STATUS_LABEL_ES } from "../constants/orderStatus";

function OrderConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

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

  const norm = useMemo(
    () => normalizeOrderStatus(order?.status ?? "pending"),
    [order?.status]
  );

  const statusLabel = useMemo(() => {
    if (!order) return STATUS_LABEL_ES[norm] || norm.toLowerCase();
    return STATUS_LABEL_ES[norm] || order.status;
  }, [order, norm]);

  const detailItems = useMemo(() => order?.order_detail ?? [], [order?.order_detail]);
  const itemSubtotal = useMemo(
    () => detailItems.reduce((sum, item) => sum + Number(item.subtotal ?? 0), 0),
    [detailItems]
  );
  const shippingCost = useMemo(() => {
    const itemsTotal = Number(itemSubtotal);
    const totalOrder = Number(order?.total ?? 0);
    const diff = totalOrder - itemsTotal;
    return diff > 0 ? diff : 0;
  }, [itemSubtotal, order?.total]);
  const totalItems = useMemo(
    () => detailItems.reduce((sum, item) => sum + Number(item.amount ?? 0), 0),
    [detailItems]
  );
  const orderDate = useMemo(
    () => (order?.date ? new Date(order.date).toLocaleDateString("es-AR") : null),
    [order?.date]
  );
  const canDownloadInvoice = norm === "ACCEPTED";
  const handleDownloadInvoice = async () => {
    if (!order || downloading) return;
    try {
      setDownloading(true);
      const { data } = await API.get(`/main/model/orders/${order.id}/invoice.pdf`, {
        responseType: "blob",
      });
      const blob = new Blob([data], { type: "application/pdf" });
      const fileURL = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = fileURL;
      link.target = "_blank";
      link.rel = "noopener";
      link.download = `invoice-${order.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(fileURL);
    } catch (err) {
      console.error("No se pudo descargar la factura", err);
      alert("No se pudo descargar la factura. Intenta nuevamente.");
    } finally {
      setDownloading(false);
    }
  };

  const timelineSteps = useMemo(() => {
    const base = [
      { key: 'PENDING', label: 'pendiente' },
      { key: 'ACCEPTED', label: 'aceptado' },
      { key: 'PREPARING', label: 'en preparación' },
      { key: 'SHIPPED', label: 'enviado' },
      { key: 'DELIVERED', label: 'entregado' },
    ];
    if (norm === 'CANCELED') {
      return [
        { key: 'PENDING', label: 'pendiente' },
        { key: 'CANCELED', label: 'cancelado' },
      ];
    }
    return base;
  }, [norm]);

  const timelineTimestamps = useMemo(() => {
    const base = { PENDING: order?.date };
    if (norm === 'CANCELED' && order?.cancelled_at) {
      return { ...base, CANCELED: order.cancelled_at };
    }
    return base;
  }, [order?.date, order?.cancelled_at, norm]);

  if (loading) return <div className="container py-5">Cargando...</div>;
  if (!order) return <div className="container py-5">No se encontró la orden.</div>;

  return (
    <div className="container py-5">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="btn btn-link text-decoration-none d-inline-flex align-items-center gap-2 mb-3"
      >
        <span aria-hidden="true" style={{ fontSize: "1.3rem", lineHeight: 1 }}>
          ←
        </span>
        <span>Volver</span>
      </button>

      <div className="d-flex align-items-center gap-3 mb-2">
        <span style={{ fontSize: "2rem" }}>✅</span>
        <div>
          <h2 className="mb-0">Pedido #{order.id} — {statusLabel}</h2>
          {orderDate && (
            <small className="text-muted">Creado el {orderDate}</small>
          )}
        </div>
      </div>

      <OrderStatusTimeline
        steps={timelineSteps}
        activeKey={norm}
        timestamps={timelineTimestamps}
      />
      <p>Gracias por tu compra. Aquí el resumen:</p>

      <div className="mb-3">
        <strong>Total:</strong> ${Number(order.total).toFixed(2)}
      </div>

      {shippingCost > 0 && (
        <div className="mb-3">
          <strong>Incluye envío:</strong> ${shippingCost.toFixed(2)}
          <div className="text-muted" style={{ fontSize: "0.9rem" }}>
            Subtotal productos: ${itemSubtotal.toFixed(2)} + envío ${shippingCost.toFixed(2)}
          </div>
        </div>
      )}

      <div className="mb-3">
        <strong>Dirección de envío:</strong>
        <div className="p-2 bg-light rounded">{order.shipping_address || <em>No especificada</em>}</div>
      </div>

      {order.payment_method && (
        <div className="mb-3">
          <strong>Método de pago:</strong>{" "}
          {order.payment_method?.name ?? order.payment_method}
        </div>
      )}

      <div className="mb-3">
        <strong>Resumen:</strong>{" "}
        <span className="text-muted">
          {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
        </span>
      </div>

      <div className="mb-3">
        <strong>Detalles:</strong>
        {detailItems.length === 0 ? (
          <p className="text-muted mb-0">No hay productos asociados a este pedido.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Precio unitario</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detailItems.map((item) => {
                  const unitPrice = item.amount ? Number(item.subtotal) / Number(item.amount) : Number(item.subtotal);
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {item.product?.image && (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8 }}
                            />
                          )}
                          <div>
                            <div className="fw-semibold">{item.product?.name ?? "Producto"}</div>
                            {item.product?.description && (
                              <small className="text-muted d-block">{item.product.description}</small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{item.amount}</td>
                      <td className="text-end">${unitPrice.toFixed(2)}</td>
                      <td className="text-end">${Number(item.subtotal).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="d-flex flex-wrap gap-2">
        <Link to="/explorar" className="btn btn-outline-primary">Seguir comprando</Link>
        <Link to="/orders" className="btn btn-primary">Ver mis pedidos</Link>
        <button
          type="button"
          onClick={handleDownloadInvoice}
          className="btn btn-outline-secondary"
          disabled={!canDownloadInvoice || downloading}
          title={
            canDownloadInvoice
              ? "Descargar factura en PDF"
              : "Disponible cuando el pedido esté aceptado"
          }
        >
          {downloading ? "Generando..." : "Descargar factura (PDF)"}
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
