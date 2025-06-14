
import React from 'react';
import { Activity, Heart } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import StepCard from '../StepCard';

interface IntensityStressStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

const IntensityStressStep = ({ formData, setFormData }: IntensityStressStepProps) => {
  const getIntensityColor = (value: number) => {
    if (value <= 3) return 'text-green-600';
    if (value <= 6) return 'text-yellow-600';
    if (value <= 8) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStressColor = (value: number) => {
    if (value <= 2) return 'text-blue-600';
    if (value <= 3) return 'text-indigo-600';
    return 'text-purple-600';
  };

  return (
    <StepCard
      icon={<Activity className="mx-auto h-12 w-12 text-pink-500 mb-2" />}
      title="Intensidad y estrés"
      subtitle="Desliza para seleccionar los niveles"
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
          <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
            <Activity className="h-4 w-4 text-pink-500" />
            Intensidad del dolor
          </Label>
          <div className={`text-center text-4xl font-bold mb-4 ${getIntensityColor(formData.intensity[0])}`}>
            {formData.intensity[0]}
          </div>
          <Slider
            value={formData.intensity}
            onValueChange={(value) => setFormData({ ...formData, intensity: value })}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Leve (1)</span>
            <span>Moderado (5)</span>
            <span>Insoportable (10)</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
            <Heart className="h-4 w-4 text-purple-500" />
            Nivel de estrés
          </Label>
          <div className={`text-center text-3xl font-bold mb-4 ${getStressColor(formData.stressLevel[0])}`}>
            {formData.stressLevel[0]}
          </div>
          <Slider
            value={formData.stressLevel}
            onValueChange={(value) => setFormData({ ...formData, stressLevel: value })}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Relajada (1)</span>
            <span>Muy estresada (5)</span>
          </div>
        </div>
      </div>
    </StepCard>
  );
};

export default IntensityStressStep;
