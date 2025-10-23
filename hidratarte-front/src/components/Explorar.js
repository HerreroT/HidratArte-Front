import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import { todosLosProductos } from "../data/productos";

function Explorar() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#0a3d3f" }}>
        Explorá todas nuestras bebidas
      </h2>
      <p className="text-muted text-center mb-5">
        Catálogo completo disponible en HidratArte.
      </p>

      <div className="row">
        {todosLosProductos.map((p) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={p.imagen} style={{ height: 160, objectFit: "cover" }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: 16 }}>{p.nombre}</Card.Title>
                <Card.Text style={{ flexGrow: 1 }}>{p.descripcion}</Card.Text>
                <Card.Text className="fw-bold mb-3">${p.precio}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(p)}>
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

export default Explorar;
