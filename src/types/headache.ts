
export interface HeadacheEntry {
  id: string;
  date: string;
  time: string;
  intensity: number; // 1-10 scale
  duration: number; // in hours
  medications: string[];
  triggers: string[];
  symptoms: string[];
  notes?: string;
  relievedBy?: string[];
  mood: string;
  weather?: string;
  menstrualCycle?: string;
  sleepHours?: number;
  stressLevel: number; // 1-5 scale
}

export interface MedicationOption {
  id: string;
  name: string;
  dosage: string;
  type: 'preventive' | 'acute';
  isCommon?: boolean; // Para marcar medicamentos comunes en Chile
}

export interface TriggerOption {
  id: string;
  name: string;
  category: 'food' | 'environmental' | 'lifestyle' | 'hormonal' | 'stress';
}
