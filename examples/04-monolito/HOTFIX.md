# Hotfix de V4 que alcanza seis contextos

El monolito inicial funciona; el problema aquí es el alcance de una edición equivocada en una configuración compartida.

```diff
 const shared = {
-  ctaText: 'Solicitar información · demo',
-  accent: '#007f86'
+  ctaText: 'Cotizar ATV con accesorios · hotfix V4',
+  accent: '#bd1e2d'
 };
```

El mensaje y color se reutilizan en las seis rutas. Cambiar una constante común para una campaña local modifica Listing 4/5/6 y Details 1/3/6. Un monolito con una sobrescritura exclusiva de V4 también puede resolverlo correctamente: este ejemplo muestra una edición con alcance excesivo, no un fallo inevitable de usar un archivo grande.

En la contraparte por versión, solo `listing-v4.js` y `listing-v4.css` definen la campaña de ATV. El resto de archivos mantiene su propio mensaje. El código compartido realmente estable puede extraerse a una biblioteca probada, en lugar de copiarlo en cada módulo.

El ejemplo ampliado mantiene seis rutas actuales y diez implementaciones históricas simuladas en el mismo campo. Las históricas no se invocan: el informe de la preview muestra cero. El tamaño de este campo dificulta identificar qué constantes y consumidores comparte la modificación; no se afirma que el código inactivo esté ejecutándose.
