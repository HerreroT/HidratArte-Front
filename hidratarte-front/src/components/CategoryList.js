/* eslint-disable unicode-bom */
import { useState, useEffect, useMemo, useContext } from "react";
import { Spinner, Alert } from "react-bootstrap";
import API from "../axiosConfig";
import { CartContext } from "../CartContext";
import "../style/custom.css";
import { useCallback } from "react";

const mapApiProduct = (product) => ({
  id: product.id,
  nombre: product.name,
  descripcion: product.description || "",
  precio: Number(product.price ?? 0),
  imagen: product.image || "/images/default.png",
  categoria: product.category ?? null,
  raw: product,
});

function CategoryList({ category, title }) {
  const { addToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const fetchPaymentMethods = useCallback(() => {
    let mounted = true;
    API.get('/main/model/payment-methods/')
      .then(res => mounted && setPaymentMethods(res.data))
      .catch(() => {})
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Podés filtrar por query param en backend o filtrar en front
        const { data } = await API.get(`/main/model/products/?category=${category}`);
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : data?.results ?? [];
        setProductos(list.map(mapApiProduct));
      } catch (err) {
        if (!isMounted) return;
        console.error("No se pudieron cargar los productos", err);
        setError("No se pudieron cargar los productos. Intenta nuevamente.");
        setProductos([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    fetchPaymentMethods();
    return () => (isMounted = false);
  }, [category, fetchPaymentMethods]);

  const lista = useMemo(() => productos, [productos]);

  return (
    <div className="container py-5" style={{ minHeight: "calc(100vh - 400px)" }}>
      {/* Encabezado de la categoría */}
      <div className="text-center mb-5 slide-in-top">
        <h2 className="fw-bold mb-3" style={{ color: "#0a3d3f", fontSize: "2.5rem" }}>
          {title}
        </h2>
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(90deg, #00b3a1, #0a3d3f)",
            margin: "0 auto",
            borderRadius: "2px",
          }}
        ></div>
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5">
          <Spinner animation="border" role="status" style={{ width: "3rem", height: "3rem", color: "#00b3a1" }}>
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p className="mt-3" style={{ color: "#6c757d" }}>
            Cargando productos...
          </p>
        </div>
      )}

      {/* Estado de error */}
      {!loading && error && (
        <Alert variant="danger" className="text-center shadow-soft fade-in">
          <strong>⚠️ Error:</strong> {error}
        </Alert>
      )}

      {/* Sin productos */}
      {!loading && !error && lista.length === 0 && (
        <div className="text-center py-5 fade-in">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
          <h4 style={{ color: "#0a3d3f" }}>No hay productos disponibles</h4>
          <p style={{ color: "#6c757d" }}>
            Vuelve pronto para ver nuevos productos en esta categoría
          </p>
        </div>
      )}

      {/* Grid de productos */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {lista.map((producto) => (
          <div className="col" key={producto.id}>
            <div className="card h-100 fade-in">
              {/* Imagen del producto */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="card-img-top"
                  style={{ transition: "transform 0.3s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              {/* Cuerpo de la card */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text flex-grow-1" style={{ fontSize: "0.9rem" }}>
                  {producto.descripcion || "Producto de alta calidad"}
                </p>
                
                {/* Precio y botón */}
                <div className="mt-auto">
                  <p className="card-text fw-bold mb-3" style={{ fontSize: "1.4rem" }}>
                    ${producto.precio.toFixed(2)}
                  </p>
                  {/* Métodos de pago disponibles (globales) */}
                  <div className="mb-2 d-flex gap-2 flex-wrap">
                    {paymentMethods.slice(0,3).map(pm => (
                      <span key={pm.id} className="badge bg-light text-dark border" style={{ fontSize: '0.75rem' }}>{pm.name}</span>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(producto)}
                    disabled={!producto.id}
                  >
                    🛒 Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
