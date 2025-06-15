
import React from 'react';
import { Activity, Clock, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface BasicInfoStepProps {
  formData: {
    date: string;
    time: string;
    intensity: number[];
    stressLevel: number[];
  };
  onFormDataChange: (data: any) => void;
}

const BasicInfoStep = ({ formData, onFormDataChange }: BasicInfoStepProps) => {
  const getIntensityColor = (value: number) => {
    if (value <= 3) return 'text-emerald-600';
    if (value <= 6) return 'text-orange-600';
    if (value <= 8) return 'text-red-500';
    return 'text-red-600';
  };

  const getIntensityBg = (value: number) => {
    if (value <= 3) return 'from-emerald-400 to-emerald-500';
    if (value <= 6) return 'from-orange-400 to-orange-500';
    if (value <= 8) return 'from-red-400 to-red-500';
    return 'from-red-500 to-red-600';
  };

  const getIntensityLabel = (value: number) => {
    if (value <= 3) return 'Leve';
    if (value <= 6) return 'Moderado';
    if (value <= 8) return 'Severo';
    return 'Extremo';
  };

  const getStressLabel = (value: number) => {
    if (value <= 2) return 'Relajado';
    if (value <= 3) return 'Normal';
    if (value <= 4) return 'Estresado';
    return 'Muy estresado';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <Clock className="h-4 w-4 text-violet-500" />
            Fecha
          </Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => onFormDataChange({ ...formData, date: e.target.value })}
            className="border-violet-200 rounded-xl text-base bg-white/90 h-12 safari-form-button mobile-touch-target"
          />
        </div>
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <Clock className="h-4 w-4 text-violet-500" />
            Hora
          </Label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => onFormDataChange({ ...formData, time: e.target.value })}
            className="border-violet-200 rounded-xl text-base bg-white/90 h-12 safari-form-button mobile-touch-target"
          />
        </div>
      </div>

      <div className="glass-card rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-violet-50/70 to-purple-50/70 border border-violet-200/50">
        <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 block text-center flex items-center justify-center gap-2">
          <Activity className="h-5 w-5 text-violet-500" />
          Intensidad del dolor
        </Label>
        <div className="space-y-4 sm:space-y-5">
          <div className="text-center">
            <div className={`text-4xl sm:text-5xl font-bold mb-3 ${getIntensityColor(formData.intensity[0])}`}>
              {formData.intensity[0]}
            </div>
            <Badge 
              variant="secondary" 
              className={`bg-gradient-to-r ${getIntensityBg(formData.intensity[0])} text-white shadow-lg px-4 py-2 text-sm font-medium`}
            >
              {getIntensityLabel(formData.intensity[0])}
            </Badge>
          </div>
          <Slider
            value={formData.intensity}
            onValueChange={(value) => onFormDataChange({ ...formData, intensity: value })}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <div className="glass-card rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-rose-50/70 to-pink-50/70 border border-rose-200/50">
        <Label className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 block text-center flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-rose-500" />
          Nivel de estrés
        </Label>
        <div className="space-y-4 sm:space-y-5">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold mb-2 text-slate-800">
              {formData.stressLevel[0]}
            </div>
            <div className="text-sm text-slate-600 font-medium">
              {getStressLabel(formData.stressLevel[0])}
            </div>
          </div>
          <Slider
            value={formData.stressLevel}
            onValueChange={(value) => onFormDataChange({ ...formData, stressLevel: value })}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
