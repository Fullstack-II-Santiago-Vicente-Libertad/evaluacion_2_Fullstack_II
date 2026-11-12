import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import Imagen from './Imagen';

function Navegacion({ cantidad }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <Navbar expand="md" expanded={abierta} onToggle={setAbierta} className="navegacion" aria-label="Navegación principal">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setAbierta(false)}>
          <Imagen id="logo" src="/assets/logo_booksy.png" alt="Booksy inicio" ancho={80} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-booksy" label="Abrir o cerrar menú" />
        <Navbar.Collapse id="menu-booksy">
          <Nav className="me-auto" onSelect={() => setAbierta(false)}>
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Catálogo</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav onSelect={() => setAbierta(false)}>
            <Nav.Link as={NavLink} to="/carrito">Carrito <Badge bg="dark">{cantidad}</Badge></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;
