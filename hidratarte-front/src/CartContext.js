// src/CartContext.js
import { createContext, useState, useEffect, useCallback, useContext } from "react";
import API from "./axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const REMOTE_ENDPOINT = "/main/model/user-product-records/";

const mapRemoteRecord = (record) => {
  const product = record?.product ?? {};
  return {
    id: record.id,
    productId: product.id ?? record.product_id ?? null,
    name: product.name ?? record.name ?? "Producto",
    price: Number(product.price ?? record.price ?? 0),
    qty: Number(record.quantity ?? 0),
    image: product.image ?? record.image ?? "/images/default.png",
    product,
    raw: record,
  };
};

export function CartProvider({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCart = useCallback(async () => {
    if (!isLoggedIn) {
      setCartItems([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get(REMOTE_ENDPOINT);
      const records = Array.isArray(data) ? data : data?.results ?? [];
      setCartItems(records.map(mapRemoteRecord));
    } catch (err) {
      console.error("No se pudo obtener el carrito", err);
      setError("No se pudo obtener el carrito. Intenta nuevamente.");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const requireSession = () => {
    if (!isLoggedIn) {
      toast.info("Inicia sesión para usar el carrito");
      return false;
    }
    return true;
  };

  const addToCart = async (product) => {
    if (!requireSession()) return;
    const productId = product?.id ?? product?.product_id ?? product?.productId;
    if (!productId) {
      toast.error("No se pudo identificar el producto");
      return;
    }

    const existing = cartItems.find((item) => item.productId === productId);
    try {
      if (existing) {
        await API.patch(`${REMOTE_ENDPOINT}${existing.id}/`, {
          quantity: existing.qty + 1,
        });
      } else {
        await API.post(REMOTE_ENDPOINT, {
          product_id: productId,
          quantity: 1,
        });
      }
      await loadCart();
      toast.success(`Agregado: ${product.name ?? product.nombre ?? "Producto"}`);
    } catch (err) {
      console.error("No se pudo agregar al carrito", err);
      toast.error("No se pudo agregar al carrito");
    }
  };

  const decreaseFromCart = async (recordId) => {
    if (!requireSession()) return;
    const record = cartItems.find((item) => item.id === recordId);
    if (!record) return;
    const nextQty = record.qty - 1;
    try {
      if (nextQty <= 0) {
        await API.delete(`${REMOTE_ENDPOINT}${record.id}/`);
      } else {
        await API.patch(`${REMOTE_ENDPOINT}${record.id}/`, {
          quantity: nextQty,
        });
      }
      await loadCart();
    } catch (err) {
      console.error("No se pudo actualizar el carrito", err);
      toast.error("No se pudo actualizar el carrito");
    }
  };

  const removeItem = async (recordId) => {
    if (!requireSession()) return;
    const record = cartItems.find((item) => item.id === recordId);
    if (!record) return;
    try {
      await API.delete(`${REMOTE_ENDPOINT}${record.id}/`);
      await loadCart();
      toast.info("Producto eliminado del carrito 🗑️");
    } catch (err) {
      console.error("No se pudo eliminar el producto", err);
      toast.error("No se pudo eliminar el producto");
    }
  };

  const clearCart = async () => {
    if (!requireSession()) return;
    try {
      const ids = cartItems.map((item) => item.id);
      await Promise.all(ids.map((id) => API.delete(`${REMOTE_ENDPOINT}${id}/`)));
      await loadCart();
    } catch (err) {
      console.error("No se pudo vaciar el carrito", err);
      toast.error("No se pudo vaciar el carrito");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        decreaseFromCart,
        removeItem,
        clearCart,
        reload: loadCart,
        isLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
