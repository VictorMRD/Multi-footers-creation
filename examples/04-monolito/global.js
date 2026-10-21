// ============================================================
// WIDGET GLOBAL: estilos + dinero + identidad + eventos + CTA
// + seis contextos actuales y diez revisiones heredadas simuladas.
// Todo permanece en un único campo de edición, aunque solo se monte una ruta.
// Está ordenado y funciona. Sigue siendo una unidad de edición/publicación.
// ============================================================
(function ($) {
  const page = document.querySelector('.inventory-page');
  const type = page.dataset.inventoryType;
  const version = Number(page.dataset.version);
  const shared = {
    // Una edición aquí alcanza a Listing 4/5/6 y Details 1/3/6.
    ctaText: 'Solicitar información · demo',
    accent: '#007f86'
  };
  const css = `
/* ============================================================
   ESTILOS COMPARTIDOS — consumidos por las SEIS ramas del archivo.
   ============================================================ */
.inventory-page .vehicle-action { border-radius: 4px; }
.inventory-page .demo-module-note { padding: 12px; background: #edf7f6; border-left: 3px solid #007f86; color: #175752; font: 12px/1.7 Arial, sans-serif; }
/* LISTING V4 */
.inventory-v4 .grid-total .vehicle-price { font-size: 24px; }
.inventory-v4 .reference-actions { padding-inline: 20px; }
/* LISTING V5 */
.inventory-v5 .compact-pricing .vehicle-price { font-size: 27px; }
.inventory-v5 .reference-description { box-shadow: 0 2px 3px #0002; }
/* LISTING V6 */
.inventory-v6 .all-in-price .vehicle-price { font-size: 29px; }
.inventory-v6 .promotion { letter-spacing: .2px; }
/* DETAILS V1 */
.inventory-page[data-inventory-type="details"][data-version="1"] .detail-price { color: #007f86; }
/* DETAILS V3 */
.inventory-page[data-inventory-type="details"][data-version="3"] .detail-facts { border-color: #b8cbd0; }
/* DETAILS V6 */
.inventory-page[data-inventory-type="details"][data-version="6"] .detail-price { color: #345e8c; }

/* ============================================================
   CSS HISTÓRICO: selectores retirados, presentes en el mismo widget.
   Ninguna de estas clases pertenece a las vistas actuales.
   ============================================================ */

/* Listing V1 · filtros por hash de una plantilla retirada */
.legacy-listing-v1 { border: 1px solid #ccc; padding: 16px; }
.legacy-listing-v1 [hidden] { display: none; }
.legacy-listing-v1 button { min-height: 36px; border-radius: 3px; }
.legacy-listing-v1 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-listing-v1 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-listing-v1 { padding: 10px; }
  .legacy-listing-v1 button { width: 100%; }
}

/* Listing V2 · ordenamiento y paginación de tabla retirada */
.legacy-listing-table-v2 { border: 1px solid #ccc; padding: 16px; }
.legacy-listing-table-v2 [hidden] { display: none; }
.legacy-listing-table-v2 button { min-height: 36px; border-radius: 3px; }
.legacy-listing-table-v2 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-listing-table-v2 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-listing-table-v2 { padding: 10px; }
  .legacy-listing-table-v2 button { width: 100%; }
}

/* Listing V3 · comparación y favoritos de grid retirado */
.legacy-hybrid-grid-v3 { border: 1px solid #ccc; padding: 16px; }
.legacy-hybrid-grid-v3 [hidden] { display: none; }
.legacy-hybrid-grid-v3 button { min-height: 36px; border-radius: 3px; }
.legacy-hybrid-grid-v3 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-hybrid-grid-v3 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-hybrid-grid-v3 { padding: 10px; }
  .legacy-hybrid-grid-v3 button { width: 100%; }
}

/* Details V1 · pestañas de especificaciones antiguas */
.legacy-details-tabs-v1 { border: 1px solid #ccc; padding: 16px; }
.legacy-details-tabs-v1 [hidden] { display: none; }
.legacy-details-tabs-v1 button { min-height: 36px; border-radius: 3px; }
.legacy-details-tabs-v1 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-details-tabs-v1 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-details-tabs-v1 { padding: 10px; }
  .legacy-details-tabs-v1 button { width: 100%; }
}

/* Details V2 · galería retirada con controles propios */
.legacy-detail-gallery-v2 { border: 1px solid #ccc; padding: 16px; }
.legacy-detail-gallery-v2 [hidden] { display: none; }
.legacy-detail-gallery-v2 button { min-height: 36px; border-radius: 3px; }
.legacy-detail-gallery-v2 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-detail-gallery-v2 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-detail-gallery-v2 { padding: 10px; }
  .legacy-detail-gallery-v2 button { width: 100%; }
}

/* Details V3 · simulador financiero antiguo */
.legacy-finance-details-v3 { border: 1px solid #ccc; padding: 16px; }
.legacy-finance-details-v3 [hidden] { display: none; }
.legacy-finance-details-v3 button { min-height: 36px; border-radius: 3px; }
.legacy-finance-details-v3 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-finance-details-v3 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-finance-details-v3 { padding: 10px; }
  .legacy-finance-details-v3 button { width: 100%; }
}

/* Listing V4 revisión anterior · accesorios y cargos */
.legacy-accessories-card-v4 { border: 1px solid #ccc; padding: 16px; }
.legacy-accessories-card-v4 [hidden] { display: none; }
.legacy-accessories-card-v4 button { min-height: 36px; border-radius: 3px; }
.legacy-accessories-card-v4 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-accessories-card-v4 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-accessories-card-v4 { padding: 10px; }
  .legacy-accessories-card-v4 button { width: 100%; }
}

/* Listing V5 revisión anterior · formulario de consulta */
.legacy-lead-form-v5 { border: 1px solid #ccc; padding: 16px; }
.legacy-lead-form-v5 [hidden] { display: none; }
.legacy-lead-form-v5 button { min-height: 36px; border-radius: 3px; }
.legacy-lead-form-v5 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-lead-form-v5 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-lead-form-v5 { padding: 10px; }
  .legacy-lead-form-v5 button { width: 100%; }
}

/* Listing V6 beta retirada · presentación de cargos náuticos */
.legacy-marine-fees-v6 { border: 1px solid #ccc; padding: 16px; }
.legacy-marine-fees-v6 [hidden] { display: none; }
.legacy-marine-fees-v6 button { min-height: 36px; border-radius: 3px; }
.legacy-marine-fees-v6 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-marine-fees-v6 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-marine-fees-v6 { padding: 10px; }
  .legacy-marine-fees-v6 button { width: 100%; }
}

/* Details V6 beta retirada · paquetes y panel móvil */
.legacy-detail-packages-v6 { border: 1px solid #ccc; padding: 16px; }
.legacy-detail-packages-v6 [hidden] { display: none; }
.legacy-detail-packages-v6 button { min-height: 36px; border-radius: 3px; }
.legacy-detail-packages-v6 [aria-invalid="true"] { border-color: #b32d2e; }
.legacy-detail-packages-v6 .legacy-field-error { color: #b32d2e; font-size: 12px; }
@media (max-width: 600px) {
  .legacy-detail-packages-v6 { padding: 10px; }
  .legacy-detail-packages-v6 button { width: 100%; }
}
`;
  $('<style data-demo="entire-monolith">').text(css).appendTo('head');

  // ==========================================================
  // UTILIDADES: importe estructurado, escritura y eventos
  // ==========================================================
  function readCents(unit) {
    const cents = Number(unit.dataset.unitPriceCents);
    if (!Number.isSafeInteger(cents) || cents <= 0) throw new Error('Precio estructurado inválido.');
    return cents;
  }
  function writePrice(unit, selector) {
    const label = unit.querySelector(selector);
    if (!label) throw new Error('Contrato DOM incumplido: ' + selector);
    label.textContent = InventoryLab.usd(readCents(unit));
  }
  function markContext(label) {
    $('.demo-module-note').remove();
    $('<p class="demo-module-note">').text('Activo: ' + label + '. El resto de ramas permanece en el mismo archivo global.').prependTo(page);
  }
  function setButtons(selector) {
    $(selector).text(shared.ctaText).css({background: shared.accent, color: '#fff'});
  }
  function installQuoteHandler(unitSelector) {
    if (window.demoQuoteHandler) document.removeEventListener('click', window.demoQuoteHandler, true);
    window.demoQuoteHandler = function (event) {
      const button = event.target.closest('.vehicle-action');
      if (!button) return;
      const unit = button.closest(unitSelector);
      if (!unit) return;
      event.preventDefault(); event.stopImmediatePropagation();
      try {
        InventoryLab.showQuote(unit, {
          sku: unit.dataset.stock,
          name: unit.querySelector('.reference-description h2, .vehicle-body h2, :scope > h1').textContent.trim(),
          cents: readCents(unit)
        }, 'Cotización global con adaptador ' + type + ' V' + version);
      } catch (error) { InventoryLab.quoteUnavailable(unit, error.message); }
    };
    document.addEventListener('click', window.demoQuoteHandler, true);
  }

  // ==========================================================
  // LISTING / V4: tarjetas, precios finales y acciones
  // ==========================================================
// <module id="listing-v4" status="current">
  function listingV4() {
    document.querySelectorAll('.inventory-v4 .vehicle-card').forEach(unit => {
      writePrice(unit, '.grid-total .vehicle-price');
      unit.dataset.activeAdapter = 'listing-v4';
    });
    setButtons('.inventory-v4 .reference-actions .primary-action');
    installQuoteHandler('.vehicle-card');
    markContext('Listing V4');
    InventoryLab.auditPrices('Monolito: Listing V4');
  }
// </module>

  // ==========================================================
  // LISTING / V5: filas, precio compacto y Get Quote
  // ==========================================================
// <module id="listing-v5" status="current">
  function listingV5() {
    document.querySelectorAll('.inventory-v5 .vehicle-card').forEach(unit => {
      writePrice(unit, '.compact-pricing .vehicle-price');
      unit.dataset.activeAdapter = 'listing-v5';
    });
    setButtons('.inventory-v5 .reference-actions .primary-action');
    installQuoteHandler('.vehicle-card');
    markContext('Listing V5');
    InventoryLab.auditPrices('Monolito: Listing V5');
  }
// </module>

  // ==========================================================
  // LISTING / V6: All-In Price, promociones y consulta
  // ==========================================================
// <module id="listing-v6" status="current">
  function listingV6() {
    document.querySelectorAll('.inventory-v6 .vehicle-card').forEach(unit => {
      writePrice(unit, '.all-in-price .vehicle-price');
      unit.dataset.activeAdapter = 'listing-v6';
    });
    setButtons('.inventory-v6 .reference-actions .primary-action');
    installQuoteHandler('.vehicle-card');
    markContext('Listing V6');
    InventoryLab.auditPrices('Monolito: Listing V6');
  }
// </module>

  // ==========================================================
  // DETAILS / V1: ficha, importe y botón de contacto
  // ==========================================================
// <module id="details-v1" status="current">
  function detailsV1() {
    writePrice(page, '.detail-price');
    setButtons('.inventory-page > .vehicle-action');
    installQuoteHandler('.inventory-page');
    markContext('Details V1');
    InventoryLab.auditPrices('Monolito: Details V1');
  }
// </module>

  // ==========================================================
  // DETAILS / V3: ficha, importe y ficha técnica
  // ==========================================================
// <module id="details-v3" status="current">
  function detailsV3() {
    writePrice(page, '.detail-price');
    setButtons('.inventory-page > .vehicle-action');
    installQuoteHandler('.inventory-page');
    markContext('Details V3');
    InventoryLab.auditPrices('Monolito: Details V3');
  }
// </module>

  // ==========================================================
  // DETAILS / V6: ficha, importe y contacto especializado
  // ==========================================================
// <module id="details-v6" status="current">
  function detailsV6() {
    writePrice(page, '.detail-price');
    setButtons('.inventory-page > .vehicle-action');
    installQuoteHandler('.inventory-page');
    markContext('Details V6');
    InventoryLab.auditPrices('Monolito: Details V6');
  }
// </module>

  // ==========================================================
  // ARCHIVO HEREDADO: diez implementaciones de demostración.
  // Se conservan en este campo aunque el router NO las llama.
  // No se puede afirmar que una versión real del proveedor esté retirada.
  // Son revisiones históricas ficticias con selectores distintos.
  // ==========================================================
  let legacyMountAttempts = 0;

// <module id="legacy-listing-v1" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Listing V1 · filtros por hash de una plantilla retirada
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_listing_v1() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-listing-v1');
    if (!root.length) return false;
    const cards = root.find('.legacy-stock-card');
    const fields = root.find('[data-legacy-filter]');
    const summary = root.find('.legacy-results-summary');
    const selected = Object.create(null);

    function readHash() {
      const parameters = new URLSearchParams(location.hash.slice(1));
      fields.each(function () {
        const key = this.dataset.legacyFilter;
        this.value = parameters.get(key) || '';
        selected[key] = this.value;
      });
    }
    function applyFilters() {
      let visible = 0;
      cards.each(function () {
        const card = jQuery(this);
        const matches = Object.keys(selected).every(key => {
          return !selected[key] || String(card.data(key)) === selected[key];
        });
        card.toggle(matches);
        if (matches) visible++;
      });
      summary.text(visible + ' resultados heredados');
    }
    function writeHash() {
      const parameters = new URLSearchParams();
      Object.entries(selected).forEach(([key, value]) => {
        if (value) parameters.set(key, value);
      });
      history.replaceState(null, '', '#' + parameters.toString());
    }
    fields.off('.legacyV1').on('change.legacyV1', function () {
      selected[this.dataset.legacyFilter] = this.value;
      applyFilters();
      writeHash();
    });
    root.find('.legacy-clear-filters').off('.legacyV1').on('click.legacyV1', () => {
      fields.val('');
      Object.keys(selected).forEach(key => delete selected[key]);
      applyFilters();
      writeHash();
    });
    readHash();
    applyFilters();
    return true;
  }
// </module>

// <module id="legacy-listing-v2" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Listing V2 · ordenamiento y paginación de tabla retirada
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_listing_v2() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-listing-table-v2');
    if (!root.length) return false;
    const table = root.find('tbody');
    const originalRows = table.children('tr').toArray();
    const pageSize = 12;
    let currentPage = 1;
    let orderedRows = [...originalRows];

    function renderPage() {
      const start = (currentPage - 1) * pageSize;
      table.empty();
      orderedRows.slice(start, start + pageSize).forEach(row => table.append(row));
      root.find('.legacy-page-number').text(currentPage);
      root.find('.legacy-page-total').text(Math.ceil(orderedRows.length / pageSize));
      root.find('[data-page="previous"]').prop('disabled', currentPage === 1);
      root.find('[data-page="next"]').prop('disabled', start + pageSize >= orderedRows.length);
    }
    function numericCell(row, index) {
      const text = row.children[index]?.textContent || '0';
      return Number(text.replace(/[^0-9.-]/g, ''));
    }
    root.find('[data-legacy-sort]').off('.legacyV2').on('change.legacyV2', function () {
      const [column, direction] = this.value.split(':');
      orderedRows = [...originalRows].sort((left, right) => {
        const difference = numericCell(left, Number(column)) - numericCell(right, Number(column));
        return direction === 'desc' ? -difference : difference;
      });
      currentPage = 1;
      renderPage();
    });
    root.find('[data-page]').off('.legacyV2').on('click.legacyV2', function () {
      currentPage += this.dataset.page === 'next' ? 1 : -1;
      currentPage = Math.max(1, currentPage);
      renderPage();
    });
    root.find('.legacy-table-search').off('.legacyV2').on('input.legacyV2', function () {
      const query = this.value.trim().toLowerCase();
      orderedRows = originalRows.filter(row => row.textContent.toLowerCase().includes(query));
      currentPage = 1;
      renderPage();
    });
    renderPage();
    return true;
  }
