import { Col, Form, Row } from 'react-bootstrap';

function CamposCliente({ datos, onCambiar }) {
  return (
    <Row className="g-3">
      <Col md={6}><Form.Group controlId="nombre">
        <Form.Label>Nombre completo</Form.Label>
        <Form.Control name="nombre" value={datos.nombre} onChange={onCambiar} maxLength={100} autoComplete="name" required />
      </Form.Group></Col>
      <Col md={6}><Form.Group controlId="telefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control name="telefono" type="tel" value={datos.telefono} onChange={onCambiar} placeholder="+56 9 1234 5678" autoComplete="tel" required />
      </Form.Group></Col>
      <Col xs={12}><Form.Group controlId="correo">
        <Form.Label>Correo</Form.Label>
        <Form.Control name="correo" type="email" value={datos.correo} onChange={onCambiar} maxLength={100} autoComplete="email" required />
      </Form.Group></Col>
      <Col md={8}><Form.Group controlId="direccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control name="direccion" value={datos.direccion} onChange={onCambiar} maxLength={150} autoComplete="street-address" />
      </Form.Group></Col>
      <Col md={4}><Form.Group controlId="comuna">
        <Form.Label>Comuna</Form.Label>
        <Form.Control name="comuna" value={datos.comuna} onChange={onCambiar} maxLength={80} autoComplete="address-level2" />
      </Form.Group></Col>
    </Row>
  );
}

export default CamposCliente;
