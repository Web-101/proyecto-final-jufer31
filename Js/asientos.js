
var FILAS = ['A','B','C','D','E','F','G','H'];
var COLUMNAS = 8;

var peliculaId     = sessionStorage.getItem('peliculaId') || '1';
var peliculaTitulo = sessionStorage.getItem('peliculaTitulo') || 'Blade Runner 2099';
var peliculaImagen = sessionStorage.getItem('peliculaImagen') || 'img/blade-runner-2099.png';
var funcionHora    = sessionStorage.getItem('funcionHora') || '18:00';
var precio         = parseInt(sessionStorage.getItem('precio')) || 25;

var asientosOcupadosPorPelicula = {
  '1': ["A2","A5","B3","B7","C1","C4","C6","D2","D5","E3","E7","F1","F4","G2","G6","H3","H7"],
  '2': ["A1","A4","B2","B6","C3","C7","D1","D4","E2","E5","F3","F6","G1","G4","H2","H7"],
  '3': ["A3","A6","B1","B5","C2","C7","D3","D6","E1","E4","F2","F7","G3","G5","H1","H6"],
  '4': ["A2","A7","B3","B5","C1","C4","D2","D7","E3","E6","F1","F5","G2","G7","H4","H6"],
  '5': ["A1","A6","B2","B4","C3","C7","D1","D5","E2","E6","F3","F7","G1","G4","H2","H5"],
  '6': ["A3","A5","B1","B6","C2","C4","D3","D7","E1","E5","F2","F6","G3","G7","H1","H4"],
  '7': ["A2","A4","B3","B7","C1","C5","D2","D6","E3","E7","F1","F4","G2","G5","H3","H7"],
  '8': ["A1","A5","B2","B6","C3","C7","D1","D4","E2","E7","F3","F5","G1","G6","H2","H4"]
};

var asientosOcupados      = asientosOcupadosPorPelicula[peliculaId] || asientosOcupadosPorPelicula['1'];
var asientosSeleccionados = [];

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('sala-titulo').textContent  = peliculaTitulo;
  document.getElementById('sala-funcion').textContent = 'JuferMovie · Sala 7';

  var imagenMini = document.getElementById('sala-imagen');
  imagenMini.src = peliculaImagen;
  imagenMini.alt = peliculaTitulo;

  var contenedorHorarios = document.getElementById('sala-horarios');
  var pillHora = document.createElement('div');
  pillHora.className   = 'hora-pill activo';
  pillHora.textContent = funcionHora;
  contenedorHorarios.appendChild(pillHora);

  generarSala();
});

function generarSala() {
  var grilla = document.getElementById('asientos-grilla');
  grilla.innerHTML = '';

  FILAS.forEach(function (fila) {
    var filaDiv = document.createElement('div');
    filaDiv.className = 'fila';

    var etiquetaIzq = document.createElement('span');
    etiquetaIzq.className   = 'fila-etiqueta';
    etiquetaIzq.textContent = fila;
    filaDiv.appendChild(etiquetaIzq);

    for (var col = 1; col <= COLUMNAS; col++) {
      var idAsiento = fila + col;
      var boton     = document.createElement('button');
      boton.className  = 'asiento';
      boton.dataset.id = idAsiento;
      boton.title      = idAsiento;

      if (asientosOcupados.indexOf(idAsiento) !== -1) {
        boton.classList.add('ocupado');
        boton.disabled = true;
      } else {
        boton.classList.add('disponible');
        boton.addEventListener('click', function () {
          cambiarEstadoAsiento(this);
        });
      }
      filaDiv.appendChild(boton);
    }

    var etiquetaDer = document.createElement('span');
    etiquetaDer.className   = 'fila-etiqueta';
    etiquetaDer.textContent = fila;
    filaDiv.appendChild(etiquetaDer);

    grilla.appendChild(filaDiv);
  });
}

function cambiarEstadoAsiento(boton) {
  var id = boton.dataset.id;

  if (boton.classList.contains('seleccionado')) {
    boton.classList.remove('seleccionado');
    boton.classList.add('disponible');
    asientosSeleccionados = asientosSeleccionados.filter(function (a) { return a !== id; });
  } else {
    boton.classList.remove('disponible');
    boton.classList.add('seleccionado');
    asientosSeleccionados.push(id);
  }

  actualizarResumen();
}

function actualizarResumen() {
  var contenedorPills = document.getElementById('resumen-pills');
  var textoEntradas   = document.getElementById('resumen-entradas');
  var textoTotal      = document.getElementById('resumen-total');
  var botonConfirmar  = document.getElementById('btn-confirmar');

  contenedorPills.innerHTML = '';
  asientosSeleccionados.forEach(function (id) {
    var pill = document.createElement('span');
    pill.className   = 'asiento-pill';
    pill.textContent = id;
    contenedorPills.appendChild(pill);
  });

  var cantidad = asientosSeleccionados.length;
  var total    = cantidad * precio;

  textoEntradas.textContent = cantidad + ' entrada' + (cantidad === 1 ? '' : 's') + ' · ' + funcionHora;
  textoTotal.textContent    = 'Bs. ' + total.toFixed(2);

  if (cantidad === 0) {
    botonConfirmar.disabled      = true;
    botonConfirmar.style.opacity = '0.4';
    botonConfirmar.style.cursor  = 'not-allowed';
    botonConfirmar.onclick       = null;
  } else {
    botonConfirmar.disabled      = false;
    botonConfirmar.style.opacity = '1';
    botonConfirmar.style.cursor  = 'pointer';
    botonConfirmar.onclick = function () {
      sessionStorage.setItem('asientosSeleccionados', asientosSeleccionados.join(','));
      sessionStorage.setItem('totalPagar', total.toFixed(2));
      window.location.href = 'formulario.html';
    };
  }
}