
import React from 'react';
import { Pill, Check, Edit3, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MedicationOption } from '@/types/headache';
import InteractiveButton from '@/components/form/InteractiveButton';

interface MedicationWithDose {
  name: string;
  dosage: string;
  customDosage?: string;
  isEditing?: boolean;
}

interface MedicationSelectionProps {
  medications: MedicationWithDose[];
  medicationOptions: MedicationOption[];
  onToggleMedication: (med: MedicationOption) => void;
  onToggleEditDosage: (medName: string) => void;
  onUpdateCustomDosage: (medName: string, dosage: string) => void;
  onSaveCustomDosage: (medName: string) => void;
}

const MedicationSelection = ({
  medications,
  medicationOptions,
  onToggleMedication,
  onToggleEditDosage,
  onUpdateCustomDosage,
  onSaveCustomDosage
}: MedicationSelectionProps) => {
  return (
    <div className="glass-card rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 border border-blue-200/50">
      <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 block text-center flex items-center justify-center gap-2">
        <Pill className="h-5 w-5 text-blue-500" />
        Medicamentos tomados
      </Label>
      
      {/* Medicamentos seleccionados con animación */}
      {medications.length > 0 && (
        <div className="space-y-3 mb-4 sm:mb-6 p-3 sm:p-4 bg-white/60 rounded-2xl border border-blue-200/40">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            Medicamentos seleccionados ({medications.length})
          </h4>
          <div className="space-y-2">
            {medications.map((med, index) => (
              <div 
                key={med.name} 
                className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-violet-200/40 shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex-shrink-0"></div>
                <span className="text-sm font-medium text-slate-800 flex-1">{med.name}</span>
                {med.isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={med.customDosage}
                      onChange={(e) => onUpdateCustomDosage(med.name, e.target.value)}
                      placeholder={med.dosage}
                      className="h-10 w-20 sm:w-24 text-xs rounded-lg safari-form-button"
                    />
                    <Button
                      onClick={() => onSaveCustomDosage(med.name)}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 text-green-600 hover:bg-green-100 rounded-lg safari-button-fix mobile-touch-target"
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={() => onToggleEditDosage(med.name)}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 text-red-600 hover:bg-red-100 rounded-lg safari-button-fix mobile-touch-target"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-slate-100 border-slate-300">
                      {med.customDosage || med.dosage}
                    </Badge>
                    <Button
                      onClick={() => onToggleEditDosage(med.name)}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 text-blue-600 hover:bg-blue-100 rounded-lg safari-button-fix mobile-touch-target"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {medicationOptions.filter(med => med.isCommon).slice(0, 9).map((med, index) => (
          <div
            key={med.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <InteractiveButton
              isSelected={medications.some(m => m.name === med.name)}
              onClick={() => onToggleMedication(med)}
              className="h-16 sm:h-18 flex flex-col gap-1 p-2 sm:p-3 text-xs rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg safari-interactive-button mobile-touch-target w-full"
            >
              <span className="font-bold leading-tight text-center text-xs sm:text-sm">{med.name}</span>
              <span className="text-xs opacity-75 leading-tight text-center">{med.dosage}</span>
              {med.type === 'preventive' && (
                <Badge variant="secondary" className="text-xs mt-1">Preventivo</Badge>
              )}
            </InteractiveButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationSelection;
