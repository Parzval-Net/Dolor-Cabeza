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
            icon={<Brain className="mx-auto h-12 w-12 text-pink-500 mb-2" />}
            title="Síntomas"
            subtitle="Selecciona los síntomas que experimentaste"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                  className="text-xs"
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
            icon={<Pill className="mx-auto h-12 w-12 text-pink-500 mb-2" />}
            title="Tratamiento"
            subtitle="¿Qué usaste para aliviar el dolor?"
          >
            <div className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">Medicamentos</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {medicationOptions.map((med) => (
                    <InteractiveButton
                      key={med.id}
                      isSelected={formData.medications.includes(med.name)}
                      onClick={() =>
                        toggleArrayItem(formData.medications, med.name, (newMeds) =>
                          setFormData({ ...formData, medications: newMeds })
                        )
                      }
                      className="text-xs"
                    >
                      {med.name}
                    </InteractiveButton>
                  ))}
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">¿Qué más ayudó?</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                      className="text-xs"
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
            icon={<Heart className="mx-auto h-12 w-12 text-pink-500 mb-2" />}
            title="Contexto adicional"
            subtitle="Información opcional que puede ayudar"
          >
            <div className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">Posibles desencadenantes</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                      className="text-xs"
                    >
                      {trigger.name}
                    </InteractiveButton>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Estado de ánimo</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                    <SelectTrigger className="border-pink-200 focus:border-pink-300">
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      {moodOptions.map((mood) => (
                        <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Clima</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, weather: value })}>
                    <SelectTrigger className="border-pink-200 focus:border-pink-300">
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      {weatherOptions.map((weather) => (
                        <SelectItem key={weather} value={weather}>{weather}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Ciclo menstrual</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, menstrualCycle: value })}>
                    <SelectTrigger className="border-pink-200 focus:border-pink-300">
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
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                <Label className="block text-sm font-medium text-gray-700 mb-3 text-center">Horas de sueño</Label>
                <div className="flex items-center gap-4 justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustSleep(false)}
                    disabled={sleepOptions.indexOf(formData.sleepHours) === 0}
                    className="h-10 w-10 border-purple-200 hover:bg-purple-50"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{formData.sleepHours}</div>
                    <span className="text-sm text-gray-600">horas</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustSleep(true)}
                    disabled={sleepOptions.indexOf(formData.sleepHours) === sleepOptions.length - 1}
                    className="h-10 w-10 border-purple-200 hover:bg-purple-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">Notas adicionales</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="¿Algo más que quieras agregar?"
                  className="border-pink-200 focus:border-pink-300 bg-white/90"
                  rows={3}
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[95vh] overflow-y-auto bg-white shadow-2xl border-0 rounded-2xl">
        <FormHeader 
          currentStep={currentStep}
          totalSteps={totalSteps}
          onCancel={onCancel}
        />

        <CardContent className="p-6 space-y-6">
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
