
import React, { useState, useEffect } from 'react';
import { Activity, Pill, Clock, Save, Edit3, Check, X } from 'lucide-react';
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

interface MedicationWithDose {
  name: string;
  dosage: string;
  customDosage?: string;
  isEditing?: boolean;
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
    medications: [] as MedicationWithDose[],
    symptoms: [] as string[],
    notes: '',
  });

  useEffect(() => {
    const loadCustomMedications = () => {
      const customMedications = localStorage.getItem('custom-medications');
      if (customMedications) {
        try {
          const parsed = JSON.parse(customMedications);
          setMedicationOptions(parsed);
        } catch (error) {
          console.error('Error loading custom medications:', error);
        }
      }
    };

    loadCustomMedications();
    
    // Escuchar cambios en medicamentos
    const handleMedicationsUpdate = () => {
      loadCustomMedications();
    };
    
    window.addEventListener('medications-updated', handleMedicationsUpdate);
    return () => window.removeEventListener('medications-updated', handleMedicationsUpdate);
  }, []);

  const handleExpressSubmit = () => {
    const entry: HeadacheEntry = {
      id: Date.now().toString(),
      date: formData.date,
      time: formData.time,
      intensity: formData.intensity[0],
      duration: 0,
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
    const medicationStrings = formData.medications.map(med => 
      `${med.name} (${med.customDosage || med.dosage})`
    );

    const entry: HeadacheEntry = {
      id: Date.now().toString(),
      date: formData.date,
      time: formData.time,
      intensity: formData.intensity[0],
      duration: 0,
      medications: medicationStrings,
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

  const toggleMedication = (med: typeof medicationOptions[0]) => {
    const isSelected = formData.medications.some(m => m.name === med.name);
    
    if (isSelected) {
      setFormData(prev => ({
        ...prev,
        medications: prev.medications.filter(m => m.name !== med.name)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        medications: [...prev.medications, {
          name: med.name,
          dosage: med.dosage,
          customDosage: '',
          isEditing: false
        }]
      }));
    }
  };

  const toggleEditDosage = (medName: string) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map(med => 
        med.name === medName 
          ? { ...med, isEditing: !med.isEditing, customDosage: med.customDosage || med.dosage }
          : med
      )
    }));
  };

  const updateCustomDosage = (medName: string, dosage: string) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map(med => 
        med.name === medName 
          ? { ...med, customDosage: dosage }
          : med
      )
    }));
  };

  const saveCustomDosage = (medName: string) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map(med => 
        med.name === medName 
          ? { ...med, isEditing: false }
          : med
      )
    }));
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 z-50">
        <Card className="w-full max-w-sm glass-card-mobile shadow-2xl border-0 rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">Registro Express</h2>
              <p className="text-sm md:text-base text-slate-600">Solo lo esencial, en segundos</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs md:text-sm font-bold text-slate-700">Fecha</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="border border-violet-200 rounded-lg text-xs md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs md:text-sm font-bold text-slate-700">Hora</Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="border border-violet-200 rounded-lg text-xs md:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs md:text-sm font-bold text-slate-700">Intensidad del dolor (1-10)</Label>
                <div className="text-center space-y-3">
                  <div className={`text-3xl md:text-4xl font-bold ${getIntensityColor(formData.intensity[0])}`}>
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

            <div className="flex space-x-2">
              <Button variant="outline" onClick={onCancel} className="flex-1 text-xs md:text-sm">
                Cancelar
              </Button>
              <Button onClick={handleExpressSubmit} className="flex-1 bg-rose-500 hover:bg-rose-600 text-xs md:text-sm">
                <Save className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                Guardar
              </Button>
            </div>

            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => setIsExpress(false)}
                className="text-xs md:text-sm text-violet-600 hover:text-violet-700"
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl md:max-w-3xl my-4 glass-card-mobile shadow-2xl border-0 rounded-2xl">
        <CardContent className="p-4 md:p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-slate-800">
                {currentStep === 1 ? 'Información básica' : 'Detalles adicionales'}
              </h2>
              <p className="text-sm md:text-base text-slate-600">
                {currentStep === 1 ? 'Solo lo esencial' : 'Opcional, para mejor seguimiento'}
              </p>
            </div>
            <Button variant="ghost" onClick={() => setIsExpress(true)} className="text-violet-600 text-xs md:text-sm px-2 md:px-4">
              <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Express
            </Button>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-1.5 md:h-2">
            <div 
              className="bg-violet-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 text-violet-500" />
                    Fecha
                  </Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="border border-violet-200 rounded-lg p-3 text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 text-violet-500" />
                    Hora
                  </Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="border border-violet-200 rounded-lg p-3 text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="glass-card-mobile rounded-2xl p-4 md:p-6 bg-gradient-to-br from-violet-50/70 to-purple-50/70 border border-violet-200/50">
                <Label className="text-base md:text-lg font-bold text-slate-800 mb-4 block text-center">
                  Intensidad del dolor
                </Label>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl md:text-5xl font-bold mb-2 ${getIntensityColor(formData.intensity[0])}`}>
                      {formData.intensity[0]}
                    </div>
                    <div className={`inline-flex px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium bg-gradient-to-r ${getIntensityBg(formData.intensity[0])} text-white shadow-lg`}>
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

              <div className="glass-card-mobile rounded-2xl p-4 md:p-6 bg-gradient-to-br from-rose-50/70 to-pink-50/70 border border-rose-200/50">
                <Label className="text-base md:text-lg font-bold text-slate-800 mb-4 block text-center">
                  Nivel de estrés
                </Label>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
                      {formData.stressLevel[0]}
                    </div>
                    <div className="text-xs md:text-sm text-slate-600">
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
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base md:text-lg font-bold text-slate-800">Medicamentos tomados</Label>
                
                {/* Medicamentos seleccionados con dosis editables */}
                {formData.medications.length > 0 && (
                  <div className="space-y-2 p-3 bg-violet-50/50 rounded-lg border border-violet-200/50">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Medicamentos seleccionados:</h4>
                    {formData.medications.map((med) => (
                      <div key={med.name} className="flex items-center gap-2 p-2 bg-white/80 rounded-lg">
                        <span className="text-sm font-medium text-slate-800 flex-1">{med.name}</span>
                        {med.isEditing ? (
                          <div className="flex items-center gap-1">
                            <Input
                              value={med.customDosage}
                              onChange={(e) => updateCustomDosage(med.name, e.target.value)}
                              placeholder={med.dosage}
                              className="h-7 w-20 text-xs"
                            />
                            <Button
                              onClick={() => saveCustomDosage(med.name)}
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-green-600"
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => toggleEditDosage(med.name)}
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                              {med.customDosage || med.dosage}
                            </span>
                            <Button
                              onClick={() => toggleEditDosage(med.name)}
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-blue-600"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {medicationOptions.filter(med => med.isCommon).slice(0, 9).map((med) => (
                    <InteractiveButton
                      key={med.id}
                      isSelected={formData.medications.some(m => m.name === med.name)}
                      onClick={() => toggleMedication(med)}
                      className="text-xs h-14 flex flex-col gap-0.5 p-2"
                    >
                      <span className="font-bold leading-tight">{med.name}</span>
                      <span className="text-xs opacity-75 leading-tight">{med.dosage}</span>
                    </InteractiveButton>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base md:text-lg font-bold text-slate-800">Síntomas principales</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
                      className="text-xs h-10 p-2"
                    >
                      {symptom}
                    </InteractiveButton>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-base md:text-lg font-bold text-slate-800">Notas (opcional)</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="¿Algo más que quieras recordar?"
                  className="border border-violet-200 rounded-lg resize-none text-sm md:text-base"
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between space-x-2">
            <div className="flex space-x-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="text-xs md:text-sm">
                  Anterior
                </Button>
              )}
              <Button variant="outline" onClick={onCancel} className="text-xs md:text-sm">
                Cancelar
              </Button>
            </div>
            
            <div className="flex space-x-2">
              {currentStep === 1 && (
                <>
                  <Button onClick={() => handleCompleteSubmit()} variant="outline" className="bg-gray-100 text-xs md:text-sm">
                    Guardar básico
                  </Button>
                  <Button onClick={() => setCurrentStep(2)} className="bg-violet-500 hover:bg-violet-600 text-xs md:text-sm">
                    Continuar
                  </Button>
                </>
              )}
              {currentStep === 2 && (
                <Button onClick={handleCompleteSubmit} className="bg-violet-500 hover:bg-violet-600 text-xs md:text-sm">
                  <Save className="w-3 h-3 md:w-4 md:h-4 mr-1" />
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
