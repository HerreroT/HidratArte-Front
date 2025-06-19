import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../CartContext";

function Agua() {
  const { addToCart } = useContext(CartContext);

  const productos = [
    {
      id: 1,
      nombre: "Agua Mineral Bonaqua",
      descripcion: "Botella de 500ml - Sin gas",
      precio: 150,
      imagen: "/images/500.png"
    },
    {
      id: 2,
      nombre: "Agua Saborizada",
      descripcion: "Botella 1L - Sabor limón",
      precio: 180,
      imagen: "/images/agua2.png"
    }
  ];

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#0a3d3f" }}>
        Bebidas de Agua
      </h2>
      <p className="text-muted text-center mb-5">
        Aquí verás una selección de aguas minerales, saborizadas y más.
      </p>

      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <Card>
              <Card.Img variant="top" src={producto.imagen} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text className="fw-bold">${producto.precio}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => addToCart(producto)}
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
