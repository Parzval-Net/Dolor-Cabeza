
import React, { useState } from 'react';
import { X, Calendar, Clock, Thermometer, Pill, Brain, Heart, Sun, Moon, Plus, Minus, Sparkles } from 'lucide-react';
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

  const stepCard = (icon: React.ReactNode, title: string, subtitle: string, children: React.ReactNode, bgColor?: string, sparkle?: boolean) => (
    <div className={`space-y-8 ${bgColor || ''}`}>
      <div className="text-center relative">
        {sparkle && (
          <Sparkles className="absolute left-[13%] -top-3 text-lavender-200 animate-gentle-bounce" size={32} />
        )}
        <div className="flex flex-col items-center justify-center">
          {icon}
          <h3 className="text-3xl font-extrabold text-rose-500 font-playfair mb-2 drop-shadow">
            {title}
          </h3>
          <p className="text-lg text-lavender-900 font-medium">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return stepCard(
          <Calendar className="mx-auto h-16 w-16 text-rose-400 mb-3 drop-shadow" />,
          "Registro dolor de cabeza",
          "¿Cuándo, cuánto duró y a qué hora ocurrió?",
          (
            <>
              <div className="flex flex-col gap-4 md:flex-row md:gap-10 justify-center">
                <div className="w-full md:w-1/2">
                  <Label htmlFor="date" className="block text-lg font-bold text-rose-600 mb-1">Fecha</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="text-lg p-3 border-2 border-rose-200 focus:border-lavender-400 rounded-xl font-semibold text-rose-800 bg-white/90 shadow-md"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Label htmlFor="time" className="block text-lg font-bold text-rose-600 mb-1">Hora</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="text-lg p-3 border-2 border-rose-200 focus:border-lavender-400 rounded-xl font-semibold text-rose-800 bg-white/90 shadow-md"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 bg-rose-50/80 p-6 rounded-xl shadow animate-fade-in border border-lavender-200 mt-4">
                <Label className="text-base font-medium text-lavender-500 mb-3">Duración aproximada</Label>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustDuration(false)}
                    disabled={durationOptions.indexOf(formData.duration) === 0}
                    className="h-10 w-10 border-2 border-lavender-300 hover:bg-lavender-50 text-2xl"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <div className="text-center mx-3">
                    <div className="text-2xl font-bold text-lavender-600">{formData.duration}</div>
                    <span className="text-gray-600 text-base">{formData.duration !== 1 ? "horas" : "hora"}</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustDuration(true)}
                    disabled={durationOptions.indexOf(formData.duration) === durationOptions.length - 1}
                    className="h-10 w-10 border-2 border-lavender-300 hover:bg-lavender-50 text-2xl"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ),
          ""
        );
      case 2:
        return stepCard(
          <Thermometer className="mx-auto h-16 w-16 text-lavender-500 mb-3 drop-shadow" />,
          "Intensidad & estrés",
          "Desliza para seleccionar valores",
          (
            <>
              <div className="bg-rose-50/90 rounded-xl p-6 mb-3 shadow border border-rose-100 animate-fade-in">
                <Label className="block text-lg font-bold text-lavender-600 mb-2">Intensidad del dolor</Label>
                <div className="text-center text-5xl font-extrabold text-lavender-700 mb-4">{formData.intensity[0]}</div>
                <Slider
                  value={formData.intensity}
                  onValueChange={(value) => setFormData({ ...formData, intensity: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full h-3"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Leve</span>
                  <span>Moderado</span>
                  <span>Insoportable</span>
                </div>
              </div>
              <div className="bg-lavender-50/90 rounded-xl p-6 mb-1 shadow border border-lavender-100 animate-fade-in">
                <Label className="block text-lg font-bold text-rose-600 mb-2">Nivel de estrés</Label>
                <div className="text-center text-4xl font-bold text-rose-500 mb-3">{formData.stressLevel[0]}</div>
                <Slider
                  value={formData.stressLevel}
                  onValueChange={(value) => setFormData({ ...formData, stressLevel: value })}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full h-3"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Relajada</span>
                  <span>Muy estresada</span>
                </div>
              </div>
            </>
          ),
          "bg-pink-50"
        );
      case 3:
        return stepCard(
          <Brain className="mx-auto h-16 w-16 text-coral-400 mb-3 drop-shadow" />,
          "Síntomas",
          "Haz tap en los síntomas para seleccionarlos",
          (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-coral-50 p-4 rounded-xl border border-coral-200 shadow-inner">
              {symptomOptions.map((symptom) => (
                <Button
                  key={symptom}
                  variant={formData.symptoms.includes(symptom) ? "secondary" : "outline"}
                  type="button"
                  className={`flex-1 text-base font-semibold rounded-xl shadow hover:scale-105 transition-all ${formData.symptoms.includes(symptom) ? 'bg-lavender-400/80 text-white border-lavender-500' : 'bg-white text-coral-700 border-coral-200'}`}
                  onClick={() =>
                    toggleArrayItem(formData.symptoms, symptom, (newSymptoms) =>
                      setFormData({ ...formData, symptoms: newSymptoms })
                    )
                  }
                >
                  {symptom}
                </Button>
              ))}
            </div>
          ),
          "bg-coral-50"
        );
      case 4:
        return stepCard(
          <Pill className="mx-auto h-16 w-16 text-lavender-500 mb-3 drop-shadow" />,
          "Tratamiento",
          "Selecciona medicamentos y acciones que ayudaron",
          (
            <>
              <div>
                <Label className="block text-lg font-bold text-rose-600 mb-2">Medicamentos</Label>
                <div className="flex flex-wrap gap-2">
                  {medicationOptions.map((med) => (
                    <Button
                      key={med.id}
                      variant={formData.medications.includes(med.name) ? "secondary" : "outline"}
                      type="button"
                      className={`text-sm rounded-xl shadow border-2 ${formData.medications.includes(med.name)
                        ? 'bg-rose-400/90 text-white border-rose-400'
                        : 'bg-white text-rose-700 border-rose-200'}`}
                      onClick={() =>
                        toggleArrayItem(formData.medications, med.name, (newMeds) =>
                          setFormData({ ...formData, medications: newMeds })
                        )
                      }
                    >
                      {med.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Label className="block text-lg font-bold text-lavender-600 mb-2">¿Qué ayudó a aliviar el dolor?</Label>
                <div className="flex flex-wrap gap-2">
                  {reliefOptions.map((relief) => (
                    <Button
                      key={relief}
                      variant={formData.relievedBy.includes(relief) ? "secondary" : "outline"}
                      type="button"
                      className={`text-sm rounded-xl shadow border-2 ${formData.relievedBy.includes(relief)
                        ? 'bg-lavender-400/90 text-white border-lavender-300'
                        : 'bg-white text-lavender-700 border-lavender-200'}`}
                      onClick={() =>
                        toggleArrayItem(formData.relievedBy, relief, (newRelief) =>
                          setFormData({ ...formData, relievedBy: newRelief })
                        )
                      }
                    >
                      {relief}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          ),
          "bg-pink-50"
        );
      case 5:
        return stepCard(
          <Heart className="mx-auto h-16 w-16 text-rose-400 mb-4 drop-shadow" />,
          "Contexto adicional",
          "Completa solo lo que desees, es opcional",
          (
            <>
              <div>
                <Label className="block text-lg font-bold text-rose-600 mb-2">Posibles desencadenantes</Label>
                <div className="flex flex-wrap gap-2">
                  {triggerOptions.map((trigger) => (
                    <Button
                      key={trigger.id}
                      variant={formData.triggers.includes(trigger.name) ? "secondary" : "outline"}
                      type="button"
                      className={`text-sm rounded-xl shadow border-2 ${formData.triggers.includes(trigger.name)
                        ? 'bg-pink-400 text-white border-pink-300'
                        : 'bg-white text-pink-500 border-pink-200'}`}
                      onClick={() =>
                        toggleArrayItem(formData.triggers, trigger.name, (newTriggers) =>
                          setFormData({ ...formData, triggers: newTriggers })
                        )
                      }
                    >
                      {trigger.name}
                    </Button>
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
            </>
          ),
          "bg-pink-50",
          true
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-2 z-50 animate-fade-in">
      <Card className="w-full max-w-3xl max-h-[94vh] overflow-y-auto gradient-card shadow-2xl border-4 border-lavender-100 relative">
        <CardHeader className="flex flex-row items-center justify-between border-b border-rose-100 pb-6 bg-white/70 rounded-t-[1rem]">
          <div>
            <CardTitle className="text-3xl font-extrabold text-rose-600 font-playfair flex items-center">
              Registro dolor de cabeza
              <Sparkles className="ml-2 text-coral-300 h-7 w-7 animate-gentle-bounce" />
            </CardTitle>
            <p className="text-lg text-lavender-700 mt-1 italic">
              Paso {currentStep} de {totalSteps}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-10 w-10 bg-transparent hover:bg-rose-100">
            <X className="h-7 w-7 text-rose-300" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-8 px-4 md:px-10 pt-8 pb-8 bg-white/50 rounded-b-[1rem] animate-fade-in">
          {/* Progress Bar */}
          <div className="w-full bg-lavender-100 rounded-full h-3 mb-3 shadow">
            <div 
              className="bg-gradient-to-r from-rose-300 via-coral-300 to-lavender-400 h-3 rounded-full transition-all duration-500"
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
              className="text-lg px-8 py-3 border-2 border-lavender-200 text-lavender-700 hover:bg-lavender-50 rounded-xl bg-white/90 font-semibold"
            >
              Anterior
            </Button>
            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                className="text-lg px-8 py-3 bg-gradient-to-r from-coral-400 to-rose-400 hover:from-coral-500 hover:to-rose-500 text-white rounded-xl shadow-lg font-bold animate-gentle-bounce"
              >
                Guardar Registro
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="text-lg px-8 py-3 bg-gradient-to-r from-rose-400 to-lavender-400 hover:from-rose-500 hover:to-lavender-500 text-white rounded-xl shadow-lg font-semibold"
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
