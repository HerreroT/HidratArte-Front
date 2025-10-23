import { useState, useEffect, useMemo, useContext } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import API from "../axiosConfig";
import { CartContext } from "../CartContext";

const mapApiProduct = (product) => ({
  id: product.id,
  nombre: product.name,
  descripcion: product.description || "",
  precio: Number(product.price ?? 0),
  imagen: "/images/default.png",
  categoria: product.category ?? null,
  raw: product,
});

function Agua() {
  const { addToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await API.get("/main/model/products/?category=agua");
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
    return () => {
      isMounted = false;
    };
  }, []);

  const mostrarProductos = useMemo(() => productos, [productos]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#0a3d3f" }}>
        Bebidas de Agua
      </h2>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      )}

      {!loading && error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && mostrarProductos.length === 0 && (
        <p className="text-center text-muted">No hay productos disponibles.</p>
      )}

      <div className="row">
        {mostrarProductos.map((producto) => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <Card>
              <Card.Img variant="top" src={producto.imagen} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text className="fw-bold">
                  ${producto.precio.toFixed(2)}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => addToCart(producto)}
                  disabled={!producto.id}
                >
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agua;
