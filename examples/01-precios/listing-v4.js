// Listing V4: el importe viene del dato estructurado, no del texto del diseño.
(function ($) {
  $('.inventory-v4 .vehicle-card').each(function () {
    const price = this.querySelector('.grid-total .vehicle-price');
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
  InventoryLab.auditPrices('Solución: contrato de precio de Listing V4');
})(jQuery);
