
import React from 'react';
import { Calendar, Clock, Timer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import StepCard from '../StepCard';

interface BasicInfoData {
  date: string;
  time: string;
  duration: number;
}

interface BasicInfoStepProps {
  formData: BasicInfoData;
  setFormData: (data: BasicInfoData) => void;
  durationOptions: number[];
}

const BasicInfoStep = ({ formData, setFormData, durationOptions }: BasicInfoStepProps) => {
  const adjustDuration = (increment: boolean) => {
    const currentIndex = durationOptions.indexOf(formData.duration);
    if (increment && currentIndex < durationOptions.length - 1) {
      setFormData({ ...formData, duration: durationOptions[currentIndex + 1] });
    } else if (!increment && currentIndex > 0) {
      setFormData({ ...formData, duration: durationOptions[currentIndex - 1] });
    }
  };

  return (
    <StepCard
      icon={
        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-500/30 floating-animation">
          <Calendar className="h-8 w-8 text-white" />
        </div>
      }
      title="Información básica"
      subtitle="Cuéntanos cuándo ocurrió tu episodio y cuánto tiempo duró"
      sparkle
    >
      <div className="space-y-8">
        {/* Date and Time Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar className="h-4 w-4 text-violet-500" />
              Fecha del episodio
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="text-base p-4 border-2 border-slate-200 focus:border-violet-400 rounded-2xl bg-white shadow-sm transition-all duration-300 focus:shadow-lg focus:shadow-violet-500/10 text-slate-800 font-medium"
              style={{ colorScheme: 'light' }}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="time" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Clock className="h-4 w-4 text-violet-500" />
              Hora de inicio
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="text-base p-4 border-2 border-slate-200 focus:border-violet-400 rounded-2xl bg-white shadow-sm transition-all duration-300 focus:shadow-lg focus:shadow-violet-500/10 text-slate-800 font-medium"
              style={{ colorScheme: 'light' }}
            />
          </div>
        </div>

        {/* Duration Selector */}
        <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-violet-50/50 to-purple-50/50 border border-violet-100">
          <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-6 justify-center">
            <Timer className="h-4 w-4 text-violet-500" />
            Duración aproximada
          </Label>
          <div className="flex items-center justify-center gap-6">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => adjustDuration(false)}
              disabled={durationOptions.indexOf(formData.duration) === 0}
              className="h-12 w-12 border-2 border-violet-200 hover:bg-violet-50 hover:border-violet-300 disabled:opacity-50 rounded-2xl transition-all duration-300"
            >
              <span className="text-xl font-bold text-violet-600">−</span>
            </Button>
            <div className="text-center space-y-2 min-w-[120px]">
              <div className="text-4xl font-bold text-slate-800">{formData.duration}</div>
              <span className="text-sm text-slate-600 font-medium">
                {formData.duration !== 1 ? "horas" : "hora"}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => adjustDuration(true)}
              disabled={durationOptions.indexOf(formData.duration) === durationOptions.length - 1}
              className="h-12 w-12 border-2 border-violet-200 hover:bg-violet-50 hover:border-violet-300 disabled:opacity-50 rounded-2xl transition-all duration-300"
            >
              <span className="text-xl font-bold text-violet-600">+</span>
            </Button>
          </div>
        </div>
      </div>
    </StepCard>
  );
};

export default BasicInfoStep;
