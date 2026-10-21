// Listing V5: solo el CTA de esta vista, con eventos nombrados.
(function ($) {
  const buttons = $('.reference-actions .primary-action');
  buttons.text("Cotizar este vehículo · V5");
  buttons.off('click.demoCTA').on('click.demoCTA', function () {
    const scope = $(this).closest('.vehicle-card, .inventory-page');
    scope.find('.demo-feedback').remove();
    $('<p class="demo-feedback">').text('Interacción de ejemplo: Cotizar este vehículo · V5. No se envió ninguna solicitud.').appendTo(scope);
  });
})(jQuery);
