
import React from 'react';
import { Heart } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { triggerOptions, moodOptions } from '@/data/options';
import StepCard from '@/components/form/StepCard';
import InteractiveButton from '@/components/form/InteractiveButton';
import SleepSelector from '@/components/form/SleepSelector';

interface ContextData {
  triggers: string[];
  mood: string;
  weather: string;
  menstrualCycle: string;
  sleepHours: number;
  notes: string;
}

interface ContextStepProps {
  formData: ContextData;
  onFormDataChange: (data: ContextData) => void;
  toggleArrayItem: (array: string[], item: string, setter: (value: string[]) => void) => void;
}

const ContextStep = ({ formData, onFormDataChange, toggleArrayItem }: ContextStepProps) => {
  const weatherOptions = ['Soleado', 'Nublado', 'Lluvioso', 'Tormentoso', 'Ventoso'];
  const menstrualOptions = ['Menstruación', 'Ovulación', 'Pre-menstrual', 'Post-menstrual', 'No aplica'];

  return (
    <StepCard
      icon={
        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-xl shadow-rose-500/30 floating-animation">
          <Heart className="h-8 w-8 text-white" />
        </div>
      }
      title="Contexto adicional"
      subtitle="Información adicional que nos ayudará a entender mejor tu episodio"
      sparkle
    >
      <div className="space-y-8">
        {/* Triggers */}
        <div className="space-y-4">
          <Label className="block text-lg font-bold text-slate-800 text-center">Posibles desencadenantes</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {triggerOptions.map((trigger) => (
              <InteractiveButton
                key={trigger.id}
                isSelected={formData.triggers.includes(trigger.name)}
                onClick={() =>
                  toggleArrayItem(formData.triggers, trigger.name, (newTriggers) =>
                    onFormDataChange({ ...formData, triggers: newTriggers })
                  )
                }
                variant="accent"
                className="text-xs h-12"
              >
                {trigger.name}
              </InteractiveButton>
            ))}
          </div>
        </div>
        
        {/* Context Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-800">Estado de ánimo</Label>
            <Select onValueChange={(value) => onFormDataChange({ ...formData, mood: value })}>
              <SelectTrigger className="border-2 border-slate-300 focus:border-violet-500 rounded-2xl h-12 bg-white text-slate-800 font-semibold">
                <SelectValue placeholder="Selecciona..." className="text-slate-800" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-slate-300">
                {moodOptions.map((mood) => (
                  <SelectItem key={mood} value={mood} className="text-slate-800 font-semibold hover:bg-violet-50">{mood}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-800">Clima</Label>
            <Select onValueChange={(value) => onFormDataChange({ ...formData, weather: value })}>
              <SelectTrigger className="border-2 border-slate-300 focus:border-violet-500 rounded-2xl h-12 bg-white text-slate-800 font-semibold">
                <SelectValue placeholder="Selecciona..." className="text-slate-800" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-slate-300">
                {weatherOptions.map((weather) => (
                  <SelectItem key={weather} value={weather} className="text-slate-800 font-semibold hover:bg-violet-50">{weather}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-800">Ciclo menstrual</Label>
            <Select onValueChange={(value) => onFormDataChange({ ...formData, menstrualCycle: value })}>
              <SelectTrigger className="border-2 border-slate-300 focus:border-violet-500 rounded-2xl h-12 bg-white text-slate-800 font-semibold">
                <SelectValue placeholder="Selecciona..." className="text-slate-800" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-slate-300">
                {menstrualOptions.map((cycle) => (
                  <SelectItem key={cycle} value={cycle} className="text-slate-800 font-semibold hover:bg-violet-50">{cycle}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Sleep Hours */}
        <SleepSelector
          sleepHours={formData.sleepHours}
          onSleepChange={(hours) => onFormDataChange({ ...formData, sleepHours: hours })}
        />
        
        {/* Notes */}
        <div className="space-y-3">
          <Label htmlFor="notes" className="text-sm font-bold text-slate-800">Notas adicionales</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => onFormDataChange({ ...formData, notes: e.target.value })}
            placeholder="¿Hay algo más que te gustaría agregar sobre este episodio?"
            className="border-2 border-slate-300 focus:border-violet-500 rounded-2xl bg-white shadow-sm transition-all duration-300 focus:shadow-lg focus:shadow-violet-500/10 resize-none text-slate-800 font-medium placeholder:text-slate-500"
            rows={4}
          />
        </div>
      </div>
    </StepCard>
  );
};

export default ContextStep;
