# Booksy · Evaluación 2

Proyecto de Desarrollo Fullstack II de Libertad Gallardo, Vicente Menares y Santiago Villaroel.

Tienda de libros de autores chilenos hecha con React, React Bootstrap y React Router. Permite consultar el catálogo, buscar por título o autor, filtrar por categoría, añadir libros al carrito y completar una compra sin cuenta. El correo se solicita al finalizar la compra.

## Instalar y ejecutar

Requisitos: Node.js 24, npm y Google Chrome para la demostración de pruebas.

```bash
npm ci
npm start
```

Abrir la dirección que muestra Vite, normalmente http://localhost:5173.

```bash
npm run lint
npm run build
npm test
```

ESLint revisa el código, Vite genera la versión de producción en `dist` y Karma ejecuta Jasmine en ChromeHeadless.

Para mostrar la ventana de Chrome durante la presentación:

```bash
npm run test:watch
```

Si Chrome está instalado en una ubicación especial, indicar su ejecutable con `CHROME_BIN`. Como alternativa para ejecutar la lógica y el DOM sin Chrome, se conserva `npm run test:dom`. jsdom no comprueba el diseño visual.

## Pantallas y alcance

La navegación principal contiene Inicio, Catálogo, Nosotros, Contacto y Carrito. Desde el catálogo se abre el detalle de cada libro. Desde el carrito se continúa al checkout, donde se ingresan nombre, teléfono, correo y opción de entrega. La compra muestra un resumen; un rechazo simulado permite reintentar.

El proyecto no incluye cuentas, registro, perfil, administración, blog, ofertas ni descuentos. Cada libro tiene un precio único. El correo del checkout se conserva en el pedido; esta simulación no envía correos ni realiza cobros.

## Estructura

| Ubicación | Responsabilidad |
| --- | --- |
| `src/App.jsx` | Compartir productos y carrito con `useState`, pasar props y declarar rutas. |
| `src/main.jsx` | Importar Bootstrap y montar React con BrowserRouter. |
| `src/componentes` | Navegación, tarjetas, botón con confirmación, imagen, campos y resumen. |
| `src/paginas` | Vistas de la tienda y de la compra. |
| `src/datos/productos.js` | Catálogo inicial de diez libros, con categoría, precio y stock. |
| `src/datos/carrito.js` | Cantidades, control de stock y totales. |
| `src/datos/tienda.js` | Guardar carrito, stock, pedidos, mensajes y borrador de compra. |
| `src/datos/validaciones.js` | Validaciones de contacto y checkout. |
| `test` | Casos de Jasmine para lógica, componentes y flujos integrados. |
| `karma.conf.cjs` | Ejecutar Jasmine, transformar JSX y generar cobertura. |
| `docs` | ERS, informe de pruebas, checklist y guía de presentación. |

## Cómo se explica la búsqueda

En `Productos.jsx`, `useState` conserva lo que se escribe. `onChange` actualiza ese estado. Se eliminan espacios exteriores con `trim` y se pasa el texto a minúsculas con `toLowerCase`. `filter` recorre el arreglo y conserva los libros cuyo título o autor contiene la búsqueda, usando `includes`. El selector conserva la categoría en otro estado y combina ambos filtros. Finalmente, `map` muestra las tarjetas. Al borrar la búsqueda se muestran los libros de la categoría seleccionada; «Todas las categorías» elimina ese filtro.

Se apoya en estado, eventos y operaciones básicas de arreglos y cadenas, sin añadir librerías de búsqueda.

## Confirmación y stock junto al libro

`AgregarAlCarrito.jsx` se reutiliza en Inicio, Catálogo y Detalle. Al pulsar el botón muestra la confirmación justo encima de ese botón. Si la operación falla, muestra el error en el mismo lugar.

La cantidad para añadir se obtiene con una resta: `producto.stock - cantidadEnCarrito`. Las props cambian cuando App actualiza el carrito y React vuelve a renderizar. Si se añaden todas las unidades disponibles, aparece el aviso y se deshabilita el botón. Al reducir cantidades, eliminar o vaciar el carrito, las unidades vuelven a estar disponibles.

Añadir al carrito no descuenta el inventario guardado. Una compra aprobada descuenta el stock, actualiza los productos y vacía el carrito. Una rechazada conserva los datos para reintentar. La actualización ocurre en esta aplicación y navegador; no sincroniza inventarios entre usuarios o equipos.

## Reglas conservadas

- Los precios están expresados en pesos chilenos, sin descuentos.
- El despacho cuesta $3.000 y demora de 3 a 7 días hábiles, según se indica en el checkout. El retiro es gratuito y no exige dirección.
- El checkout exige nombre, celular chileno y correo con formato válido; el despacho también exige dirección y comuna.
- El contacto conserva los dominios exactos `duocuc.cl`, `profesor.duoc.cl` y `gmail.com` del proyecto entregado.
- `localStorage` conserva stock, carrito, pedidos y mensajes. `sessionStorage` conserva el borrador del checkout.
- Las claves empiezan por `booksy_simple_` para no mezclar esta versión con los datos de la anterior. Usar datos ficticios durante la demostración.

## Pruebas y rúbrica

La suite contiene **12 casos en cuatro secciones: 9 pruebas de lógica y componentes y 3 de integración**. Cada caso corresponde a un `it`, aunque contenga varias expectativas.

| Archivo | Casos |
| --- | ---: |
| `test/validaciones.spec.js` | 3 |
| `test/datos.spec.js` | 3 |
| `test/componentes.spec.jsx` | 3 |
| `test/flujos.spec.jsx` | 3 |

El spy de Jasmine simula el callback de añadir al carrito y comprueba sus argumentos sin depender de un servidor. `coverage/index.html` permite revisar líneas y ramas por archivo; `coverage/coverage-summary.json` contiene las cifras. `docs/resultados_pruebas.txt` registra la ejecución de esta versión.

La pauta solicita arquitectura, props y estado, Bootstrap y responsividad, al menos diez pruebas exitosas, mocks y análisis de cobertura. Estas capacidades se conservan en el alcance reducido. Durante la presentación también hay que explicar el código, ejecutar las pruebas con el navegador visible y demostrar la adaptación a distintos anchos. La pauta adjunta suma 80% y no indica un mínimo de cobertura.

## Entrega

El ZIP incluye código, dependencias declaradas y lockfile, imágenes, pruebas, cobertura y documentación actualizada. Se excluyen `node_modules` y `dist`. No se necesitan cuentas de demostración.
