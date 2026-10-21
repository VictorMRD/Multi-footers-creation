const STORAGE_KEY = 'dealer-inventory-studio-v1';
const definitions = [{ id: 'listing', title: 'Inventory Listing', subtitle: 'Customize your vehicle listing experience', versions: [1,2,3,4,5,6], icon: '▦' }, { id: 'details', title: 'Inventory Details', subtitle: 'Customize your vehicle details experience', versions: [1,3,6], icon: '▤' }];
function defaults() {
  return Object.fromEntries(definitions.map(d => [d.id, { selected: 1, versions: Object.fromEntries(d.versions.map(v => [v, {
    html: `<div class="inventory-demo">\n  <span class="eyebrow">${d.title.toUpperCase()} · VERSION ${v}</span>\n  <h2>Your next great experience.</h2>\n  <p>A blank canvas for your inventory ideas.</p>\n  <button id="demo-action">Explore inventory →</button>\n</div>`,
    js: `// ${d.title} — Version ${v}\n// This script runs only in this version's preview.\n\nconst button = document.querySelector('#demo-action');\nbutton?.addEventListener('click', () => {\n  button.textContent = 'Your experience starts here ✓';\n});`,
    css: `/* ${d.title} — Version ${v} */\nbody { margin: 0; font-family: system-ui, sans-serif; }\n.inventory-demo { padding: 28px; background: #f4f7fa; }\n.eyebrow { font-size: 9px; letter-spacing: 1.5px; color: #708495; }\nh2 { font-size: 21px; color: #243746; margin: 12px 0 8px; }\np { color: #7b8995; font-size: 11px; }\nbutton { background: #2271b1; color: white; border: 0;\n  border-radius: 4px; padding: 10px 14px; font-size: 10px;\n  margin-top: 9px; cursor: pointer; }`
  }])) } ]));
}
function validate(data) {
  for (const d of definitions) {
    const item = data?.[d.id];
    if (!item || !d.versions.includes(item.selected)) throw new Error('Invalid selected version');
    for (const v of d.versions) for (const field of ['html','js','css']) if (typeof item.versions?.[v]?.[field] !== 'string') throw new Error('Invalid version code');
  }
  return data;
}
let state = defaults();
try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) state = validate(JSON.parse(saved)); } catch { toast('Saved data could not be loaded. Default examples are shown.'); }
function toast(message) { const el = document.querySelector('#toast'); el.textContent = message; el.style.display = 'block'; clearTimeout(toast.timer); toast.timer = setTimeout(() => el.style.display = 'none', 4500); }
function save(panel) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); panel.querySelector('.save-status').textContent = '✓ All changes saved'; }
  catch { panel.querySelector('.save-status').textContent = 'Unsaved · export to keep your work'; toast('Browser storage unavailable or full. Export your configuration to keep your changes.'); }
}
function render() {
  document.querySelector('#workspace').replaceChildren();
  definitions.forEach((d, index) => {
    const panel = document.createElement('section'); panel.className = 'panel';
    panel.innerHTML = `<div class="panel-top"><span class="panel-icon">${d.icon}</span><div><h3>${d.title}</h3><p>${d.subtitle}</p></div><span class="panel-number">0${index+1}</span></div><div class="version-field"><label for="version-${d.id}">${d.title}</label><div class="select-wrapper"><select id="version-${d.id}">${d.versions.map(v => `<option value="${v}">Version ${v}</option>`).join('')}</select></div><p>Select a version to edit its independent code and styles.</p></div><div class="editor-widget"><div class="widget-heading"><span>〈/〉</span> Custom code <small>⌃</small></div><div class="tabs" role="tablist" aria-label="${d.title} code language"><button class="tab" data-lang="html" role="tab">HTML</button><button class="tab active" data-lang="js" role="tab">JavaScript</button><button class="tab" data-lang="css" role="tab">CSS</button><span class="language-label">.js</span></div><div class="code-container"><div class="line-numbers" aria-hidden="true"></div><textarea class="code-editor" spellcheck="false" aria-label="${d.title} JavaScript code"></textarea></div><div class="editor-status"><span class="version-status"></span><span>UTF-8 &nbsp; · &nbsp; Editable</span></div></div><div class="panel-actions"><span class="save-status">✓ All changes saved</span><button class="button primary run">▷ &nbsp; Run preview</button></div><div class="preview"><div class="preview-heading"><span>Live preview</span><span class="preview-status">Isolated sandbox</span></div><iframe title="${d.title} preview" sandbox="allow-scripts"></iframe></div>`;
    document.querySelector('#workspace').append(panel);
    let language = 'js'; const editor = panel.querySelector('textarea'); const select = panel.querySelector('select');
    const current = () => state[d.id].versions[state[d.id].selected];
    function lines() { panel.querySelector('.line-numbers').textContent = Array.from({length: editor.value.split('\n').length}, (_,i) => i+1).join('\n'); panel.querySelector('.line-numbers').scrollTop = editor.scrollTop; }
    function loadEditor() { editor.value = current()[language]; editor.setAttribute('aria-label', `${d.title} ${language === 'js' ? 'JavaScript' : language.toUpperCase()} code`); panel.querySelector('.version-status').textContent = `Version ${state[d.id].selected} · ${d.title}`; lines(); }
    function run() {
      const code = current();
      // A fresh opaque-origin frame resets the previous version's scripts and styles.
      const frame = panel.querySelector('iframe');
      const documentCode = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${code.css}</style></head><body>${code.html}<script>try { (0,eval)(${JSON.stringify(code.js).replace(/</g,'\\u003c')}); } catch(e) { const p = document.createElement('pre'); p.style.cssText='color:#b32d2e;white-space:pre-wrap;padding:12px;font:12px monospace'; p.textContent='JavaScript error: '+e.message; document.body.append(p); }<\/script></body></html>`;
      const fresh = frame.cloneNode(false); fresh.srcdoc = documentCode; frame.replaceWith(fresh);
      panel.querySelector('.preview-status').textContent = `Version ${state[d.id].selected} · Preview updated`;
    }
    select.value = state[d.id].selected;
    select.addEventListener('change', () => { state[d.id].selected = Number(select.value); save(panel); loadEditor(); run(); });
    panel.querySelectorAll('.tab').forEach(tab => {
      tab.setAttribute('aria-selected', String(tab.dataset.lang === language));
      tab.addEventListener('click', () => { language = tab.dataset.lang; panel.querySelectorAll('.tab').forEach(t => { t.classList.toggle('active', t === tab); t.setAttribute('aria-selected', String(t === tab)); }); panel.querySelector('.language-label').textContent = '.'+language; loadEditor(); });
    });
    editor.addEventListener('input', () => { current()[language] = editor.value; save(panel); lines(); panel.querySelector('.preview-status').textContent = 'Changes pending · Run preview'; });
    editor.addEventListener('scroll', lines);
    editor.addEventListener('keydown', event => { if (event.key === 'Tab') { event.preventDefault(); const start = editor.selectionStart; editor.setRangeText('  ', start, editor.selectionEnd, 'end'); editor.dispatchEvent(new Event('input')); } });
    panel.querySelector('.run').addEventListener('click', run);
    loadEditor(); run();
  });
}
render();
document.querySelector('#export-button').addEventListener('click', () => { const url = URL.createObjectURL(new Blob([JSON.stringify(state,null,2)], {type:'application/json'})); const a = document.createElement('a'); a.href = url; a.download = 'inventory-studio.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000); toast('Configuration exported'); });
document.querySelector('#import-button').addEventListener('click', () => document.querySelector('#import-file').click());
document.querySelector('#import-file').addEventListener('change', async event => { const file = event.target.files[0]; if (!file) return; try { const incoming = validate(JSON.parse(await file.text())); if (!confirm('Replace all current versions with this configuration? Export first if you want to keep your current work.')) return; state = incoming; render(); save(document.querySelector('.panel')); toast('Configuration imported'); } catch { toast('Invalid configuration. Import an Inventory Studio JSON export.'); } finally { event.target.value = ''; } });
document.querySelector('#dealer-toggle').addEventListener('click', () => { const toggle = document.querySelector('#dealer-toggle'); const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded',String(open)); document.querySelector('#dealer-menu').style.display = open ? 'block' : 'none'; });
document.querySelector('#inventory-nav').addEventListener('click', () => { document.querySelector('main').scrollIntoView({behavior:'smooth'}); });
