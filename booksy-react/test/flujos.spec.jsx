import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { guardarCarrito, obtenerCarrito, obtenerPedidos, obtenerProductos } from '../src/datos/tienda';

function abrir(ruta) {
  return render(<MemoryRouter initialEntries={[ruta]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></MemoryRouter>);
}
function escribir(etiqueta, valor) { fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } }); }
function tarjeta(nombre) { return within(screen.getByRole('heading', { name: nombre }).closest('.card')); }

describe('Flujos integrados de la tienda', () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
  afterEach(cleanup);

  it('añade, modifica y elimina productos del carrito sin recargar', () => {
    abrir('/productos');
    fireEvent.click(screen.getAllByRole('button', { name: 'Añadir al carrito' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Añadir al carrito' })[0]);
    fireEvent.click(screen.getByRole('link', { name: /Carrito/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad de Los detectives salvajes' }));
    expect(obtenerCarrito()[0].cantidad).toBe(3);
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar Los detectives salvajes' }));
    expect(screen.getByText(/Tu carrito está vacío/)).not.toBeNull();
    expect(obtenerCarrito().length).toBe(0);
  });
  it('compra sin cuenta: conserva datos ante un rechazo y completa el reintento', () => {
    guardarCarrito([{ productoId: 1, cantidad: 1 }]);
    abrir('/checkout');
    expect(screen.getByText(/Los envíos demoran de 3 a 7 días hábiles/)).not.toBeNull();
    escribir('Opción de entrega', 'retiro');
    expect(screen.queryByText(/Los envíos demoran/)).toBeNull();
    escribir('Opción de entrega', 'despacho');
    expect(screen.getByText(/Los envíos demoran de 3 a 7 días hábiles/)).not.toBeNull();
    escribir('Nombre completo', 'Ana Pérez'); escribir('Teléfono', '912345678');
    escribir('Correo', 'ana@gmail.com'); escribir('Dirección', 'Calle Uno 123'); escribir('Comuna', 'Santiago');
    escribir('Pago de demostración', 'rechazado');
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar compra' }));
    expect(screen.getByRole('heading', { name: 'No se pudo realizar el pago' })).not.toBeNull();
    expect(obtenerPedidos().length).toBe(0);
    expect(obtenerCarrito().length).toBe(1);
    expect(obtenerProductos()[0].stock).toBe(8);
    fireEvent.click(screen.getByRole('button', { name: 'Volver a intentar' }));
    expect(screen.getByLabelText('Dirección').value).toBe('Calle Uno 123');
    expect(screen.getByLabelText('Correo').value).toBe('ana@gmail.com');
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar compra' }));
    expect(screen.getByRole('heading', { name: 'Compra exitosa' })).not.toBeNull();
    expect(obtenerPedidos()[0].cliente.correo).toBe('ana@gmail.com');
    expect(obtenerCarrito().length).toBe(0);
    expect(obtenerProductos()[0].stock).toBe(7);
    fireEvent.click(screen.getByRole('button', { name: 'Seguir comprando' }));
    expect(tarjeta('Los detectives salvajes').getByText('Disponibles para añadir: 7')).not.toBeNull();
  });
  it('actualiza las unidades junto al botón y las recupera al reducir o vaciar el carrito', () => {
    abrir('/productos');
    const libro = 'El buzón de las impuras';
    fireEvent.click(tarjeta(libro).getByRole('button', { name: 'Añadir al carrito' }));
    expect(tarjeta(libro).getByRole('status').textContent).toContain('añadido al carrito');
    expect(tarjeta(libro).getByText('Disponibles para añadir: 1')).not.toBeNull();
    fireEvent.click(tarjeta(libro).getByRole('button', { name: 'Añadir al carrito' }));
    expect(tarjeta(libro).getByText('Disponibles para añadir: 0')).not.toBeNull();
    expect(tarjeta(libro).getByRole('button', { name: 'Añadir al carrito' }).disabled).toBeTrue();
    expect(tarjeta(libro).getByText(/No quedan unidades disponibles/)).not.toBeNull();
    expect(obtenerProductos()[5].stock).toBe(2);
    fireEvent.click(screen.getByRole('link', { name: /Carrito/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Disminuir cantidad de ' + libro }));
    fireEvent.click(screen.getByRole('link', { name: 'Catálogo' }));
    expect(tarjeta(libro).getByText('Disponibles para añadir: 1')).not.toBeNull();
    expect(tarjeta(libro).getByRole('button', { name: 'Añadir al carrito' }).disabled).toBeFalse();
    fireEvent.click(screen.getByRole('link', { name: /Carrito/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Vaciar carrito' }));
    fireEvent.click(screen.getByRole('link', { name: 'Catálogo' }));
    expect(tarjeta(libro).getByText('Disponibles para añadir: 2')).not.toBeNull();
  });
});