// </module>

// <module id="legacy-listing-v3" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Listing V3 · comparación y favoritos de grid retirado
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_listing_v3() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-hybrid-grid-v3');
    if (!root.length) return false;
    const selected = new Map();
    const favorites = new Set();
    const comparison = root.find('.legacy-compare-tray');

    function renderComparison() {
      comparison.empty();
      for (const [stock, data] of selected) {
        const item = jQuery('<div class="legacy-compare-item">');
        jQuery('<strong>').text(data.name).appendTo(item);
        jQuery('<span>').text(data.price).appendTo(item);
        jQuery('<button type="button">').text('Quitar')
          .attr('data-remove-stock', stock).appendTo(item);
        comparison.append(item);
      }
      comparison.prop('hidden', selected.size === 0);
      root.find('.legacy-compare-count').text(selected.size);
    }
    root.off('.legacyV3').on('change.legacyV3', '.legacy-compare-checkbox', function () {
      const card = jQuery(this).closest('.legacy-grid-item');
      const stock = card.attr('data-stock-id');
      if (this.checked) {
        selected.set(stock, {
          name: card.find('.legacy-unit-name').text(),
          price: card.find('.legacy-unit-price').text()
        });
      } else selected.delete(stock);
      renderComparison();
    });
    comparison.off('.legacyV3').on('click.legacyV3', '[data-remove-stock]', function () {
      const stock = this.dataset.removeStock;
      selected.delete(stock);
      root.find('.legacy-grid-item').filter(function () {
        return this.dataset.stockId === stock;
      }).find('.legacy-compare-checkbox').prop('checked', false);
      renderComparison();
    });
    root.on('click.legacyV3', '.legacy-favorite', function () {
      const stock = jQuery(this).closest('.legacy-grid-item').attr('data-stock-id');
      if (favorites.has(stock)) favorites.delete(stock); else favorites.add(stock);
      jQuery(this).attr('aria-pressed', String(favorites.has(stock)));
    });
    renderComparison();
    return true;
  }
