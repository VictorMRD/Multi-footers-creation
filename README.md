# Inventory Studio

Dashboard web inspirado en WordPress, desarrollado con HTML, CSS y JavaScript. Se publica en GitHub Pages y se utiliza directamente desde el navegador, sin instalaciones para los visitantes.

## Publicación en GitHub Pages

1. En este repositorio, abre **Settings → Pages**.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. Abre **Actions → Deploy Inventory Studio to GitHub Pages → Run workflow**, selecciona `main` y ejecuta el workflow. Si el despliegue anterior falló antes de activar Pages, también puedes utilizar **Re-run all jobs**.
4. Espera a que el workflow termine correctamente. La URL publicada aparece en el entorno `github-pages` del despliegue y en **Settings → Pages**.

La dirección esperada con el dominio estándar de GitHub es:

**https://victormrd.github.io/Multi-footers-creation/**

Esta dirección solo estará disponible después de habilitar Pages y completar el primer despliegue. Los siguientes cambios enviados a `main` se publican automáticamente. El workflow publica únicamente `index.html`, `styles.css`, `app.js` y `.nojekyll`.

## Uso

- **Dealer settings → Inventory listing** abre el espacio de trabajo. El menú se despliega al pasar el cursor y permite interacción con teclado o clic.
- **Inventory Listing:** versiones 1–6. **Inventory Details:** versiones 1, 3 y 6.
- Cada versión conserva JavaScript y CSS separados, aplicados al HTML fijo del inventario. Cambiar de versión carga y ejecuta su código automáticamente.
- Las pestañas **JavaScript** y **CSS** permiten editar comportamiento y estilos. No existe editor de HTML. El marcado del inventario lo gestiona la aplicación y no se carga desde archivos importados.
- **Run preview** ejecuta los cambios en una vista previa nueva y aislada con `sandbox="allow-scripts"`, para evitar que los estilos o scripts de un editor afecten al dashboard o al otro editor.
- Las ediciones se guardan automáticamente en `localStorage` del navegador y origen actual. No se escriben en GitHub ni se sincronizan entre dispositivos o visitantes. El guardado depende de que el navegador permita almacenamiento local.
- **Export configuration** descarga todas las versiones como JSON. **Import** restaura ese archivo y solicita confirmación antes de reemplazar los datos existentes.

La navegación restante es decorativa. No requiere WordPress ni base de datos. El listing incluye vehículos de demostración con ilustraciones, búsqueda y orden por precio; Details muestra una ficha fija de demostración. El botón de disponibilidad solo confirma la interacción visualmente: no envía solicitudes. La reproducción del diseño de referencia está pendiente de recibir la imagen. Las solicitudes externas que haga el código están sujetas a las políticas del navegador y de la red.

## Desarrollo opcional

Para trabajar en el sitio antes de publicar, desde la carpeta del repositorio:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

El servidor de desarrollo no es necesario para visitar el sitio publicado en GitHub Pages.

## Estilos y selectores del inventario

La interfaz utiliza una paleta inspirada en WP Engine y controles con bordes planos propios del administrador de WordPress. Las versiones comparten un inventario fijo, pero conservan sus propios CSS y JS. Selectores disponibles: `.inventory-page`, `.vehicle-grid`, `.vehicle-card`, `.vehicle-price`, `.vehicle-action` y, para Details, `.detail-price` y `.detail-facts`. Cada cambio de versión crea una vista previa nueva.

Las configuraciones JSON anteriores pueden importarse para conservar CSS y JS; se descarta cualquier campo HTML. Los datos guardados previamente en el navegador conservan sus CSS y JS.
