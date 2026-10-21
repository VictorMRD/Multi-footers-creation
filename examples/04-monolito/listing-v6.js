// Listing V6: el importe viene del dato estructurado, no del texto del diseño.
(function ($) {
  $('.inventory-v6 .vehicle-card').each(function () {
    const price = this.querySelector('.all-in-price .vehicle-price');
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
  InventoryLab.auditPrices('Solución: contrato de precio de Listing V6');
})(jQuery);

// Mensaje exclusivo de listing V6. No modifica otros contenedores.
jQuery(".inventory-v6 .reference-actions .primary-action").text("Consultar embarcación · V6");

// Listing V6: resolver la unidad desde el botón pulsado.
(function () {
  if (window.demoQuoteHandler) document.removeEventListener('click', window.demoQuoteHandler, true);
  window.demoQuoteHandler = function (event) {
    const button = event.target.closest('.vehicle-action');
    if (!button || !button.closest('.inventory-v6')) return;
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
    }, 'Cotización correcta · Listing V6');
  };
  document.addEventListener('click', window.demoQuoteHandler, true);
})();
