
import React, { useState } from 'react';
import { Brain, Pill, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { HeadacheEntry } from '@/types/headache';
import { medicationOptions, triggerOptions, symptomOptions, reliefOptions, moodOptions } from '@/data/options';
import FormHeader from '@/components/form/FormHeader';
import ProgressBar from '@/components/form/ProgressBar';
import FormNavigation from '@/components/form/FormNavigation';
import BasicInfoStep from '@/components/form/steps/BasicInfoStep';
import IntensityStressStep from '@/components/form/steps/IntensityStressStep';
import StepCard from '@/components/form/StepCard';
import InteractiveButton from '@/components/form/InteractiveButton';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface HeadacheFormProps {
  onSave: (entry: HeadacheEntry) => void;
  onCancel: () => void;
}

const HeadacheForm = ({ onSave, onCancel }: HeadacheFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    intensity: [5],
    duration: 2,
    medications: [] as string[],
    triggers: [] as string[],
    symptoms: [] as string[],
    relievedBy: [] as string[],
    mood: '',
    weather: '',
    menstrualCycle: '',
    sleepHours: 7,
    stressLevel: [3],
    notes: '',
  });

  const totalSteps = 5;
  const durationOptions = [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 24];
  const sleepOptions = [4, 5, 6, 7, 8, 9, 10, 11, 12];
  const weatherOptions = ['Soleado', 'Nublado', 'Lluvioso', 'Tormentoso', 'Ventoso'];
  const menstrualOptions = ['Menstruación', 'Ovulación', 'Pre-menstrual', 'Post-menstrual', 'No aplica'];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const entry: HeadacheEntry = {
      id: Date.now().toString(),
      date: formData.date,
      time: formData.time,
      intensity: formData.intensity[0],
      duration: formData.duration,
      medications: formData.medications,
      triggers: formData.triggers,
      symptoms: formData.symptoms,
      relievedBy: formData.relievedBy,
      mood: formData.mood,
      weather: formData.weather,
      menstrualCycle: formData.menstrualCycle,
      sleepHours: formData.sleepHours,
      stressLevel: formData.stressLevel[0],
      notes: formData.notes,
    };
    onSave(entry);
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const adjustSleep = (increment: boolean) => {
    const currentIndex = sleepOptions.indexOf(formData.sleepHours);
    if (increment && currentIndex < sleepOptions.length - 1) {
      setFormData({ ...formData, sleepHours: sleepOptions[currentIndex + 1] });
    } else if (!increment && currentIndex > 0) {
      setFormData({ ...formData, sleepHours: sleepOptions[currentIndex - 1] });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep 
            formData={formData}
            setFormData={setFormData}
            durationOptions={durationOptions}
          />
        );
      case 2:
        return (
          <IntensityStressStep 
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <StepCard
            icon={<Brain className="mx-auto h-16 w-16 text-coral-400 mb-3 drop-shadow" />}
            title="Síntomas"
            subtitle="Haz tap en los síntomas para seleccionarlos"
            bgColor="bg-coral-50"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-coral-50 p-4 rounded-xl border border-coral-200 shadow-inner">
              {symptomOptions.map((symptom) => (
                <InteractiveButton
                  key={symptom}
                  isSelected={formData.symptoms.includes(symptom)}
                  onClick={() =>
                    toggleArrayItem(formData.symptoms, symptom, (newSymptoms) =>
                      setFormData({ ...formData, symptoms: newSymptoms })
                    )
                  }
                  variant="secondary"
                  className="flex-1"
                >
                  {symptom}
                </InteractiveButton>
              ))}
            </div>
          </StepCard>
        );
      case 4:
        return (
          <StepCard
            icon={<Pill className="mx-auto h-16 w-16 text-lavender-500 mb-3 drop-shadow" />}
            title="Tratamiento"
            subtitle="Selecciona medicamentos y acciones que ayudaron"
            bgColor="bg-pink-50"
          >
            <div>
              <Label className="block text-lg font-bold text-rose-600 mb-2">Medicamentos</Label>
              <div className="flex flex-wrap gap-2">
                {medicationOptions.map((med) => (
                  <InteractiveButton
                    key={med.id}
                    isSelected={formData.medications.includes(med.name)}
                    onClick={() =>
                      toggleArrayItem(formData.medications, med.name, (newMeds) =>
                        setFormData({ ...formData, medications: newMeds })
                      )
                    }
                    className="text-sm"
                  >
                    {med.name}
                  </InteractiveButton>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <Label className="block text-lg font-bold text-lavender-600 mb-2">¿Qué ayudó a aliviar el dolor?</Label>
              <div className="flex flex-wrap gap-2">
                {reliefOptions.map((relief) => (
                  <InteractiveButton
                    key={relief}
                    isSelected={formData.relievedBy.includes(relief)}
                    onClick={() =>
                      toggleArrayItem(formData.relievedBy, relief, (newRelief) =>
                        setFormData({ ...formData, relievedBy: newRelief })
                      )
                    }
                    variant="secondary"
                    className="text-sm"
                  >
                    {relief}
                  </InteractiveButton>
                ))}
              </div>
            </div>
          </StepCard>
        );
      case 5:
        return (
          <StepCard
            icon={<Heart className="mx-auto h-16 w-16 text-rose-400 mb-4 drop-shadow" />}
            title="Contexto adicional"
            subtitle="Completa solo lo que desees, es opcional"
            bgColor="bg-pink-50"
            sparkle
          >
            <div>
              <Label className="block text-lg font-bold text-rose-600 mb-2">Posibles desencadenantes</Label>
              <div className="flex flex-wrap gap-2">
                {triggerOptions.map((trigger) => (
                  <InteractiveButton
                    key={trigger.id}
                    isSelected={formData.triggers.includes(trigger.name)}
                    onClick={() =>
                      toggleArrayItem(formData.triggers, trigger.name, (newTriggers) =>
                        setFormData({ ...formData, triggers: newTriggers })
                      )
                    }
                    variant="accent"
                    className="text-sm"
                  >
                    {trigger.name}
                  </InteractiveButton>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
              <div>
                <Label className="block text-lg font-bold text-lavender-600 mb-1">Estado de ánimo</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                  <SelectTrigger className="text-base font-semibold p-3 border-2 border-lavender-200 rounded-xl bg-white/90 shadow">
                    <SelectValue placeholder={formData.mood || "Selecciona..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map((mood) => (
                      <SelectItem key={mood} value={mood} className="text-base">{mood}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-lg font-bold text-pink-600 mb-1">Clima</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, weather: value })}>
                  <SelectTrigger className="text-base font-semibold p-3 border-2 border-pink-200 rounded-xl bg-white/90 shadow">
                    <SelectValue placeholder={formData.weather || "Selecciona..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {weatherOptions.map((weather) => (
                      <SelectItem key={weather} value={weather} className="text-base">{weather}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-lg font-bold text-coral-600 mb-1">Ciclo menstrual</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, menstrualCycle: value })}>
                  <SelectTrigger className="text-base font-semibold p-3 border-2 border-coral-200 rounded-xl bg-white/90 shadow">
                    <SelectValue placeholder={formData.menstrualCycle || "Selecciona..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {menstrualOptions.map((cycle) => (
                      <SelectItem key={cycle} value={cycle} className="text-base">{cycle}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-5 flex flex-col items-center bg-rose-50/80 p-4 rounded-xl">
              <Label className="block text-lg font-bold text-lavender-600 mb-1">Horas de sueño</Label>
              <div className="flex items-center gap-3 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustSleep(false)}
                  disabled={sleepOptions.indexOf(formData.sleepHours) === 0}
                  className="h-10 w-10 border-2 border-lavender-300 hover:bg-lavender-50 font-bold"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <div className="text-2xl font-bold text-lavender-600 mx-3">{formData.sleepHours}<span className="text-base ml-1 font-normal">h</span></div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustSleep(true)}
                  disabled={sleepOptions.indexOf(formData.sleepHours) === sleepOptions.length - 1}
                  className="h-10 w-10 border-2 border-lavender-300 hover:bg-lavender-50 font-bold"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="mt-5">
              <Label htmlFor="notes" className="block text-lg font-bold text-lavender-600 mb-1">Notas adicionales</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="¿Algo más que quieras agregar?"
                className="text-base p-3 border-2 border-lavender-200 rounded-xl bg-white/80 shadow"
                rows={2}
              />
            </div>
          </StepCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-2 z-50 animate-fade-in">
      <Card className="w-full max-w-3xl max-h-[94vh] overflow-y-auto gradient-card shadow-2xl border-4 border-lavender-100 relative">
        <FormHeader 
          currentStep={currentStep}
          totalSteps={totalSteps}
          onCancel={onCancel}
        />

        <CardContent className="space-y-8 px-4 md:px-10 pt-8 pb-8 bg-white/50 rounded-b-[1rem] animate-fade-in">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          {renderStep()}
          <FormNavigation 
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HeadacheForm;
