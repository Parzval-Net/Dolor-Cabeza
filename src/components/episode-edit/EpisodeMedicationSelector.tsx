
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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-violet-200/60 shadow-sm p-4 sm:p-5">
      <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 flex items-center gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
          <Pill className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
        Medicamentos
      </Label>
      
      <div 
        className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
      >
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
                className={`flex items-center space-x-3 p-3 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer mobile-touch-target safari-interactive-button ${
                  isSelected 
                    ? 'bg-violet-50 border-2 border-violet-200 shadow-sm' 
                    : 'hover:bg-violet-25 border-2 border-transparent hover:border-violet-100'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onToggleMedication(medicationWithDose, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                    isSelected 
                      ? 'bg-violet-500 border-violet-500' 
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm sm:text-base ${isSelected ? 'text-violet-700' : 'text-slate-800'} truncate`}>
                    {med.name}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 mt-1">
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
