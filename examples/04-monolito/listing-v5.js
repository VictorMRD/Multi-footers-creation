// Listing V5: el importe viene del dato estructurado, no del texto del diseño.
(function ($) {
  $('.inventory-v5 .vehicle-card').each(function () {
    const price = this.querySelector('.compact-pricing .vehicle-price');
    if (!price) return;
    const cents = Number(this.dataset.unitPriceCents);
    if (!Number.isSafeInteger(cents) || cents <= 0) {
      price.textContent = 'Precio no disponible';
      this.querySelectorAll('.vehicle-action').forEach(button => button.disabled = true);
      return; // No usar cero ni un subtotal como sustituto.
    }
    price.textContent = InventoryLab.usd(cents);
    this.dataset.price = String(cents / 100);
  });
  InventoryLab.auditPrices('Solución: contrato de precio de Listing V5');
})(jQuery);

// Mensaje exclusivo de listing V5. No modifica otros contenedores.
jQuery(".inventory-v5 .reference-actions .primary-action").text("Cotizar este vehículo · V5");

// Listing V5: resolver la unidad desde el botón pulsado.
(function () {
  if (window.demoQuoteHandler) document.removeEventListener('click', window.demoQuoteHandler, true);
  window.demoQuoteHandler = function (event) {
    const button = event.target.closest('.vehicle-action');
    if (!button || !button.closest('.inventory-v5')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const unit = button.closest('.vehicle-card');
    const cents = Number(unit?.dataset.unitPriceCents);
    if (!unit?.dataset.stock || !Number.isSafeInteger(cents) || cents <= 0) {
      InventoryLab.quoteUnavailable(unit, 'Faltan identificador o precio verificables.');
      return;
    }
    InventoryLab.showQuote(unit, {
      sku: unit.dataset.stock,
      name: unit.querySelector('.reference-description h2, .vehicle-body h2, :scope > h1').textContent.trim(),
      cents
    }, 'Cotización correcta · Listing V5');
  };
  document.addEventListener('click', window.demoQuoteHandler, true);
})();
