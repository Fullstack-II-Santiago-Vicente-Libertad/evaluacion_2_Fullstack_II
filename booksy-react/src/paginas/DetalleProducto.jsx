import { Link, useParams } from 'react-router-dom';
import { Alert, Col, Row } from 'react-bootstrap';
import Imagen from '../componentes/Imagen';
import AgregarAlCarrito from '../componentes/AgregarAlCarrito';
import { pesos } from '../datos/carrito';

function DetalleProducto({ productos, carrito, onAgregar }) {
  const { id } = useParams();
  const producto = productos.find((item) => item.id === Number(id));
  if (!producto) return <Alert variant="warning">No encontramos este libro. <Link to="/productos">Volver al catálogo</Link></Alert>;
  return <>
    <Link to="/productos">Volver al catálogo</Link>
    <Row className="g-4 mt-2">
      <Col md={4}><Imagen src={producto.imagen} alt={producto.nombre} className="portada portada-detalle" /></Col>
      <Col md={8}>
        <h1>{producto.nombre}</h1><p className="lead">{producto.autor}</p>
        <p className="precio">{pesos(producto.precio)}</p>
        <AgregarAlCarrito key={producto.id} producto={producto}
          cantidadEnCarrito={carrito.find((item) => item.productoId === producto.id)?.cantidad || 0}
          onAgregar={onAgregar} />
      </Col>
    </Row>
  </>;
}

export default DetalleProducto;
