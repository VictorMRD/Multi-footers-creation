// Details V6: resolver la unidad desde el botón pulsado.
(function () {
  if (window.demoQuoteHandler) document.removeEventListener('click', window.demoQuoteHandler, true);
  window.demoQuoteHandler = function (event) {
    const button = event.target.closest('.vehicle-action');
    if (!button || !button.closest('.inventory-page')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const unit = button.closest('.inventory-page');
    const cents = Number(unit?.dataset.unitPriceCents);
    if (!unit?.dataset.stock || !Number.isSafeInteger(cents) || cents <= 0) {
      InventoryLab.quoteUnavailable(unit, 'Faltan identificador o precio verificables.');
      return;
    }
    InventoryLab.showQuote(unit, {
      sku: unit.dataset.stock,
      name: unit.querySelector('h2, h1').textContent.trim(),
      cents
    }, 'Cotización correcta · Details V6');
  };
  document.addEventListener('click', window.demoQuoteHandler, true);
})();
