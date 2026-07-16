
document.addEventListener('DOMContentLoaded', function() {
  var nombre   = sessionStorage.getItem('nombreComprador') || 'Cliente';
  var titulo   = sessionStorage.getItem('peliculaTitulo')  || '-';
  var imagen   = sessionStorage.getItem('peliculaImagen')  || '';
  var hora     = sessionStorage.getItem('funcionHora')     || '-';
  var asientos = sessionStorage.getItem('asientosSeleccionados') || '';
  var total    = sessionStorage.getItem('totalFinal')      || '0';
  var cantidad = sessionStorage.getItem('cantidadEntradas')|| '0';

  if (!titulo || titulo === '-') {
    window.location.href = 'index.html';
    return;
  }

  var lista = asientos ? asientos.split(',') : [];

  // Imagen
  var img = document.getElementById('ticket-imagen');
  if (imagen) { img.src = imagen; img.alt = titulo; }

  // Rellenar ticket
  document.getElementById('ticket-titulo').textContent    = titulo;
  document.getElementById('ticket-funcion').textContent   = hora;
  document.getElementById('ticket-asientos').textContent  = lista.join(', ');
  document.getElementById('ticket-entradas').textContent  = cantidad + ' Adulto';
  document.getElementById('ticket-total').textContent     = 'Bs. ' + total;
  document.getElementById('ticket-total-footer').textContent = 'Bs. ' + total;

  // Código único simulado
  var codigo = 'JUFER-' + Math.floor(Math.random() * 9000 + 1000);
  document.getElementById('ticket-codigo').textContent = 'Código: ' + codigo;

  // Limpiar sesión
  sessionStorage.clear();
});