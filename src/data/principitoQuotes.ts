
export const principitoQuotes = [
  "Lo esencial es invisible a los ojos.",
  "Solo se ve bien con el corazón, lo esencial es invisible a los ojos.",
  "Es el tiempo que has perdido en tu rosa lo que hace a tu rosa tan importante.",
  "Todas las personas mayores fueron primero niños, aunque pocas lo recuerdan.",
  "Si vienes, por ejemplo, a las cuatro de la tarde, desde las tres yo empezaré a ser feliz.",
  "No se debe nunca escuchar a las flores. Solo se las debe contemplar y oler.",
  "Las palabras son fuente de malentendidos.",
  "Solo los niños saben lo que buscan.",
  "Es una locura odiar a todas las rosas porque una te pinchó.",
  "Los hombres ya no tienen tiempo de conocer nada. Compran cosas ya hechas a los mercaderes.",
  "A los mayores les gustan las cifras.",
  "Es mucho más difícil juzgarse a sí mismo que juzgar a los demás.",
  "Si logras juzgarte bien a ti mismo, eres un verdadero sabio.",
  "Conocí a un hombre que coleccionaba estrellas.",
  "Me pregunto si las estrellas se iluminan con el fin de que algún día, cada uno pueda encontrar la suya.",
  "Tu rosa es tan importante porque es la rosa a la que has dedicado tu tiempo.",
  "Los baobabs antes de crecer empiezan por ser pequeños.",
  "Hay que exigir a cada uno lo que cada uno puede dar.",
  "Caminando en línea recta no puede uno llegar muy lejos.",
  "Solo se conocen bien las cosas que se domestican."
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * principitoQuotes.length);
  return principitoQuotes[randomIndex];
};
