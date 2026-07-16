
var peliculas = [
  { id: 1, titulo: "Blade Runner 2099", genero: "Sci-Fi · Cyberpunk", calificacion: 9.1, duracion: "2h 28m", etiqueta: "ESTRENO", colorEtiqueta: "#00f5ff", colorTextoEtiqueta: "#050810", imagen: "img/blade-runner-2099.png", sinopsis: "En una Neo-Los Angeles del futuro, un nuevo cazador de replicantes debe confrontar su propia humanidad mientras persigue a una nueva generacion de androides perfectos.", funciones: ["15:00","18:00","20:30","23:00"], precio: 25 },
  { id: 2, titulo: "Dune: Parte Tres", genero: "Sci-Fi · Epico", calificacion: 8.9, duracion: "2h 52m", etiqueta: "IMAX", colorEtiqueta: "#9d00ff", colorTextoEtiqueta: "#fff", imagen: "img/dune-parte-tres.png", sinopsis: "Paul Atreides lidera a los Fremen hacia la conquista del Imperio Galactico mientras el Gusano de Fuego despierta en las profundidades de Arrakis.", funciones: ["14:00","17:30","21:00"], precio: 30 },
  { id: 3, titulo: "The Witcher: Caos y Ley", genero: "Dark Fantasy", calificacion: 8.6, duracion: "2h 15m", etiqueta: "4K", colorEtiqueta: "#ff4400", colorTextoEtiqueta: "#fff", imagen: "img/the-witcher-caos-y-ley.png", sinopsis: "Geralt de Rivia enfrenta su destino final mientras el caos y la ley colisionan en un mundo al borde del colapso.", funciones: ["16:00","19:00","22:00"], precio: 25 },
  { id: 4, titulo: "Avatar: Fuego y Ceniza", genero: "Sci-Fi · Aventura", calificacion: 8.4, duracion: "3h 05m", etiqueta: "3D", colorEtiqueta: "#00aaff", colorTextoEtiqueta: "#fff", imagen: "img/avatar-fuego-y-ceniza.png", sinopsis: "Jake Sully y Neytiri regresan a Pandora para enfrentar una nueva amenaza que podria destruir su hogar y todo lo que aman.", funciones: ["13:00","16:30","20:00"], precio: 35 },
  { id: 5, titulo: "Cyberpunk: Edgerunners", genero: "Sci-Fi · Cyberpunk", calificacion: 9.2, duracion: "1h 48m", etiqueta: "ESTRENO", colorEtiqueta: "#00f5ff", colorTextoEtiqueta: "#050810", imagen: "img/cyberpunk-edgerunners.png", sinopsis: "En Night City, un joven de la calle decide sobrevivir en una ciudad obsesionada con el poder convirtiendose en un mercenario outlaw.", funciones: ["15:30","18:30","21:30"], precio: 25 },
  { id: 6, titulo: "Tron: Renegade", genero: "Sci-Fi · Accion", calificacion: 9.0, duracion: "2h 10m", etiqueta: "IMAX", colorEtiqueta: "#9d00ff", colorTextoEtiqueta: "#fff", imagen: "img/tron-renegade.png", sinopsis: "Un nuevo programa desafia el control del sistema dentro de la Rejilla digital, desatando una revolucion que amenaza con escapar al mundo real.", funciones: ["14:30","17:00","20:30","23:30"], precio: 30 },
  { id: 7, titulo: "Shadow & Bone: El Fin", genero: "Dark Fantasy", calificacion: 8.1, duracion: "2h 20m", etiqueta: "NEW", colorEtiqueta: "#ff0066", colorTextoEtiqueta: "#fff", imagen: "img/shadow-bone-el-fin.png", sinopsis: "Alina Starkov enfrenta la batalla final contra el Darkling en un mundo donde la oscuridad amenaza con consumir todo el reino de Ravka.", funciones: ["16:00","19:30","22:30"], precio: 25 },
  { id: 8, titulo: "The Dark Tower: Renacido", genero: "Dark Fantasy", calificacion: 7.9, duracion: "2h 35m", etiqueta: "TOP", colorEtiqueta: "#ffaa00", colorTextoEtiqueta: "#050810", imagen: "img/the-dark-tower-renacido.png", sinopsis: "Roland Deschain continua su busqueda de la Torre Oscura mientras nuevas fuerzas del caos intentan derribar el eje que sostiene todos los mundos.", funciones: ["15:00","18:00","21:00"], precio: 25 }
];

var peliculaActual = null;
var funcionSeleccionada = null;

document.addEventListener('DOMContentLoaded', function () {
  var parametros = new URLSearchParams(window.location.search);
  var id = parseInt(parametros.get('id')) || 1;

  peliculaActual = peliculas.find(function(p) { return p.id === id; }) || peliculas[0];
  document.title = 'JuferMovie - ' + peliculaActual.titulo;
  mostrarDetalle(peliculaActual);
});

function mostrarDetalle(p) {
  var contenedor = document.getElementById('detalle-container');

  var funcionesHTML = '';
  p.funciones.forEach(function (hora) {
    funcionesHTML +=
      '<div class="funcion-boton" onclick="elegirFuncion(this, \'' + hora + '\')">' +
        '&#9201; ' + hora +
      '</div>';
  });

  contenedor.innerHTML =
    '<img class="detalle-imagen" src="' + p.imagen + '" alt="' + p.titulo + '" />' +
    '<div class="detalle-info">' +
      '<div style="display:flex;gap:8px;margin-bottom:10px;">' +
        '<span class="etiqueta" style="background:' + p.colorEtiqueta + ';color:' + p.colorTextoEtiqueta + ';">' + p.etiqueta + '</span>' +
      '</div>' +
      '<h1 class="detalle-titulo">' + p.titulo + '</h1>' +
      '<div class="detalle-meta">' +
        '<span><span class="estrella">&#9733;</span> ' + p.calificacion + '</span>' +
        '<span>&#9201; ' + p.duracion + '</span>' +
        '<span>' + p.genero + '</span>' +
        '<span>Bs. ' + p.precio + ' c/u</span>' +
      '</div>' +
      '<p class="detalle-sinopsis">' + p.sinopsis + '</p>' +
      '<p class="funciones-titulo">Funciones de hoy</p>' +
      '<div class="funciones-grilla">' + funcionesHTML + '</div>' +
      '<button class="boton-principal" id="boton-continuar" style="width:100%;opacity:0.4;cursor:not-allowed;" disabled>' +
        'Selecciona una funcion' +
      '</button>' +
    '</div>';
}

function elegirFuncion(elemento, hora) {
  var todos = document.querySelectorAll('.funcion-boton');
  todos.forEach(function (b) { b.classList.remove('activo'); });
  elemento.classList.add('activo');
  funcionSeleccionada = hora;

  var boton = document.getElementById('boton-continuar');
  boton.innerHTML = '&#127915; Continuar &rarr; ' + hora;
  boton.disabled = false;
  boton.style.opacity = '1';
  boton.style.cursor = 'pointer';
  boton.onclick = function () {
    sessionStorage.setItem('peliculaId', peliculaActual.id);
    sessionStorage.setItem('peliculaTitulo', peliculaActual.titulo);
    sessionStorage.setItem('peliculaImagen', peliculaActual.imagen);
    sessionStorage.setItem('funcionHora', funcionSeleccionada);
    sessionStorage.setItem('precio', peliculaActual.precio);
    window.location.href = 'asientos.html';
  };
}