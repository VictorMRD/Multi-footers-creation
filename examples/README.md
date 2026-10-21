# Laboratorio: regresiones críticas y alcance de las personalizaciones

[Widgets](https://victormrd.github.io/Multi-footers-creation/#widgets) · [Listing](https://victormrd.github.io/Multi-footers-creation/inventory-listing.html) · [Details](https://victormrd.github.io/Multi-footers-creation/inventory-details.html)

Estos casos reemplazan los ejemplos anteriores. Muestran pérdida de integridad de precios, conversión bloqueada y cotizaciones de otra unidad. Son **fallos construidos para una demostración**, no fallos atribuidos a los distribuidores usados como referencias visuales. Se ejecutan solo sobre los datos de muestra de este repositorio. No envían solicitudes, pedidos, pagos ni cotizaciones a ningún servicio.

La propuesta es guardar y activar personalizaciones con una pareja **tipo de página + versión** y mantener los contratos de datos explícitos. La separación ayuda a limitar ediciones y cambios involuntarios; no corrige automáticamente una fórmula incorrecta ni vuelve seguro cualquier código.

## Cómo hacer la exposición

1. Exporta la configuración si quieres una copia adicional. En **Widgets**, pulsa **Probar global** del primer caso y acepta el reemplazo de los destinos indicados. Se conserva una copia local anterior al primer ejemplo. No se sobrescribe al pasar a otro caso.
2. Comprueba V4. Cambia a V5 y revisa la auditoría de importes y las propias tarjetas. La página carga sin excepción y los precios publicados son incorrectos.
3. Pulsa **Aplicar solución por versión**. El global se desactiva y se instalan las adaptaciones de V4/V5/V6. Comprueba que los importes vuelven a coincidir y que cambiar y regresar de versión conserva el código.
4. Repite con el CSS. En V4 prueba un botón comercial. En V5/V6 comprueba los botones con el puntero y el recorte de fotos. Usa **Expand preview** para comparar en escritorio. Aplica la solución y repite el clic.
5. En el caso de cotización, pulsa la segunda unidad en V4 y después la segunda de V5. La tabla compara la unidad pulsada con el contenido del borrador. Aplica la solución y prueba también Details.
6. Termina con **Probar monolito completo**. Funciona en Listing 4/5/6 y Details 1/3/6. Lee el archivo completo en la comparación de código.
7. Pulsa **Simular hotfix global de V4**. La campaña de ATV aparece también en V5, V6 y Details. Pulsa **Aplicar solución por versión**: la campaña queda en V4 y los otros módulos conservan sus mensajes, importes y cotizaciones.
8. En páginas independientes, pulsa **Reload changes** después de guardar. Sin `?version=`, la página sigue la selección del editor al recargar; con el parámetro, mantiene esa versión.
9. **Restaurar antes de los ejemplos** recupera la copia inicial y reemplaza las ediciones hechas después. La copia pertenece a este navegador: Export sigue siendo necesario para transferir o conservar fuera del almacenamiento local.

Cargar un caso reemplaza el widget y los CSS/JS listados en la confirmación. Las soluciones se instalan en todos los destinos cubiertos para permitir el cambio de versión durante la exposición. Los contenedores no cubiertos no se reemplazan. El widget global sí se ejecuta en todas las vistas si está activado.

## 1. Precios de decenas de miles publicados como decenas

Archivos: [global](01-precios/global-widget.html) · [V4 JS](01-precios/listing-v4.js) · [V5 JS](01-precios/listing-v5.js) · [V6 JS](01-precios/listing-v6.js), con CSS junto a cada archivo.

El global original reconstruye el precio sumando celdas del desglose de V4. Sus tres importes coinciden. En V5 no existe ese desglose, así que cae en un fallback:

```js
amount = parseFloat(
  card.querySelector('.vehicle-price').textContent.replace('$', '')
);
```

`parseFloat('22,448 OUR PRICE')` devuelve `22`; no lanza una excepción. El script además copia el resultado a `data-price`, por lo que el error alcanza filtros y ordenamiento, no solo la tipografía del precio.

| Unidad de V5 | Referencia del demo | Publicado por el global | Diferencia |
| --- | ---: | ---: | ---: |
| Polaris Patriot | $22,448 | $22 | -$22,426 |
| CFMOTO UFORCE | $17,657 | $17 | -$17,640 |
| Polaris RMK SP | $46,947 | $46 | -$46,901 |
| **Lote** | **$87,052** | **$85** | **-$86,967** |

En V6 hay otro problema de contrato: la tabla incluye MSRP, Sale Price y otros conceptos. Sumarlos todos duplica bases; por ejemplo, la primera unidad se publica a $43,124 frente a $20,495 de referencia. Un selector que encuentra nodos no garantiza que esos nodos representen importes sumables.

### Solución

No calcular importes comerciales desde texto de presentación. El fixture publica un contrato estructurado en centavos, `data-unit-price-cents`, y cada adaptador conoce dónde mostrarlo:

```js
const cents = Number(card.dataset.unitPriceCents);
if (!Number.isSafeInteger(cents) || cents <= 0) {
  price.textContent = 'Precio no disponible';
  card.querySelectorAll('.vehicle-action').forEach(button => button.disabled = true);
  return; // No inventar cero ni usar un MSRP como precio final.
}
price.textContent = InventoryLab.usd(cents);
card.dataset.price = String(cents / 100);
```

Los destinos son `.grid-total .vehicle-price` en V4, `.compact-pricing .vehicle-price` en V5 y `.all-in-price .vehicle-price` en V6. Cada archivo puede revisarse y conservarse con su versión.

**La separación no es la corrección financiera por sí sola.** La corrección es el contrato de datos, la validación y el adaptador correcto. Separar los contenedores facilita instalar y mantener esa corrección sin reutilizar el parser equivocado en otra plantilla.

## 2. Un CSS de V4 desactiva los botones comerciales de V5/V6

Archivos: [widget](02-estructura/global-widget.html) · [CSS global legible](02-estructura/global.css) · [V4 CSS](02-estructura/listing-v4.css) · [V5 CSS](02-estructura/listing-v5.css) · [V6 CSS](02-estructura/listing-v6.css).

El diseñador de V4 personaliza bloques usando su orden en el HTML:

```css
.reference-card > div:nth-of-type(2) {
  height: 110px !important;
  overflow: hidden !important;
}
.reference-card > div:nth-of-type(3) {
  height: 250px !important;
  overflow: hidden !important;
  pointer-events: none !important;
}
```

| Posición del div | V4 | V5/V6 |
| --- | --- | --- |
| Segundo | Descripción | Imagen / promoción |
| Tercero | Desglose estático de precios | Columna de acciones |

En V4 el bloque de precios deja pasar el puntero y las acciones, que viven en otro bloque, conservan su interacción. Al pasar a V5/V6, las fotos se recortan y la columna comercial hereda `pointer-events: none`. Los tres CTA no reciben clics del puntero; algunos controles quedan recortados por la altura impuesta. La regla global de tres columnas agrava la compresión de las filas.

Es una regresión visual y de interacción, sin excepción de JavaScript. `pointer-events: none` no bloquea por sí solo la activación por teclado: la auditoría afirma específicamente que se pierde el clic del puntero. Una revisión de accesibilidad debe comprobar ambas modalidades.

### Solución

Eliminar los índices de hijos y usar las clases con significado dentro de la versión. V4 conserva su cuadrícula; V5/V6 mantienen filas e imágenes con altura propia. Las acciones no heredan reglas decorativas de precios. El global conflictivo se desactiva: un contenedor separado no neutraliza por sí solo un `!important` global todavía activo.

## 3. La cotización contiene otra unidad y otro importe

Archivos: [global](03-cotizacion/global-widget.html) · [Listing 4](03-cotizacion/listing-v4.js) · [Listing 5](03-cotizacion/listing-v5.js) · [Listing 6](03-cotizacion/listing-v6.js) · [Details 1](03-cotizacion/details-v1.js) · [Details 3](03-cotizacion/details-v3.js) · [Details 6](03-cotizacion/details-v6.js).

El global funciona al encontrar `.grid-total` dentro de la tarjeta pulsada en V4. Si no existe, usa la primera unidad de todo el documento:

```js
const clicked = button.closest('.vehicle-card');
const pricing = clicked.querySelector('.grid-total');
const resolved = pricing ? clicked : document.querySelector('.vehicle-card');
```

En V5, pulsar **Get Quote** en la segunda unidad solicita **CFMOTO · C02617-C-ACCY · $17,657**, pero el borrador se construye con **Polaris · P60553 · $22,448**. El botón funciona y hay una cotización de prueba; sus datos son incorrectos. No se envía a ningún servicio.

### Solución

Resolver la unidad desde el botón pulsado, exigir su SKU y precio estructurado y no sustituirlos por la primera coincidencia del documento. Si falta el contrato se bloquea el borrador. Los adaptadores de Listing y Details usan sus contenedores propios. La tabla de auditoría compara la selección real con el payload generado.

En producción también debe validarse la identidad del producto, la disponibilidad y el importe en el servidor: un atributo del DOM no es una fuente de confianza comercial.

## 4. Todo el CSS/JS global, organizado, pero con seis responsabilidades

Archivos completos:

- [Widget global](04-monolito/global-widget.html): contenido pegable en Widgets.
- [JS global completo](04-monolito/global.js): incluye todo el CSS como cadena, utilidades, precios, identidad, eventos, CTA y seis rutas.
- [CSS global separado para lectura](04-monolito/global.css).
- [Widget con hotfix de V4](04-monolito/global-hotfix-widget.html).
- [Diff del hotfix](04-monolito/HOTFIX.md).
- [Módulo Listing V4](04-monolito/listing-v4.js) y [su CSS](04-monolito/listing-v4.css); los otros cinco pares están en el mismo directorio.

El primer monolito **funciona**: utiliza contratos correctos, un router, funciones por versión y secciones comentadas. No se minificó ni se llenó de errores para hacer la comparación. Aun así, el usuario debe abrir un campo que mezcla el estilo de seis contextos, precios, CTA, eventos y sus adaptadores; el programador debe vigilar los consumidores de cada utilidad compartida.

La comparación en Widgets muestra el archivo global completo y el módulo elegido lado a lado. El contador muestra las líneas reales del archivo seleccionado, no una promesa de que los módulos sumen menos líneas. Cambiar el selector del módulo permite leer los seis JS y sus seis CSS.

### Hotfix local realizado en una configuración compartida

La campaña de ATV se pretendía activar solo en V4. El operador cambia la constante común:

```diff
 const shared = {
-  ctaText: 'Solicitar información · demo',
-  accent: '#007f86'
+  ctaText: 'Cotizar ATV con accesorios · hotfix V4',
+  accent: '#bd1e2d'
 };
```

Las seis rutas consumen esa constante, por lo que el texto de ATV y su color aparecen también en V5/V6 y en Details. La fórmula de precios sigue siendo correcta: es una regresión de alcance comercial, separada del primer caso.

Un monolito con una sobrescritura exclusiva de V4 **también puede resolverlo correctamente**. El ejemplo demuestra una edición compartida equivocada y el número de consumidores que hay que revisar; no demuestra que todo archivo global falle inevitablemente.

### Contraparte por vista/versión

Al aplicar la solución se guardan seis módulos. Solo `listing-v4.js` y `listing-v4.css` contienen la campaña de ATV. V5 usa su mensaje de cotización, V6 el de embarcaciones y Details sus mensajes de ficha técnica. Los seis conservan validación de precios y cotización de la unidad pulsada.

| Para el usuario | Para el programador |
| --- | --- |
| Ve qué versión y página está editando | Conoce el contrato DOM y de datos de ese contexto |
| No necesita localizar su cambio entre seis secciones | Revisa una adaptación local con menos consumidores |
| Cambiar y regresar recupera el contenedor guardado | Puede probar ida/vuelta y diagnosticar el módulo activo |
| Una campaña de V4 no requiere tocar el texto de Details | Puede mantener CSS y comportamiento específicos juntos |

La separación es lógica en este proyecto. No se implementaron permisos diferentes por módulo ni despliegues independientes: el repositorio sigue publicándose con un único workflow y el laboratorio conserva la configuración en un mismo almacenamiento local.

Consulta también la [matriz de resultados comprobados](VALIDACION.md).

## Qué valida la auditoría y qué no

`lab-support.js` captura referencias congeladas de los datos de demostración antes de ejecutar el widget. Es un instrumento de la exposición, cargado por la página, no el código bajo prueba. Compara importes publicados, la unidad seleccionada frente a la cotizada y la capacidad de los CTA para recibir eventos de puntero según CSS. No modifica el resultado para “hacer pasar” una prueba.

Los atributos `data-unit-price-cents` y `data-stock` son contratos explícitos del fixture. Una copia congelada en el navegador permite comparar resultados durante esta demostración; no protege precios frente a manipulación ni sustituye una API o validación del servidor. Los ejemplos pueden consultar `InventoryLab.usd`, `auditPrices`, `auditLayout` y `showQuote` para presentar resultados.

La auditoría de layout no sustituye screenshots, teclado ni pruebas en varios dispositivos. La de precios no valida impuestos, financiación ni reglas comerciales reales. Todos los datos son muestras.

## Ventajas, costes y propuesta

**Ventajas:** menos colisiones entre contratos diferentes, contexto de edición claro, personalizaciones inactivas conservadas, vuelta de versión más sencilla y revisión local más delimitada.

**Costes:** puede haber duplicación; hay que mantener versiones antiguas, propagar correcciones comunes y evitar divergencias. Una nueva versión todavía necesita su adaptación inicial. Un selector malo en un contenedor separado puede romper esa versión. No hay una mejora de rendimiento garantizada ni menos líneas totales por definición.

**Propuesta:** utilidades estables de dinero, identidad y eventos en bibliotecas comunes probadas; adaptadores de DOM, decisiones comerciales y CSS en módulos por página/versión. No recalcular precios finales leyendo texto de un diseño. Definir contratos y validar en el servidor. Probar visuales, importes, identidad de la unidad y cambio/retorno de versión antes de publicar.

Un monolito bien modularizado puede ser sólido. Separar los contenedores mejora especialmente la experiencia de quien edita personalizaciones en un textarea y reduce el riesgo de tocar una sección vecina o una constante común por error. El beneficio depende de cómo se implemente y mantenga esa separación.

## Persistencia y ejecución

Widgets acepta solo `<script>` inline de JavaScript clásico; jQuery 3.7.1 está disponible mediante `jQuery` y un alias `$` dentro de la función. El CSS global se inyecta desde JavaScript porque el widget no permite `<style>` directo. Los contenedores por versión mantienen CSS y JS separados.

Orden: HTML fijo → CSS base y de versión → jQuery → captura de referencia del laboratorio → comportamiento base → widget global activo → JS de la versión. Los errores síncronos se muestran con su origen, sin impedir el siguiente bloque; los cambios previos del DOM no se revierten automáticamente. Los callbacks asíncronos necesitan diagnóstico adicional en consola.

Las páginas independientes comparten la configuración del mismo navegador y origen. El guardado no publica cambios en GitHub ni los comparte con otros visitantes. Las exportaciones anteriores siguen siendo compatibles. Los ejemplos viejos guardados en el navegador no se sustituyen silenciosamente: carga los nuevos casos desde Widgets.