// </module>

// <module id="legacy-details-tabs" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Details V1 · pestañas de especificaciones antiguas
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_details_tabs() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-details-tabs-v1');
    if (!root.length) return false;
    const tabs = root.find('[role="tab"]');
    const panels = root.find('[role="tabpanel"]');
    let activeIndex = 0;

    function activate(index, focus) {
      activeIndex = (index + tabs.length) % tabs.length;
      tabs.each(function (position) {
        const active = position === activeIndex;
        jQuery(this).attr('aria-selected', String(active)).attr('tabindex', active ? 0 : -1);
        panels.eq(position).prop('hidden', !active);
      });
      if (focus) tabs.eq(activeIndex).trigger('focus');
    }
    tabs.off('.legacyTabs').on('click.legacyTabs', function () {
      activate(tabs.index(this), false);
    }).on('keydown.legacyTabs', function (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault(); activate(activeIndex + 1, true);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault(); activate(activeIndex - 1, true);
      }
      if (event.key === 'Home') {
        event.preventDefault(); activate(0, true);
      }
      if (event.key === 'End') {
        event.preventDefault(); activate(tabs.length - 1, true);
      }
    });
    root.find('.legacy-expand-specifications').off('.legacyTabs').on('click.legacyTabs', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      root.find('.legacy-hidden-specification').prop('hidden', expanded);
    });
    if (tabs.length) activate(0, false);
    return true;
  }
