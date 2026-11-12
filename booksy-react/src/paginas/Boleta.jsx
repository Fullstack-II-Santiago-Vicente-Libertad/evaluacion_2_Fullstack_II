import { Link, useParams } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import ResumenPedido from '../componentes/ResumenPedido';
import { obtenerPedidos } from '../datos/tienda';

function Boleta() {
  const { id } = useParams();
  const pedido = obtenerPedidos().find((item) => item.id === Number(id));
  if (!pedido) return <Alert variant="warning">No encontramos este pedido. <Link to="/productos">Volver al catálogo</Link></Alert>;
  return <>
    <Alert variant="success">Tu compra fue realizada correctamente.</Alert>
    <h1>Compra exitosa</h1>
    <p>Resumen de demostración Booksy · Pedido #{pedido.id} · {pedido.estado}</p>
    <p>Fecha: {new Date(pedido.fecha).toLocaleString('es-CL')}</p>
    <p>Cliente: {pedido.cliente.nombre} · {pedido.cliente.correo}</p>
    <p>Teléfono: {pedido.cliente.telefono}</p>
    <p>Entrega: {pedido.cliente.entrega === 'retiro' ? 'Retiro en tienda' : pedido.cliente.direccion + ', ' + pedido.cliente.comuna}</p>
    <ResumenPedido items={pedido.items} envio={pedido.envio} />
    <Button as={Link} to="/productos" className="mt-3">Seguir comprando</Button>
  </>;
}

export default Boleta;
