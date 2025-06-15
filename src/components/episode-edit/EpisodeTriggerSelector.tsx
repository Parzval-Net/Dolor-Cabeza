
import { Label } from '@/components/ui/label';
import { triggerOptions } from '@/data/options';
import { Zap, Check } from 'lucide-react';

interface EpisodeTriggerSelectorProps {
  selectedTriggers: string[];
  onToggleTrigger: (trigger: string, checked: boolean) => void;
}

const EpisodeTriggerSelector = ({ selectedTriggers, onToggleTrigger }: EpisodeTriggerSelectorProps) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-violet-200/60 shadow-sm p-4 sm:p-5">
      <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 flex items-center gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
        Desencadenantes
      </Label>
      
      <div 
        className="grid grid-cols-1 gap-2 sm:gap-3 max-h-48 sm:max-h-64 overflow-y-auto"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
      >
        {triggerOptions.map((trigger) => {
          const isSelected = selectedTriggers.includes(trigger.name);
          
          return (
            <label 
              key={trigger.id} 
              className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer mobile-touch-target safari-interactive-button ${
                isSelected 
                  ? 'bg-orange-50 border-2 border-orange-200 shadow-sm' 
                  : 'bg-slate-50 border-2 border-slate-200 hover:bg-orange-25 hover:border-orange-100'
              }`}
            >
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => onToggleTrigger(trigger.name, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                  isSelected 
                    ? 'bg-orange-500 border-orange-500' 
                    : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                </div>
              </div>
              <span className={`text-sm sm:text-base font-medium ${isSelected ? 'text-orange-800' : 'text-slate-700'} truncate`}>
                {trigger.name}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default EpisodeTriggerSelector;
