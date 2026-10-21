let scenarioCatalog = [];
let demoMessage = '';
function showSection(section) {
  const widgets = section === 'widgets';
  document.querySelector('#inventory-section').hidden = widgets;
  document.querySelector('#widgets-section').hidden = !widgets;
  document.querySelector('#widgets-nav').classList.toggle('selected', widgets);
  document.querySelector('#widgets-nav').setAttribute('aria-current', widgets ? 'page' : 'false');
  document.querySelector('#dealer-toggle').classList.toggle('selected', !widgets);
  document.querySelector('#inventory-nav').classList.toggle('active', !widgets);
  document.querySelector('.page-heading h1').firstChild.nodeValue = widgets ? 'Widgets ' : 'Inventory experience ';
  document.querySelector('.page-heading p').textContent = widgets ? 'JavaScript / jQuery global y laboratorio de comparación.' : 'One workspace. Every inventory variation.';
  document.querySelector('.breadcrumbs').textContent = widgets ? 'Dealer settings / Widgets' : 'Dealer settings / Inventory listing';
  history.replaceState(null, '', widgets ? '#widgets' : '#inventory');
  document.querySelector('main').scrollIntoView({behavior: 'auto'});
}
function persistConfiguration(candidate) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidate));
  state = candidate;
}
function showDemoNote(message) {
  demoMessage = message;
  const note = document.querySelector('#demo-run-note'); note.textContent = message; note.hidden = !message;
}
async function exampleText(path) {
  const response = await fetch('examples/' + path);
  if (!response.ok) throw new Error('No se pudo cargar ' + path);
  return response.text();
}
function protectExampleBackup() {
  if (!localStorage.getItem(DEMO_BACKUP_KEY)) localStorage.setItem(DEMO_BACKUP_KEY, JSON.stringify(state));
}
async function applyScenario(scenario, mode) {
  const targetNames = scenario.scoped.map(target => `${target.type} V${target.version}`).join(', ');
  if (!confirm(`Se reemplazará el widget global y el código de: ${targetNames}. Se conservará una copia de tu configuración anterior al primer ejemplo. ¿Cargar ${mode === 'global' ? 'el caso global' : 'la solución por versión'}?`)) return;
  try {
    const candidate = validate(JSON.parse(JSON.stringify(state)));
    if (mode === 'global') {
      const html = await exampleText(scenario.global); parseWidgetHTML(html);
      const base = defaults();
      for (const target of scenario.scoped) candidate[target.type].versions[target.version] = base[target.type].versions[target.version];
      candidate.widgets = {enabled:true, html};
    } else {
      const changes = await Promise.all(scenario.scoped.map(async target => ({...target, code:{js:await exampleText(target.js),css:await exampleText(target.css)}})));
      for (const change of changes) candidate[change.type].versions[change.version] = change.code;
      // A versioned fix should not compete against the intentionally broken global example.
      candidate.widgets.enabled = false;
    }
    candidate.listing.selected = scenario.initial;
    protectExampleBackup(); persistConfiguration(candidate); render(); renderWidgets();
    showDemoNote(`${scenario.title} · ${mode === 'global' ? 'GLOBAL: cambia a V5/V6 o abre Details para comprobar el fallo. ' + scenario.failure : 'POR VERSIÓN: widget global desactivado. Cambia de versión; cada una carga su solución. ' + scenario.solution}`);
    showSection('inventory'); toast(mode === 'global' ? 'Ejemplo global cargado. Revisa la preview y cambia de versión.' : 'Soluciones separadas guardadas en cada versión.');
  } catch (error) { toast('No se pudo cargar el ejemplo: ' + error.message); }
}
async function applySharedExample(path) {
  if (!confirm('Se reemplazará y activará únicamente el widget global. El código por versión se conserva y se mantendrá una copia de la configuración anterior al primer ejemplo. ¿Continuar?')) return;
  try {
    const html = await exampleText(path); parseWidgetHTML(html);
    const candidate = validate(JSON.parse(JSON.stringify(state))); candidate.widgets={enabled:true,html};
    protectExampleBackup(); persistConfiguration(candidate); render(); renderWidgets();
    showDemoNote('Widget global bien delimitado activado. El código por versión permanece intacto. Puedes desactivar el widget desde Widgets.');
    toast('Widget compartido guardado. Revisa las previews o recarga sus páginas.');
  } catch(error) { toast(error.message); }
}
function restoreBeforeExamples() {
  if (!confirm('¿Restaurar la configuración guardada antes del primer ejemplo? Se reemplazarán las ediciones hechas desde entonces.')) return;
  try {
    const saved = localStorage.getItem(DEMO_BACKUP_KEY); if (!saved) throw new Error('No hay copia disponible.');
    const candidate = validate(JSON.parse(saved)); persistConfiguration(candidate); localStorage.removeItem(DEMO_BACKUP_KEY);
    render(); renderWidgets(); showDemoNote(''); toast('Configuración anterior restaurada.');
  } catch(error) { toast(error.message); }
}
function renderWidgets(keepDraft = false) {
  const previousDraft = keepDraft && document.querySelector('#widget-html') ? {html:document.querySelector('#widget-html').value, enabled:document.querySelector('#widget-enabled').checked} : null;
  const container = document.querySelector('#widgets-content');
  container.innerHTML = `<div class="widgets-intro"><strong>Un contenedor global frente a contenedores por versión</strong><p>Este widget representa el enfoque actual: un único bloque para todas las páginas. Se ejecuta en Listing 1–6 y Details 1, 3 y 6 antes del código específico. Úsalo para demostrar conflictos y para funciones realmente compartidas.</p></div><div class="widgets-grid"><section class="global-widget-box"><h2>${faIcon('code')} Custom HTML · JavaScript / jQuery</h2><p>Solo etiquetas &lt;script&gt; inline. No modifica la estructura base del inventario ni admite HTML o CSS directos. Un script sí puede cambiar el DOM o inyectar estilos, como en un widget real.</p><label class="widget-enable"><input type="checkbox" id="widget-enabled"> Activar en todas las vistas y versiones</label><label class="screen-reader-label" for="widget-html">Código HTML del widget global</label><textarea id="widget-html" spellcheck="false"></textarea><div class="widget-controls"><button class="button primary" id="save-widget">${faIcon('circle-check')} Save & apply widget</button><span id="widget-validation" role="status"></span></div><small>jQuery 3.7.1 local · usa <code>(function ($) { … })(jQuery)</code> · guardado al pulsar Save</small></section><aside class="widget-explanation"><h2>Qué comparar en la exposición</h2><ol><li>Prueba un ejemplo global en la versión donde funciona.</li><li>Cambia de versión o de Listing a Details. Observa el error o la alteración visual.</li><li>Aplica la solución por versión: se desactiva el global y se guarda cada adaptación.</li><li>Vuelve a cambiar de versión: las adaptaciones permanecen disponibles.</li></ol><p>En las páginas independientes usa <strong>Reload changes</strong>. Este laboratorio usa almacenamiento de tu navegador; no altera la configuración de otros visitantes.</p><p>Los errores identifican su origen: <strong>Global widget</strong> o la vista y versión. Un error de un bloque no impide ejecutar el siguiente bloque, aunque sus cambios previos en el DOM pueden permanecer.</p><a href="https://github.com/VictorMRD/Multi-footers-creation/blob/main/examples/README.md" target="_blank" rel="noopener">Abrir guía, argumentos y código en GitHub ↗</a></aside></div><div class="examples-heading"><div><h2>Ejemplos prácticos</h2><p>Cada prueba indica el código que reemplazará y guarda una copia antes del primer ejemplo.</p></div><button class="button" id="restore-examples">Restaurar antes de los ejemplos</button></div><div class="scenario-library" id="scenario-library"></div><div class="shared-examples"><div><h3>También hay buenos usos para un widget global</h3><p>Un contador de clics común puede vivir aquí. Un router con adaptadores y guardas también puede resolver las diferencias, a costa de concentrar el mantenimiento.</p></div><button class="button" id="shared-widget">Probar contador compartido</button><button class="button" id="router-widget">Probar global con adaptadores</button></div><div class="tradeoff-grid"><article><h3>A favor de separar</h3><ul><li>Menos colisiones entre vistas y versiones.</li><li>Restaurar una versión recupera su personalización.</li><li>Pruebas, revisión y diagnóstico más localizados.</li><li>Cambios pequeños sin editar un bloque global creciente.</li></ul></article><article><h3>Costes y límites</h3><ul><li>Duplicar lógica puede causar divergencias.</li><li>Cambios comunes requieren propagación o una utilidad compartida.</li><li>La propia plantilla puede cambiar y romper sus selectores.</li><li>La separación no sustituye pruebas ni un contrato estable del DOM.</li></ul></article><article><h3>Propuesta equilibrada</h3><p>Utilidades y eventos comunes en el global; adaptaciones visuales y comportamiento específico en cada vista/versión. Versionar el contrato de selectores y validar al migrar.</p><p>Guardar contenedores separados facilita volver a una versión anterior. No convierte automáticamente la personalización de una plantilla en otra: la nueva versión necesita una adaptación inicial.</p></article></div>`;
  document.querySelector('#widget-html').value = previousDraft ? previousDraft.html : state.widgets.html;
  document.querySelector('#widget-enabled').checked = previousDraft ? previousDraft.enabled : state.widgets.enabled;
  const validation = document.querySelector('#widget-validation'); validation.textContent = state.widgets.enabled ? 'Global activo' : 'Global desactivado';
  document.querySelector('#save-widget').addEventListener('click', () => {
    const html = document.querySelector('#widget-html').value;
    try {
      const scripts = parseWidgetHTML(html);
      const candidate = validate(JSON.parse(JSON.stringify(state))); candidate.widgets = {enabled:document.querySelector('#widget-enabled').checked,html};
      persistConfiguration(candidate); render(); validation.textContent = `${scripts.length} script(s) guardados · ${candidate.widgets.enabled ? 'activo' : 'desactivado'}`;
      validation.className = ''; toast('Widget guardado. Las previews se actualizaron; recarga las otras pestañas.');
    } catch(error) { validation.textContent = error.message; validation.className = 'widget-error'; }
  });
  let hasBackup = false; try { hasBackup=!!localStorage.getItem(DEMO_BACKUP_KEY); } catch {}
  document.querySelector('#restore-examples').disabled = !hasBackup;
  document.querySelector('#restore-examples').addEventListener('click',restoreBeforeExamples);
  document.querySelector('#shared-widget').addEventListener('click',()=>applySharedExample('shared-widget.html'));
  document.querySelector('#router-widget').addEventListener('click',()=>applySharedExample('global-router-widget.html'));
  const library = document.querySelector('#scenario-library');
  if (!scenarioCatalog.length) { library.textContent = 'Cargando ejemplos…'; return; }
  for (const scenario of scenarioCatalog) {
    const card = document.createElement('article'); card.className = 'scenario-card';
    card.innerHTML = `<h3></h3><p class="scenario-summary"></p><p class="scenario-failure"></p><p class="scenario-solution"></p><div class="scenario-actions"><button class="button" data-example-mode="global">Probar global</button><button class="button primary" data-example-mode="scoped">Aplicar solución por versión</button></div><details class="example-source"><summary>Ver código y soluciones</summary><label>Archivo <select aria-label="Código del ejemplo"></select></label><pre tabindex="0"></pre></details>`;
    card.querySelector('h3').textContent=scenario.title;
    card.querySelector('.scenario-summary').textContent=scenario.summary;
    card.querySelector('.scenario-failure').textContent='Fallo esperado: '+scenario.failure;
    card.querySelector('.scenario-solution').textContent='Solución: '+scenario.solution;
    card.querySelectorAll('[data-example-mode]').forEach(button=>button.addEventListener('click',()=>applyScenario(scenario,button.dataset.exampleMode)));
    const select=card.querySelector('select');
    const files=[scenario.global,...scenario.scoped.flatMap(target=>[target.js,target.css])];
    for(const file of files){const option=document.createElement('option');option.value=file;option.textContent=file;select.append(option);}
    let request=0;
    async function loadSource(){const current=++request;try{const code=await exampleText(select.value);if(current===request)card.querySelector('pre').textContent=code;}catch(error){card.querySelector('pre').textContent=error.message;}}
    select.addEventListener('change',loadSource);card.querySelector('details').addEventListener('toggle',()=>{if(card.querySelector('details').open)loadSource();});
    library.append(card);
  }
}
renderWidgets();
fetch('examples/catalog.json').then(response=>{if(!response.ok)throw new Error('HTTP '+response.status);return response.json();}).then(catalog=>{scenarioCatalog=catalog;renderWidgets(true);}).catch(error=>{document.querySelector('#scenario-library').textContent='No se pudieron cargar los ejemplos: '+error.message;});
if(location.hash==='#widgets')showSection('widgets');
