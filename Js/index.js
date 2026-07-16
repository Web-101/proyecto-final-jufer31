
// Cuando la pagina termina de cargar, llamamos al servidor
document.addEventListener('DOMContentLoaded', function () {
  cargarPeliculas();
});

// Funcion que pide las peliculas al servidor
function cargarPeliculas() {
  fetch('/api/cartelera')
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (peliculas) {
      mostrarPeliculas(peliculas);
    })
    .catch(function (error) {
      console.error('Error al cargar las peliculas:', error);
      document.getElementById('grilla-peliculas').innerHTML =
        '<p class="cargando">No se pudo cargar la cartelera. Verifica que el servidor este corriendo.</p>';
    });
}

// Funcion que crea las tarjetas de cada pelicula
function mostrarPeliculas(peliculas) {
  var grilla = document.getElementById('grilla-peliculas');
  grilla.innerHTML = '';

  peliculas.forEach(function (pelicula) {
    // Creamos el enlace que va a la pagina de detalle
    var tarjeta = document.createElement('a');
    tarjeta.href = 'detalle.html?id=' + pelicula.id;
    tarjeta.className = 'tarjeta-pelicula';

    // Contenido de la tarjeta
    tarjeta.innerHTML =
      '<div class="tarjeta-imagen">' +
        '<img src="' + pelicula.imagen + '" alt="' + pelicula.titulo + '" />' +
        '<span class="tarjeta-etiqueta" style="background:' + pelicula.colorEtiqueta + '; color:' + pelicula.colorTextoEtiqueta + ';">' +
          pelicula.etiqueta +
        '</span>' +
        '<span class="tarjeta-calificacion">&#9733; ' + pelicula.calificacion + '</span>' +
      '</div>' +
      '<div class="tarjeta-cuerpo">' +
        '<p class="tarjeta-titulo">' + pelicula.titulo + '</p>' +
        '<p class="tarjeta-genero">' + pelicula.genero + '</p>' +
        '<div class="tarjeta-pie">' +
          '<span class="tarjeta-duracion">&#9201; ' + pelicula.duracion + '</span>' +
          '<div class="tarjeta-botones">' +
            '<button class="boton-sm boton-info" onclick="event.preventDefault()">Info</button>' +
            '<button class="boton-sm boton-comprar" onclick="event.preventDefault(); window.location.href=\'detalle.html?id=' + pelicula.id + '\'">Buy</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    grilla.appendChild(tarjeta);
  });
}