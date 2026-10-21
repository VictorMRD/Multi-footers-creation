// Details V1: el precio procede del contrato de esta ficha.
(function () {
  const page = document.querySelector('.inventory-page');
  const cents = Number(page.dataset.unitPriceCents);
  const price = page.querySelector('.detail-price');
  if (!Number.isSafeInteger(cents) || cents <= 0) {
    price.textContent = 'Precio no disponible';
    page.querySelector('.vehicle-action').disabled = true;
    return;
  }
  price.textContent = InventoryLab.usd(cents);
  InventoryLab.auditPrices('Solución: Details V1');
})();

// Mensaje exclusivo de details V1. No modifica otros contenedores.
jQuery(".inventory-page > .vehicle-action").text("Solicitar ficha técnica · D1");

// Details V1: resolver la unidad desde el botón pulsado.
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
    }, 'Cotización correcta · Details V1');
  };
  document.addEventListener('click', window.demoQuoteHandler, true);
})();
