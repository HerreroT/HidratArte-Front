import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Card, Button, Container, Form, Alert, Row, Col } from "react-bootstrap";
import API from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const { logout } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load initial values from API (or from AuthContext/localStorage)
    const stored = localStorage.getItem("registeredUser");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setForm({ username: u.username || "", email: u.email || "", address: u.address || "" });
      } catch (e) {
        // fallback: fetch from API
        API.get("/useradmin/profile/")
          .then((res) => setForm({ username: res.data.username, email: res.data.email, address: res.data.address }))
          .catch(() => {});
      }
    } else {
      API.get("/useradmin/profile/")
        .then((res) => setForm({ username: res.data.username, email: res.data.email, address: res.data.address }))
        .catch(() => {});
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(null);

    // If password fields are present in the form, include them
    const payload = { username: form.username, email: form.email, address: form.address };
    if (changingPassword) {
      // client-side validation: new and confirm must match
      if (!form.new_password || !form.confirm_password) {
        setErrors({ password: "Completá todos los campos de contraseña." });
        setLoading(false);
        return;
      }
      if (form.new_password !== form.confirm_password) {
        setErrors({ password: "Las contraseñas no coinciden." });
        setLoading(false);
        return;
      }
      if (!form.current_password) {
        setErrors({ password: "Ingresá la contraseña actual para confirmar el cambio." });
        setLoading(false);
        return;
      }

      payload.current_password = form.current_password;
      payload.new_password = form.new_password;
    }

    try {
      const { data } = await API.patch("/useradmin/profile/", payload);

      // Update local stored user and AuthContext
      const storedUser = JSON.parse(localStorage.getItem("registeredUser") || "null") || {};
      const updated = { ...storedUser, username: data.username, email: data.email, address: data.address };
      localStorage.setItem("registeredUser", JSON.stringify(updated));

      setSuccess("Perfil actualizado correctamente.");

      // If password changed, force logout to refresh token / session
      if (payload.new_password) {
        setTimeout(() => {
          logout();
        }, 1200);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ non_field_errors: "Error al actualizar perfil." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#0a3d3f" }}>
        Mi Perfil
      </h2>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Editar información</Card.Title>

              {success && <Alert variant="success">{success}</Alert>}
              {errors.non_field_errors && <Alert variant="danger">{errors.non_field_errors}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control name="username" value={form.username} onChange={handleChange} />
                  {errors.username && <div className="text-danger mt-1">{errors.username}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={form.email} onChange={handleChange} />
                  {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control as="textarea" rows={3} name="address" value={form.address} onChange={handleChange} />
                  {errors.address && <div className="text-danger mt-1">{errors.address}</div>}
                </Form.Group>

                <hr />
                <div className="mb-3">
                  <Card.Subtitle className="mb-2">Cambiar contraseña</Card.Subtitle>
                  <div className="d-flex gap-2">
                    <Button variant={changingPassword ? "outline-danger" : "outline-primary"} size="sm" onClick={() => setChangingPassword((s) => !s)}>
                      {changingPassword ? "Cancelar" : "Cambiar contraseña"}
                    </Button>
                    <small className="text-muted align-self-center">(recomendado sólo si querés actualizarla)</small>
                  </div>
                </div>

                {changingPassword && (
                  <>
                    <Form.Group className="mb-3" controlId="current_password">
                      <Form.Label>Contraseña actual</Form.Label>
                      <div className="d-flex">
                        <Form.Control type={showPassword ? "text" : "password"} name="current_password" value={form.current_password || ""} onChange={handleChange} />
                        <Button variant="light" onClick={() => setShowPassword((s) => !s)} style={{ marginLeft: 8 }}>
                          {showPassword ? "Ocultar" : "Mostrar"}
                        </Button>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="new_password">
                      <Form.Label>Nueva contraseña</Form.Label>
                      <div className="d-flex">
                        <Form.Control type={showPassword ? "text" : "password"} name="new_password" value={form.new_password || ""} onChange={handleChange} />
                        <Button variant="light" onClick={() => setShowPassword((s) => !s)} style={{ marginLeft: 8 }}>
                          {showPassword ? "Ocultar" : "Mostrar"}
                        </Button>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirm_password">
                      <Form.Label>Confirmar nueva contraseña</Form.Label>
                      <div className="d-flex">
                        <Form.Control type={showPassword ? "text" : "password"} name="confirm_password" value={form.confirm_password || ""} onChange={handleChange} />
                        <Button variant="light" onClick={() => setShowPassword((s) => !s)} style={{ marginLeft: 8 }}>
                          {showPassword ? "Ocultar" : "Mostrar"}
                        </Button>
                      </div>
                      {errors.password && <div className="text-danger mt-1">{errors.password}</div>}
                    </Form.Group>
                  </>
                )}

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => window.location.reload()} disabled={loading}>
                    Cancelar
                  </Button>
                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={() => navigate('/orders')}>Mis pedidos</Button>
                    <Button type="submit" disabled={loading} variant="primary">
                    {loading ? "Guardando..." : "Guardar cambios"}
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;
