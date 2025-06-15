
import React from 'react';
import { Pill } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { MedicationOption } from '@/types/headache';
import { reliefOptions } from '@/data/options';
import StepCard from '@/components/form/StepCard';
import InteractiveButton from '@/components/form/InteractiveButton';

interface TreatmentStepProps {
  formData: {
    medications: string[];
    relievedBy: string[];
  };
  medicationOptions: MedicationOption[];
  onFormDataChange: (data: any) => void;
  toggleArrayItem: (array: string[], item: string, setter: (value: string[]) => void) => void;
}

const TreatmentStep = ({ formData, medicationOptions, onFormDataChange, toggleArrayItem }: TreatmentStepProps) => {
  return (
    <StepCard
      icon={
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/30 floating-animation">
          <Pill className="h-8 w-8 text-white" />
        </div>
      }
      title="Tratamiento utilizado"
      subtitle="¿Qué medicamentos o métodos usaste para aliviar el dolor?"
      sparkle
    >
      <div className="space-y-8">
        {/* Medications */}
        <div className="space-y-4">
          <Label className="block text-lg font-bold text-slate-800 text-center">Medicamentos</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {medicationOptions.map((med) => (
              <InteractiveButton
                key={med.id}
                isSelected={formData.medications.includes(`${med.name} (${med.dosage})`)}
                onClick={() => {
                  const medicationWithDose = `${med.name} (${med.dosage})`;
                  toggleArrayItem(formData.medications, medicationWithDose, (newMeds) =>
                    onFormDataChange({ ...formData, medications: newMeds })
                  );
                }}
                className="text-xs h-16 flex flex-col items-center justify-center gap-1"
              >
                <span className="font-bold">{med.name}</span>
                <span className="text-xs opacity-75">{med.dosage}</span>
                <span className="text-xs opacity-60">{med.type === 'acute' ? 'Crisis' : 'Preventivo'}</span>
              </InteractiveButton>
            ))}
          </div>
        </div>
        
        {/* Relief Methods */}
        <div className="space-y-4">
          <Label className="block text-lg font-bold text-slate-800 text-center">Métodos de alivio</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {reliefOptions.map((relief) => (
              <InteractiveButton
                key={relief}
                isSelected={formData.relievedBy.includes(relief)}
                onClick={() =>
                  toggleArrayItem(formData.relievedBy, relief, (newRelief) =>
                    onFormDataChange({ ...formData, relievedBy: newRelief })
                  )
                }
                variant="accent"
                className="text-xs h-12"
              >
                {relief}
              </InteractiveButton>
            ))}
          </div>
        </div>
      </div>
    </StepCard>
  );
};

export default TreatmentStep;
