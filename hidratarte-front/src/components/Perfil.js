import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Card, Button, Container } from "react-bootstrap";

function Perfil() {
  const { userName, userEmail } = useContext(AuthContext); // ajustá según cómo guardás el usuario

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#0a3d3f" }}>
        Mi Perfil
      </h2>
      <Card className="mx-auto" style={{ maxWidth: "500px" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Información del usuario</Card.Title>
          <p><strong>Nombre:</strong> {userName}</p>
          <p><strong>Email:</strong> {userEmail}</p>
          {/* Agregá más campos si tenés, como dirección */}
          <div className="text-center">
            <Button variant="primary">Editar datos</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Perfil;
