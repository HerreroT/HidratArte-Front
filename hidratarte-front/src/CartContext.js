// src/CartContext.js
import { createContext, useState, useEffect } from "react";
import API from "./axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

const EMPTY_CART_META = Object.freeze({ id: null, userId: null, updatedAt: null });
const toNullable = (value) => (value === undefined || value === null ? null : value);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartMeta, setCartMeta] = useState(EMPTY_CART_META);
  const token = localStorage.getItem("token");

  const resetMeta = () => setCartMeta({ ...EMPTY_CART_META });

  const syncRemoteCart = (payload = {}) => {
    setCartItems(payload.items || []);
    setCartMeta({
      id: toNullable(payload.id),
      userId: toNullable(payload.user_id),
      updatedAt: toNullable(payload.updated_at),
    });
  };

  const invalidateCartState = () => {
    setCartItems([]);
    resetMeta();
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    if (token) {
      API.get("/api/cart/")
        .then((res) => syncRemoteCart(res.data))
        .catch(() => {
          invalidateCartState();
        });
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(localCart);
      resetMeta();
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  const refresh = async () => {
    if (!token) return;
    const { data } = await API.get("/api/cart/");
    syncRemoteCart(data);
  };

  const addToCart = async (product) => {
    if (token) {
      await API.post("/api/cart/items/", {
        product_id: product.id,
        name: product.nombre,
        price: product.precio,
        qty: 1,
        image: product.imagen || "",
      });
      await refresh();
    } else {
      const exists = cartItems.find((i) => i.id === product.id);
      if (exists) {
        setCartItems(
          cartItems.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, qty: 1 }]);
      }
    }
    toast.success(`Agregado: ${product.nombre}`, { icon: "🛒" });
  };

  const decreaseFromCart = async (productId) => {
    if (token) {
      const item = cartItems.find((i) => i.product_id === productId);
      if (!item) return;
      const nextQty = Number(item.qty) - 1;
      if (nextQty <= 0) {
        await API.delete(`/api/cart/items/${item.id}/`);
      } else {
        await API.patch(`/api/cart/items/${item.id}/`, { qty: nextQty });
      }
      await refresh();
    } else {
      setCartItems(
        cartItems
          .map((i) => (i.id === productId ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0)
      );
    }
  };

  const removeItem = async (productId) => {
    if (token) {
      const item = cartItems.find((i) => i.product_id === productId);
      if (!item) return;
      await API.delete(`/api/cart/items/${item.id}/`);
      await refresh();
    } else {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    }
    toast.info("Producto eliminado del carrito 🗑️");
  };

  const clearCart = async () => {
    if (token) {
      await API.post("/api/cart/clear/");
      await refresh();
    } else {
      invalidateCartState();
    }
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartMeta,
        addToCart,
        decreaseFromCart,
        removeItem,
        clearCart,
        invalidateCartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
