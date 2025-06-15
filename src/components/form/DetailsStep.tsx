
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

interface DetailsData {
  medications: MedicationWithDose[];
  symptoms: string[];
  notes: string;
}

interface DetailsStepProps {
  formData: DetailsData;
  medicationOptions: MedicationOption[];
  onFormDataChange: (data: DetailsData) => void;
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
    <div className="space-y-6 lg:space-y-8">
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
          className="border-violet-200 rounded-xl resize-none text-base p-4 bg-white/95 min-h-[100px] text-slate-800 font-medium placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 mobile-input"
          rows={4}
        />
      </div>
    </div>
  );
};

export default DetailsStep;
