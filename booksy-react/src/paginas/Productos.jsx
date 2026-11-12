import { useState } from 'react';
import { Alert, Col, Form, Row } from 'react-bootstrap';
import TarjetaProducto from '../componentes/TarjetaProducto';

function Productos({ productos, carrito = [], onAgregar }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const categorias = [...new Set(productos.map((producto) => producto.categoria).filter(Boolean))];
  const texto = busqueda.trim().toLowerCase();
  // Ambos filtros se aplican juntos: categoría y título o autor.
  const lista = productos.filter((producto) =>
    (!categoria || producto.categoria === categoria) &&
    (producto.nombre.toLowerCase().includes(texto) || producto.autor.toLowerCase().includes(texto)),
  );

  return <>
    <h1>Nuestro catálogo</h1>
    <p>Libros de autores chilenos. Los precios se muestran en pesos chilenos.</p>
    <Row className="g-3 mb-4 align-items-end">
      <Col md={8}><Form.Group controlId="buscar">
        <Form.Label className="visually-hidden">Buscar por título o autor</Form.Label>
        <Form.Control placeholder="Buscar por título o autor" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} type="search" />
      </Form.Group></Col>
      <Col md={4}><Form.Group controlId="categoria">
        <Form.Label>Categoría</Form.Label>
        <Form.Select value={categoria} onChange={(event) => setCategoria(event.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map((nombre) => <option key={nombre} value={nombre}>{nombre}</option>)}
        </Form.Select>
      </Form.Group></Col>
    </Row>
    {!lista.length && <Alert variant="info">No hay libros que coincidan con tu búsqueda.</Alert>}
    <Row className="g-4">
      {lista.map((producto) => <Col key={producto.id} xs={12} sm={6} lg={4} xl={3}>
        <TarjetaProducto producto={producto}
          cantidadEnCarrito={carrito.find((item) => item.productoId === producto.id)?.cantidad || 0}
          onAgregar={onAgregar} />
      </Col>)}
    </Row>
  </>;
}

export default Productos;
