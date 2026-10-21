// Listing V6: solo el CTA de esta vista, con eventos nombrados.
(function ($) {
  const buttons = $('.reference-actions .primary-action');
  buttons.text("Consultar embarcación · V6");
  buttons.off('click.demoCTA').on('click.demoCTA', function () {
    const scope = $(this).closest('.vehicle-card, .inventory-page');
    scope.find('.demo-feedback').remove();
    $('<p class="demo-feedback">').text('Interacción de ejemplo: Consultar embarcación · V6. No se envió ninguna solicitud.').appendTo(scope);
  });
})(jQuery);