// </module>

// <module id="legacy-details-gallery" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Details V2 · galería retirada con controles propios
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_details_gallery() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-detail-gallery-v2');
    if (!root.length) return false;
    const slides = root.find('.legacy-gallery-slide');
    const thumbnails = root.find('.legacy-gallery-thumb');
    const caption = root.find('.legacy-gallery-caption');
    let current = 0;

    function show(index, focusThumbnail) {
      if (!slides.length) return;
      current = (index + slides.length) % slides.length;
      slides.each(function (position) {
        const visible = position === current;
        jQuery(this).prop('hidden', !visible).attr('aria-hidden', String(!visible));
      });
      thumbnails.attr('aria-current', 'false').eq(current).attr('aria-current', 'true');
      caption.text((current + 1) + ' / ' + slides.length);
      if (focusThumbnail) thumbnails.eq(current).trigger('focus');
    }
    root.find('.legacy-gallery-next').off('.legacyGallery').on('click.legacyGallery', () => show(current + 1, false));
    root.find('.legacy-gallery-prev').off('.legacyGallery').on('click.legacyGallery', () => show(current - 1, false));
    thumbnails.off('.legacyGallery').on('click.legacyGallery', function () {
      show(thumbnails.index(this), false);
    });
    root.off('keydown.legacyGallery').on('keydown.legacyGallery', event => {
      if (event.key === 'ArrowRight') show(current + 1, true);
      if (event.key === 'ArrowLeft') show(current - 1, true);
    });
    root.find('.legacy-gallery-zoom').off('.legacyGallery').on('click.legacyGallery', function () {
      const expanded = root.hasClass('legacy-gallery-expanded');
      root.toggleClass('legacy-gallery-expanded', !expanded);
      this.setAttribute('aria-expanded', String(!expanded));
    });
    show(0, false);
    return true;
  }
