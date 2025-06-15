
import React from 'react';
import { Edit3 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MedicationOption } from '@/types/headache';
import MedicationSelection from './MedicationSelection';
import SymptomSelection from './SymptomSelection';

interface MedicationWithDose {
  name: string;
  dosage: string;
  customDosage?: string;
  isEditing?: boolean;
}

interface DetailsStepProps {
  formData: {
    medications: MedicationWithDose[];
    symptoms: string[];
    notes: string;
  };
  medicationOptions: MedicationOption[];
  onFormDataChange: (data: any) => void;
  onToggleMedication: (med: MedicationOption) => void;
  onToggleEditDosage: (medName: string) => void;
  onUpdateCustomDosage: (medName: string, dosage: string) => void;
  onSaveCustomDosage: (medName: string) => void;
}

const DetailsStep = ({
  formData,
  medicationOptions,
  onFormDataChange,
  onToggleMedication,
  onToggleEditDosage,
  onUpdateCustomDosage,
  onSaveCustomDosage
}: DetailsStepProps) => {
  const toggleSymptom = (symptom: string) => {
    const newSymptoms = formData.symptoms.includes(symptom)
      ? formData.symptoms.filter(s => s !== symptom)
      : [...formData.symptoms, symptom];
    
    onFormDataChange({ ...formData, symptoms: newSymptoms });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <MedicationSelection
        medications={formData.medications}
        medicationOptions={medicationOptions}
        onToggleMedication={onToggleMedication}
        onToggleEditDosage={onToggleEditDosage}
        onUpdateCustomDosage={onUpdateCustomDosage}
        onSaveCustomDosage={onSaveCustomDosage}
      />

      <SymptomSelection
        symptoms={formData.symptoms}
        onToggleSymptom={toggleSymptom}
      />

      <div className="space-y-3">
        <Label className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
          <Edit3 className="h-5 w-5 text-violet-500" />
          Notas adicionales
        </Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => onFormDataChange({ ...formData, notes: e.target.value })}
          placeholder="¿Algo más que quieras recordar sobre este episodio?"
          className="border-violet-200 rounded-xl resize-none text-base p-4 bg-white/90 min-h-[80px] safari-form-button"
          rows={3}
        />
      </div>
    </div>
  );
};

export default DetailsStep;
