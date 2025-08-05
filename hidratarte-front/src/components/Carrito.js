import { useContext } from "react";
import { CartContext } from "../CartContext";

function Carrito() {
  const { cartItems, addToCart, decreaseFromCart, removeItem } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const envio = total > 10000 ? 0 : 1000;

  const handleRemove = (id, nombre) => {
    const confirmar = window.confirm(`¿Deseás eliminar todos los "${nombre}" del carrito?`);
    if (confirmar) {
      removeItem(id);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ color: "#0a3d3f" }}>
        🛒 Tu carrito
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-muted">No hay productos en el carrito.</p>
      ) : (
        <div className="row">
          {/* Productos */}
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center border rounded p-3 mb-3 position-relative"
              >
                <img
                  src={item.imagen || "/images/default.png"}
                  alt={item.nombre}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    marginRight: "1rem",
                  }}
                />

                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.nombre}</h5>
                  <p className="mb-1 text-muted">${item.precio} c/u</p>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => decreaseFromCart(item.id)}
                    >
                      -
                    </button>
                    <span className="fw-bold">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-end fw-bold me-3">
                  ${item.precio * item.quantity}
                </div>

                {/* Papelera */}
                <button
                  className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                  onClick={() => handleRemove(item.id, item.nombre)}
                  title="Eliminar todo"
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
