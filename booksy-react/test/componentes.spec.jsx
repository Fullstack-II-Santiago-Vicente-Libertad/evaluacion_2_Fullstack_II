import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TarjetaProducto from '../src/componentes/TarjetaProducto';
import Productos from '../src/paginas/Productos';
import { obtenerProductos } from '../src/datos/tienda';

function conRouter(componente) {
  return render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{componente}</MemoryRouter>);
}

describe('Componentes del catálogo', () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
  afterEach(cleanup);

  it('muestra la búsqueda dentro de la barra y filtra por título o autor', () => {
    conRouter(<Productos productos={obtenerProductos()} onAgregar={() => {}} />);
    const buscar = screen.getByPlaceholderText('Buscar por título o autor');
    expect(buscar).toBe(screen.getByRole('searchbox', { name: 'Buscar por título o autor' }));
    expect(screen.getAllByRole('button', { name: 'Añadir al carrito' }).length).toBe(10);
    fireEvent.change(buscar, { target: { value: 'Bolaño' } });
    expect(screen.getAllByRole('button', { name: 'Añadir al carrito' }).length).toBe(1);
    expect(screen.getByText('Roberto Bolaño')).not.toBeNull();
    fireEvent.change(buscar, { target: { value: '  CASA DE CAMPO  ' } });
    expect(screen.getAllByRole('button', { name: 'Añadir al carrito' }).length).toBe(1);
    expect(screen.getByRole('heading', { name: 'Casa de campo' })).not.toBeNull();
    fireEvent.change(buscar, { target: { value: '' } });
    expect(screen.getAllByRole('button', { name: 'Añadir al carrito' }).length).toBe(10);
  });
  it('combina categoría y búsqueda y permite volver a todas las categorías', () => {
    const productos = obtenerProductos();
    conRouter(<Productos productos={productos} onAgregar={() => {}} />);
    const categoria = screen.getByLabelText('Categoría');
    const buscar = screen.getByLabelText('Buscar por título o autor');
    expect(categoria.options.length).toBe(new Set(productos.map((producto) => producto.categoria)).size + 1);
    fireEvent.change(categoria, { target: { value: 'Novela histórica' } });
    expect(screen.getAllByRole('button', { name: 'Añadir al carrito' }).length).toBe(2);
    expect(screen.queryByRole('heading', { name: 'Casa de campo' })).toBeNull();
    fireEvent.change(buscar, { target: { value: 'Allende' } });
    expect(screen.getAllByRole('button', { name: 'Añadir al carrito' }).length).toBe(1);
    expect(screen.getByRole('heading', { name: 'Inés el alma mía' })).not.toBeNull();
    fireEvent.change(buscar, { target: { value: 'Bolaño' } });
    expect(screen.getByRole('alert').textContent).toContain('No hay libros que coincidan');
    expect(screen.queryByRole('button', { name: 'Añadir al carrito' })).toBeNull();
    fireEvent.change(categoria, { target: { value: '' } });
    expect(screen.getByRole('heading', { name: 'Los detectives salvajes' })).not.toBeNull();
    fireEvent.change(buscar, { target: { value: '' } });
    expect(screen.getAllByRole('button', { name: 'Añadir al carrito' }).length).toBe(10);
  });
  it('el botón de la tarjeta llama al callback y confirma junto al libro', () => {
    const agregar = jasmine.createSpy('agregar');
    const producto = obtenerProductos()[0];
    conRouter(<TarjetaProducto producto={producto} onAgregar={agregar} />);
    fireEvent.click(screen.getByRole('button', { name: 'Añadir al carrito' }));
    expect(agregar).toHaveBeenCalledOnceWith(producto);
    expect(screen.getByRole('status').textContent).toContain('añadido al carrito');
    expect(screen.getByRole('status').closest('.tarjeta-producto')).not.toBeNull();
  });
});
