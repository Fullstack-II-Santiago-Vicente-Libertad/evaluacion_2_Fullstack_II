import { agregarProducto, cambiarCantidad, totalCarrito } from '../src/datos/carrito';
import { obtenerProductos, crearPedido, obtenerPedidos } from '../src/datos/tienda';

const cliente = { nombre: 'Ana Pérez', correo: 'ana@gmail.com', telefono: '+56 9 1234 5678', direccion: 'Calle Uno 123', comuna: 'Santiago', entrega: 'despacho' };

describe('Datos del catálogo, carrito y pedidos', () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });

  it('carga los 10 libros del catálogo con sus datos iniciales', () => {
    const productos = obtenerProductos();
    expect(productos.length).toBe(10);
    expect(productos[0].nombre).toBe('Los detectives salvajes');
    expect(productos[0].precio).toBe(8000);
    expect(productos[0].stock).toBe(8);
  });
  it('actualiza cantidades y totales del carrito respetando el stock', () => {
    const producto = obtenerProductos()[0];
    const anterior = [{ productoId: 1, cantidad: 1 }];
    const nuevo = agregarProducto(anterior, producto);
    expect(nuevo).toEqual([{ productoId: 1, cantidad: 2 }]);
    expect(anterior[0].cantidad).toBe(1);
    expect(totalCarrito(nuevo, [producto])).toBe(16000);
    expect(cambiarCantidad(nuevo, producto, 3)[0].cantidad).toBe(3);
    expect(() => agregarProducto([{ productoId: 1, cantidad: producto.stock }], producto)).toThrowError();
    expect(() => cambiarCantidad(nuevo, producto, 0)).toThrowError();
    expect(() => cambiarCantidad(nuevo, producto, 1.5)).toThrowError();
    expect(() => cambiarCantidad(nuevo, producto, 99)).toThrowError();
  });
  it('registra pedidos con despacho o retiro y descuenta el stock vendido', () => {
    const pedido = crearPedido([{ productoId: 1, cantidad: 2 }], cliente);
    expect(pedido.envio).toBe(3000);
    expect(pedido.total).toBe(19000);
    expect(pedido.cliente.correo).toBe('ana@gmail.com');
    expect(obtenerProductos()[0].stock).toBe(6);
    const retiro = crearPedido([{ productoId: 1, cantidad: 1 }], { ...cliente, entrega: 'retiro', direccion: '', comuna: '' });
    expect(retiro.envio).toBe(0);
    expect(retiro.total).toBe(8000);
    expect(obtenerPedidos().length).toBe(2);
    expect(obtenerProductos()[0].stock).toBe(5);
  });
});
