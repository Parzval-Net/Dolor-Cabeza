
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
    <div className="glass-card rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-200/60 shadow-lg">
      <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 block text-center flex items-center justify-center gap-2">
        <Pill className="h-5 w-5 text-blue-600" />
        Medicamentos tomados
      </Label>
      
      {/* Medicamentos seleccionados con mejor separación visual */}
      {medications.length > 0 && (
        <div className="space-y-3 mb-4 sm:mb-6 p-3 sm:p-4 bg-white/80 rounded-2xl border border-blue-200/50 shadow-inner">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Seleccionados ({medications.length})
          </h4>
          <div className="space-y-3">
            {medications.map((med, index) => (
              <div 
                key={med.name} 
                className="flex flex-col gap-3 p-4 bg-white rounded-xl border border-violet-200/50 shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-800 mb-1">{med.name}</div>
                    <div className="text-xs text-slate-600">
                      Dosis: {med.isEditing ? (med.customDosage || med.dosage) : (med.customDosage || med.dosage)}
                    </div>
                  </div>
                </div>
                
                {med.isEditing ? (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
                    <Input
                      value={med.customDosage || ''}
                      onChange={(e) => onUpdateCustomDosage(med.name, e.target.value)}
                      placeholder={med.dosage}
                      className="h-12 text-sm rounded-lg border-violet-300 bg-white focus:border-violet-500 focus:ring-0 flex-1"
                    />
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        onClick={() => onSaveCustomDosage(med.name)}
                        variant="ghost"
                        size="sm"
                        className="h-12 flex-1 sm:w-12 sm:flex-none bg-green-100 text-green-600 border border-green-200 hover:bg-green-200 hover:text-green-700 rounded-lg shadow-sm"
                      >
                        <Save className="w-4 h-4" />
                        <span className="ml-2 sm:hidden">Guardar</span>
                      </Button>
                      <Button
                        onClick={() => onToggleEditDosage(med.name)}
                        variant="ghost"
                        size="sm"
                        className="h-12 flex-1 sm:w-12 sm:flex-none bg-red-100 text-red-600 border border-red-200 hover:bg-red-200 hover:text-red-700 rounded-lg shadow-sm"
                      >
                        <X className="w-4 h-4" />
                        <span className="ml-2 sm:hidden">Cancelar</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => onToggleEditDosage(med.name)}
                    variant="ghost"
                    size="sm"
                    className="h-12 w-full sm:w-auto bg-blue-100 text-blue-600 border border-blue-200 hover:bg-blue-200 hover:text-blue-700 rounded-lg shadow-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="ml-2">Editar dosis</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid de medicamentos disponibles con mejor separación */}
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
                className="h-auto min-h-[90px] flex flex-col gap-2 p-4 text-xs rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg w-full bg-white/90 hover:bg-white border-blue-200 hover:border-blue-400 text-slate-800"
              >
                <div className="text-sm font-bold leading-tight text-center text-slate-800">{med.name}</div>
                <div className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border">
                  {displayDosage}
                </div>
                {med.type === 'preventive' && (
                  <Badge variant="secondary" className="text-xs mt-1 bg-blue-100 text-blue-800 border-blue-200">
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
