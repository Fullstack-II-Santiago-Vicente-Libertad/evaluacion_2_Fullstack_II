import { Container } from 'react-bootstrap';

function PiePagina({ completo = false }) {
  return (
    <footer className="mt-auto py-4">
      <Container>
        {completo && <>
          <h2 className="h5">Contacto</h2>
          <p className="mb-1">Lunes a viernes 9:00 a 19:30 · Sábado 9:30 a 18:00</p>
          <p className="mb-1">booksy@gmail.com · +56 9 3444 2333</p>
          <p>Instagram y TikTok: @tiendabooksy</p>
        </>}
        <p className="mb-0">© 2026 BooksySpa · Libertad Gallardo, Vicente Menares y Santiago Villaroel · Evaluación 2</p>
      </Container>
    </footer>
  );
}

export default PiePagina;
