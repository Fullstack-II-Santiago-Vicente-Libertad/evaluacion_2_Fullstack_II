import { useState } from 'react';
import { Button } from 'react-bootstrap';

function AgregarAlCarrito({ producto, cantidadEnCarrito = 0, onAgregar }) {
  const [aviso, setAviso] = useState(null);
  // Es un cálculo con las props: React lo actualiza al cambiar el carrito.
  const disponibles = Math.max(0, producto.stock - cantidadEnCarrito);

  function agregar() {
    try {
      onAgregar(producto);
      setAviso({ error: false, texto: 'Producto añadido al carrito.' });
    } catch (error) {
      setAviso({ error: true, texto: 'No se pudo añadir: ' + error.message });
    }
  }

  return <div>
    <p className="small mb-2" aria-live="polite">Disponibles para añadir: {disponibles}</p>
    <div className="aviso-carrito" aria-live="polite" aria-atomic="true">
      {aviso && <p className={'small mb-2 ' + (aviso.error ? 'text-danger' : 'text-success')}
        role={aviso.error ? 'alert' : 'status'}>{aviso.texto}</p>}
      {disponibles === 0 && <p className="small text-danger mb-2">
        No quedan unidades disponibles para añadir.
        {cantidadEnCarrito > 0 && ' Ya tienes todas las unidades disponibles en tu carrito.'}
      </p>}
    </div>
    <Button onClick={agregar} disabled={disponibles === 0}>Añadir al carrito</Button>
  </div>;
}

export default AgregarAlCarrito;
