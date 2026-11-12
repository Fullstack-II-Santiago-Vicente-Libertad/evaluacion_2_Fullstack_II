import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import TarjetaProducto from '../componentes/TarjetaProducto';

function Inicio({ productos, carrito, onAgregar }) {
  return <>
    <section className="bienvenida mb-4">
      <h1>Bienvenidos a Booksy</h1>
      <p>Una tienda de libros dedicada a promover la literatura chilena y acercar sus historias a nuevos lectores.</p>
      <Button as={Link} to="/productos">Explorar el catálogo</Button>
    </section>
    <h2 className="h3 mb-3">Nuestros recomendados</h2>
    <Row className="g-4">
      {productos.slice(0, 4).map((producto) => <Col key={producto.id} xs={12} sm={6} lg={3}>
        <TarjetaProducto producto={producto} cantidadEnCarrito={carrito.find((item) => item.productoId === producto.id)?.cantidad || 0} onAgregar={onAgregar} />
      </Col>)}
    </Row>
  </>;
}

export default Inicio;
