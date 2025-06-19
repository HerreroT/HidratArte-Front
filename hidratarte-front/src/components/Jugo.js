import React from "react";
import { Card, Button } from "react-bootstrap";

function Jugo() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#0a3d3f" }}>
        Jugos Naturales
      </h2>
      <p className="text-muted text-center mb-5">
        Explora jugos de frutas, exprimidos, licuados y más.
      </p>

      <div className="row">
        {/* Producto 1 */}
        <div className="col-md-4 mb-4">
          <Card>
            <Card.Img variant="top" src="/images/jugo1.png" />
            <Card.Body>
              <Card.Title>Jugo de Naranja</Card.Title>
              <Card.Text>100% exprimido - 500ml</Card.Text>
              <Button variant="success">Agregar al carrito</Button>
            </Card.Body>
          </Card>
        </div>

        {/* Producto 2 */}
        <div className="col-md-4 mb-4">
          <Card>
            <Card.Img variant="top" src="/images/jugo2.png" />
            <Card.Body>
              <Card.Title>Licuado de Frutilla</Card.Title>
              <Card.Text>Natural y refrescante - 400ml</Card.Text>
              <Button variant="success">Agregar al carrito</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Jugo;
