
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SleepSelectorProps {
  sleepHours: number;
  onSleepChange: (hours: number) => void;
}

const SleepSelector = ({ sleepHours, onSleepChange }: SleepSelectorProps) => {
  const sleepOptions = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const adjustSleep = (increment: boolean) => {
    const currentIndex = sleepOptions.indexOf(sleepHours);
    if (increment && currentIndex < sleepOptions.length - 1) {
      onSleepChange(sleepOptions[currentIndex + 1]);
    } else if (!increment && currentIndex > 0) {
      onSleepChange(sleepOptions[currentIndex - 1]);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-indigo-100">
      <Label className="block text-sm font-bold text-slate-800 mb-4 text-center">Horas de sueño la noche anterior</Label>
      <div className="flex items-center gap-6 justify-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => adjustSleep(false)}
          disabled={sleepOptions.indexOf(sleepHours) === 0}
          className="h-12 w-12 border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 disabled:opacity-50 rounded-2xl"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="text-center space-y-2 min-w-[100px]">
          <div className="text-3xl font-bold text-slate-800">{sleepHours}</div>
          <span className="text-sm text-slate-700 font-semibold">horas</span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => adjustSleep(true)}
          disabled={sleepOptions.indexOf(sleepHours) === sleepOptions.length - 1}
          className="h-12 w-12 border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 disabled:opacity-50 rounded-2xl"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SleepSelector;
