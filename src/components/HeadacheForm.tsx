
import React, { useState } from 'react';
import { X, Calendar, Clock, Thermometer, Pill, Brain, Heart, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeadacheEntry } from '@/types/headache';
import { medicationOptions, triggerOptions, symptomOptions, reliefOptions, moodOptions } from '@/data/options';

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
    duration: '',
    medications: [] as string[],
    triggers: [] as string[],
    symptoms: [] as string[],
    relievedBy: [] as string[],
    mood: '',
    weather: '',
    menstrualCycle: '',
    sleepHours: '',
    stressLevel: [3],
    notes: '',
  });

  const totalSteps = 5;

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
      duration: parseFloat(formData.duration) || 0,
      medications: formData.medications,
      triggers: formData.triggers,
      symptoms: formData.symptoms,
      relievedBy: formData.relievedBy,
      mood: formData.mood,
      weather: formData.weather,
      menstrualCycle: formData.menstrualCycle,
      sleepHours: parseFloat(formData.sleepHours) || undefined,
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-rose-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Cuándo ocurrió</h3>
              <p className="text-gray-500">Registra la fecha y hora del episodio</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-gray-600 font-medium">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 border-rose-200 focus:border-rose-400"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-gray-600 font-medium">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-1 border-rose-200 focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-600 font-medium">Duración aproximada (horas)</Label>
              <Input
                type="number"
                step="0.5"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Ej: 2.5"
                className="mt-1 border-rose-200 focus:border-rose-400"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Thermometer className="mx-auto h-12 w-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Intensidad del dolor</h3>
              <p className="text-gray-500">Del 1 al 10, ¿qué tan intenso fue?</p>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <span className="text-4xl font-bold text-orange-500">{formData.intensity[0]}/10</span>
              </div>
              <Slider
                value={formData.intensity}
                onValueChange={(value) => setFormData({ ...formData, intensity: value })}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 - Muy leve</span>
                <span>5 - Moderado</span>
                <span>10 - Insoportable</span>
              </div>
            </div>

            <div>
              <Label className="text-gray-600 font-medium">Nivel de estrés (1-5)</Label>
              <div className="mt-2">
                <Slider
                  value={formData.stressLevel}
                  onValueChange={(value) => setFormData({ ...formData, stressLevel: value })}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Relajada</span>
                  <span>Muy estresada</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain className="mx-auto h-12 w-12 text-lavender-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Síntomas</h3>
              <p className="text-gray-500">¿Qué otros síntomas experimentaste?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {symptomOptions.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={formData.symptoms.includes(symptom)}
                    onCheckedChange={() => 
                      toggleArrayItem(formData.symptoms, symptom, (newSymptoms) => 
                        setFormData({ ...formData, symptoms: newSymptoms })
                      )
                    }
                  />
                  <Label htmlFor={symptom} className="text-sm text-gray-600">{symptom}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Pill className="mx-auto h-12 w-12 text-coral-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Tratamiento</h3>
              <p className="text-gray-500">¿Qué medicamentos tomaste y qué te ayudó?</p>
            </div>

            <div>
              <Label className="text-gray-600 font-medium mb-3 block">Medicamentos</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {medicationOptions.map((med) => (
                  <div key={med.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={med.id}
                      checked={formData.medications.includes(med.name)}
                      onCheckedChange={() => 
                        toggleArrayItem(formData.medications, med.name, (newMeds) => 
                          setFormData({ ...formData, medications: newMeds })
                        )
                      }
                    />
                    <Label htmlFor={med.id} className="text-sm text-gray-600">
                      {med.name} ({med.dosage})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-gray-600 font-medium mb-3 block">¿Qué te ayudó a aliviar el dolor?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reliefOptions.map((relief) => (
                  <div key={relief} className="flex items-center space-x-2">
                    <Checkbox
                      id={relief}
                      checked={formData.relievedBy.includes(relief)}
                      onCheckedChange={() => 
                        toggleArrayItem(formData.relievedBy, relief, (newRelief) => 
                          setFormData({ ...formData, relievedBy: newRelief })
                        )
                      }
                    />
                    <Label htmlFor={relief} className="text-sm text-gray-600">{relief}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="mx-auto h-12 w-12 text-rose-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Contexto adicional</h3>
              <p className="text-gray-500">Información que puede ayudar a identificar patrones</p>
            </div>

            <div>
              <Label className="text-gray-600 font-medium mb-3 block">Posibles desencadenantes</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {triggerOptions.map((trigger) => (
                  <div key={trigger.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={trigger.id}
                      checked={formData.triggers.includes(trigger.name)}
                      onCheckedChange={() => 
                        toggleArrayItem(formData.triggers, trigger.name, (newTriggers) => 
                          setFormData({ ...formData, triggers: newTriggers })
                        )
                      }
                    />
                    <Label htmlFor={trigger.id} className="text-sm text-gray-600">{trigger.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-600 font-medium">Estado de ánimo</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                  <SelectTrigger className="mt-1 border-rose-200">
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
                <Label className="text-gray-600 font-medium">Horas de sueño</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={formData.sleepHours}
                  onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                  placeholder="Ej: 7.5"
                  className="mt-1 border-rose-200 focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-gray-600 font-medium">Notas adicionales</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Cualquier detalle adicional que consideres importante..."
                className="mt-1 border-rose-200 focus:border-rose-400"
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto gradient-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Nuevo Registro de Migraña
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Paso {currentStep} de {totalSteps}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-rose-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-rose-400 to-lavender-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>

          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              Anterior
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-coral-400 to-rose-400 hover:from-coral-500 hover:to-rose-500 text-white"
              >
                Guardar Registro
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-rose-400 to-lavender-400 hover:from-rose-500 hover:to-lavender-500 text-white"
              >
                Siguiente
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeadacheForm;
