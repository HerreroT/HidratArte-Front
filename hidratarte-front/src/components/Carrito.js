import { useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

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
  // Address and payment are handled in /checkout; remove unused states

  // Payment methods are fetched on the dedicated /checkout page

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

            {/* Address & payment are handled in the dedicated /checkout page */}

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
