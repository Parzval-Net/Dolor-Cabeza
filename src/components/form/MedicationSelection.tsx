
import React from 'react';
import { Pill, Check, Edit3, X, Save } from 'lucide-react';
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
    <div className="space-y-4 sm:space-y-6">
      <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 block text-center flex items-center justify-center gap-2">
        <Pill className="h-5 w-5 text-violet-600" />
        Medicamentos tomados
      </Label>
      
      {/* Medicamentos seleccionados */}
      {medications.length > 0 && (
        <div className="space-y-3 p-3 sm:p-4 glass-card rounded-2xl">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Seleccionados ({medications.length})
          </h4>
          <div className="space-y-3">
            {medications.map((med, index) => (
              <div 
                key={`${med.name}-${index}`}
                className="bg-white/95 rounded-xl border border-violet-200/50 shadow-sm p-3 sm:p-4 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-800 mb-1">{med.name}</div>
                      <div className="text-xs text-slate-600">
                        Dosis: <span className="font-semibold text-slate-800">{med.customDosage || med.dosage}</span>
                      </div>
                    </div>
                  </div>
                  
                  {!med.isEditing && (
                    <Button
                      onClick={() => onToggleEditDosage(med.name)}
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-violet-600 border-violet-200 hover:bg-violet-50 hover:text-violet-700 rounded-lg w-full sm:w-auto mobile-touch-target"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Editar dosis
                    </Button>
                  )}
                </div>
                
                {med.isEditing && (
                  <div className="space-y-3 pt-3 border-t border-violet-200/50">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-slate-700">Nueva dosis:</Label>
                      <Input
                        value={med.customDosage || ''}
                        onChange={(e) => onUpdateCustomDosage(med.name, e.target.value)}
                        placeholder={med.dosage}
                        className="h-10 text-sm rounded-lg border-violet-300 bg-white/95 focus:border-violet-500 focus:ring-1 focus:ring-violet-200 mobile-input"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={() => onSaveCustomDosage(med.name)}
                        size="sm"
                        className="h-10 flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg mobile-touch-target"
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Guardar
                      </Button>
                      <Button
                        onClick={() => onToggleEditDosage(med.name)}
                        variant="outline"
                        size="sm"
                        className="h-10 flex-1 border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg mobile-touch-target"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid de medicamentos disponibles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {medicationOptions.filter(med => med.isCommon).slice(0, 9).map((med, index) => {
          const selectedMed = medications.find(m => m.name === med.name);
          const displayDosage = selectedMed ? (selectedMed.customDosage || selectedMed.dosage) : med.dosage;
          
          return (
            <div
              key={med.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <InteractiveButton
                isSelected={medications.some(m => m.name === med.name)}
                onClick={() => onToggleMedication(med)}
                className="h-auto min-h-[90px] flex flex-col gap-2 p-3 sm:p-4 text-xs rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg w-full"
              >
                <div className="text-sm font-bold leading-tight text-center">{med.name}</div>
                <div className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                  {displayDosage}
                </div>
                {med.type === 'preventive' && (
                  <Badge variant="secondary" className="text-xs mt-1 bg-violet-100 text-violet-800">
                    Preventivo
                  </Badge>
                )}
              </InteractiveButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MedicationSelection;
