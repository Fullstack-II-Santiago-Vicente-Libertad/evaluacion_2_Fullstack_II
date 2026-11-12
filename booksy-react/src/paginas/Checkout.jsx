import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import CamposCliente from '../componentes/CamposCliente';
import ResumenPedido from '../componentes/ResumenPedido';
import { detalleCarrito } from '../datos/carrito';
import { guardarDatosCompra, obtenerDatosCompra } from '../datos/tienda';
import { validarEnvio } from '../datos/validaciones';

function Checkout({ carrito, productos, onComprar }) {
  const borrador = obtenerDatosCompra();
  const cliente = borrador || {};
  const [datos, setDatos] = useState({
    nombre: cliente.nombre || '', telefono: cliente.telefono || '', correo: cliente.correo || '',
    direccion: cliente.direccion || '', comuna: cliente.comuna || '', entrega: borrador?.entrega || 'despacho',
  });
  const [resultado, setResultado] = useState('aprobado');
  const [error, setError] = useState('');
  const navegar = useNavigate();
  const detalle = detalleCarrito(carrito, productos);
  const items = detalle.map((item) => ({ productoId: item.producto.id, nombre: item.producto.nombre, cantidad: item.cantidad, precio: item.producto.precio }));

  function enviar(event) {
    event.preventDefault();
    const problema = validarEnvio(datos);
    if (problema) { setError(problema); return; }
    guardarDatosCompra(datos);
    if (resultado === 'rechazado') { navegar('/pago-error'); return; }
    try {
      const pedido = onComprar(datos);
      guardarDatosCompra(null);
      navegar('/compra-exitosa/' + pedido.id);
    } catch (problemaCompra) { setError(problemaCompra.message); }
  }
  if (!detalle.length) return <Alert variant="info">Tu carrito está vacío. <Link to="/productos">Ver catálogo</Link></Alert>;
  return <>
    <h1>Finalizar compra</h1>
    <p>Completa tus datos y tu correo para esta compra.</p>
    <Row className="g-4">
      <Col lg={7}><Form onSubmit={enviar} noValidate>
        <h2 className="h4">Datos del cliente y entrega</h2>
        <CamposCliente datos={datos} onCambiar={(event) => setDatos({ ...datos, [event.target.name]: event.target.value })} />
        <Form.Group controlId="entrega" className="mt-3"><Form.Label>Opción de entrega</Form.Label>
          <Form.Select value={datos.entrega} onChange={(event) => setDatos({ ...datos, entrega: event.target.value })}>
            <option value="despacho">Despacho a domicilio · $3.000</option><option value="retiro">Retiro en tienda · Sin costo</option>
          </Form.Select>
          {datos.entrega === 'despacho' && <Form.Text>
            Los envíos demoran de 3 a 7 días hábiles. Para despacho debes completar dirección y comuna.
          </Form.Text>}
        </Form.Group>
        <Form.Group controlId="resultado" className="mt-3"><Form.Label>Pago de demostración</Form.Label>
          <Form.Select value={resultado} onChange={(event) => setResultado(event.target.value)}>
            <option value="aprobado">Simular pago aprobado</option><option value="rechazado">Simular pago rechazado</option>
          </Form.Select>
          <Form.Text>Esta actividad no realiza cobros ni solicita datos de tarjetas.</Form.Text>
        </Form.Group>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        <Button type="submit" className="mt-3">Confirmar compra</Button>
      </Form></Col>
      <Col lg={5}><Card><Card.Body><h2 className="h4">Resumen de compra</h2>
        <ResumenPedido items={items} envio={datos.entrega === 'retiro' ? 0 : 3000} />
      </Card.Body></Card></Col>
    </Row>
  </>;
}

export default Checkout;
