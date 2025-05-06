// Generar PDF del cuestionario como tarjetas visuales
function exportarPDF() {
  const preguntas = JSON.parse(localStorage.getItem('cuestionarioCompleto') || '[]');
  if (!preguntas.length) {
    alert("No hay preguntas para exportar.");
    return;
  }

  const ventana = window.open('', '_blank');
  ventana.document.write('<html><head><title>Cuestionario PDF</title><style>');
  ventana.document.write('body { font-family: Arial; padding: 20px; }');
  ventana.document.write('.tarjeta { border: 2px solid #333; padding: 15px; border-radius: 10px; margin-bottom: 20px; }');
  ventana.document.write('.tarjeta img { max-width: 200px; display: block; margin-bottom: 10px; }');
  ventana.document.write('</style></head><body>');

  preguntas.forEach((preg, i) => {
    ventana.document.write('<div class="tarjeta">');
    ventana.document.write('<h3>Pregunta ' + (i + 1) + '</h3>');
    if (preg.imagenEnunciado) {
      ventana.document.write('<img src="' + preg.imagenEnunciado + '"/>');
    }
    ventana.document.write('<p><strong>' + preg.titulo + '</strong></p>');
    ventana.document.write('<p><em>Dificultad: ' + preg.dificultad + '</em></p>');
    ventana.document.write('<ul>');
    preg.elementos.forEach(e => {
      ventana.document.write('<li>' + e.texto + '</li>');
    });
    ventana.document.write('</ul>');
    ventana.document.write('</div>');
  });

  ventana.document.write('</body></html>');
  ventana.document.close();
  ventana.print();
}

// Generar enlace compartible (simulación con localStorage)
function copiarEnlace() {
  const encoded = encodeURIComponent(localStorage.getItem('cuestionarioCompleto') || '');
  const enlace = location.origin + location.pathname + '?q=' + encoded;
  navigator.clipboard.writeText(enlace);
  alert("Enlace copiado al portapapeles");
}
