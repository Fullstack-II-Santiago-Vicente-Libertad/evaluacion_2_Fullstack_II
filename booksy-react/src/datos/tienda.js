import listaProductos from './productos';
import { detalleCarrito } from './carrito';
import { validarContacto, validarEnvio } from './validaciones';

function leer(clave, inicial) {
  try {
    const texto = localStorage.getItem(clave);
    return texto ? JSON.parse(texto) : inicial;
  } catch {
    return inicial;
  }
}

function guardar(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

// Las claves de esta versión separan sus datos de los de la tienda anterior.
export function obtenerProductos() {
  // Completar categorías de compras anteriores sin perder el stock guardado.
  return leer('booksy_simple_productos', listaProductos).map((producto) => ({
    ...producto,
    categoria: producto.categoria || listaProductos.find((libro) => libro.id === producto.id)?.categoria || 'Sin categoría',
  }));
}
export function obtenerPedidos() { return leer('booksy_simple_pedidos', []); }
export function obtenerMensajes() { return leer('booksy_simple_mensajes', []); }
export function obtenerCarrito() { return leer('booksy_simple_carrito', []); }
export function guardarCarrito(carrito) { guardar('booksy_simple_carrito', carrito); }

export function obtenerDatosCompra() {
  try { return JSON.parse(sessionStorage.getItem('booksy_simple_checkout')) || null; }
  catch { return null; }
}

export function guardarDatosCompra(datos) {
  if (datos) sessionStorage.setItem('booksy_simple_checkout', JSON.stringify(datos));
  else sessionStorage.removeItem('booksy_simple_checkout');
}

export function guardarMensaje(datos) {
  const error = validarContacto(datos);
  if (error) throw new Error(error);
  const mensajes = obtenerMensajes();
  const mensaje = {
    id: Math.max(0, ...mensajes.map((item) => item.id)) + 1,
    nombre: datos.nombre.trim(), telefono: datos.telefono.trim(),
    correo: datos.correo.trim().toLowerCase(), motivo: datos.motivo.trim(), fecha: new Date().toISOString(),
  };
  guardar('booksy_simple_mensajes', [...mensajes, mensaje]);
  return mensaje;
}

export function crearPedido(carrito, datos) {
  const error = validarEnvio(datos);
  if (error) throw new Error(error);
  const productos = obtenerProductos();
  const detalle = detalleCarrito(carrito, productos);
  if (!carrito.length || detalle.length !== carrito.length) throw new Error('Revisa los productos de tu carrito.');
  if (detalle.some((item) => !Number.isInteger(item.cantidad) || item.cantidad < 1 || item.cantidad > item.producto.stock)) {
    throw new Error('El stock cambió. Revisa las cantidades de tu carrito.');
  }
  const items = detalle.map((item) => ({
    productoId: item.producto.id, nombre: item.producto.nombre, cantidad: item.cantidad, precio: item.producto.precio,
  }));
  const subtotal = detalle.reduce((total, item) => total + item.subtotal, 0);
  const envio = datos.entrega === 'retiro' ? 0 : 3000;
  const pedidos = obtenerPedidos();
  const pedido = {
    id: Math.max(0, ...pedidos.map((item) => item.id)) + 1,
    fecha: new Date().toISOString(),
    cliente: { ...datos, nombre: datos.nombre.trim(), correo: datos.correo.trim().toLowerCase() },
    items, subtotal, envio, total: subtotal + envio, estado: 'Pagado',
  };
  const nuevosProductos = productos.map((producto) => {
    const item = carrito.find((elemento) => elemento.productoId === producto.id);
    return item ? { ...producto, stock: producto.stock - item.cantidad } : producto;
  });
  guardar('booksy_simple_productos', nuevosProductos);
  guardar('booksy_simple_pedidos', [...pedidos, pedido]);
  return pedido;
}
