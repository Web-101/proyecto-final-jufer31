

const express = require('express');
const camino = require('path');
const aplicacion = express();
const PUERTO = 3000;

// Servir los archivos estaticos (HTML, CSS, JS, imagenes)
aplicacion.use(express.static(camino.join(__dirname)));

// =============================================
// DATOS DE LAS PELICULAS EN MEMORIA
// =============================================
const peliculas = [
  {
    id: 1,
    titulo: "Blade Runner 2099",
    genero: "Sci-Fi · Cyberpunk",
    calificacion: 9.1,
    duracion: "2h 28m",
    etiqueta: "ESTRENO",
    colorEtiqueta: "#00f5ff",
    colorTextoEtiqueta: "#050810",
    imagen: "img/blade-runner-2099.png",
    sinopsis: "En una Neo-Los Angeles del futuro, un nuevo cazador de replicantes debe confrontar su propia humanidad mientras persigue a una nueva generacion de androides perfectos.",
    funciones: ["15:00", "18:00", "20:30", "23:00"],
    precio: 25
  },
  {
    id: 2,
    titulo: "Dune: Parte Tres",
    genero: "Sci-Fi · Epico",
    calificacion: 8.9,
    duracion: "2h 52m",
    etiqueta: "IMAX",
    colorEtiqueta: "#9d00ff",
    colorTextoEtiqueta: "#fff",
    imagen: "img/dune-parte-tres.png",
    sinopsis: "Paul Atreides lidera a los Fremen hacia la conquista del Imperio Galactico mientras el Gusano de Fuego despierta en las profundidades de Arrakis.",
    funciones: ["14:00", "17:30", "21:00"],
    precio: 30
  },
  {
    id: 3,
    titulo: "The Witcher: Caos y Ley",
    genero: "Dark Fantasy",
    calificacion: 8.6,
    duracion: "2h 15m",
    etiqueta: "4K",
    colorEtiqueta: "#ff4400",
    colorTextoEtiqueta: "#fff",
    imagen: "img/the-witcher-caos-y-ley.png",
    sinopsis: "Geralt de Rivia enfrenta su destino final mientras el caos y la ley colisionan en un mundo al borde del colapso.",
    funciones: ["16:00", "19:00", "22:00"],
    precio: 25
  },
  {
    id: 4,
    titulo: "Avatar: Fuego y Ceniza",
    genero: "Sci-Fi · Aventura",
    calificacion: 8.4,
    duracion: "3h 05m",
    etiqueta: "3D",
    colorEtiqueta: "#00aaff",
    colorTextoEtiqueta: "#fff",
    imagen: "img/avatar-fuego-y-ceniza.png",
    sinopsis: "Jake Sully y Neytiri regresan a Pandora para enfrentar una nueva amenaza que podria destruir su hogar y todo lo que aman.",
    funciones: ["13:00", "16:30", "20:00"],
    precio: 35
  },
  {
    id: 5,
    titulo: "Cyberpunk: Edgerunners",
    genero: "Sci-Fi · Cyberpunk",
    calificacion: 9.2,
    duracion: "1h 48m",
    etiqueta: "ESTRENO",
    colorEtiqueta: "#00f5ff",
    colorTextoEtiqueta: "#050810",
    imagen: "img/cyberpunk-edgerunners.png",
    sinopsis: "En Night City, un joven de la calle decide sobrevivir en una ciudad obsesionada con el poder convirtiendose en un mercenario outlaw.",
    funciones: ["15:30", "18:30", "21:30"],
    precio: 25
  },
  {
    id: 6,
    titulo: "Tron: Renegade",
    genero: "Sci-Fi · Accion",
    calificacion: 9.0,
    duracion: "2h 10m",
    etiqueta: "IMAX",
    colorEtiqueta: "#9d00ff",
    colorTextoEtiqueta: "#fff",
    imagen: "img/tron-renegade.png",
    sinopsis: "Un nuevo programa desafia el control del sistema dentro de la Rejilla digital, desatando una revolucion que amenaza con escapar al mundo real.",
    funciones: ["14:30", "17:00", "20:30", "23:30"],
    precio: 30
  },
  {
    id: 7,
    titulo: "Shadow & Bone: El Fin",
    genero: "Dark Fantasy",
    calificacion: 8.1,
    duracion: "2h 20m",
    etiqueta: "NEW",
    colorEtiqueta: "#ff0066",
    colorTextoEtiqueta: "#fff",
    imagen: "img/shadow-bone-el-fin.png",
    sinopsis: "Alina Starkov enfrenta la batalla final contra el Darkling en un mundo donde la oscuridad amenaza con consumir todo el reino de Ravka.",
    funciones: ["16:00", "19:30", "22:30"],
    precio: 25
  },
  {
    id: 8,
    titulo: "The Dark Tower: Renacido",
    genero: "Dark Fantasy",
    calificacion: 7.9,
    duracion: "2h 35m",
    etiqueta: "TOP",
    colorEtiqueta: "#ffaa00",
    colorTextoEtiqueta: "#050810",
    imagen: "img/the-dark-tower-renacido.png",
    sinopsis: "Roland Deschain continua su busqueda de la Torre Oscura mientras nuevas fuerzas del caos intentan derribar el eje que sostiene todos los mundos.",
    funciones: ["15:00", "18:00", "21:00"],
    precio: 25
  }
];

// Asientos ocupados por pelicula (datos de prueba)
const asientosOcupados = {
  1: ["A2","A5","B3","B7","C1","C4","C6","D2","D5","E3","E7","F1","F4","G2","G6","H3","H7"],
  2: ["A1","A4","B2","B6","C3","C7","D1","D4","E2","E5","F3","F6","G1","G4","H2","H7"],
  3: ["A3","A6","B1","B5","C2","C7","D3","D6","E1","E4","F2","F7","G3","G5","H1","H6"],
  4: ["A2","A7","B3","B5","C1","C4","D2","D7","E3","E6","F1","F5","G2","G7","H4","H6"],
  5: ["A1","A6","B2","B4","C3","C7","D1","D5","E2","E6","F3","F7","G1","G4","H2","H5"],
  6: ["A3","A5","B1","B6","C2","C4","D3","D7","E1","E5","F2","F6","G3","G7","H1","H4"],
  7: ["A2","A4","B3","B7","C1","C5","D2","D6","E3","E7","F1","F4","G2","G5","H3","H7"],
  8: ["A1","A5","B2","B6","C3","C7","D1","D4","E2","E7","F3","F5","G1","G6","H2","H4"]
};

// =============================================
// RUTAS / ENDPOINTS DE LA API
// =============================================

// Ruta 1: devuelve todas las peliculas
aplicacion.get('/api/cartelera', function(peticion, respuesta) {
  respuesta.json(peliculas);
});

// Ruta 2: devuelve una pelicula por su id
aplicacion.get('/api/pelicula/:id', function(peticion, respuesta) {
  var id = parseInt(peticion.params.id);
  var pelicula = peliculas.find(function(p) { return p.id === id; });
  if (!pelicula) {
    return respuesta.status(404).json({ error: 'Pelicula no encontrada' });
  }
  respuesta.json(pelicula);
});

// Ruta 3: devuelve los asientos ocupados de una pelicula
aplicacion.get('/api/asientos/:id', function(peticion, respuesta) {
  var id = parseInt(peticion.params.id);
  var ocupados = asientosOcupados[id] || [];
  respuesta.json({ peliculaId: id, ocupados: ocupados });
});

// Iniciar el servidor
aplicacion.listen(PUERTO, function() {
  console.log('Servidor JuferMovie corriendo en http://localhost:' + PUERTO);
});