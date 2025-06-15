
import { Label } from '@/components/ui/label';
import { symptomOptions } from '@/data/options';
import { Activity } from 'lucide-react';

interface EpisodeSymptomSelectorProps {
  selectedSymptoms: string[];
  onToggleSymptom: (symptom: string, checked: boolean) => void;
}

const EpisodeSymptomSelector = ({ selectedSymptoms, onToggleSymptom }: EpisodeSymptomSelectorProps) => {
  return (
    <div className="bg-white rounded-2xl border border-violet-200/60 shadow-sm p-6">
      <Label className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
          <Activity className="h-4 w-4 text-white" />
        </div>
        Síntomas
      </Label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
        {symptomOptions.map((symptom, index) => {
          const isSelected = selectedSymptoms.includes(symptom);
          
          return (
            <label 
              key={index} 
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer border-2 ${
                isSelected 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-slate-50 border-slate-200 hover:bg-blue-25 hover:border-blue-200'
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onToggleSymptom(symptom, e.target.checked)}
                className="w-5 h-5 rounded-lg border-2 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span className={`text-sm font-medium ${isSelected ? 'text-blue-800' : 'text-slate-700'}`}>
                {symptom}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default EpisodeSymptomSelector;
