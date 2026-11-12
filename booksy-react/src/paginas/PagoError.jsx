import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import ResumenPedido from '../componentes/ResumenPedido';
import { detalleCarrito } from '../datos/carrito';
import { obtenerDatosCompra } from '../datos/tienda';

function PagoError({ carrito, productos }) {
  const datos = obtenerDatosCompra();
  const items = detalleCarrito(carrito, productos).map((item) => ({
    productoId: item.producto.id, nombre: item.producto.nombre, cantidad: item.cantidad, precio: item.producto.precio,
  }));
  return <>
    <h1>No se pudo realizar el pago</h1>
    <Alert variant="danger">El pago de demostración fue rechazado. Tu carrito se conserva para volver a intentarlo.</Alert>
    {items.length > 0 && <ResumenPedido items={items} envio={datos?.entrega === 'retiro' ? 0 : 3000} />}
    <div className="d-flex gap-2 flex-wrap">
      <Button as={Link} to="/checkout">Volver a intentar</Button>
      <Button variant="outline-secondary" as={Link} to="/carrito">Revisar carrito</Button>
    </div>
  </>;
}

export default PagoError;
