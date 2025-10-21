import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import API from "../axiosConfig";
import { CartContext } from "../CartContext";
import "../style/custom.css";

const mapApiProduct = (product) => ({
  id: product.id,
  nombre: product.name,
  descripcion: product.description || "",
  precio: Number(product.price ?? 0),
  imagen: product.image || "/images/default.png",
  categoria: product.category ?? null,
  raw: product,
});

function Explorar() {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAllProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Read search param from URL
        const params = new URLSearchParams(location.search);
        const q = params.get("search") || null;
        const url = q ? `/main/model/products/?search=${encodeURIComponent(q)}` : "/main/model/products/";
        const { data } = await API.get(url);
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : data?.results ?? [];
        let mapped = list.map(mapApiProduct);

        // Client-side fallback filtering in case backend doesn't support search param
        if (q) {
          const lower = q.toLowerCase();
          mapped = mapped.filter((p) =>
            (p.nombre || "").toLowerCase().includes(lower) ||
            (p.descripcion || "").toLowerCase().includes(lower) ||
            (String(p.categoria || "") || "").toLowerCase().includes(lower)
          );
        }

        setProductos(mapped);
      } catch (err) {
        if (!isMounted) return;
        console.error("No se pudieron cargar los productos", err);
        setError("No se pudieron cargar los productos. Intenta nuevamente.");
        setProductos([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAllProducts();
    return () => (isMounted = false);
  }, [location.search]);

  return (
    <div className="container py-5" style={{ minHeight: "calc(100vh - 400px)" }}>
      <div className="text-center mb-5 slide-in-top">
        <h2 className="fw-bold mb-3" style={{ color: "#0a3d3f", fontSize: "2.5rem" }}>
          Explorá todas nuestras bebidas
        </h2>
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(90deg, #4db8a8, #0a3d3f)",
            margin: "0 auto 1rem",
            borderRadius: "2px",
          }}
        ></div>
        <p style={{ color: "#6c757d" }}>
          Catálogo completo de bebidas disponibles en HidratArte
        </p>
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="d-flex flex-column justify-content-center align-items-center my-5 py-5">
          <Spinner animation="border" role="status" style={{ width: "3rem", height: "3rem", color: "#4db8a8" }}>
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
      {!loading && !error && productos.length === 0 && (
        <div className="text-center py-5 fade-in">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
          <h4 style={{ color: "#0a3d3f" }}>No hay productos disponibles</h4>
          <p style={{ color: "#6c757d" }}>
            Vuelve pronto para ver nuevos productos
          </p>
        </div>
      )}

      {/* Grid de productos */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {productos.map((producto) => (
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
                
                {/* Categoría badge */}
                <span 
                  className="badge mb-2 align-self-start"
                  style={{ 
                    backgroundColor: "#4db8a8",
                    textTransform: "capitalize"
                  }}
                >
                  {producto.categoria}
                </span>
                
                {/* Precio y botón */}
                <div className="mt-auto">
                  <p className="card-text fw-bold mb-3" style={{ fontSize: "1.4rem" }}>
                    ${producto.precio.toFixed(2)}
                  </p>
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

export default Explorar;
