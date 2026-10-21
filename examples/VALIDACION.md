# Resultados de la validación de los casos

Comprobaciones funcionales realizadas con Chromium y Playwright sobre la aplicación servida por HTTP. Los fallos del global son resultados esperados de la demostración; las soluciones se verifican por su comportamiento, no solo por ausencia de excepciones.

| Comprobación | Resultado observado |
| --- | --- |
| Precios globales en V4 | Los tres precios coinciden con su referencia. |
| Cambio a V5 | $22,448 → $22; $17,657 → $17; $46,947 → $46. Lote: $87,052 → $85, sin excepción JS. |
| Filtro con precio corrupto | Las tres unidades de V5 pasan a aparecer por debajo de $20,000. |
| Suma de conceptos en V6 | Primera unidad: $43,124 publicado frente a $20,495 de referencia. Los tres importes resultan incorrectos. |
| Adaptadores de precios 4/5/6 | Los importes publicados coinciden con los datos estructurados. En V5 solo una unidad queda por debajo de $20,000. |
| CSS global en V4 | El CTA recibe clic y abre su diálogo de demostración. |
| CSS global en V5/V6 | Los tres CTA tienen `pointer-events: none`; un intento real de clic del puntero no activa el botón. |
| CSS separado en 4/5/6 | Ningún CTA queda bloqueado por esa regla; vuelve a funcionar el clic que abre el diálogo. |
| Cotización global en V4 | La segunda unidad cotizada coincide con la segunda unidad seleccionada. |
| Cotización global en V5 | Selección: CFMOTO, C02617-C-ACCY, $17,657. Borrador incorrecto: Polaris, P60553, $22,448. |
| Cotización separada | Listing 4/5/6 y Details 1/3/6 producen el SKU y el importe correspondientes a la unidad seleccionada. Se comprobó activación por teclado. |
| Monolito inicial | Las seis rutas funcionan y mantienen precios correctos. |
| Hotfix en constante común | El texto de la campaña de V4 aparece también en V5 y en Details. |
| Contraparte de seis módulos | Solo V4 contiene la campaña de ATV; los otros cinco contextos mantienen su mensaje y sus precios. Las cotizaciones de Listing siguen resolviendo la unidad seleccionada. |
| Comparación de código | El visor incluye el JS global completo, sus estilos y los doce archivos JS/CSS de los seis módulos. |
| Páginas independientes | V5 reproduce el total incorrecto de $85; al instalar la solución y recargar, la auditoría vuelve a coincidir. |
| Contrato de precio ausente | Se muestra “Precio no disponible” y se desactiva la consulta, sin convertir el importe en cero. |
| Recuperación | Restaurar la copia inicial devuelve exactamente la configuración anterior a los ejemplos. |
| Adaptación de Widgets | No hay desbordamiento horizontal de la página a 390 px. |

No hubo errores de página inesperados durante esta secuencia. No se validaron reglas fiscales, financiación comercial, APIs de venta, todos los navegadores ni una matriz completa de accesibilidad. `pointer-events: none` se probó como regresión de puntero; no equivale a bloquear necesariamente la activación mediante teclado.
