import React from "react";
import { Card, Button } from "react-bootstrap";

function Gaseosa() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#0a3d3f" }}>
        Gaseosas
      </h2>
      <p className="text-muted text-center mb-5">
        Bebidas con gas de diferentes sabores y marcas.
      </p>

      <div className="row">
        {/* Producto 1 */}
        <div className="col-md-4 mb-4">
          <Card>
            <Card.Img variant="top" src="/images/gaseosa1.png" />
            <Card.Body>
              <Card.Title>Cola Clásica</Card.Title>
              <Card.Text>Lata 354ml</Card.Text>
              <Button variant="danger">Agregar al carrito</Button>
            </Card.Body>
          </Card>
        </div>

        {/* Producto 2 */}
        <div className="col-md-4 mb-4">
          <Card>
            <Card.Img variant="top" src="/images/gaseosa2.png" />
            <Card.Body>
              <Card.Title>Lima Limón</Card.Title>
              <Card.Text>Botella 500ml - Sabor cítrico</Card.Text>
              <Button variant="danger">Agregar al carrito</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Gaseosa;
