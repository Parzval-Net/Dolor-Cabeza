
import React from 'react';
import { Zap, Save, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface ExpressFormProps {
  formData: {
    date: string;
    time: string;
    intensity: number[];
    stressLevel: number[];
  };
  onFormDataChange: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onSwitchToComplete: () => void;
}

const ExpressForm = ({ 
  formData, 
  onFormDataChange, 
  onSubmit, 
  onCancel, 
  onSwitchToComplete 
}: ExpressFormProps) => {
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 safe-area-pt safe-area-pb">
      <Card className="w-full max-w-sm glass-card-mobile shadow-2xl border-0 rounded-3xl overflow-hidden mx-4">
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-rose-500/25">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Registro Express</h2>
              <p className="text-sm text-slate-600 font-medium">Solo lo esencial, en segundos</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Fecha</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => onFormDataChange({ ...formData, date: e.target.value })}
                  className="border-violet-200 rounded-xl bg-white/90 text-base h-12 safari-form-button mobile-touch-target"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Hora</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => onFormDataChange({ ...formData, time: e.target.value })}
                  className="border-violet-200 rounded-xl bg-white/90 text-base h-12 safari-form-button mobile-touch-target"
                />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-violet-50/80 to-purple-50/80 border border-violet-200/50">
              <Label className="text-sm font-bold text-slate-700 mb-3 block text-center">Intensidad del dolor</Label>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl sm:text-4xl font-bold mb-2 ${getIntensityColor(formData.intensity[0])}`}>
                    {formData.intensity[0]}
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`bg-gradient-to-r ${getIntensityBg(formData.intensity[0])} text-white shadow-lg text-xs px-3 py-1`}
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
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onCancel} 
              className="flex-1 text-sm rounded-xl h-12 safari-button-fix mobile-touch-target"
            >
              Cancelar
            </Button>
            <Button 
              onClick={onSubmit} 
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-sm rounded-xl h-12 safari-button-fix mobile-touch-target"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </div>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={onSwitchToComplete}
              className="text-sm text-violet-600 hover:text-violet-700 h-12 safari-button-fix mobile-touch-target"
            >
              ¿Quieres agregar más detalles?
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpressForm;
