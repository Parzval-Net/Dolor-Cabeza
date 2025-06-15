
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

export const getMoodEmoji = (mood: string) => {
  // Normalizar el estado a minúsculas y manejar diferentes formatos
  const normalizedMood = mood.toLowerCase().trim();
  
  const moodMap: Record<string, string> = {
    // Formatos en español con guión bajo
    'muy_mal': '😰',
    'mal': '😟', 
    'regular': '😐',
    'bien': '🙂',
    'muy_bien': '😄',
    // Formatos en español con espacios
    'muy mal': '😰',
    'muy bien': '😄',
    // Formatos alternativos
    'terrible': '😰',
    'malo': '😟',
    'normal': '😐',
    'bueno': '🙂',
    'excelente': '😄',
    'genial': '😄',
    // Formatos en inglés por si acaso
    'very_bad': '😰',
    'bad': '😟',
    'okay': '😐',
    'good': '🙂',
    'very_good': '😄',
    'great': '😄'
  };
  
  return moodMap[normalizedMood] || '😐';
};

export const getMoodText = (mood: string) => {
  // Normalizar el estado y convertir a texto legible
  const normalizedMood = mood.toLowerCase().trim();
  
  const moodTextMap: Record<string, string> = {
    'muy_mal': 'Muy mal',
    'mal': 'Mal',
    'regular': 'Regular', 
    'bien': 'Bien',
    'muy_bien': 'Muy bien',
    'muy mal': 'Muy mal',
    'muy bien': 'Muy bien',
    'terrible': 'Terrible',
    'malo': 'Malo',
    'normal': 'Normal',
    'bueno': 'Bueno',
    'excelente': 'Excelente',
    'genial': 'Genial'
  };
  
  return moodTextMap[normalizedMood] || 'Regular';
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
