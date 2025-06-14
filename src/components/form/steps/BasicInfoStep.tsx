
import React from 'react';
import { Calendar, Plus, Minus } from 'lucide-react';
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
      icon={<Calendar className="mx-auto h-16 w-16 text-rose-400 mb-3 drop-shadow" />}
      title="Registro dolor de cabeza"
      subtitle="¿Cuándo, cuánto duró y a qué hora ocurrió?"
    >
      <div className="flex flex-col gap-4 md:flex-row md:gap-10 justify-center">
        <div className="w-full md:w-1/2">
          <Label htmlFor="date" className="block text-lg font-bold text-rose-600 mb-1">Fecha</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="text-lg p-3 border-2 border-rose-200 focus:border-lavender-400 rounded-xl font-semibold text-rose-800 bg-white/90 shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Label htmlFor="time" className="block text-lg font-bold text-rose-600 mb-1">Hora</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="text-lg p-3 border-2 border-rose-200 focus:border-lavender-400 rounded-xl font-semibold text-rose-800 bg-white/90 shadow-md"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 bg-rose-50/80 p-6 rounded-xl shadow animate-fade-in border border-lavender-200 mt-4">
        <Label className="text-base font-medium text-lavender-500 mb-3">Duración aproximada</Label>
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => adjustDuration(false)}
            disabled={durationOptions.indexOf(formData.duration) === 0}
            className="h-10 w-10 border-2 border-lavender-300 hover:bg-lavender-50 text-2xl"
          >
            <Minus className="h-5 w-5" />
          </Button>
          <div className="text-center mx-3">
            <div className="text-2xl font-bold text-lavender-600">{formData.duration}</div>
            <span className="text-gray-600 text-base">{formData.duration !== 1 ? "horas" : "hora"}</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => adjustDuration(true)}
            disabled={durationOptions.indexOf(formData.duration) === durationOptions.length - 1}
            className="h-10 w-10 border-2 border-lavender-300 hover:bg-lavender-50 text-2xl"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </StepCard>
  );
};

export default BasicInfoStep;
