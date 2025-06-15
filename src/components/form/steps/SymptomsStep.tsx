
import React from 'react';
import { Brain } from 'lucide-react';
import { symptomOptions } from '@/data/options';
import StepCard from '@/components/form/StepCard';
import InteractiveButton from '@/components/form/InteractiveButton';

interface SymptomsData {
  symptoms: string[];
}

interface SymptomsStepProps {
  formData: SymptomsData;
  onFormDataChange: (data: SymptomsData) => void;
  toggleArrayItem: (array: string[], item: string, setter: (value: string[]) => void) => void;
}

const SymptomsStep = ({ formData, onFormDataChange, toggleArrayItem }: SymptomsStepProps) => {
  return (
    <StepCard
      icon={
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-xl shadow-cyan-500/30 floating-animation">
          <Brain className="h-8 w-8 text-white" />
        </div>
      }
      title="Síntomas asociados"
      subtitle="Selecciona todos los síntomas que experimentaste durante el episodio"
      sparkle
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {symptomOptions.map((symptom) => (
          <InteractiveButton
            key={symptom}
            isSelected={formData.symptoms.includes(symptom)}
            onClick={() =>
              toggleArrayItem(formData.symptoms, symptom, (newSymptoms) =>
                onFormDataChange({ ...formData, symptoms: newSymptoms })
              )
            }
            variant="secondary"
            className="text-xs h-12"
          >
            {symptom}
          </InteractiveButton>
        ))}
      </div>
    </StepCard>
  );
};

export default SymptomsStep;
