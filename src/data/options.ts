
import { MedicationOption, TriggerOption } from '@/types/headache';

export const medicationOptions: MedicationOption[] = [
  { id: '1', name: 'Ibuprofeno', dosage: '400mg', type: 'acute' },
  { id: '2', name: 'Paracetamol', dosage: '500mg', type: 'acute' },
  { id: '3', name: 'Aspirina', dosage: '500mg', type: 'acute' },
  { id: '4', name: 'Sumatriptán', dosage: '50mg', type: 'acute' },
  { id: '5', name: 'Naproxeno', dosage: '250mg', type: 'acute' },
  { id: '6', name: 'Propranolol', dosage: '40mg', type: 'preventive' },
  { id: '7', name: 'Topiramato', dosage: '25mg', type: 'preventive' },
];

export const triggerOptions: TriggerOption[] = [
  { id: '1', name: 'Estrés', category: 'stress' },
  { id: '2', name: 'Falta de sueño', category: 'lifestyle' },
  { id: '3', name: 'Alcohol', category: 'food' },
  { id: '4', name: 'Chocolate', category: 'food' },
  { id: '5', name: 'Queso', category: 'food' },
  { id: '6', name: 'Café/Cafeína', category: 'food' },
  { id: '7', name: 'Luces brillantes', category: 'environmental' },
  { id: '8', name: 'Ruidos fuertes', category: 'environmental' },
  { id: '9', name: 'Cambios climáticos', category: 'environmental' },
  { id: '10', name: 'Menstruación', category: 'hormonal' },
  { id: '11', name: 'Ovulación', category: 'hormonal' },
  { id: '12', name: 'Ayuno prolongado', category: 'lifestyle' },
];

export const symptomOptions = [
  'Náuseas',
  'Vómitos',
  'Sensibilidad a la luz',
  'Sensibilidad al sonido',
  'Visión borrosa',
  'Aura visual',
  'Mareos',
  'Rigidez en el cuello',
  'Fatiga',
  'Irritabilidad',
];

export const reliefOptions = [
  'Descanso en habitación oscura',
  'Compresas frías',
  'Compresas calientes',
  'Masaje',
  'Meditación',
  'Ejercicio ligero',
  'Hidratación',
  'Sueño',
];

export const moodOptions = [
  'Muy bien',
  'Bien',
  'Normal',
  'Mal',
  'Muy mal',
];
