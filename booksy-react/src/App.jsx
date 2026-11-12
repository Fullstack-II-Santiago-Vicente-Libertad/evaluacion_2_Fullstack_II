import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navegacion from './componentes/Navegacion';
import PiePagina from './componentes/PiePagina';
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos';
import Contacto from './paginas/Contacto';
import Carrito from './paginas/Carrito';
import DetalleProducto from './paginas/DetalleProducto';
import Nosotros from './paginas/Nosotros';
import Checkout from './paginas/Checkout';
import Boleta from './paginas/Boleta';
import PagoError from './paginas/PagoError';
import { agregarProducto, cambiarCantidad } from './datos/carrito';
import { obtenerProductos, obtenerCarrito, guardarCarrito, crearPedido } from './datos/tienda';

function App() {
  // El padre comparte los datos con los hijos mediante props.
  const [productos, setProductos] = useState(obtenerProductos);
  const [carrito, setCarrito] = useState(obtenerCarrito);

  // Cuando cambia el estado, conservamos una copia en el navegador.
  useEffect(() => { guardarCarrito(carrito); }, [carrito]);

  function agregar(producto) {
    // El botón muestra el resultado junto al libro, incluso si hay un error.
    setCarrito(agregarProducto(carrito, producto));
  }
  function cambiar(producto, cantidad) {
    setCarrito(cambiarCantidad(carrito, producto, cantidad));
  }
  function comprar(datos) {
    const pedido = crearPedido(carrito, datos);
    setProductos(obtenerProductos());
    setCarrito([]);
    return pedido;
  }
  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);

  return <div className="aplicacion">
    <Navegacion cantidad={cantidad} />
    <Container as="main" className="py-4 mb-4">
      <Routes>
        <Route path="/" element={<Inicio productos={productos} carrito={carrito} onAgregar={agregar} />} />
        <Route path="/productos" element={<Productos productos={productos} carrito={carrito} onAgregar={agregar} />} />
        <Route path="/productos/:id" element={<DetalleProducto productos={productos} carrito={carrito} onAgregar={agregar} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} productos={productos} onCambiar={cambiar} onEliminar={(id) => setCarrito(carrito.filter((item) => item.productoId !== id))} onVaciar={() => setCarrito([])} />} />
        <Route path="/checkout" element={<Checkout carrito={carrito} productos={productos} onComprar={comprar} />} />
        <Route path="/compra-exitosa/:id" element={<Boleta />} />
        <Route path="/pago-error" element={<PagoError carrito={carrito} productos={productos} />} />
        <Route path="*" element={<><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></>} />
      </Routes>
    </Container>
    <PiePagina completo />
  </div>;
}

export default App;