// </module>

// <module id="legacy-details-finance" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Details V3 · simulador financiero antiguo
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_details_finance() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-finance-details-v3');
    if (!root.length) return false;
    const priceField = root.find('[name="legacy-price"]');
    const depositField = root.find('[name="legacy-deposit"]');
    const monthsField = root.find('[name="legacy-months"]');
    const rateField = root.find('[name="legacy-rate"]');
    const output = root.find('.legacy-monthly-payment');
    const error = root.find('.legacy-finance-error');

    function calculate() {
      const price = Number(priceField.val());
      const deposit = Number(depositField.val());
      const months = Number(monthsField.val());
      const annualRate = Number(rateField.val());
      const valid = [price, deposit, months, annualRate].every(Number.isFinite)
        && price > 0 && deposit >= 0 && deposit <= price
        && Number.isInteger(months) && months > 0 && annualRate >= 0;
      if (!valid) {
        error.text('Revise los datos de la simulación histórica.');
        output.text('No disponible');
        return;
      }
      const principal = price - deposit;
      const monthlyRate = annualRate / 1200;
      const payment = monthlyRate === 0
        ? principal / months
        : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
      output.text(payment.toFixed(2));
      error.text('Ejemplo histórico de cálculo, sin oferta de crédito.');
      root.find('.legacy-principal').text(principal.toFixed(2));
      root.find('.legacy-total-payments').text((payment * months).toFixed(2));
      root.find('.legacy-total-interest').text((payment * months - principal).toFixed(2));
    }
    root.find('input, select').off('.legacyFinance').on('input.legacyFinance change.legacyFinance', calculate);
    root.find('.legacy-reset-finance').off('.legacyFinance').on('click.legacyFinance', () => {
      depositField.val(0);
      monthsField.val(60);
      rateField.val(0);
      calculate();
    });
    calculate();
    return true;
  }
