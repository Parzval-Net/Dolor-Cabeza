
export const getIntensityColor = (intensity: number) => {
  if (intensity <= 3) return "from-emerald-400 to-emerald-600";
  if (intensity <= 6) return "from-orange-400 to-orange-600";
  if (intensity <= 8) return "from-red-400 to-red-600";
  return "from-red-600 to-red-800";
};

export const getIntensityText = (intensity: number) => {
  if (intensity <= 3) return "Leve";
  if (intensity <= 6) return "Moderado";
  if (intensity <= 8) return "Severo";
  return "Extremo";
};

export const getMoodEmoji = (mood: string | undefined | null) => {
  // Añadir console.log para debuggear qué valores estamos recibiendo
  console.log('Mood received:', mood, 'Type:', typeof mood);
  
  // Si mood no existe, está vacío o es null/undefined, usar un emoji basado en intensidad
  if (!mood || mood.trim() === '') {
    console.log('Mood is empty, using default');
    return '😐';
  }
  
  // Normalizar el estado a minúsculas y eliminar espacios/guiones
  const normalizedMood = mood.toLowerCase().trim().replace(/[-_\s]/g, '');
  
  console.log('Normalized mood:', normalizedMood);
  
  const moodMap: Record<string, string> = {
    // Valores posibles sin espacios ni guiones
    'muymal': '😰',
    'terrible': '😰',
    'mal': '😟',
    'malo': '😟',
    'regular': '😐',
    'normal': '😐',
    'neutro': '😐',
    'bien': '🙂',
    'bueno': '🙂',
    'muybueno': '😄',
    'muybien': '😄',
    'excelente': '😄',
    'genial': '😄',
    'feliz': '😄',
    'contento': '🙂',
    'triste': '😟',
    'ansioso': '😰',
    'calmado': '🙂',
    'estresado': '😟',
    'relajado': '🙂',
    // Valores numéricos como string
    '1': '😰',
    '2': '😟',
    '3': '😐',
    '4': '🙂',
    '5': '😄'
  };
  
  const emoji = moodMap[normalizedMood] || '😐';
  console.log('Selected emoji:', emoji);
  
  return emoji;
};

export const getMoodText = (mood: string | undefined | null) => {
  // Si mood no existe, está vacío o es null/undefined
  if (!mood || mood.trim() === '') {
    return 'No especificado';
  }
  
  // Normalizar el estado y convertir a texto legible
  const normalizedMood = mood.toLowerCase().trim().replace(/[-_\s]/g, '');
  
  const moodTextMap: Record<string, string> = {
    'muymal': 'Muy mal',
    'terrible': 'Terrible',
    'mal': 'Mal',
    'malo': 'Malo',
    'regular': 'Regular',
    'normal': 'Normal',
    'neutro': 'Neutro',
    'bien': 'Bien',
    'bueno': 'Bueno',
    'muybueno': 'Muy bueno',
    'muybien': 'Muy bien',
    'excelente': 'Excelente',
    'genial': 'Genial',
    'feliz': 'Feliz',
    'contento': 'Contento',
    'triste': 'Triste',
    'ansioso': 'Ansioso',
    'calmado': 'Calmado',
    'estresado': 'Estresado',
    'relajado': 'Relajado',
    // Valores numéricos como string
    '1': 'Muy mal',
    '2': 'Mal',
    '3': 'Regular',
    '4': 'Bien',
    '5': 'Muy bien'
  };
  
  return moodTextMap[normalizedMood] || 'Regular';
};

// Nueva función para obtener emoji basado en intensidad cuando no hay mood
export const getMoodEmojiFromIntensity = (intensity: number) => {
  if (intensity <= 2) return '🙂';
  if (intensity <= 4) return '😐';
  if (intensity <= 6) return '😟';
  if (intensity <= 8) return '😰';
  return '😱';
};

export const getStressColor = (level: number) => {
  if (level <= 2) return "bg-green-100 text-green-800 border-green-200";
  if (level <= 3) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-red-100 text-red-800 border-red-200";
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
