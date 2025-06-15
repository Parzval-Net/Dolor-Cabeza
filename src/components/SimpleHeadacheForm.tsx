
import React, { useState, useEffect } from 'react';
import { Activity, Pill, Clock, Save } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { HeadacheEntry } from '@/types/headache';
import { medicationOptions as defaultMedicationOptions } from '@/data/options';
import { useToast } from '@/hooks/use-toast';
import InteractiveButton from '@/components/form/InteractiveButton';

interface SimpleHeadacheFormProps {
  onSave: (entry: HeadacheEntry) => void;
  onCancel: () => void;
}

const commonSymptoms = [
  'Dolor pulsátil',
  'Sensibilidad a la luz',
  'Náuseas',
  'Sensibilidad al sonido',
  'Mareos',
  'Fatiga'
];

const SimpleHeadacheForm = ({ onSave, onCancel }: SimpleHeadacheFormProps) => {
  const [isExpress, setIsExpress] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [medicationOptions, setMedicationOptions] = useState(defaultMedicationOptions);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    intensity: [5],
    stressLevel: [3],
    medications: [] as string[],
    symptoms: [] as string[],
    notes: '',
  });

  useEffect(() => {
    const customMedications = localStorage.getItem('custom-medications');
    if (customMedications) {
      try {
        const parsed = JSON.parse(customMedications);
        setMedicationOptions(parsed);
      } catch (error) {
        console.error('Error loading custom medications:', error);
      }
    }
  }, []);

  const handleExpressSubmit = () => {
    const entry: HeadacheEntry = {
      id: Date.now().toString(),
      date: formData.date,
      time: formData.time,
      intensity: formData.intensity[0],
      duration: 0, // Se puede actualizar después
      medications: [],
      triggers: [],
      symptoms: [],
      relievedBy: [],
      mood: '',
      stressLevel: formData.stressLevel[0],
      notes: 'Registro rápido',
    };
    onSave(entry);
    toast({
      title: "Registro guardado",
      description: "Tu dolor de cabeza ha sido registrado rápidamente.",
    });
  };

  const handleCompleteSubmit = () => {
    const entry: HeadacheEntry = {
      id: Date.now().toString(),
      date: formData.date,
      time: formData.time,
      intensity: formData.intensity[0],
      duration: 0,
      medications: formData.medications,
      triggers: [],
      symptoms: formData.symptoms,
      relievedBy: [],
      mood: '',
      stressLevel: formData.stressLevel[0],
      notes: formData.notes,
    };
    onSave(entry);
    toast({
      title: "Registro completo guardado",
      description: "Tu episodio ha sido registrado con todos los detalles.",
    });
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

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

  if (isExpress) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md glass-card-dark shadow-2xl border-0 rounded-3xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Registro Express</h2>
              <p className="text-slate-600">Solo lo esencial, en segundos</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Fecha</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="border-2 border-slate-300 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Hora</Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="border-2 border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-bold text-slate-700">Intensidad del dolor (1-10)</Label>
                <div className="text-center space-y-4">
                  <div className={`text-4xl font-bold ${getIntensityColor(formData.intensity[0])}`}>
                    {formData.intensity[0]}
                  </div>
                  <Slider
                    value={formData.intensity}
                    onValueChange={(value) => setFormData({ ...formData, intensity: value })}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleExpressSubmit} className="flex-1 bg-rose-500 hover:bg-rose-600">
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>

            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => setIsExpress(false)}
                className="text-sm text-violet-600 hover:text-violet-700"
              >
                ¿Quieres agregar más detalles?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[95vh] overflow-y-auto glass-card-dark shadow-2xl border-0 rounded-3xl">
        <CardContent className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {currentStep === 1 ? 'Información básica' : 'Detalles adicionales'}
              </h2>
              <p className="text-slate-600">
                {currentStep === 1 ? 'Solo lo esencial' : 'Opcional, para mejor seguimiento'}
              </p>
            </div>
            <Button variant="ghost" onClick={() => setIsExpress(true)} className="text-violet-600">
              <Clock className="w-4 h-4 mr-2" />
              Express
            </Button>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-violet-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>

          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Clock className="h-4 w-4 text-violet-500" />
                    Fecha
                  </Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="border-2 border-slate-300 rounded-xl p-4"
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
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="border-2 border-slate-300 rounded-xl p-4"
                  />
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-violet-50/50 to-purple-50/50 border border-violet-100">
                <Label className="text-lg font-bold text-slate-800 mb-6 block text-center">
                  Intensidad del dolor
                </Label>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`text-5xl font-bold mb-2 ${getIntensityColor(formData.intensity[0])}`}>
                      {formData.intensity[0]}
                    </div>
                    <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getIntensityBg(formData.intensity[0])} text-white shadow-lg`}>
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
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-rose-50/50 to-pink-50/50 border border-rose-100">
                <Label className="text-lg font-bold text-slate-800 mb-6 block text-center">
                  Nivel de estrés
                </Label>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 text-slate-800">
                      {formData.stressLevel[0]}
                    </div>
                    <div className="text-sm text-slate-600">
                      {formData.stressLevel[0] <= 2 ? 'Relajado' : 
                       formData.stressLevel[0] <= 3 ? 'Normal' : 
                       formData.stressLevel[0] <= 4 ? 'Estresado' : 'Muy estresado'}
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
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-bold text-slate-800">Medicamentos tomados</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {medicationOptions.filter(med => med.isCommon).slice(0, 6).map((med) => (
                    <InteractiveButton
                      key={med.id}
                      isSelected={formData.medications.includes(`${med.name} (${med.dosage})`)}
                      onClick={() => {
                        const medicationWithDose = `${med.name} (${med.dosage})`;
                        toggleArrayItem(formData.medications, medicationWithDose, (newMeds) =>
                          setFormData({ ...formData, medications: newMeds })
                        );
                      }}
                      className="text-xs h-16 flex flex-col gap-1"
                    >
                      <span className="font-bold">{med.name}</span>
                      <span className="text-xs opacity-75">{med.dosage}</span>
                    </InteractiveButton>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-bold text-slate-800">Síntomas principales</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonSymptoms.map((symptom) => (
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
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-bold text-slate-800">Notas (opcional)</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="¿Algo más que quieras recordar?"
                  className="border-2 border-slate-300 rounded-xl resize-none"
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between space-x-4">
            <div className="flex space-x-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Anterior
                </Button>
              )}
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
            
            <div className="flex space-x-2">
              {currentStep === 1 && (
                <>
                  <Button onClick={() => handleCompleteSubmit()} variant="outline" className="bg-gray-100">
                    Guardar básico
                  </Button>
                  <Button onClick={() => setCurrentStep(2)} className="bg-violet-500 hover:bg-violet-600">
                    Continuar
                  </Button>
                </>
              )}
              {currentStep === 2 && (
                <Button onClick={handleCompleteSubmit} className="bg-violet-500 hover:bg-violet-600">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar completo
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleHeadacheForm;
