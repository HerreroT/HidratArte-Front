// import React from "react";
import { Card, Button } from "react-bootstrap";

function Agua() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#0a3d3f" }}>
        Bebidas de Agua
      </h2>
      <p className="text-muted text-center mb-5">
        Aquí verás una selección de aguas minerales, saborizadas y más.
      </p>

      <div className="row">
        {/* Producto 1 */}
        <div className="col-md-4 mb-4">
          <Card>
            <Card.Img variant="top" src="/images/500.png" />
            <Card.Body>
              <Card.Title>Agua Mineral</Card.Title>
              <Card.Text>Botella de 500ml - Sin gas</Card.Text>
              <Button variant="primary">Agregar al carrito</Button>
            </Card.Body>
          </Card>
        </div>

        {/* Producto 2 */}
        <div className="col-md-4 mb-4">
          <Card>
            <Card.Img variant="top" src="/images/agua2.png" />
            <Card.Body>
              <Card.Title>Agua Saborizada</Card.Title>
              <Card.Text>Botella 1L - Sabor limón</Card.Text>
              <Button variant="primary">Agregar al carrito</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Agua;
