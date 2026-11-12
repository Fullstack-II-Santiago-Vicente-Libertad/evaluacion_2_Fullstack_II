import { Table } from 'react-bootstrap';
import { pesos } from '../datos/carrito';

function ResumenPedido({ items, envio = 0 }) {
  const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  return <>
    <Table responsive size="sm">
      <thead><tr><th>Libro</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th></tr></thead>
      <tbody>{items.map((item) => <tr key={item.productoId}>
        <td>{item.nombre}</td><td>{item.cantidad}</td><td>{pesos(item.precio)}</td><td>{pesos(item.precio * item.cantidad)}</td>
      </tr>)}</tbody>
    </Table>
    <p className="mb-1">Productos: {pesos(subtotal)}</p>
    <p className="mb-1">Entrega: {pesos(envio)}</p>
    <p className="h5">Total: {pesos(subtotal + envio)}</p>
  </>;
}

export default ResumenPedido;
