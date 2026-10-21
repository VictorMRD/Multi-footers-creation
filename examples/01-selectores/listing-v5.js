// Listing V5: punto de inserción propio de esta plantilla.
(function ($) {
  $('.vehicle-card').each(function () {
    const card = this;
    const target = card.querySelector('.compact-pricing > div:first-child');
    if (!target) return; // Guarda ante una actualización inesperada del DOM.
    const weekly = (Number(card.dataset.price) / 52).toLocaleString('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0});
    target.querySelector('.demo-budget')?.remove();
    const badge = document.createElement('div');
    badge.className = 'demo-budget';
    badge.innerHTML = '<strong>' + weekly + '/semana</strong>Precio ÷ 52. Ejemplo matemático; no es una oferta de financiación.';
    target.append(badge);
  });
  document.querySelector('.inventory-page').dataset.demoCompleted = 'true';
})(jQuery);
