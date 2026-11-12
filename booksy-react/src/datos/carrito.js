export function pesos(valor) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(valor);
}

export function agregarProducto(carrito, producto) {
  const existente = carrito.find((item) => item.productoId === producto.id);
  const cantidad = existente ? existente.cantidad + 1 : 1;
  if (cantidad > producto.stock) throw new Error('No hay más unidades disponibles de este libro.');
  if (existente) {
    return carrito.map((item) => item.productoId === producto.id ? { ...item, cantidad } : item);
  }
  return [...carrito, { productoId: producto.id, cantidad: 1 }];
}

export function cambiarCantidad(carrito, producto, cantidad) {
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > producto.stock) {
    throw new Error('La cantidad debe ser mayor que cero y no superar el stock.');
  }
  return carrito.map((item) => item.productoId === producto.id ? { ...item, cantidad } : item);
}

export function detalleCarrito(carrito, productos) {
  return carrito.map((item) => {
    const producto = productos.find((libro) => libro.id === item.productoId);
    return producto ? { ...item, producto, subtotal: producto.precio * item.cantidad } : null;
  }).filter(Boolean);
}

export function totalCarrito(carrito, productos) {
  return detalleCarrito(carrito, productos).reduce((total, item) => total + item.subtotal, 0);
}
