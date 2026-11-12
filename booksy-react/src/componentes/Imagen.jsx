import { useState } from 'react';

function Imagen({ src, alt, id, ancho = 200, className = '' }) {
  const [noDisponible, setNoDisponible] = useState(false);

  if (noDisponible) {
    return (
      <span id={id} className={'imagen-pendiente ' + className} role="img" aria-label={alt}>
        {alt}
        <small>Imagen no adjunta</small>
      </span>
    );
  }

  return (
    <img
      id={id}
      src={src}
      alt={alt}
      width={ancho}
      className={className}
      onError={() => setNoDisponible(true)}
    />
  );
}

export default Imagen;
