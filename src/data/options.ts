
import { MedicationOption, TriggerOption } from '@/types/headache';

export const medicationOptions: MedicationOption[] = [
  // Medicamentos comunes en Chile para migrañas
  { id: 'med1', name: 'Paracetamol', dosage: '500mg', type: 'acute', isCommon: true },
  { id: 'med2', name: 'Ibuprofeno', dosage: '400mg', type: 'acute', isCommon: true },
  { id: 'med3', name: 'Naproxeno', dosage: '220mg', type: 'acute', isCommon: true },
  { id: 'med4', name: 'Aspirina', dosage: '500mg', type: 'acute', isCommon: true },
  { id: 'med5', name: 'Ketorolaco', dosage: '10mg', type: 'acute', isCommon: true },
  { id: 'med6', name: 'Sumatriptán', dosage: '50mg', type: 'acute', isCommon: false },
  { id: 'med7', name: 'Rizatriptán', dosage: '10mg', type: 'acute', isCommon: false },
  { id: 'med8', name: 'Amitriptilina', dosage: '25mg', type: 'preventive', isCommon: false },
  { id: 'med9', name: 'Propranolol', dosage: '40mg', type: 'preventive', isCommon: false },
  { id: 'med10', name: 'Topiramato', dosage: '25mg', type: 'preventive', isCommon: false },
];

export const triggerOptions: TriggerOption[] = [
  { id: 'trig1', name: 'Estrés', category: 'stress' },
  { id: 'trig2', name: 'Cafeína', category: 'food' },
  { id: 'trig3', name: 'Chocolate', category: 'food' },
  { id: 'trig4', name: 'Vino tinto', category: 'food' },
  { id: 'trig5', name: 'Cambios climáticos', category: 'environmental' },
  { id: 'trig6', name: 'Falta de sueño', category: 'lifestyle' },
  { id: 'trig7', name: 'Luces brillantes', category: 'environmental' },
  { id: 'trig8', name: 'Deshidratación', category: 'lifestyle' },
  { id: 'trig9', name: 'Menstruación', category: 'hormonal' },
  { id: 'trig10', name: 'Saltarse comidas', category: 'lifestyle' },
];

export const symptomOptions = [
  'Dolor pulsátil',
  'Sensibilidad a la luz',
  'Sensibilidad al sonido',
  'Náuseas',
  'Vómitos',
  'Visión borrosa',
  'Mareos',
  'Rigidez en el cuello',
  'Aura visual',
  'Hormigueo',
  'Confusión',
  'Fatiga',
  'Congestión nasal',
  'Lagrimeo',
  'Irritabilidad'
];

export const reliefOptions = [
  'Descanso en habitación oscura',
  'Aplicar frío en la cabeza',
  'Aplicar calor en el cuello',
  'Masaje en las sienes',
  'Técnicas de relajación',
  'Dormir',
  'Beber agua',
  'Ejercicio ligero',
  'Respiración profunda',
  'Música relajante'
];

export const moodOptions = [
  'Muy positivo',
  'Positivo',
  'Neutral',
  'Irritado',
  'Ansioso',
  'Deprimido',
  'Estresado',
  'Cansado',
  'Enojado',
  'Confundido'
];
