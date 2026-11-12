import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Table } from 'react-bootstrap';
import { detalleCarrito, pesos, totalCarrito } from '../datos/carrito';

function Carrito({ carrito, productos, onCambiar, onEliminar, onVaciar }) {
  const [error, setError] = useState('');
  const detalle = detalleCarrito(carrito, productos);
  function cambiar(producto, cantidad) {
    try { onCambiar(producto, cantidad); setError(''); }
    catch (problema) { setError(problema.message); }
  }
  return <>
    <h1>Carrito de compras</h1>
    {error && <Alert variant="danger">{error}</Alert>}
    {!detalle.length ? <Alert variant="info">Tu carrito está vacío. <Link to="/productos">Ver catálogo</Link></Alert> : <>
      <Table responsive className="align-middle">
        <thead><tr><th>Libro</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th></tr></thead>
        <tbody>{detalle.map(({ producto, cantidad, subtotal }) => <tr key={producto.id}>
          <td><Link to={'/productos/' + producto.id}>{producto.nombre}</Link></td>
          <td className="text-nowrap">{pesos(producto.precio)}</td>
          <td><div className="d-flex align-items-center gap-2">
            <Button size="sm" variant="outline-secondary" disabled={cantidad <= 1} aria-label={'Disminuir cantidad de ' + producto.nombre} onClick={() => cambiar(producto, cantidad - 1)}>−</Button>
            <span>{cantidad}</span>
            <Button size="sm" variant="outline-secondary" disabled={cantidad >= producto.stock} aria-label={'Aumentar cantidad de ' + producto.nombre} onClick={() => cambiar(producto, cantidad + 1)}>+</Button>
          </div>{cantidad > producto.stock && <span className="text-danger small">Stock disponible: {producto.stock}</span>}</td>
          <td className="text-nowrap">{pesos(subtotal)}</td>
          <td><Button variant="outline-danger" size="sm" aria-label={'Eliminar ' + producto.nombre} onClick={() => onEliminar(producto.id)}>Eliminar</Button></td>
        </tr>)}</tbody>
      </Table>
      <p className="h4">Subtotal: {pesos(totalCarrito(carrito, productos))}</p>
      <p>El costo de entrega se calcula en el siguiente paso.</p>
      <div className="d-flex gap-2 flex-wrap">
        <Button as={Link} to="/checkout">Continuar compra</Button>
        <Button variant="outline-secondary" onClick={onVaciar}>Vaciar carrito</Button>
      </div>
    </>}
  </>;
}

export default Carrito;
