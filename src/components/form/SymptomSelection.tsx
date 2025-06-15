
import React from 'react';
import { Activity } from 'lucide-react';
import { Label } from '@/components/ui/label';

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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-orange-200/60 shadow-sm">
      <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 block text-center flex items-center justify-center gap-2">
        <Activity className="h-5 w-5 text-orange-500" />
        Síntomas principales
      </Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {commonSymptoms.map((symptom, index) => {
          const isSelected = symptoms.includes(symptom);
          
          return (
            <div
              key={symptom}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <button
                onClick={() => onToggleSymptom(symptom)}
                className={`w-full h-12 sm:h-14 p-2 sm:p-3 text-xs sm:text-sm rounded-xl border-2 transition-all duration-300 mobile-touch-target ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-400 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700'
                }`}
              >
                <span className="leading-tight font-medium break-words">{symptom}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SymptomSelection;
