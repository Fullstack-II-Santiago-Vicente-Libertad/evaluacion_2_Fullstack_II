export function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

export function telefonoValido(telefono) {
  const numero = telefono.replace(/[\s()-]/g, '');
  return /^(?:\+?56)?9\d{8}$/.test(numero);
}

export function validarCliente(datos) {
  if (!datos.nombre.trim()) return 'Debes ingresar tu nombre.';
  if (datos.nombre.trim().length > 100) return 'El nombre excede el máximo de 100 caracteres.';
  if (!correoValido(datos.correo) || datos.correo.trim().length > 100) return 'Ingresa un correo válido.';
  if (!telefonoValido(datos.telefono)) return 'Ingresa un celular chileno válido, por ejemplo +56 9 1234 5678.';
  return '';
}

export function validarContacto(datos) {
  const error = validarCliente(datos);
  if (error) return error;
  const dominio = datos.correo.trim().toLowerCase().split('@')[1];
  if (!['duocuc.cl', 'profesor.duoc.cl', 'gmail.com'].includes(dominio)) {
    return 'Usa un correo de duocuc.cl, profesor.duoc.cl o gmail.com.';
  }
  if (!datos.motivo.trim()) return 'Debes ingresar un motivo.';
  if (datos.motivo.trim().length > 500) return 'El motivo excede el máximo de 500 caracteres.';
  return '';
}

export function validarEnvio(datos) {
  const error = validarCliente(datos);
  if (error) return error;
  if (!['despacho', 'retiro'].includes(datos.entrega)) return 'Selecciona una opción de entrega.';
  if (datos.entrega === 'despacho' && (!datos.direccion.trim() || !datos.comuna.trim())) {
    return 'Debes ingresar la dirección y la comuna de entrega.';
  }
  return '';
}
