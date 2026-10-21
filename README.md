# Inventory Studio

Prototipo visual inspirado en el panel de WordPress. No requiere backend ni dependencias.

## Ejecutar

Desde este repositorio:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Abrir el puerto 8000 en el navegador del entorno de desarrollo.

## Uso

- Dealer settings → Inventory listing abre el espacio de trabajo.
- Inventory Listing incluye versiones 1–6. Inventory Details incluye 1, 3 y 6.
- Cada versión guarda HTML, JavaScript y CSS por separado. Los cambios se guardan automáticamente en `localStorage` del navegador y origen actual.
- Run preview ejecuta la versión seleccionada. Cambiar de versión carga y ejecuta su código automáticamente.
- Cada ejecución crea un iframe nuevo con `sandbox="allow-scripts"`. El código HTML puede incluir scripts; JavaScript también dispone de una pestaña independiente. El iframe no tiene acceso al DOM ni al almacenamiento del dashboard. Las solicitudes externas que haga el código siguen sujetas a las políticas del navegador y de la red.
- Export configuration descarga todas las versiones como JSON. Import permite restaurar ese archivo y solicita confirmación antes de reemplazar los datos.

La navegación restante es decorativa. No hay conexión con WordPress, páginas reales de inventario, guardado compartido ni despliegue. Las vistas previas incluyen ejemplos editables para preparar las futuras versiones de inventario.
