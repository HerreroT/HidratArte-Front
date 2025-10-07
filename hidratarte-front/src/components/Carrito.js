import { useContext } from "react";
import { CartContext } from "../CartContext";

function Carrito() {
  const { cartItems, cartMeta, addToCart, decreaseFromCart, removeItem, clearCart } = useContext(CartContext);

  // Los items vienen del backend como snapshot: { id, product_id, name, price, qty, image }
  const total = cartItems.reduce(
    (sum, it) => sum + Number(it.price) * Number(it.qty),
    0
  );
  const envio = total > 10000 ? 0 : 1000;
  const cartOwnerLabel = cartMeta.userId
    ? `Carrito vinculado al usuario #${cartMeta.userId}`
    : "Carrito local (sin iniciar sesión)";
  const lastSynced = cartMeta.updatedAt ? new Date(cartMeta.updatedAt).toLocaleString() : null;

  const handleRemove = (it) => {
    const ok = window.confirm(`¿Eliminar "${it.name}" del carrito?`);
    if (ok) removeItem(it.product_id);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 style={{ color: "#0a3d3f" }}>🛒 Tu carrito</h2>
        {cartItems.length > 0 && (
          <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
            Vaciar carrito
          </button>
        )}
      </div>

      <p className="text-muted small mb-4">
        {cartOwnerLabel}
        {lastSynced ? ` · Actualizado ${lastSynced}` : ""}
      </p>

      {cartItems.length === 0 ? (
        <p className="text-muted">No hay productos en el carrito.</p>
      ) : (
        <div className="row">
          {/* Lista de productos */}
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
                  <p className="mb-1 text-muted">${Number(it.price).toFixed(2)} c/u</p>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => decreaseFromCart(it.product_id)}
                    >
                      -
                    </button>

                    <span className="fw-bold">{it.qty}</span>

                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        addToCart({
                          id: it.product_id,
                          nombre: it.name,
                          precio: it.price,
                          imagen: it.image,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-end fw-bold me-3">
                  ${(Number(it.price) * Number(it.qty)).toFixed(2)}
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

          {/* Resumen */}
          <div className="col-md-4">
            <div className="border rounded p-3">
              <h5 className="mb-3">Resumen de compra</h5>
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
              <button className="btn btn-primary w-100">Finalizar compra</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