// </module>

// <module id="legacy-v4-accessories" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Listing V4 revisión anterior · accesorios y cargos
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_v4_accessories() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-accessories-card-v4');
    if (!root.length) return false;
    const rows = root.find('.legacy-accessory-row');
    const selected = new Map();
    const currency = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'});

    function calculate() {
      const baseCents = Number(root.attr('data-legacy-base-cents'));
      if (!Number.isSafeInteger(baseCents) || baseCents < 0) return false;
      let accessoriesCents = 0;
      selected.clear();
      rows.each(function () {
        const row = jQuery(this);
        const quantity = Number(row.find('.legacy-accessory-qty').val());
        const cents = Number(this.dataset.legacyAccessoryCents);
        if (!Number.isSafeInteger(cents) || !Number.isInteger(quantity) || quantity < 0) return;
        const total = cents * quantity;
        if (quantity) selected.set(this.dataset.accessoryCode, {quantity, total});
        accessoriesCents += total;
        row.find('.legacy-accessory-total').text(currency.format(total / 100));
      });
      root.find('.legacy-accessory-subtotal').text(currency.format(accessoriesCents / 100));
      root.find('.legacy-configured-total').text(currency.format((baseCents + accessoriesCents) / 100));
      root.find('.legacy-selected-accessories').text(selected.size);
      return true;
    }
    root.off('.legacyAccessories').on('change.legacyAccessories', '.legacy-accessory-qty', calculate);
    root.on('click.legacyAccessories', '.legacy-clear-accessories', () => {
      rows.find('.legacy-accessory-qty').val(0);
      calculate();
    });
    root.on('click.legacyAccessories', '.legacy-copy-configuration', () => {
      if (!calculate()) return;
      // Solo muestra el JSON en el propio formulario; no envía datos.
      root.find('.legacy-configuration-json').text(JSON.stringify([...selected.entries()], null, 2));
    });
    calculate();
    return true;
  }
// </module>

