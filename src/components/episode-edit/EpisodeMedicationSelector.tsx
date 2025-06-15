
import { Label } from '@/components/ui/label';
import { Pill, Check } from 'lucide-react';
import { MedicationOption } from '@/types/headache';

interface EpisodeMedicationSelectorProps {
  selectedMedications: string[];
  medicationOptions: MedicationOption[];
  onToggleMedication: (medication: string, checked: boolean) => void;
}

const EpisodeMedicationSelector = ({ 
  selectedMedications, 
  medicationOptions, 
  onToggleMedication 
}: EpisodeMedicationSelectorProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-violet-200/60 shadow-sm p-4 sm:p-5">
      <Label className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Pill className="h-5 w-5 text-violet-600" />
        Medicamentos
      </Label>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {medicationOptions.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">
            No hay medicamentos disponibles
          </p>
        ) : (
          medicationOptions.map((med) => {
            const medicationWithDose = `${med.name} (${med.dosage})`;
            const isSelected = selectedMedications.includes(medicationWithDose);
            
            return (
              <label 
                key={med.id} 
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 cursor-pointer mobile-touch-target ${
                  isSelected 
                    ? 'bg-violet-50 border border-violet-200' 
                    : 'hover:bg-violet-25 border border-transparent'
                }`}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onToggleMedication(medicationWithDose, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                    isSelected 
                      ? 'bg-violet-500 border-violet-500' 
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm ${isSelected ? 'text-violet-700' : 'text-slate-800'}`}>
                    {med.name}
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <span>{med.dosage}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      med.type === 'acute' 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {med.type === 'acute' ? 'Crisis' : 'Preventivo'}
                    </span>
                  </div>
                </div>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EpisodeMedicationSelector;
