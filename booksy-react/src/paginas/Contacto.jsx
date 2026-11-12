import { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { validarContacto } from '../datos/validaciones';
import { guardarMensaje } from '../datos/tienda';

function Contacto({ onGuardar = guardarMensaje }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);

  function enviarFormulario(event) {
    event.preventDefault();
    const datos = { nombre, telefono, correo, motivo };
    const error = validarContacto(datos);
    setExito(false);
    if (error) { setMensaje(error); return; }
    try {
      onGuardar(datos);
      setMensaje('Tu mensaje fue guardado correctamente. Gracias por contactarnos.');
      setExito(true);
      setNombre(''); setTelefono(''); setCorreo(''); setMotivo('');
    } catch (errorGuardado) { setMensaje(errorGuardado.message); }
  }

  return <div className="formulario-mediano">
    <h1>Formulario de contacto</h1>
    <p>¿Tienes alguna sugerencia, reclamo o recomendación? Contáctanos.</p>
    <Form onSubmit={enviarFormulario} noValidate>
      <Row className="g-3">
        <Col md={6}><Form.Group controlId="nombre"><Form.Label>Nombre completo</Form.Label>
          <Form.Control value={nombre} onChange={(event) => setNombre(event.target.value)} maxLength={100} autoComplete="name" required />
        </Form.Group></Col>
        <Col md={6}><Form.Group controlId="telefono"><Form.Label>Teléfono</Form.Label>
          <Form.Control type="tel" value={telefono} onChange={(event) => setTelefono(event.target.value)} placeholder="+56 9 1234 5678" autoComplete="tel" required />
        </Form.Group></Col>
        <Col xs={12}><Form.Group controlId="correo"><Form.Label>Correo</Form.Label>
          <Form.Control type="email" value={correo} onChange={(event) => setCorreo(event.target.value)} maxLength={100} autoComplete="email" required aria-describedby="ayuda-correo" />
          <Form.Text id="ayuda-correo">Se aceptan duocuc.cl, profesor.duoc.cl y gmail.com.</Form.Text>
        </Form.Group></Col>
        <Col xs={12}><Form.Group controlId="motivo"><Form.Label>Motivo de contacto</Form.Label>
          <Form.Control as="textarea" rows={4} value={motivo} onChange={(event) => setMotivo(event.target.value)} maxLength={500} required />
          <Form.Text>Máximo 500 caracteres.</Form.Text>
        </Form.Group></Col>
      </Row>
      {mensaje && <Alert className="mt-3" variant={exito ? 'success' : 'danger'} role={exito ? 'status' : 'alert'}>{mensaje}</Alert>}
      <Button type="submit" className="mt-3">Enviar</Button>
    </Form>
  </div>;
}

export default Contacto;
