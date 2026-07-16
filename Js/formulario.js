
var metodoPago = 'tarjeta';

document.addEventListener('DOMContentLoaded', function() {
  var titulo   = sessionStorage.getItem('peliculaTitulo') || '-';
  var imagen   = sessionStorage.getItem('peliculaImagen') || '';
  var hora     = sessionStorage.getItem('funcionHora') || '-';
  var asientos = sessionStorage.getItem('asientosSeleccionados') || '';
  var total    = parseFloat(sessionStorage.getItem('totalPagar')) || 0;

  if (!titulo || titulo === '-') {
    window.location.href = 'index.html';
    return;
  }

  var lista    = asientos ? asientos.split(',') : [];
  var servicio = parseFloat((total * 0.08).toFixed(2));
  var totalFin = parseFloat((total + servicio).toFixed(2));

  // Imagen
  var img = document.getElementById('res-imagen');
  if (imagen) { img.src = imagen; img.alt = titulo; }

  // Rellenar resumen
  document.getElementById('res-pelicula').textContent  = titulo;
  document.getElementById('res-hora').textContent      = hora;
  document.getElementById('res-cantidad').textContent  = lista.length + ' x Adulto';
  document.getElementById('res-subtotal').textContent  = 'Bs. ' + total.toFixed(2);
  document.getElementById('res-servicio').textContent  = 'Bs. ' + servicio.toFixed(2);
  document.getElementById('res-total').textContent     = 'Bs. ' + totalFin.toFixed(2);
  document.getElementById('btn-total-texto').textContent = 'Bs. ' + totalFin.toFixed(2);
  document.getElementById('qr-monto').textContent      = 'Bs. ' + totalFin.toFixed(2);

  // Pills de asientos
  var pillsDiv = document.getElementById('res-pills');
  lista.forEach(function(id) {
    var p = document.createElement('span');
    p.className   = 'asiento-pill';
    p.textContent = id;
    pillsDiv.appendChild(p);
  });

  // Guardar total final para confirmación
  sessionStorage.setItem('totalFinal', totalFin.toFixed(2));
  sessionStorage.setItem('cantidadEntradas', lista.length);

  // Botón pagar
  document.getElementById('btn-pagar').addEventListener('click', function() {
    if (validar()) {
      sessionStorage.setItem('nombreComprador', document.getElementById('nombre').value.trim());
      sessionStorage.setItem('emailComprador', document.getElementById('email').value.trim());
      sessionStorage.setItem('metodoPago', metodoPago);
      window.location.href = 'confirmacion.html';
    }
  });
});

// Cambiar método de pago
function seleccionarMetodo(metodo) {
  metodoPago = metodo;
  document.getElementById('tab-tarjeta').classList.toggle('active', metodo === 'tarjeta');
  document.getElementById('tab-qr').classList.toggle('active', metodo === 'qr');
  document.getElementById('pago-tarjeta').style.display = metodo === 'tarjeta' ? 'block' : 'none';
  document.getElementById('pago-qr').style.display      = metodo === 'qr'      ? 'block' : 'none';
}

// Formatear número de tarjeta: grupos de 4
function formatarTarjeta(input) {
  var val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

// Formatear fecha MM/AA
function formatarFecha(input) {
  var val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 3) {
    input.value = val.substring(0,2) + '/' + val.substring(2);
  } else {
    input.value = val;
  }
}

function validar() {
  var ok = true;

  // Nombre
  var nombre = document.getElementById('nombre').value.trim();
  mostrarError('error-nombre', 'nombre', !nombre);
  if (!nombre) ok = false;

  // Email
  var email = document.getElementById('email').value.trim();
  var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  mostrarError('error-email', 'email', !regEmail.test(email));
  if (!regEmail.test(email)) ok = false;

  // Validación tarjeta
  if (metodoPago === 'tarjeta') {
    var num = document.getElementById('num-tarjeta').value.replace(/\s/g,'');
    mostrarError('error-tarjeta', 'num-tarjeta', num.length < 16);
    if (num.length < 16) ok = false;

    var nomT = document.getElementById('nombre-tarjeta').value.trim();
    mostrarError('error-nombre-tarjeta', 'nombre-tarjeta', !nomT);
    if (!nomT) ok = false;

    var fecha = document.getElementById('vencimiento').value;
    mostrarError('error-vencimiento', 'vencimiento', fecha.length < 5);
    if (fecha.length < 5) ok = false;

    var cvv = document.getElementById('cvv').value;
    mostrarError('error-cvv', 'cvv', cvv.length < 3);
    if (cvv.length < 3) ok = false;
  }

  return ok;
}

function mostrarError(errorId, inputId, mostrar) {
  var err   = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (err)   err.style.display = mostrar ? 'block' : 'none';
  if (input) input.classList.toggle('error', mostrar);
}