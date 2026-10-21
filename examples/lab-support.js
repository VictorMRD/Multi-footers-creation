// Presentation instrumentation, independent of the example under test.
// These are frozen browser-side DEMO snapshots, not authoritative server pricing.
(() => {
  const root = document.querySelector('.inventory-page');
  if (!root) return;
  const sourceNodes = [...root.querySelectorAll('.vehicle-card')];
  if (!sourceNodes.length) sourceNodes.push(root);
  const records = new Map(sourceNodes.map((node, index) => [node, Object.freeze({
    name: node.querySelector('.reference-description h2, .vehicle-body h2, h1')?.textContent.trim() || 'Demo unit',
    sku: node.dataset.stock || `DEMO-${index + 1}`,
    cents: Number(node.dataset.unitPriceCents || Number(node.dataset.price) * 100)
  })]));
  const usd = cents => (cents / 100).toLocaleString('en-US', {style:'currency',currency:'USD',maximumFractionDigits:2,minimumFractionDigits:0});
  function element(tag, text, className) {
    const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node;
  }
  function panel(id, title) {
    root.querySelector(`[data-lab-panel="${id}"]`)?.remove();
    const box = element('section', undefined, 'lab-audit'); box.dataset.labPanel = id; box.setAttribute('role', 'status');
    box.append(element('small','LABORATORIO · SIMULACIÓN, SIN OPERACIONES REALES','lab-kicker'), element('h2',title));
    const anchor = root.querySelector('.result-summary');
    if (anchor) anchor.before(box); else root.prepend(box);
    return box;
  }
  function readDisplayed(node) {
    const label = node.querySelector('.vehicle-price, .detail-price');
    const match = label?.textContent.match(/-?\$[\d,]+(?:\.\d{1,2})?/);
    return match ? Math.round(Number(match[0].replace(/[^\d.-]/g,'')) * 100) : NaN;
  }
  function auditPrices(title) {
    const box = panel('prices',title); const table=element('table');
    const head=element('tr');['Unidad','Referencia','Publicado','Diferencia'].forEach(label=>head.append(element('th',label)));table.append(head);
    let expected=0, actual=0, failures=0;
    for (const [node, record] of records) {
      const shown=readDisplayed(node), mismatch=!Number.isSafeInteger(shown)||shown!==record.cents;
      expected+=record.cents;actual+=Number.isFinite(shown)?shown:0; if(mismatch)failures++;
      const row=element('tr');row.dataset.sku=record.sku;row.dataset.expectedCents=record.cents;row.dataset.actualCents=shown;row.dataset.mismatch=mismatch;
      [record.name,usd(record.cents),Number.isFinite(shown)?usd(shown):'No disponible',Number.isFinite(shown)?usd(shown-record.cents):'No calculable'].forEach(text=>row.append(element('td',text)));table.append(row);
    }
    box.dataset.failures=failures;box.dataset.expectedCents=expected;box.dataset.actualCents=actual;
    const change=expected?((actual-expected)/expected*100):0;box.dataset.changePercent=change.toFixed(2);box.classList.add(failures?'lab-fail':'lab-pass');
    box.append(element('p',failures?`${failures} precios incorrectos. Referencia: ${usd(expected)} · publicado: ${usd(actual)} · diferencia: ${usd(actual-expected)} (${change.toFixed(2)}%).`:'Todos los importes coinciden con los datos de referencia de esta simulación.'),table);
    box.append(element('p','La referencia es una copia del dato inicial del demo, capturada antes del widget. En producción el importe debe validarse en el servidor.','lab-footnote'));
    return box;
  }
  function auditLayout(title) {
    const box=panel('layout',title);
    const controls=[...root.querySelectorAll('.primary-action')];
    const disabled=controls.filter(button=>getComputedStyle(button).pointerEvents==='none'||button.disabled||getComputedStyle(button).display==='none');
    box.dataset.blocked=disabled.length;box.classList.add(disabled.length?'lab-fail':'lab-pass');
    box.append(element('p',disabled.length?`${disabled.length} de ${controls.length} botones comerciales no reciben clics del puntero. En esta plantilla, el tercer bloque es la columna de acciones, no el desglose de precios.`:`${controls.length} botones comerciales conservan interacción de puntero. Comprueba también imágenes, lectura y teclado en la preview ampliada.`));
  }
  function showQuote(clickedNode, payload, title) {
    const expected=records.get(clickedNode);if(!expected)throw new Error('No hay referencia para la unidad seleccionada.');
    const matches=payload.sku===expected.sku&&payload.cents===expected.cents;
    const box=panel('quote',title);box.dataset.matches=matches;box.dataset.requestedSku=expected.sku;box.dataset.quotedSku=payload.sku;box.classList.add(matches?'lab-pass':'lab-fail');
    const table=element('table');
    for(const [label,value] of [['Solicitada',`${expected.name} · ${expected.sku} · ${usd(expected.cents)}`],['Cotizada',`${payload.name} · ${payload.sku} · ${usd(payload.cents)}`]]){
      const row=element('tr');row.append(element('th',label),element('td',value));table.append(row);
    }
    box.append(element('p',matches?'La cotización de prueba corresponde a la unidad y al importe seleccionados.':'REGRESIÓN: la cotización de prueba corresponde a otra unidad o a otro importe.'),table,element('p','No se creó ni envió ninguna cotización comercial.','lab-footnote'));
    box.scrollIntoView({block:'nearest'});
  }
  function quoteUnavailable(clickedNode, reason) {
    const box=panel('quote','Cotización bloqueada');box.classList.add('lab-fail');box.dataset.blocked='true';box.append(element('p',reason+' No se ha sustituido el precio por cero ni se ha generado una cotización.'));
  }
  window.InventoryLab=Object.freeze({reference: node=>records.get(node),auditPrices,auditLayout,showQuote,quoteUnavailable,usd});
})();
