const STORAGE_KEY = 'dealer-inventory-studio-v1';
const definitions = [{ id: 'listing', title: 'Inventory Listing', subtitle: 'Customize your vehicle listing experience', versions: [1,2,3,4,5,6], icon: '▦' }, { id: 'details', title: 'Inventory Details', subtitle: 'Customize your vehicle details experience', versions: [1,3,6], icon: '▤' }];
// Inventory markup belongs to the application; version editors only own CSS and JS.
const inventoryStyles = `
*{box-sizing:border-box}body{margin:0;background:#fff;color:#202b33;font:13px/1.5 Arial,sans-serif}.inventory-page{padding:24px}.inventory-header{border-bottom:1px solid #dcdcde;padding-bottom:18px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center}.dealer-brand{font-size:15px;font-weight:bold;letter-spacing:2px}.inventory-header span{font-size:10px;color:#667580}h1{font-size:24px;margin:0 0 6px}p{color:#687782}.inventory-toolbar{display:flex;gap:10px;margin:20px 0}.inventory-toolbar input,.inventory-toolbar select{padding:10px;border:1px solid #b7bec3;min-width:0;background:#fff;border-radius:2px}.inventory-toolbar input{flex:1}.vehicle-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.vehicle-card{border:1px solid #dcdcde;background:#fff}.vehicle-image{display:block;width:100%;height:140px;background:#edf1f3}.vehicle-body{padding:14px}.vehicle-condition{font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#607580}.vehicle-card h2{font-size:15px;line-height:1.4;margin:6px 0}.vehicle-specs{font-size:10px;color:#687782;border-bottom:1px solid #e5e5e5;padding-bottom:12px}.vehicle-price{font-size:20px;font-weight:bold;margin:12px 0}.inventory-page button{background:#007f86;color:#fff;border:1px solid #007f86;border-radius:2px;padding:9px 12px;cursor:pointer;font-size:11px}.inventory-page button:hover{background:#005e64;border-color:#005e64}.vehicle-footer{display:flex;gap:8px;align-items:center;justify-content:space-between}.vehicle-footer small{color:#687782;font-size:9px}.vehicle-detail-image{width:100%;display:block;background:#edf1f3}.detail-facts{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:16px 0;border-block:1px solid #dcdcde;margin:15px 0}.detail-facts span{font-size:11px}.detail-price{font-size:27px;font-weight:bold}.inventory-empty{color:#687782}button,input,select{font:inherit}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #007f86;outline-offset:2px}@media(max-width:420px){.vehicle-grid{grid-template-columns:1fr}.inventory-toolbar{flex-wrap:wrap}.inventory-page{padding:16px}.inventory-header span{display:none}}
`;
const vehicles = [
  {name:'2024 Toyota RAV4 XLE',price:32995,miles:'12,450',fuel:'Gasoline',drive:'AWD',color:'#596f7c'},
  {name:'2023 BMW X5 xDrive40i',price:48750,miles:'24,810',fuel:'Gasoline',drive:'AWD',color:'#313c48'},
  {name:'2024 Honda Civic Sport',price:26900,miles:'8,320',fuel:'Gasoline',drive:'FWD',color:'#a6b0b7'},
  {name:'2023 Ford F-150 XLT',price:41995,miles:'19,650',fuel:'Gasoline',drive:'4WD',color:'#697f79'}
];
function carIllustration(color, className) {
  return `<svg class="${className}" viewBox="0 0 400 210" role="img" aria-label="Vehicle illustration"><rect width="400" height="210" fill="#edf1f3"/><ellipse cx="200" cy="166" rx="155" ry="12" fill="#d4dce0"/><path d="M55 128 L91 116 L133 68 Q140 61 158 61 L251 61 Q268 63 285 84 L313 115 L345 127 L353 153 L45 153 Z" fill="${color}"/><path d="M108 115 L143 74 L193 74 L193 115 Z M204 74 L250 74 L283 115 L204 115 Z" fill="#bdd5df"/><path d="M48 133 L81 133 L81 143 L47 143 M318 131 L348 135 L350 144 L318 144" fill="#fff5cb"/><path d="M199 119 L199 146 M110 121 L99 145 M286 121 L295 145" stroke="#ffffff44"/><circle cx="111" cy="151" r="25" fill="#26343e"/><circle cx="111" cy="151" r="13" fill="#bec9cf"/><circle cx="293" cy="151" r="25" fill="#26343e"/><circle cx="293" cy="151" r="13" fill="#bec9cf"/></svg>`;
}
function inventoryMarkup(type) {
  const header = '<header class="inventory-header"><strong class="dealer-brand">DEALER MOTORS</strong><span>Find your next vehicle</span></header>';
  if(type === 'details') return `<main class="inventory-page">${header}<p>Inventory / Toyota RAV4</p><h1>${vehicles[0].name}</h1><p>Pre-owned · Stock #DM1042</p>${carIllustration(vehicles[0].color,'vehicle-detail-image')}<h2>Ready for your next adventure.</h2><div class="detail-price">$32,995</div><div class="detail-facts"><span>Mileage: 12,450 mi</span><span>Drivetrain: AWD</span><span>Transmission: Automatic</span><span>Fuel: Gasoline</span></div><button class="vehicle-action">Check availability</button></main>`;
  return `<main class="inventory-page">${header}<h1>Pre-owned inventory</h1><p>Find the right vehicle for your next chapter.</p><div class="inventory-toolbar"><input id="vehicle-search" aria-label="Search inventory" placeholder="Search make or model…"><select id="vehicle-sort" aria-label="Sort inventory"><option value="default">Sort: Featured</option><option value="asc">Price: Low to high</option><option value="desc">Price: High to low</option></select></div><p id="vehicle-count">4 vehicles available</p><div class="vehicle-grid">${vehicles.map(v=>`<article class="vehicle-card" data-name="${v.name.toLowerCase()}" data-price="${v.price}">${carIllustration(v.color,'vehicle-image')}<div class="vehicle-body"><span class="vehicle-condition">Pre-owned · In stock</span><h2>${v.name}</h2><div class="vehicle-specs">${v.miles} mi · Automatic · ${v.drive}</div><div class="vehicle-price">$${v.price.toLocaleString('en-US')}</div><div class="vehicle-footer"><button class="vehicle-action">Check availability</button><small>${v.fuel}</small></div></div></article>`).join('')}</div><p class="inventory-empty" hidden>No vehicles match your search.</p></main>`;
}
function initializeInventory() {
  const search=document.querySelector('#vehicle-search'), sort=document.querySelector('#vehicle-sort');
  const cards=[...document.querySelectorAll('.vehicle-card')];
  function filter(){let count=0;cards.forEach(card=>{card.hidden=!card.dataset.name.includes(search.value.toLowerCase());if(!card.hidden)count++;});document.querySelector('#vehicle-count').textContent=count+' vehicles available';document.querySelector('.inventory-empty').hidden=count>0;}
  search?.addEventListener('input',filter);
  sort?.addEventListener('change',()=>{const ordered=sort.value==='default'?cards:[...cards].sort((a,b)=>sort.value==='asc'?a.dataset.price-b.dataset.price:b.dataset.price-a.dataset.price);ordered.forEach(card=>document.querySelector('.vehicle-grid').append(card));});
}
function defaults() {
  return Object.fromEntries(definitions.map(d => [d.id, { selected: 1, versions: Object.fromEntries(d.versions.map(v => [v, {
    js: `// ${d.title} — Version ${v}\n// Applied to the fixed inventory page.\n\ndocument.querySelectorAll('.vehicle-action').forEach(button => {\n  button.addEventListener('click', () => {\n    button.textContent = 'Request received ✓';\n  });\n});`,
    css: `/* ${d.title} — Version ${v} */\n/* Style the existing inventory. HTML is managed by the site. */\n\n.inventory-page { --accent: #007f86; }\n.vehicle-price, .detail-price { color: var(--accent); }\n.vehicle-action { background: var(--accent); border-color: var(--accent); }`
  }])) } ]));
}
function validate(data) {
  for (const d of definitions) {
    const item = data?.[d.id];
    if (!item || !d.versions.includes(item.selected)) throw new Error('Invalid selected version');
    for (const v of d.versions) for (const field of ['js','css']) if (typeof item.versions?.[v]?.[field] !== 'string') throw new Error('Invalid version code');
  }
  return Object.fromEntries(definitions.map(d => [d.id, {selected: data[d.id].selected, versions: Object.fromEntries(d.versions.map(v => [v, {js:data[d.id].versions[v].js, css:data[d.id].versions[v].css}]))}]));
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
    panel.innerHTML = `<div class="panel-top"><span class="panel-icon">${d.icon}</span><div><h3>${d.title}</h3><p>${d.subtitle}</p></div><span class="panel-number">0${index+1}</span></div><div class="version-field"><label for="version-${d.id}">${d.title}</label><div class="select-wrapper"><select id="version-${d.id}">${d.versions.map(v => `<option value="${v}">Version ${v}</option>`).join('')}</select></div><p>Select a version to edit its independent code and styles.</p></div><div class="editor-widget"><div class="widget-heading"><span>〈/〉</span> Custom CSS & JavaScript <small>⌃</small></div><div class="tabs" role="tablist" aria-label="${d.title} code language"><button class="tab active" data-lang="js" role="tab">JavaScript</button><button class="tab" data-lang="css" role="tab">CSS</button><span class="language-label">.js</span></div><div class="code-container"><div class="line-numbers" aria-hidden="true"></div><textarea class="code-editor" spellcheck="false" aria-label="${d.title} JavaScript code"></textarea></div><div class="editor-status"><span class="version-status"></span><span>UTF-8 &nbsp; · &nbsp; Editable</span></div></div><div class="panel-actions"><span class="save-status">✓ All changes saved</span><button class="button primary run">▷ &nbsp; Run preview</button></div><div class="preview"><div class="preview-heading"><span>Inventory preview · fixed HTML</span><span class="preview-status">Isolated sandbox</span></div><iframe title="${d.title} preview" sandbox="allow-scripts"></iframe></div>`;
    document.querySelector('#workspace').append(panel);
    let language = 'js'; const editor = panel.querySelector('textarea'); const select = panel.querySelector('select');
    const current = () => state[d.id].versions[state[d.id].selected];
    function lines() { panel.querySelector('.line-numbers').textContent = Array.from({length: editor.value.split('\n').length}, (_,i) => i+1).join('\n'); panel.querySelector('.line-numbers').scrollTop = editor.scrollTop; }
    function loadEditor() { editor.value = current()[language]; editor.setAttribute('aria-label', `${d.title} ${language === 'js' ? 'JavaScript' : language.toUpperCase()} code`); panel.querySelector('.version-status').textContent = `Version ${state[d.id].selected} · ${d.title}`; lines(); }
    function run() {
      const code = current();
      // A fresh opaque-origin frame resets the previous version's scripts and styles.
      const frame = panel.querySelector('iframe');
      const documentCode = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${inventoryStyles}</style><style>${code.css}</style></head><body>${inventoryMarkup(d.id)}<script>(${initializeInventory.toString()})();try { (0,eval)(${JSON.stringify(code.js).replace(/</g,'\\u003c')}); } catch(e) { const p = document.createElement('pre'); p.style.cssText='color:#b32d2e;white-space:pre-wrap;padding:12px;font:12px monospace'; p.textContent='JavaScript error: '+e.message; document.body.append(p); }<\/script></body></html>`;
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
