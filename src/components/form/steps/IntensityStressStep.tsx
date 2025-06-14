
import React from 'react';
import { Thermometer } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import StepCard from '../StepCard';

interface IntensityStressStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

const IntensityStressStep = ({ formData, setFormData }: IntensityStressStepProps) => {
  return (
    <StepCard
      icon={<Thermometer className="mx-auto h-16 w-16 text-lavender-500 mb-3 drop-shadow" />}
      title="Intensidad & estrés"
      subtitle="Desliza para seleccionar valores"
      bgColor="bg-pink-50"
    >
      <div className="bg-rose-50/90 rounded-xl p-6 mb-3 shadow border border-rose-100 animate-fade-in">
        <Label className="block text-lg font-bold text-lavender-600 mb-2">Intensidad del dolor</Label>
        <div className="text-center text-5xl font-extrabold text-lavender-700 mb-4">{formData.intensity[0]}</div>
        <Slider
          value={formData.intensity}
          onValueChange={(value) => setFormData({ ...formData, intensity: value })}
          max={10}
          min={1}
          step={1}
          className="w-full h-3"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Leve</span>
          <span>Moderado</span>
          <span>Insoportable</span>
        </div>
      </div>
      
      <div className="bg-lavender-50/90 rounded-xl p-6 mb-1 shadow border border-lavender-100 animate-fade-in">
        <Label className="block text-lg font-bold text-rose-600 mb-2">Nivel de estrés</Label>
        <div className="text-center text-4xl font-bold text-rose-500 mb-3">{formData.stressLevel[0]}</div>
        <Slider
          value={formData.stressLevel}
          onValueChange={(value) => setFormData({ ...formData, stressLevel: value })}
          max={5}
          min={1}
          step={1}
          className="w-full h-3"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Relajada</span>
          <span>Muy estresada</span>
        </div>
      </div>
    </StepCard>
  );
};

export default IntensityStressStep;
