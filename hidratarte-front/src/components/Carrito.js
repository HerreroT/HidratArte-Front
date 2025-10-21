import { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import API from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Carrito() {
  const {
    cartItems,
    loading,
    error,
    addToCart,
    decreaseFromCart,
    removeItem,
    clearCart,
    isLoggedIn,
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, it) => sum + Number(it.price ?? 0) * Number(it.qty ?? 0),
    0
  );
  const envio = total > 10000 ? 0 : 1000;
  const navigate = useNavigate();
  // `address` textarea was replaced by structured fields; keep placeholder if needed later
  // removed unused `address` state to satisfy linter
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    let mounted = true;
    API.get('/main/model/payment-methods/')
      .then((res) => mounted && setPaymentMethods(res.data))
      .catch(() => {})
    return () => (mounted = false);
  }, []);

  const handleRemove = (item) => {
    const ok = window.confirm(`¿Eliminar "${item.name}" del carrito?`);
    if (ok) removeItem(item.id);
  };

  const getProductForAdd = (item) =>
    item.product ?? {
      id: item.productId ?? item.id,
      nombre: item.name,
      precio: item.price,
      imagen: item.image,
    };

  const renderBody = () => {
    if (!isLoggedIn) {
      return <p className="text-muted">Inicia sesión para ver tu carrito.</p>;
    }

    if (loading) {
      return <p className="text-muted">Cargando carrito...</p>;
    }

    if (error) {
      return <p className="text-danger">{error}</p>;
    }

    if (cartItems.length === 0) {
      return <p className="text-muted">No hay productos en el carrito.</p>;
    }

    return (
      <div className="row">
        <div className="col-md-8">
          {cartItems.map((it) => (
            <div key={it.id} className="d-flex align-items-center border rounded p-3 mb-3 position-relative">
              <img
                src={it.image || "/images/default.png"}
                alt={it.name}
                style={{ width: 80, height: 80, objectFit: "cover", marginRight: "1rem" }}
              />

              <div className="flex-grow-1">
                <h5 className="mb-1">{it.name}</h5>
                <p className="mb-1 text-muted">${Number(it.price ?? 0).toFixed(2)} c/u</p>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => decreaseFromCart(it.id)}
                  >
                    -
                  </button>

                  <span className="fw-bold">{it.qty}</span>

                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => addToCart(getProductForAdd(it))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-end fw-bold me-3">
                ${(Number(it.price ?? 0) * Number(it.qty ?? 0)).toFixed(2)}
              </div>

              <button
                className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                onClick={() => handleRemove(it)}
                title="Eliminar"
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="border rounded p-3">
            <h5 className="mb-3">Resumen de compra</h5>

            <div className="mb-3">
              <label className="form-label">Dirección de envío</label>
              <div className="row g-2">
                <div className="col-8">
                  <input className="form-control" placeholder="Calle" value={street} onChange={(e) => setStreet(e.target.value)} />
                </div>
                <div className="col-4">
                  <input className="form-control" placeholder="Nro." value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <div className="col-6 mt-2">
                  <input className="form-control" placeholder="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="col-6 mt-2">
                  <input className="form-control" placeholder="Provincia" value={province} onChange={(e) => setProvince(e.target.value)} />
                </div>
                <div className="col-6 mt-2">
                  <input className="form-control" placeholder="C.P." value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Método de pago</label>
              {paymentMethods.length === 0 ? (
                <div className="d-flex gap-2">
                  <button type="button" className={`btn d-flex align-items-center gap-2 ${selectedPayment === 'mercadopago' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setSelectedPayment('mercadopago')}>
                    {/* MercadoPago-like icon (simple) */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect width="24" height="24" rx="4" fill="#00ADEF" />
                      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">MP</text>
                    </svg>
                    <span>MercadoPago</span>
                  </button>

                  <button type="button" className={`btn d-flex align-items-center gap-2 ${selectedPayment === 'debito' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setSelectedPayment('debito')}>
                    {/* Debit icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect x="2" y="5" width="20" height="14" rx="2" fill="#f0f0f0" stroke="#999" />
                      <rect x="4" y="8" width="8" height="2" fill="#999" />
                    </svg>
                    <span>Débito</span>
                  </button>

                  <button type="button" className={`btn d-flex align-items-center gap-2 ${selectedPayment === 'credito' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setSelectedPayment('credito')}>
                    {/* Credit icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect x="2" y="5" width="20" height="14" rx="2" fill="#fff" stroke="#666" />
                      <rect x="4" y="9" width="12" height="2" fill="#666" />
                    </svg>
                    <span>Crédito</span>
                  </button>
                </div>
              ) : (
                <select className="form-select" value={selectedPayment || ""} onChange={(e) => setSelectedPayment(e.target.value)}>
                  <option value="">Seleccionar</option>
                  {paymentMethods.map(pm => (
                    <option key={pm.id} value={pm.id}>{pm.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Envío</span>
              <span>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total</span>
              <span>${(total + envio).toFixed(2)}</span>
            </div>
            {/* Navegar al flujo de checkout detallado */}
            <button className="btn btn-primary w-100 mt-2" onClick={() => navigate('/checkout')}>Continuar a envio y pago</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 style={{ color: "#0a3d3f" }}>🛒 Tu carrito</h2>
        {isLoggedIn && cartItems.length > 0 && !loading && !error && (
          <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
            Vaciar carrito
          </button>
        )}
      </div>

      {renderBody()}
    </div>
  );
}

export default Carrito;
