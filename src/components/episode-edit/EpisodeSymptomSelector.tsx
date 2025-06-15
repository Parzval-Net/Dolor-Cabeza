
import { Label } from '@/components/ui/label';
import { symptomOptions } from '@/data/options';
import { Activity, Check } from 'lucide-react';

interface EpisodeSymptomSelectorProps {
  selectedSymptoms: string[];
  onToggleSymptom: (symptom: string, checked: boolean) => void;
}

const EpisodeSymptomSelector = ({ selectedSymptoms, onToggleSymptom }: EpisodeSymptomSelectorProps) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-violet-200/60 shadow-sm p-4 sm:p-5">
      <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 flex items-center gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
          <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
        Síntomas
      </Label>
      
      <div 
        className="grid grid-cols-1 gap-2 sm:gap-3 max-h-48 sm:max-h-64 overflow-y-auto"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
      >
        {symptomOptions.map((symptom, index) => {
          const isSelected = selectedSymptoms.includes(symptom);
          
          return (
            <label 
              key={index} 
              className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer mobile-touch-target safari-interactive-button ${
                isSelected 
                  ? 'bg-blue-50 border-2 border-blue-200 shadow-sm' 
                  : 'bg-slate-50 border-2 border-slate-200 hover:bg-blue-25 hover:border-blue-100'
              }`}
            >
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => onToggleSymptom(symptom, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                  isSelected 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                </div>
              </div>
              <span className={`text-sm sm:text-base font-medium ${isSelected ? 'text-blue-800' : 'text-slate-700'} truncate`}>
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
