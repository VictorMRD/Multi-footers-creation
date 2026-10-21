// Details V3: solo el CTA de esta vista, con eventos nombrados.
(function ($) {
  const buttons = $('.inventory-page > .vehicle-action');
  buttons.text("Solicitar ficha técnica · D3");
  buttons.off('click.demoCTA').on('click.demoCTA', function () {
    const scope = $(this).closest('.vehicle-card, .inventory-page');
    scope.find('.demo-feedback').remove();
    $('<p class="demo-feedback">').text('Interacción de ejemplo: Solicitar ficha técnica · D3. No se envió ninguna solicitud.').appendTo(scope);
  });
})(jQuery);
