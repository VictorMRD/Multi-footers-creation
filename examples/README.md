# Exposición: personalizaciones por vista y versión

[Editor y laboratorio Widgets](https://victormrd.github.io/Multi-footers-creation/#widgets) · [Listing](https://victormrd.github.io/Multi-footers-creation/inventory-listing.html) · [Details](https://victormrd.github.io/Multi-footers-creation/inventory-details.html)

La propuesta es **guardar y activar cada personalización junto con la vista y versión para la que se escribió**. La separación reduce el acoplamiento accidental y facilita cambiar y volver de versión. No hace automáticamente compatible un script con un HTML distinto, ni convierte cualquier código global en incorrecto.

Los inventarios de este repositorio son demostraciones locales a la página. Los ejemplos no realizan pagos, llamadas, envíos, analítica externa ni modificaciones en los sitios usados como referencia.

## Preparación y secuencia de la exposición

1. Exporta tu configuración si quieres una copia adicional. Abre **Widgets** en el sidebar. El widget global viene desactivado para no alterar el trabajo existente.
2. En el ejemplo 1, pulsa **Probar global**. El diálogo indica los contenedores que se reemplazarán. Se guarda una copia anterior al primer ejemplo en el navegador; no se sobrescribe al pasar de un caso a otro.
3. Se abre Listing V4. **Expand preview** permite revisar el inventario con mayor ancho. El widget añade un presupuesto semanal ilustrativo.
4. Cambia a V6. Aparece el error **Global widget**: el contenedor de precios de V4 no existe en V6. El código posterior dentro del mismo script no termina.
5. Vuelve a Widgets y pulsa **Aplicar solución por versión**. Se desactiva el widget global y se guardan adaptaciones en Listing 4/5/6. Vuelve a cambiar entre esas versiones: cada una añade el presupuesto donde corresponde.
6. Repite los ejemplos 2 y 3 para mostrar un fallo visual y una regresión sin excepción de JavaScript. El ejemplo 3 también configura Details 1/3/6.
7. Abre **Open page** para revisar las páginas independientes. Cuando guardes en el editor o cargues otro caso, pulsa **Reload changes** en esa pestaña. Si no fijas `?version=`, seguirá la versión seleccionada al recargar.
8. Prueba **contador compartido** y **global con adaptadores** para mostrar alternativas globales bien diseñadas.
9. Pulsa **Restaurar antes de los ejemplos** para recuperar la configuración inicial. Esto reemplaza las ediciones realizadas después de crear esa copia. La copia y las configuraciones solo existen en ese navegador; si se borran los datos del sitio se pierden, por lo que Export sigue siendo útil.

Cargar un ejemplo reemplaza los CSS y JS de los destinos indicados, además del widget global. La solución se instala en todas las versiones cubiertas por ese ejemplo para preparar la demostración; en un producto, las adaptaciones pueden prepararse y revisarse por separado antes de ofrecer el cambio de versión. Las versiones 1–3 de Listing conservan la demostración genérica y no son el objetivo de estos casos.

## Caso 1: el código funciona en V4 y falla al pasar a V5/V6

Archivos: [global](01-selectores/global-widget.html), [V4 JS](01-selectores/listing-v4.js), [V5 JS](01-selectores/listing-v5.js), [V6 JS](01-selectores/listing-v6.js) y los CSS del mismo directorio.

Suposición global que se rompe:

```js
const target = card.querySelector('.grid-total');
target.append(badge); // null en V5/V6: TypeError
```

El HTML de cada plantilla tiene un punto de inserción distinto:

| Versión | Destino de la personalización |
| --- | --- |
| Listing 4 | `.grid-total` |
| Listing 5 | `.compact-pricing > div:first-child` |
| Listing 6 | `.all-in-price` |

En el contenedor de V6 basta con adaptar y proteger ese selector:

```js
const target = card.querySelector('.all-in-price');
if (!target) return;
target.append(badge);
```

La guarda evita la excepción si una futura actualización elimina el nodo; **por sí sola no garantiza que la función siga apareciendo**. También hay que comprobar visualmente que el presupuesto se insertó. El código compartido incluye nombres de clases propios del ejemplo y elimina una inserción previa para evitar duplicados.

El importe se calcula como precio / 52. Es una división ilustrativa, **no una oferta de crédito, ni una cuota con intereses o impuestos**.

## Caso 2: CSS de cuadrícula sobre una vista de lista

Archivos: [global](02-css/global-widget.html), [V4 CSS](02-css/listing-v4.css), [V5 CSS](02-css/listing-v5.css), [V6 CSS](02-css/listing-v6.css).

Una regla escrita para la cuadrícula parece válida en V4:

```css
.reference-vehicles {
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
}
```

Aplicada globalmente, comprime las filas completas de V5/V6. No lanza una excepción; es una regresión visual. Revisa este caso en escritorio con la preview ampliada. El `!important` agrava el conflicto porque un estilo posterior de igual especificidad no lo reemplaza fácilmente.

En el CSS exclusivo de V4:

```css
@media (min-width: 1101px) {
  .inventory-v4 .reference-vehicles.grid-view {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

V5 y V6 mantienen una columna en vista de lista y sus tamaños de precio específicos. Las reglas se aplican únicamente al iframe de su versión; no es necesario competir con un bloque global que fuerza la cuadrícula. La solución guiada desactiva ese bloque global: separar contenedores no vuelve inofensiva una regla global conflictiva que siga activa.

## Caso 3: personalizar un CTA altera botones ajenos y Details

Archivos: [global](03-acciones/global-widget.html), [Listing 4](03-acciones/listing-v4.js), [Listing 5](03-acciones/listing-v5.js), [Listing 6](03-acciones/listing-v6.js), [Details 1](03-acciones/details-v1.js), [Details 3](03-acciones/details-v3.js), [Details 6](03-acciones/details-v6.js).

Un cambio global demasiado amplio:

```js
(function ($) {
  $('.inventory-page button').text('Consultar embarcación');
})(jQuery);
```

El código no falla técnicamente: también cambia las etiquetas de **List View**, **Grid View**, **Reset filters**, cerrar diálogos y el CTA de Details. Es una colisión de alcance, independiente de que se use jQuery o JavaScript nativo.

En el contenedor Listing V6 se modifica únicamente el CTA comercial:

```js
(function ($) {
  $('.reference-actions .primary-action')
    .text('Consultar embarcación · V6');
})(jQuery);
```

En Details V3 se utiliza su propio objetivo y mensaje:

```js
(function ($) {
  $('.inventory-page > .vehicle-action')
    .text('Solicitar ficha técnica · D3');
})(jQuery);
```

Los ejemplos completos incluyen eventos con namespace `.demoCTA` y eliminan el mensaje anterior para no duplicar elementos. Los botones mantienen sus acciones de demostración; no envían solicitudes reales.

## Ventajas concretas

| Aspecto | Un bloque global sin segmentar | Contenedores por vista/versión |
| --- | --- | --- |
| Cambiar de versión | Conserva suposiciones del DOM anterior | Activa la personalización previamente preparada para la versión destino |
| Volver a la versión anterior | Puede requerir deshacer cambios en el bloque común | Recupera su CSS/JS guardado, si no fue reemplazado |
| Alcance de una edición | Puede alcanzar Listing, Details y otras versiones | Se limita a la vista/versión que se carga |
| Diagnóstico | Hay que encontrar qué rama alteró qué vista | Se identifica el contenedor afectado; los ejemplos muestran errores con su origen |
| Pruebas | Una edición global exige revisar todas las variantes que alcanza | Una edición específica concentra la revisión; lo compartido sigue necesitando pruebas de todas las vistas afectadas |
| Transferencia de trabajo | Bloque creciente con condiciones mezcladas | Personalización revisable por plantilla y versión |

Para los usuarios, el mayor beneficio es **poder cambiar y volver de versión sin borrar su trabajo anterior ni reescribir un widget global cada vez**. Esto funciona si el producto conserva los contenedores inactivos, carga solo el específico elegido y ofrece adaptaciones ya preparadas. La primera migración de una personalización a otro HTML sigue requiriendo análisis y pruebas.

## Costes y riesgos de separar

- **Duplicación:** una corrección común puede tener que aplicarse en varios lugares y las copias pueden divergir.
- **Mantenimiento de versiones antiguas:** hay que decidir cuáles siguen soportadas y quién mantiene sus personalizaciones.
- **Descubrimiento:** un usuario debe poder identificar qué vista y versión está editando; hacen falta nombres claros y un estado de versión visible.
- **Migración inicial:** un selector o cálculo de una versión no se transforma automáticamente al seleccionar otra. Hace falta una adaptación y, en ocasiones, migrar datos.
- **Cambios del DOM:** incluso dentro de una versión, un cambio de plantilla puede invalidar los selectores. Las guardas evitan errores pero pueden ocultar que una función dejó de mostrarse.
- **Código que sigue siendo global:** puede continuar sobrescribiendo estilos o modificando el DOM compartido dentro de la vista. La segmentación no elimina la cascada CSS ni los conflictos de eventos.
- **Separación lógica frente a aislamiento real:** dos etiquetas script en la misma página no son entornos de seguridad distintos. En este laboratorio todo el código de una vista comparte el mismo iframe. Cada recarga crea otro iframe para evitar residuos entre ejecuciones.
- **Rendimiento:** cargar solo la versión activa puede reducir trabajo innecesario, pero no garantiza una mejora medible. Bibliotecas, duplicación y lógica de cada script siguen importando.
- **Persistencia:** este prototipo guarda en localStorage. Un producto compartido necesitaría backend, permisos, historial, publicación y recuperación de versiones.

## Un widget global bien diseñado también puede funcionar

[shared-widget.html](shared-widget.html) cuenta clics en `.vehicle-action`, un contrato común en estas demostraciones. Usa un namespace, evita duplicar el indicador y no envía datos. Es un buen candidato a utilidad global. Si ese selector deja de ser común, también necesitará un adaptador.

[global-router-widget.html](global-router-widget.html) resuelve el caso 1 mediante un mapa explícito:

```js
const adapters = {
  4: '.grid-total',
  5: '.compact-pricing > div:first-child',
  6: '.all-in-price'
};
if (page.dataset.inventoryType !== 'listing') return;
const selector = adapters[page.dataset.version];
if (!selector) return;
```

Este enfoque central también es válido y puede evitar duplicaciones. Su coste es que las adaptaciones y su mantenimiento siguen concentrados en un bloque o módulo común. La diferencia importante es **modularidad, alcance y contrato**, no la cantidad de textareas. Un bloque global con módulos bien diseñados puede ser tan sólido como contenedores separados; contenedores separados con selectores descuidados también pueden fallar.

## Propuesta recomendada

1. Mantener utilidades realmente comunes —analítica con consentimiento, helpers de formato o eventos compartidos— en módulos globales pequeños.
2. Guardar las adaptaciones de DOM, estilos y CTA con la pareja **tipo de página + versión**. Los contenedores inactivos permanecen guardados.
3. Definir un contrato de selectores o atributos `data-*` y una política de cambios para cada plantilla.
4. Cargar solo el contenedor activo, evitar residuos al cambiar, usar eventos nombrados y controlar inserciones duplicadas.
5. Probar cambio, vuelta a la versión anterior y una muestra de las otras vistas antes de publicar; incluir comprobaciones visuales porque no todos los fallos generan excepciones.
6. Ofrecer copia, restauración y advertencias antes de reemplazar personalizaciones.

## Funcionamiento de Widgets en este repositorio

El campo es un widget HTML **restringido a etiquetas `<script>` inline de JavaScript clásico**. No acepta HTML de inventario, CSS directo, scripts externos ni módulos. jQuery 3.7.1 está incluido localmente y se carga en cada iframe, también para los editores por versión. Se usa `noConflict()`: el nombre garantizado es `jQuery`; `$` se proporciona dentro de la función de los ejemplos. El script puede modificar el DOM o inyectar estilos mediante JS, como se hace deliberadamente en el caso 2.

Orden: HTML fijo → estilos base → CSS de la versión → jQuery y comportamiento base → widget global si está activo → JS de la vista/versión. Los estilos inyectados después desde JS participan normalmente en la cascada. El script global se ejecuta en todas las versiones de Listing y Details, incluidas las páginas independientes. El widget se guarda al pulsar **Save & apply widget**, no al escribir. Los editores por versión conservan su guardado automático.

Los errores síncronos de un bloque se muestran con su origen y no detienen el siguiente bloque. Los errores de callbacks asíncronos siguen requiriendo diagnóstico en la consola del navegador. Los cambios de DOM realizados antes de un error no se revierten automáticamente. La separación por versión, el sandbox de la vista y la recuperación de errores son mecanismos distintos.

Los archivos `.js` se pueden copiar en la pestaña JavaScript y los `.css` en CSS del contenedor indicado por su nombre. Los archivos `global-widget.html` se pegan en Widgets. **Ver código y soluciones** permite leer los archivos antes de instalarlos. Import/Export incluye el widget global; las exportaciones anteriores sin widget siguen siendo compatibles.
