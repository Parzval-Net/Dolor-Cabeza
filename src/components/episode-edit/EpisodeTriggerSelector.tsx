
import { Label } from '@/components/ui/label';
import { triggerOptions } from '@/data/options';
import { Zap } from 'lucide-react';

interface EpisodeTriggerSelectorProps {
  selectedTriggers: string[];
  onToggleTrigger: (trigger: string, checked: boolean) => void;
}

const EpisodeTriggerSelector = ({ selectedTriggers, onToggleTrigger }: EpisodeTriggerSelectorProps) => {
  return (
    <div className="bg-white rounded-2xl border border-violet-200/60 shadow-sm p-6">
      <Label className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
          <Zap className="h-4 w-4 text-white" />
        </div>
        Desencadenantes
      </Label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
        {triggerOptions.map((trigger) => {
          const isSelected = selectedTriggers.includes(trigger.name);
          
          return (
            <label 
              key={trigger.id} 
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer border-2 ${
                isSelected 
                  ? 'bg-orange-50 border-orange-300 shadow-md' 
                  : 'bg-slate-50 border-slate-200 hover:bg-orange-25 hover:border-orange-200'
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onToggleTrigger(trigger.name, e.target.checked)}
                className="w-5 h-5 rounded-lg border-2 border-orange-300 text-orange-600 focus:ring-orange-500 focus:ring-2"
              />
              <span className={`text-sm font-medium ${isSelected ? 'text-orange-800' : 'text-slate-700'}`}>
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