// <module id="legacy-v5-lead-form" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Listing V5 revisión anterior · formulario de consulta
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_v5_lead_form() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-lead-form-v5');
    if (!root.length) return false;
    const fields = root.find('input, select, textarea');
    const summary = root.find('.legacy-form-summary');
    const rules = {
      email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      name: value => value.trim().length > 1,
      consent: value => value === 'yes'
    };

    function validateField(input) {
      const rule = rules[input.name];
      if (!rule) return true;
      const value = input.type === 'checkbox' ? (input.checked ? 'yes' : 'no') : input.value;
      const valid = rule(value);
      jQuery(input).attr('aria-invalid', String(!valid));
      jQuery(input).closest('.legacy-form-field').find('.legacy-field-error')
        .text(valid ? '' : 'Revise este dato.');
      return valid;
    }
    fields.off('.legacyLead').on('change.legacyLead blur.legacyLead', function () {
      validateField(this);
    });
    root.off('submit.legacyLead').on('submit.legacyLead', function (event) {
      event.preventDefault();
      const valid = fields.toArray().map(validateField).every(Boolean);
      if (!valid) {
        summary.text('Hay campos pendientes.');
        fields.filter('[aria-invalid="true"]').first().trigger('focus');
        return;
      }
      const payload = {};
      fields.each(function () {
        if (this.name && this.type !== 'password') payload[this.name] = this.type === 'checkbox' ? this.checked : this.value;
      });
      // Conservado como simulación: nunca hay fetch, AJAX ni envío de formulario.
      summary.text('Borrador local heredado: ' + Object.keys(payload).length + ' campos, sin envío.');
      root.find('.legacy-payload-preview').text(JSON.stringify(payload, null, 2));
    });
    return true;
  }
// </module>

// <module id="legacy-v6-marine-fees" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Listing V6 beta retirada · presentación de cargos náuticos
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_v6_marine_fees() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-marine-fees-v6');
    if (!root.length) return false;
    const breakdown = root.find('.legacy-marine-breakdown');
    const view = {showCharges: true, showIncentives: true};
    const format = cents => (cents / 100).toLocaleString('en-US', {style:'currency', currency:'USD'});

    function readRows() {
      return breakdown.find('[data-charge-cents]').toArray().map(row => ({
        kind: row.dataset.chargeKind,
        label: row.querySelector('.legacy-charge-label')?.textContent || '',
        cents: Number(row.dataset.chargeCents)
      })).filter(row => Number.isSafeInteger(row.cents));
    }
    function renderSummary() {
      const rows = readRows();
      const charges = rows.filter(row => row.kind === 'charge').reduce((sum, row) => sum + row.cents, 0);
      const incentives = rows.filter(row => row.kind === 'incentive').reduce((sum, row) => sum + row.cents, 0);
      root.find('.legacy-total-charges').text(format(charges));
      root.find('.legacy-total-incentives').text(format(incentives));
      breakdown.find('[data-charge-kind="charge"]').prop('hidden', !view.showCharges);
      breakdown.find('[data-charge-kind="incentive"]').prop('hidden', !view.showIncentives);
      root.find('.legacy-fee-disclosure').text(rows.length + ' conceptos en el desglose histórico.');
    }
    root.find('.legacy-toggle-charges').off('.legacyMarine').on('click.legacyMarine', function () {
      view.showCharges = !view.showCharges;
      this.setAttribute('aria-expanded', String(view.showCharges));
      renderSummary();
    });
    root.find('.legacy-toggle-incentives').off('.legacyMarine').on('click.legacyMarine', function () {
      view.showIncentives = !view.showIncentives;
      this.setAttribute('aria-expanded', String(view.showIncentives));
      renderSummary();
    });
    renderSummary();
    return true;
  }
// </module>

// <module id="legacy-v6-detail-packages" status="archived">
  // ARCHIVO HISTÓRICO SIMULADO: Details V6 beta retirada · paquetes y panel móvil
  // No corresponde al DOM actual. Se conserva para demostrar acumulación.
  function legacy_v6_detail_packages() {
    legacyMountAttempts++;
    const root = jQuery('.legacy-detail-packages-v6');
    if (!root.length) return false;
    const cards = root.find('.legacy-package-card');
    const selection = new Set();
    const drawer = root.find('.legacy-mobile-package-drawer');
    const launcher = root.find('.legacy-package-launcher');

    function renderSelection() {
      const names = [];
      cards.each(function () {
        const selected = selection.has(this.dataset.packageCode);
        jQuery(this).toggleClass('legacy-selected-package', selected);
        jQuery(this).find('.legacy-select-package').attr('aria-pressed', String(selected));
        if (selected) names.push(jQuery(this).find('.legacy-package-name').text());
      });
      root.find('.legacy-package-count').text(names.length);
      root.find('.legacy-package-names').text(names.join(', ') || 'Sin paquetes');
    }
    root.off('.legacyPackages').on('click.legacyPackages', '.legacy-select-package', function () {
      const code = jQuery(this).closest('.legacy-package-card').attr('data-package-code');
      if (selection.has(code)) selection.delete(code); else selection.add(code);
      renderSelection();
    });
    function setDrawer(open) {
      drawer.prop('hidden', !open);
      launcher.attr('aria-expanded', String(open));
      if (open) drawer.find('button').first().trigger('focus');
      else launcher.trigger('focus');
    }
    launcher.off('.legacyPackages').on('click.legacyPackages', () => setDrawer(true));
    drawer.find('.legacy-close-drawer').off('.legacyPackages').on('click.legacyPackages', () => setDrawer(false));
    drawer.off('keydown.legacyPackages').on('keydown.legacyPackages', event => {
      if (event.key === 'Escape') setDrawer(false);
    });
    renderSelection();
    return true;
  }
