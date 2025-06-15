
import { Label } from '@/components/ui/label';
import { symptomOptions } from '@/data/options';

interface EpisodeSymptomSelectorProps {
  selectedSymptoms: string[];
  onToggleSymptom: (symptom: string, checked: boolean) => void;
}

const EpisodeSymptomSelector = ({ selectedSymptoms, onToggleSymptom }: EpisodeSymptomSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-bold text-slate-800">Síntomas</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto bg-white/80 rounded-xl p-4 border border-violet-200/60 shadow-inner">
        {symptomOptions.map((symptom, index) => (
          <label key={index} className="flex items-center space-x-3 text-sm p-2 hover:bg-violet-50 rounded-lg transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom)}
              onChange={(e) => onToggleSymptom(symptom, e.target.checked)}
              className="rounded border-violet-300 text-violet-600 focus:ring-violet-500 w-4 h-4"
            />
            <span className="text-slate-800 font-medium">{symptom}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default EpisodeSymptomSelector;
