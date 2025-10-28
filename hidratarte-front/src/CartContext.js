// src/CartContext.js
import { createContext, useState, useEffect, useCallback, useContext } from "react";
import API from "./axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const mapCartItem = (item) => {
  const product = item?.product ?? {};
  return {
    id: item.id,
    productId: product.id ?? item.product_id ?? null,
    name: item.name ?? product.name ?? "Producto",
    price: Number(item.price ?? product.price ?? 0),
    qty: Number(item.qty ?? 1),
    image: item.image ?? product.image ?? "/images/default.png",
    product,
    raw: item,
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
      const { data } = await API.get("/api/cart/");
      const items = data?.items ?? [];
      setCartItems(items.map(mapCartItem));
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

    try {
      // El backend agrupa automáticamente con get_or_create
      await API.post("/api/cart/items/", {
        product_id: productId,
        name: product.name ?? product.nombre ?? "Producto",
        price: Number(product.price ?? product.precio ?? 0),
        qty: 1,
        image: product.image ?? product.imagen ?? "",
      });
      await loadCart();
      toast.success(`Agregado: ${product.name ?? product.nombre ?? "Producto"}`);
    } catch (err) {
      console.error("No se pudo agregar al carrito", err);
      toast.error("No se pudo agregar al carrito");
    }
  };

  const decreaseFromCart = async (itemId) => {
    if (!requireSession()) return;
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;
    const nextQty = item.qty - 1;
    try {
      if (nextQty <= 0) {
        await API.delete(`/api/cart/items/${itemId}/`);
      } else {
        await API.patch(`/api/cart/items/${itemId}/`, {
          qty: nextQty,
        });
      }
      await loadCart();
    } catch (err) {
      console.error("No se pudo actualizar el carrito", err);
      toast.error("No se pudo actualizar el carrito");
    }
  };

  const removeItem = async (itemId) => {
    if (!requireSession()) return;
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;
    try {
      await API.delete(`/api/cart/items/${itemId}/`);
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
      await API.post("/api/cart/clear/");
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