// </module>

  const legacyRegistry = Object.freeze([
    Object.freeze({"id": "legacy-listing-v1", "label": "Listing V1 · filtros por hash de una plantilla retirada", "selector": ".legacy-listing-v1"}),
    Object.freeze({"id": "legacy-listing-v2", "label": "Listing V2 · ordenamiento y paginación de tabla retirada", "selector": ".legacy-listing-table-v2"}),
    Object.freeze({"id": "legacy-listing-v3", "label": "Listing V3 · comparación y favoritos de grid retirado", "selector": ".legacy-hybrid-grid-v3"}),
    Object.freeze({"id": "legacy-details-tabs", "label": "Details V1 · pestañas de especificaciones antiguas", "selector": ".legacy-details-tabs-v1"}),
    Object.freeze({"id": "legacy-details-gallery", "label": "Details V2 · galería retirada con controles propios", "selector": ".legacy-detail-gallery-v2"}),
    Object.freeze({"id": "legacy-details-finance", "label": "Details V3 · simulador financiero antiguo", "selector": ".legacy-finance-details-v3"}),
    Object.freeze({"id": "legacy-v4-accessories", "label": "Listing V4 revisión anterior · accesorios y cargos", "selector": ".legacy-accessories-card-v4"}),
    Object.freeze({"id": "legacy-v5-lead-form", "label": "Listing V5 revisión anterior · formulario de consulta", "selector": ".legacy-lead-form-v5"}),
    Object.freeze({"id": "legacy-v6-marine-fees", "label": "Listing V6 beta retirada · presentación de cargos náuticos", "selector": ".legacy-marine-fees-v6"}),
    Object.freeze({"id": "legacy-v6-detail-packages", "label": "Details V6 beta retirada · paquetes y panel móvil", "selector": ".legacy-detail-packages-v6"})
  ]);

  // ==========================================================
  // ROUTER: cualquier versión nueva requiere editar este bloque.
  // ==========================================================
  const routes = {
    listing: {4: listingV4, 5: listingV5, 6: listingV6},
    details: {1: detailsV1, 3: detailsV3, 6: detailsV6}
  };
  const mount = routes[type]?.[version];
  if (mount) mount();
  // Este inventario de código describe lo realmente definido y lo montado.
  // Las funciones heredadas siguen presentes, pero sus invocaciones son cero.
  window.InventoryMonolithReport = Object.freeze({
    activeContext: type + '-v' + version,
    currentContexts: Object.values(routes).reduce((count, group) => count + Object.keys(group).length, 0),
    archivedModules: legacyRegistry.length,
    currentMounted: mount ? 1 : 0,
    get archivedMountAttempts() { return legacyMountAttempts; },
    archived: legacyRegistry
  });
  const report = window.InventoryMonolithReport;
  const inventory = $('<aside class="demo-code-inventory">');
  $('<strong>').text('Un widget: ' + report.currentContexts + ' contextos actuales + ' + report.archivedModules + ' módulos históricos simulados').appendTo(inventory);
  $('<p>').text('Activo: ' + report.activeContext + '. Montados: ' + report.currentMounted + ' actual; ' + report.archivedMountAttempts + ' heredados. El archivo completo permanece en el campo global.').appendTo(inventory);
  $('<small>').text('Código histórico de demostración: no representa el estado de versiones reales del proveedor.').appendTo(inventory);
  inventory.prependTo(page);
})(jQuery);
