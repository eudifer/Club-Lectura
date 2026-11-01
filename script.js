// Club de Lectura: calcula la próxima reunión (sábado 16:00) y reparte los libros por semana.

// Libros de ejemplo
const LIBROS = [
  { titulo: 'Rebelión en la granja', autor: 'George Orwell' },
  { titulo: 'El viejo y el mar', autor: 'Ernest Hemingway' },
  { titulo: 'Fahrenheit 451', autor: 'Ray Bradbury' },
  { titulo: 'El principito', autor: 'Antoine de Saint-Exupéry' },
];

const DIA_REUNION = 6; // sábado
const HORA_REUNION = 16;
const REUNIONES_A_MOSTRAR = 4;

// Devuelve la fecha de la próxima reunión a partir de "desde"
function proximaReunion(desde) {
  const fecha = new Date(desde);
  fecha.setHours(HORA_REUNION, 0, 0, 0);
  let dias = (DIA_REUNION - fecha.getDay() + 7) % 7;
  // Si hoy es sábado pero ya pasó la hora, pasa a la semana siguiente
  if (dias === 0 && desde > fecha) dias = 7;
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

const formatoFecha = (f) =>
  f.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });

const ahora = new Date();
const primera = proximaReunion(ahora);

// Libro del mes: se elige según el mes y el año de la reunión
const indiceMes = (primera.getFullYear() * 12 + primera.getMonth()) % LIBROS.length;
const libroMes = LIBROS[indiceMes];

// Portada
document.getElementById('titulo-reunion').textContent = formatoFecha(primera);
document.getElementById('libro-mes').textContent = libroMes.titulo;

const msPorDia = 24 * 60 * 60 * 1000;
const diasFaltan = Math.ceil((primera - ahora) / msPorDia);
document.getElementById('cuenta').textContent =
  diasFaltan <= 0 ? 'La reunión es hoy.' :
  diasFaltan === 1 ? 'Falta 1 día.' : 'Faltan ' + diasFaltan + ' días.';

// Calendario de las próximas reuniones
const calendario = document.getElementById('calendario');
for (let i = 0; i < REUNIONES_A_MOSTRAR; i++) {
  const fecha = new Date(primera);
  fecha.setDate(fecha.getDate() + i * 7);
  const libro = LIBROS[(fecha.getFullYear() * 12 + fecha.getMonth()) % LIBROS.length];

  const li = document.createElement('li');
  li.innerHTML = '<span class="fecha"></span><span class="libro"></span>';
  li.querySelector('.fecha').textContent = formatoFecha(fecha) + ', 16:00';
  li.querySelector('.libro').textContent = libro.titulo;
  calendario.appendChild(li);
}

// Lista de libros
const listaLibros = document.getElementById('libros-lista');
LIBROS.forEach((l) => {
  const li = document.createElement('li');
  li.innerHTML = '<b></b><span></span>';
  li.querySelector('b').textContent = l.titulo;
  li.querySelector('span').textContent = l.autor;
  listaLibros.appendChild(li);
});
