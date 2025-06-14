
import React from 'react';
import { Calendar, Clock, Timer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import StepCard from '../StepCard';

interface BasicInfoStepProps {
  formData: any;
  setFormData: (data: any) => void;
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
      icon={<Calendar className="mx-auto h-12 w-12 text-pink-500 mb-2" />}
      title="Información básica"
      subtitle="¿Cuándo ocurrió y cuánto duró?"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 text-pink-500" />
              Fecha
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="text-base p-3 border-2 border-pink-100 focus:border-pink-300 rounded-lg bg-white/90 shadow-sm"
            />
          </div>
          <div>
            <Label htmlFor="time" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4 text-pink-500" />
              Hora
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="text-base p-3 border-2 border-pink-100 focus:border-pink-300 rounded-lg bg-white/90 shadow-sm"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-100">
          <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
            <Timer className="h-4 w-4 text-pink-500" />
            Duración aproximada
          </Label>
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => adjustDuration(false)}
              disabled={durationOptions.indexOf(formData.duration) === 0}
              className="h-10 w-10 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
            >
              <span className="text-lg">−</span>
            </Button>
            <div className="text-center mx-4">
              <div className="text-3xl font-bold text-gray-800">{formData.duration}</div>
              <span className="text-sm text-gray-600">{formData.duration !== 1 ? "horas" : "hora"}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => adjustDuration(true)}
              disabled={durationOptions.indexOf(formData.duration) === durationOptions.length - 1}
              className="h-10 w-10 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
            >
              <span className="text-lg">+</span>
            </Button>
          </div>
        </div>
      </div>
    </StepCard>
  );
};

export default BasicInfoStep;
