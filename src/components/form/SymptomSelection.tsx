
import React from 'react';
import { Activity } from 'lucide-react';
import { Label } from '@/components/ui/label';
import InteractiveButton from '@/components/form/InteractiveButton';

interface SymptomSelectionProps {
  symptoms: string[];
  onToggleSymptom: (symptom: string) => void;
}

const commonSymptoms = [
  'Dolor pulsátil',
  'Sensibilidad a la luz',
  'Náuseas',
  'Sensibilidad al sonido',
  'Mareos',
  'Fatiga'
];

const SymptomSelection = ({ symptoms, onToggleSymptom }: SymptomSelectionProps) => {
  return (
    <div className="glass-card rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-orange-50/70 to-red-50/70 border border-orange-200/50">
      <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 block text-center flex items-center justify-center gap-2">
        <Activity className="h-5 w-5 text-orange-500" />
        Síntomas principales
      </Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {commonSymptoms.map((symptom, index) => (
          <div
            key={symptom}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <InteractiveButton
              isSelected={symptoms.includes(symptom)}
              onClick={() => onToggleSymptom(symptom)}
              variant="secondary"
              className="h-12 sm:h-14 p-2 sm:p-3 text-xs rounded-xl border-2 transition-all duration-300 hover:scale-105 safari-interactive-button mobile-touch-target w-full"
            >
              <span className="text-xs sm:text-sm leading-tight">{symptom}</span>
            </InteractiveButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomSelection;
