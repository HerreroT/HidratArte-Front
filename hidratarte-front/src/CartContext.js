// src/CartContext.js
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; // ⬅️ Importamos la librería
import "react-toastify/dist/ReactToastify.css"; // ⬅️ Importamos los estilos

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Guardamos el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar al carrito
  const addToCart = (product) => {
    setCartItems((prev) => {
      const itemExists = prev.find((item) => item.id === product.id);
      if (itemExists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Mostramos el toast
    toast.success(
      <div>
        <strong>Agregado al carrito</strong>
        <br />
        {product.nombre}
        <div className="mt-1">
          <a href="/carrito" className="btn btn-sm btn-link p-0">
            Ir al carrito
          </a>
        </div>
      </div>,
      { icon: "🛒" }
    );
  };

  // Función para disminuir cantidad
  const decreaseFromCart = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Función para eliminar un ítem directamente
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseFromCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}
