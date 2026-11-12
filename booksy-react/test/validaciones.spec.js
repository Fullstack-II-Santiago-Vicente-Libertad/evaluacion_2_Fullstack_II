import { correoValido, telefonoValido, validarContacto, validarEnvio } from '../src/datos/validaciones';

const datos = { nombre: 'Ana Pérez', telefono: '+56 9 1234 5678', correo: 'ana@gmail.com', motivo: 'Consulta por un libro' };

describe('Validaciones de formularios', () => {
  it('valida el contacto y rechaza campos vacíos o dominios falsos', () => {
    expect(validarContacto(datos)).toBe('');
    expect(validarContacto({ ...datos, correo: ' ANA@DUOCUC.CL ' })).toBe('');
    expect(validarContacto({ ...datos, nombre: '   ' })).toContain('nombre');
    expect(validarContacto({ ...datos, motivo: '   ' })).toContain('motivo');
    expect(validarContacto({ ...datos, correo: 'ana@gmail.com.ejemplo.net' })).toContain('correo');
  });
  it('acepta correos y celulares válidos y rechaza formatos incompletos', () => {
    expect(correoValido('ana@gmail.com')).toBeTrue();
    expect(correoValido('@gmail.com')).toBeFalse();
    expect(telefonoValido('+56 9 1234 5678')).toBeTrue();
    expect(telefonoValido('912345678')).toBeTrue();
    expect(telefonoValido('abc')).toBeFalse();
    expect(telefonoValido('123')).toBeFalse();
  });
  it('exige dirección y comuna para despacho y permite retiro sin dirección', () => {
    const cliente = { ...datos, direccion: '', comuna: '', entrega: 'despacho' };
    expect(validarEnvio(cliente)).toContain('dirección');
    expect(validarEnvio({ ...cliente, direccion: 'Calle Uno' })).toContain('comuna');
    expect(validarEnvio({ ...cliente, direccion: 'Calle Uno', comuna: 'Santiago' })).toBe('');
    expect(validarEnvio({ ...cliente, entrega: 'retiro' })).toBe('');
  });
});
