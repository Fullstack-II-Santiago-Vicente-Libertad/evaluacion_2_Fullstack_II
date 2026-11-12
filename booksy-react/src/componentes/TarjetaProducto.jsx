import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Imagen from './Imagen';
import AgregarAlCarrito from './AgregarAlCarrito';
import { pesos } from '../datos/carrito';

function TarjetaProducto({ producto, cantidadEnCarrito = 0, onAgregar }) {
  return (
    <Card className="h-100 tarjeta-producto">
      <div className="p-3">
        <Imagen key={producto.imagen} src={producto.imagen} alt={producto.nombre} className="portada" />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h2" className="h5"><Link to={'/productos/' + producto.id}>{producto.nombre}</Link></Card.Title>
        <Card.Text>{producto.autor}</Card.Text>
        <p className="precio">{pesos(producto.precio)}</p>
        <div className="mt-auto"><AgregarAlCarrito producto={producto} cantidadEnCarrito={cantidadEnCarrito} onAgregar={onAgregar} /></div>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;
