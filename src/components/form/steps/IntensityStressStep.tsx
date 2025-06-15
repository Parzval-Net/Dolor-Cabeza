
import React from 'react';
import { Activity, Heart } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import StepCard from '../StepCard';

interface IntensityStressData {
  intensity: number[];
  stressLevel: number[];
}

interface IntensityStressStepProps {
  formData: IntensityStressData;
  setFormData: (data: IntensityStressData) => void;
}

const IntensityStressStep = ({ formData, setFormData }: IntensityStressStepProps) => {
  const getIntensityColor = (value: number) => {
    if (value <= 3) return 'text-emerald-600';
    if (value <= 6) return 'text-orange-600';
    if (value <= 8) return 'text-red-500';
    return 'text-red-600';
  };

  const getStressColor = (value: number) => {
    if (value <= 2) return 'text-emerald-600';
    if (value <= 3) return 'text-violet-600';
    return 'text-red-600';
  };

  const getIntensityGradient = (value: number) => {
    if (value <= 3) return 'from-emerald-400 to-emerald-500';
    if (value <= 6) return 'from-orange-400 to-orange-500';
    if (value <= 8) return 'from-red-400 to-red-500';
    return 'from-red-500 to-red-600';
  };

  const getStressGradient = (value: number) => {
    if (value <= 2) return 'from-emerald-400 to-emerald-500';
    if (value <= 3) return 'from-violet-400 to-purple-500';
    return 'from-red-400 to-red-500';
  };

  return (
    <StepCard
      icon={
        <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-xl shadow-fuchsia-500/30 floating-animation">
          <Activity className="h-8 w-8 text-white" />
        </div>
      }
      title="Intensidad y estrés"
      subtitle="Desliza para indicar qué tan intenso fue tu dolor y tu nivel de estrés"
      sparkle
    >
      <div className="space-y-8">
        {/* Pain Intensity */}
        <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-violet-50/50 to-purple-50/50 border border-violet-100">
          <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-6 justify-center">
            <Activity className="h-5 w-5 text-violet-500" />
            Intensidad del dolor
          </Label>
          <div className="space-y-6">
            <div className="text-center">
              <div className={`text-5xl font-bold mb-2 ${getIntensityColor(formData.intensity[0])}`}>
                {formData.intensity[0]}
              </div>
              <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getIntensityGradient(formData.intensity[0])} text-white shadow-lg`}>
                {formData.intensity[0] <= 3 ? 'Leve' : 
                 formData.intensity[0] <= 6 ? 'Moderado' : 
                 formData.intensity[0] <= 8 ? 'Severo' : 'Extremo'}
              </div>
            </div>
            <Slider
              value={formData.intensity}
              onValueChange={(value) => setFormData({ ...formData, intensity: value })}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 px-2">
              <span className="flex flex-col items-center">
                <div className="w-3 h-3 bg-emerald-400 rounded-full mb-1"></div>
                <span>Leve (1-3)</span>
              </span>
              <span className="flex flex-col items-center">
                <div className="w-3 h-3 bg-orange-400 rounded-full mb-1"></div>
                <span>Moderado (4-6)</span>
              </span>
              <span className="flex flex-col items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mb-1"></div>
                <span>Severo (7-8)</span>
              </span>
              <span className="flex flex-col items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mb-1"></div>
                <span>Extremo (9-10)</span>
              </span>
            </div>
          </div>
        </div>
        
        {/* Stress Level */}
        <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-fuchsia-50/50 to-pink-50/50 border border-fuchsia-100">
          <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-6 justify-center">
            <Heart className="h-5 w-5 text-fuchsia-500" />
            Nivel de estrés
          </Label>
          <div className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getStressColor(formData.stressLevel[0])}`}>
                {formData.stressLevel[0]}
              </div>
              <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getStressGradient(formData.stressLevel[0])} text-white shadow-lg`}>
                {formData.stressLevel[0] <= 2 ? 'Relajada' : 
                 formData.stressLevel[0] <= 3 ? 'Normal' : 
                 formData.stressLevel[0] <= 4 ? 'Estresada' : 'Muy estresada'}
              </div>
            </div>
            <Slider
              value={formData.stressLevel}
              onValueChange={(value) => setFormData({ ...formData, stressLevel: value })}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 px-2">
              <span className="text-center">Relajada<br/>(1)</span>
              <span className="text-center">Normal<br/>(2-3)</span>
              <span className="text-center">Muy estresada<br/>(4-5)</span>
            </div>
          </div>
        </div>
      </div>
    </StepCard>
  );
};

export default IntensityStressStep;
