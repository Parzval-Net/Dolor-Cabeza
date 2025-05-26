
import React, { useState } from 'react';
import { X, Calendar, Clock, Thermometer, Pill, Brain, Heart, Sun, Moon, Plus, Minus } from 'lucide-react';
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

  const adjustDuration = (increment: boolean) => {
    const currentIndex = durationOptions.indexOf(formData.duration);
    if (increment && currentIndex < durationOptions.length - 1) {
      setFormData({ ...formData, duration: durationOptions[currentIndex + 1] });
    } else if (!increment && currentIndex > 0) {
      setFormData({ ...formData, duration: durationOptions[currentIndex - 1] });
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
          <div className="space-y-8">
            <div className="text-center">
              <Calendar className="mx-auto h-16 w-16 text-rose-400 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">¿Cuándo ocurrió?</h3>
              <p className="text-gray-600 text-lg">Registra la fecha y hora del episodio</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="text-gray-700 font-semibold text-lg mb-2 block">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="text-lg p-4 border-2 border-rose-200 focus:border-rose-400 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-gray-700 font-semibold text-lg mb-2 block">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="text-lg p-4 border-2 border-rose-200 focus:border-rose-400 rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-700 font-semibold text-lg mb-4 block">Duración aproximada</Label>
              <div className="flex items-center justify-center space-x-6 bg-rose-50 p-6 rounded-xl">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustDuration(false)}
                  disabled={durationOptions.indexOf(formData.duration) === 0}
                  className="h-12 w-12 rounded-full border-2 border-rose-300 hover:bg-rose-100"
                >
                  <Minus className="h-6 w-6" />
                </Button>
                <div className="text-center min-w-[120px]">
                  <div className="text-3xl font-bold text-rose-600">{formData.duration}</div>
                  <div className="text-gray-600">hora{formData.duration !== 1 ? 's' : ''}</div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustDuration(true)}
                  disabled={durationOptions.indexOf(formData.duration) === durationOptions.length - 1}
                  className="h-12 w-12 rounded-full border-2 border-rose-300 hover:bg-rose-100"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Thermometer className="mx-auto h-16 w-16 text-orange-400 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Intensidad del dolor</h3>
              <p className="text-gray-600 text-lg">Del 1 al 10, ¿qué tan intenso fue?</p>
            </div>

            <div className="space-y-6">
              <div className="text-center bg-orange-50 p-8 rounded-xl">
                <span className="text-6xl font-bold text-orange-500">{formData.intensity[0]}</span>
                <span className="text-2xl text-gray-600">/10</span>
              </div>
              <Slider
                value={formData.intensity}
                onValueChange={(value) => setFormData({ ...formData, intensity: value })}
                max={10}
                min={1}
                step={1}
                className="w-full h-3"
              />
              <div className="flex justify-between text-sm text-gray-600 font-medium">
                <span>1 - Muy leve</span>
                <span>5 - Moderado</span>
                <span>10 - Insoportable</span>
              </div>
            </div>

            <div>
              <Label className="text-gray-700 font-semibold text-lg mb-4 block">Nivel de estrés</Label>
              <div className="bg-lavender-50 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-lavender-600">{formData.stressLevel[0]}</span>
                  <span className="text-lg text-gray-600">/5</span>
                </div>
                <Slider
                  value={formData.stressLevel}
                  onValueChange={(value) => setFormData({ ...formData, stressLevel: value })}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full h-3"
                />
                <div className="flex justify-between text-sm text-gray-600 font-medium mt-2">
                  <span>Relajada</span>
                  <span>Muy estresada</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Brain className="mx-auto h-16 w-16 text-lavender-400 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Síntomas</h3>
              <p className="text-gray-600 text-lg">¿Qué otros síntomas experimentaste?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {symptomOptions.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-3 p-4 bg-lavender-50 rounded-xl hover:bg-lavender-100 transition-colors">
                  <Checkbox
                    id={symptom}
                    checked={formData.symptoms.includes(symptom)}
                    onCheckedChange={() => 
                      toggleArrayItem(formData.symptoms, symptom, (newSymptoms) => 
                        setFormData({ ...formData, symptoms: newSymptoms })
                      )
                    }
                    className="h-5 w-5"
                  />
                  <Label htmlFor={symptom} className="text-lg text-gray-700 font-medium cursor-pointer flex-1">
                    {symptom}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Pill className="mx-auto h-16 w-16 text-coral-400 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Tratamiento</h3>
              <p className="text-gray-600 text-lg">¿Qué medicamentos tomaste y qué te ayudó?</p>
            </div>

            <div>
              <Label className="text-gray-700 font-semibold text-xl mb-4 block">Medicamentos</Label>
              <div className="grid grid-cols-1 gap-3">
                {medicationOptions.map((med) => (
                  <div key={med.id} className="flex items-center space-x-3 p-4 bg-coral-50 rounded-xl hover:bg-coral-100 transition-colors">
                    <Checkbox
                      id={med.id}
                      checked={formData.medications.includes(med.name)}
                      onCheckedChange={() => 
                        toggleArrayItem(formData.medications, med.name, (newMeds) => 
                          setFormData({ ...formData, medications: newMeds })
                        )
                      }
                      className="h-5 w-5"
                    />
                    <Label htmlFor={med.id} className="text-lg text-gray-700 font-medium cursor-pointer flex-1">
                      {med.name} ({med.dosage})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-gray-700 font-semibold text-xl mb-4 block">¿Qué te ayudó a aliviar el dolor?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reliefOptions.map((relief) => (
                  <div key={relief} className="flex items-center space-x-3 p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors">
                    <Checkbox
                      id={relief}
                      checked={formData.relievedBy.includes(relief)}
                      onCheckedChange={() => 
                        toggleArrayItem(formData.relievedBy, relief, (newRelief) => 
                          setFormData({ ...formData, relievedBy: newRelief })
                        )
                      }
                      className="h-5 w-5"
                    />
                    <Label htmlFor={relief} className="text-lg text-gray-700 font-medium cursor-pointer flex-1">
                      {relief}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Heart className="mx-auto h-16 w-16 text-rose-400 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Contexto adicional</h3>
              <p className="text-gray-600 text-lg">Información que puede ayudar a identificar patrones</p>
            </div>

            <div>
              <Label className="text-gray-700 font-semibold text-xl mb-4 block">Posibles desencadenantes</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {triggerOptions.map((trigger) => (
                  <div key={trigger.id} className="flex items-center space-x-3 p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors">
                    <Checkbox
                      id={trigger.id}
                      checked={formData.triggers.includes(trigger.name)}
                      onCheckedChange={() => 
                        toggleArrayItem(formData.triggers, trigger.name, (newTriggers) => 
                          setFormData({ ...formData, triggers: newTriggers })
                        )
                      }
                      className="h-5 w-5"
                    />
                    <Label htmlFor={trigger.id} className="text-lg text-gray-700 font-medium cursor-pointer flex-1">
                      {trigger.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-700 font-semibold text-lg mb-3 block">Estado de ánimo</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                  <SelectTrigger className="text-lg p-4 border-2 border-rose-200 rounded-xl">
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map((mood) => (
                      <SelectItem key={mood} value={mood} className="text-lg">{mood}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 font-semibold text-lg mb-3 block">Clima</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, weather: value })}>
                  <SelectTrigger className="text-lg p-4 border-2 border-rose-200 rounded-xl">
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {weatherOptions.map((weather) => (
                      <SelectItem key={weather} value={weather} className="text-lg">{weather}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 font-semibold text-lg mb-3 block">Ciclo menstrual</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, menstrualCycle: value })}>
                  <SelectTrigger className="text-lg p-4 border-2 border-rose-200 rounded-xl">
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {menstrualOptions.map((cycle) => (
                      <SelectItem key={cycle} value={cycle} className="text-lg">{cycle}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-700 font-semibold text-lg mb-3 block">Horas de sueño</Label>
              <div className="flex items-center justify-center space-x-6 bg-lavender-50 p-6 rounded-xl">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustSleep(false)}
                  disabled={sleepOptions.indexOf(formData.sleepHours) === 0}
                  className="h-12 w-12 rounded-full border-2 border-lavender-300 hover:bg-lavender-100"
                >
                  <Minus className="h-6 w-6" />
                </Button>
                <div className="text-center min-w-[120px]">
                  <div className="text-3xl font-bold text-lavender-600">{formData.sleepHours}</div>
                  <div className="text-gray-600">hora{formData.sleepHours !== 1 ? 's' : ''}</div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustSleep(true)}
                  disabled={sleepOptions.indexOf(formData.sleepHours) === sleepOptions.length - 1}
                  className="h-12 w-12 rounded-full border-2 border-lavender-300 hover:bg-lavender-100"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-gray-700 font-semibold text-lg mb-3 block">Notas adicionales (opcional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Cualquier detalle adicional que consideres importante..."
                className="text-lg p-4 border-2 border-rose-200 focus:border-rose-400 rounded-xl"
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
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto gradient-card shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b border-rose-100 pb-6">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Nuevo Registro de Migraña
            </CardTitle>
            <p className="text-lg text-gray-600 mt-2">
              Paso {currentStep} de {totalSteps}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-10 w-10">
            <X className="h-6 w-6" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          {/* Progress Bar */}
          <div className="w-full bg-rose-100 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-rose-400 to-lavender-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>

          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-rose-100">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="text-lg px-8 py-3 border-2 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl"
            >
              Anterior
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                className="text-lg px-8 py-3 bg-gradient-to-r from-coral-400 to-rose-400 hover:from-coral-500 hover:to-rose-500 text-white rounded-xl shadow-lg"
              >
                Guardar Registro
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="text-lg px-8 py-3 bg-gradient-to-r from-rose-400 to-lavender-400 hover:from-rose-500 hover:to-lavender-500 text-white rounded-xl shadow-lg"
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
