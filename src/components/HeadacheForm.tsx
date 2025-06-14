import React, { useState } from 'react';
import { Brain, Pill, Heart, Plus, Minus } from 'lucide-react';
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
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-xl shadow-cyan-500/30 floating-animation">
                <Brain className="h-8 w-8 text-white" />
              </div>
            }
            title="Síntomas asociados"
            subtitle="Selecciona todos los síntomas que experimentaste durante el episodio"
            sparkle
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
                  className="text-xs h-12"
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
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/30 floating-animation">
                <Pill className="h-8 w-8 text-white" />
              </div>
            }
            title="Tratamiento utilizado"
            subtitle="¿Qué medicamentos o métodos usaste para aliviar el dolor?"
            sparkle
          >
            <div className="space-y-8">
              {/* Medications */}
              <div className="space-y-4">
                <Label className="block text-lg font-semibold text-slate-700 text-center">Medicamentos</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {medicationOptions.map((med) => (
                    <InteractiveButton
                      key={med.id}
                      isSelected={formData.medications.includes(med.name)}
                      onClick={() =>
                        toggleArrayItem(formData.medications, med.name, (newMeds) =>
                          setFormData({ ...formData, medications: newMeds })
                        )
                      }
                      className="text-xs h-12"
                    >
                      {med.name}
                    </InteractiveButton>
                  ))}
                </div>
              </div>
              
              {/* Relief Methods */}
              <div className="space-y-4">
                <Label className="block text-lg font-semibold text-slate-700 text-center">Métodos de alivio</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {reliefOptions.map((relief) => (
                    <InteractiveButton
                      key={relief}
                      isSelected={formData.relievedBy.includes(relief)}
                      onClick={() =>
                        toggleArrayItem(formData.relievedBy, relief, (newRelief) =>
                          setFormData({ ...formData, relievedBy: newRelief })
                        )
                      }
                      variant="accent"
                      className="text-xs h-12"
                    >
                      {relief}
                    </InteractiveButton>
                  ))}
                </div>
              </div>
            </div>
          </StepCard>
        );
      case 5:
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
                <Label className="block text-lg font-semibold text-slate-700 text-center">Posibles desencadenantes</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
                  <Label className="text-sm font-semibold text-slate-700">Estado de ánimo</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                    <SelectTrigger className="border-2 border-slate-200 focus:border-violet-400 rounded-2xl h-12">
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      {moodOptions.map((mood) => (
                        <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Clima</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, weather: value })}>
                    <SelectTrigger className="border-2 border-slate-200 focus:border-violet-400 rounded-2xl h-12">
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      {weatherOptions.map((weather) => (
                        <SelectItem key={weather} value={weather}>{weather}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Ciclo menstrual</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, menstrualCycle: value })}>
                    <SelectTrigger className="border-2 border-slate-200 focus:border-violet-400 rounded-2xl h-12">
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      {menstrualOptions.map((cycle) => (
                        <SelectItem key={cycle} value={cycle}>{cycle}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Sleep Hours */}
              <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-indigo-100">
                <Label className="block text-sm font-semibold text-slate-700 mb-4 text-center">Horas de sueño la noche anterior</Label>
                <div className="flex items-center gap-6 justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustSleep(false)}
                    disabled={sleepOptions.indexOf(formData.sleepHours) === 0}
                    className="h-12 w-12 border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 disabled:opacity-50 rounded-2xl"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="text-center space-y-2 min-w-[100px]">
                    <div className="text-3xl font-bold text-slate-800">{formData.sleepHours}</div>
                    <span className="text-sm text-slate-600 font-medium">horas</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustSleep(true)}
                    disabled={sleepOptions.indexOf(formData.sleepHours) === sleepOptions.length - 1}
                    className="h-12 w-12 border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 disabled:opacity-50 rounded-2xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-sm font-semibold text-slate-700">Notas adicionales</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="¿Hay algo más que te gustaría agregar sobre este episodio?"
                  className="border-2 border-slate-200 focus:border-violet-400 rounded-2xl bg-white shadow-sm transition-all duration-300 focus:shadow-lg focus:shadow-violet-500/10 resize-none"
                  rows={4}
                />
              </div>
            </div>
          </StepCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[95vh] overflow-y-auto glass-card-dark shadow-2xl border-0 rounded-3xl">
        <FormHeader 
          currentStep={currentStep}
          totalSteps={totalSteps}
          onCancel={onCancel}
        />

        <CardContent className="p-8 space-y-8">
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
