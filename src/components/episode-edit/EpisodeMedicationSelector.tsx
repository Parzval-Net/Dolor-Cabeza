
import { Label } from '@/components/ui/label';
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
    <div className="space-y-3">
      <Label className="text-sm font-bold text-slate-800">Medicamentos</Label>
      <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto bg-white/80 rounded-xl p-4 border border-violet-200/60 shadow-inner">
        {medicationOptions.map((med) => {
          const medicationWithDose = `${med.name} (${med.dosage})`;
          return (
            <label key={med.id} className="flex items-center space-x-3 text-sm p-3 hover:bg-violet-50 rounded-lg transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMedications.includes(medicationWithDose)}
                onChange={(e) => onToggleMedication(medicationWithDose, e.target.checked)}
                className="rounded border-violet-300 text-violet-600 focus:ring-violet-500 mobile-touch-target w-4 h-4"
              />
              <div className="flex-1">
                <div className="font-bold text-slate-800">{med.name}</div>
                <div className="text-xs text-slate-600">{med.dosage} • {med.type === 'acute' ? 'Crisis' : 'Preventivo'}</div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default EpisodeMedicationSelector;
