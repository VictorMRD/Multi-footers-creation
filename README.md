# Inventory Studio

Dashboard web inspirado en WordPress, desarrollado con HTML, CSS y JavaScript. Se publica en GitHub Pages y se utiliza directamente desde el navegador, sin instalaciones para los visitantes.

## Publicación en GitHub Pages

1. En este repositorio, abre **Settings → Pages**.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. Abre **Actions → Deploy Inventory Studio to GitHub Pages → Run workflow**, selecciona `main` y ejecuta el workflow. Si el despliegue anterior falló antes de activar Pages, también puedes utilizar **Re-run all jobs**.
4. Espera a que el workflow termine correctamente. La URL publicada aparece en el entorno `github-pages` del despliegue y en **Settings → Pages**.

La dirección esperada con el dominio estándar de GitHub es:

**https://victormrd.github.io/Multi-footers-creation/**

Esta dirección solo estará disponible después de habilitar Pages y completar el primer despliegue. Los siguientes cambios enviados a `main` se publican automáticamente. El workflow publica los archivos HTML, CSS y JavaScript del sitio, `.nojekyll` y la carpeta `assets` con las ilustraciones locales.

## Uso

- **Dealer settings → Inventory listing** abre el espacio de trabajo. El menú se despliega al pasar el cursor y permite interacción con teclado o clic.
- **Inventory Listing:** versiones 1–6. **Inventory Details:** versiones 1, 3 y 6.
- Cada versión conserva JavaScript y CSS separados, aplicados al HTML fijo del inventario. Cambiar de versión carga y ejecuta su código automáticamente.
- Las pestañas **JavaScript** y **CSS** permiten editar comportamiento y estilos. No existe editor de HTML. El marcado del inventario lo gestiona la aplicación y no se carga desde archivos importados.
- **Run preview** ejecuta los cambios en una vista previa nueva y aislada con `sandbox="allow-scripts"`, para evitar que los estilos o scripts de un editor afecten al dashboard o al otro editor.
- Las ediciones se guardan automáticamente en `localStorage` del navegador y origen actual. No se escriben en GitHub ni se sincronizan entre dispositivos o visitantes. El guardado depende de que el navegador permita almacenamiento local.
- **Export configuration** descarga todas las versiones como JSON. **Import** restaura ese archivo y solicita confirmación antes de reemplazar los datos existentes.

La navegación restante es decorativa. No requiere WordPress ni base de datos. El listing incluye vehículos de demostración con ilustraciones, búsqueda y orden por precio; Details muestra una ficha fija de demostración. El botón de disponibilidad solo confirma la interacción visualmente: no envía solicitudes. Las versiones 4, 5 y 6 de Listing tienen plantillas basadas en las referencias proporcionadas; las versiones 1–3 y Details conservan la demostración genérica. Las solicitudes externas que haga el código están sujetas a las políticas del navegador y de la red.

## Desarrollo opcional

Para trabajar en el sitio antes de publicar, desde la carpeta del repositorio:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

El servidor de desarrollo no es necesario para visitar el sitio publicado en GitHub Pages.

## Estilos y selectores del inventario

La interfaz utiliza una paleta inspirada en WP Engine y controles con bordes planos propios del administrador de WordPress. Las versiones comparten un inventario fijo, pero conservan sus propios CSS y JS. Selectores disponibles: `.inventory-page`, `.vehicle-grid`, `.vehicle-card`, `.vehicle-price`, `.vehicle-action` y, para Details, `.detail-price` y `.detail-facts`. Cada cambio de versión crea una vista previa nueva.

Las configuraciones JSON anteriores pueden importarse para conservar CSS y JS; se descarta cualquier campo HTML. Los datos guardados previamente en el navegador conservan sus CSS y JS.

## Referencias de Inventory Listing

- **Version 4:** [Craig Powersports](https://www.craigpowersports.com/inventory/). Cuadrícula de tres columnas, destacado, desglose de cargos, total, pago mensual, especificaciones y acciones.
- **Version 5:** [Karl Malone Powersports](https://www.buymalonepowersports.com/New-Inventory/). Filas con información y precio a la izquierda, imagen central y acciones a la derecha.
- **Version 6:** [B&E Marine](https://www.bemarine.com/inventory/). Filas con desglose de precios, All-In Price, ahorro, promoción, imagen y acciones.

Las plantillas se adaptaron de las capturas suministradas. No son conexiones a esos sitios ni copias de sus inventarios en vivo. Los datos son muestras, los nombres de distribuidores identifican las referencias visuales y las imágenes son ilustraciones SVG locales de demostración, no fotografías de productos. No se incluyen chats, cookies ni widgets externos de esos distribuidores.

Selecciona la versión en **Inventory Listing** y pulsa **Expand preview** para revisar el diseño con mayor ancho. **Close preview** devuelve al editor; Escape también cierra la vista ampliada cuando el foco está en el dashboard. La adaptación móvil apila las tarjetas y los controles.

La búsqueda, los filtros disponibles, el orden de precios y el cambio de vista lista/cuadrícula funcionan con los datos de muestra. Algunos filtros muestran que no hay valores adicionales en la demostración. Compare Models mantiene un contador de selección; no ofrece una tabla de comparación. Los botones de consulta, financiación, reserva, detalles, teléfono e impresión abren diálogos de demostración y no realizan operaciones externas.

`inventory-layouts.js` contiene los datos y el marcado fijo de cada versión. `inventory-layouts.css` define sus estilos base. El CSS del editor se carga después y el JS se ejecuta cuando el inventario está listo, en un iframe nuevo por ejecución. Selectores adicionales: `.reference-card`, `.price-breakdown`, `.reference-actions`, `.primary-action`, `.reference-description`, `.reference-media`, `.savings`. La variable CSS `--inventory-accent` permite cambiar el acento de cada versión.

Las ediciones existentes se conservan. Solo los ejemplos CSS y JS de las versiones 4–6 que coincidan exactamente con los valores originales se actualizan a los nuevos ejemplos.

## Distribución e interacción

Inventory Listing aparece encima de Inventory Details. En escritorio, cada sección coloca el editor a la izquierda y su vista previa a la derecha. En ventanas de hasta 900 px de ancho, los controles se apilan para conservar legibilidad. Expand preview sigue permitiendo revisar el inventario con mayor ancho.

El dashboard y los inventarios utilizan iconos SVG de **Font Awesome Free 6.7.2**, incluidos localmente en `icons.js`, con licencia en `assets/fontawesome-LICENSE.txt`. No se requiere conexión a un CDN. La flecha de Dealer settings y las de los filtros cambian de orientación al abrirse; botones, filtros y selecciones tienen estados hover, focus y active. Las animaciones respetan `prefers-reduced-motion`.
