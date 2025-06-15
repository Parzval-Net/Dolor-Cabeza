
import React, { useState, useEffect } from 'react';
import { Activity, Pill, Clock, Save, Edit3, Check, X, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
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

  const getIntensityLabel = (value: number) => {
    if (value <= 3) return 'Leve';
    if (value <= 6) return 'Moderado';
    if (value <= 8) return 'Severo';
    return 'Extremo';
  };

  if (isExpress) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 safe-area-pt safe-area-pb">
        <Card className="w-full max-w-sm glass-card-mobile shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-rose-500/25">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Registro Express</h2>
                <p className="text-sm text-slate-600 font-medium">Solo lo esencial, en segundos</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Fecha</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="border-violet-200 rounded-xl bg-white/90 text-sm safari-form-button"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Hora</Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="border-violet-200 rounded-xl bg-white/90 text-sm safari-form-button"
                  />
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 bg-gradient-to-br from-violet-50/80 to-purple-50/80 border border-violet-200/50">
                <Label className="text-sm font-bold text-slate-700 mb-3 block text-center">Intensidad del dolor</Label>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getIntensityColor(formData.intensity[0])}`}>
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
              <Button variant="outline" onClick={onCancel} className="flex-1 text-sm rounded-xl safari-button-fix">
                Cancelar
              </Button>
              <Button onClick={handleExpressSubmit} className="flex-1 bg-rose-500 hover:bg-rose-600 text-sm rounded-xl safari-button-fix">
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>

            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => setIsExpress(false)}
                className="text-sm text-violet-600 hover:text-violet-700 safari-button-fix"
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto safe-area-pt safe-area-pb">
      <Card className="w-full max-w-2xl my-6 glass-card-mobile shadow-2xl border-0 rounded-3xl overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-800">
                {currentStep === 1 ? 'Información básica' : 'Detalles adicionales'}
              </h2>
              <p className="text-sm text-slate-600 font-medium">
                {currentStep === 1 ? 'Solo lo esencial' : 'Opcional, para mejor seguimiento'}
              </p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setIsExpress(true)} 
              className="text-violet-600 text-sm px-3 py-2 rounded-xl safari-button-fix"
            >
              <Clock className="w-4 h-4 mr-2" />
              Express
            </Button>
          </div>

          <div className="w-full bg-violet-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-violet-500 to-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Clock className="h-4 w-4 text-violet-500" />
                    Fecha
                  </Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="border-violet-200 rounded-xl p-3 text-base bg-white/90 safari-form-button"
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
                    className="border-violet-200 rounded-xl p-3 text-base bg-white/90 safari-form-button"
                  />
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-violet-50/70 to-purple-50/70 border border-violet-200/50">
                <Label className="text-lg font-bold text-slate-800 mb-5 block text-center flex items-center justify-center gap-2">
                  <Activity className="h-5 w-5 text-violet-500" />
                  Intensidad del dolor
                </Label>
                <div className="space-y-5">
                  <div className="text-center">
                    <div className={`text-5xl font-bold mb-3 ${getIntensityColor(formData.intensity[0])}`}>
                      {formData.intensity[0]}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`bg-gradient-to-r ${getIntensityBg(formData.intensity[0])} text-white shadow-lg px-4 py-2 text-sm font-medium`}
                    >
                      {getIntensityLabel(formData.intensity[0])}
                    </Badge>
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

              <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-rose-50/70 to-pink-50/70 border border-rose-200/50">
                <Label className="text-lg font-bold text-slate-800 mb-5 block text-center flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-rose-500" />
                  Nivel de estrés
                </Label>
                <div className="space-y-5">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 text-slate-800">
                      {formData.stressLevel[0]}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
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
              <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 border border-blue-200/50">
                <Label className="text-lg font-bold text-slate-800 mb-5 block text-center flex items-center justify-center gap-2">
                  <Pill className="h-5 w-5 text-blue-500" />
                  Medicamentos tomados
                </Label>
                
                {/* Medicamentos seleccionados con animación */}
                {formData.medications.length > 0 && (
                  <div className="space-y-3 mb-6 p-4 bg-white/60 rounded-2xl border border-blue-200/40">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Medicamentos seleccionados ({formData.medications.length})
                    </h4>
                    <div className="space-y-2">
                      {formData.medications.map((med, index) => (
                        <div 
                          key={med.name} 
                          className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-violet-200/40 shadow-sm animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex-shrink-0"></div>
                          <span className="text-sm font-medium text-slate-800 flex-1">{med.name}</span>
                          {med.isEditing ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={med.customDosage}
                                onChange={(e) => updateCustomDosage(med.name, e.target.value)}
                                placeholder={med.dosage}
                                className="h-8 w-24 text-xs rounded-lg safari-form-button"
                              />
                              <Button
                                onClick={() => saveCustomDosage(med.name)}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-green-600 hover:bg-green-100 rounded-lg safari-button-fix"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button
                                onClick={() => toggleEditDosage(med.name)}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:bg-red-100 rounded-lg safari-button-fix"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs bg-slate-100 border-slate-300">
                                {med.customDosage || med.dosage}
                              </Badge>
                              <Button
                                onClick={() => toggleEditDosage(med.name)}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-100 rounded-lg safari-button-fix"
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {medicationOptions.filter(med => med.isCommon).slice(0, 9).map((med, index) => (
                    <div
                      key={med.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <InteractiveButton
                        isSelected={formData.medications.some(m => m.name === med.name)}
                        onClick={() => toggleMedication(med)}
                        className="h-16 flex flex-col gap-1 p-3 text-xs rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg safari-interactive-button"
                      >
                        <span className="font-bold leading-tight text-center">{med.name}</span>
                        <span className="text-xs opacity-75 leading-tight text-center">{med.dosage}</span>
                        {med.type === 'preventive' && (
                          <Badge variant="secondary" className="text-xs mt-1">Preventivo</Badge>
                        )}
                      </InteractiveButton>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-orange-50/70 to-red-50/70 border border-orange-200/50">
                <Label className="text-lg font-bold text-slate-800 mb-5 block text-center flex items-center justify-center gap-2">
                  <Activity className="h-5 w-5 text-orange-500" />
                  Síntomas principales
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonSymptoms.map((symptom, index) => (
                    <div
                      key={symptom}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <InteractiveButton
                        isSelected={formData.symptoms.includes(symptom)}
                        onClick={() =>
                          toggleArrayItem(formData.symptoms, symptom, (newSymptoms) =>
                            setFormData({ ...formData, symptoms: newSymptoms })
                          )
                        }
                        variant="secondary"
                        className="h-12 p-3 text-xs rounded-xl border-2 transition-all duration-300 hover:scale-105 safari-interactive-button"
                      >
                        {symptom}
                      </InteractiveButton>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-violet-500" />
                  Notas adicionales
                </Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="¿Algo más que quieras recordar sobre este episodio?"
                  className="border-violet-200 rounded-xl resize-none text-base p-4 bg-white/90 min-h-[80px] safari-form-button"
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-violet-200/50">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)} 
                  className="text-sm rounded-xl safari-button-fix"
                >
                  Anterior
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={onCancel} 
                className="text-sm rounded-xl safari-button-fix"
              >
                Cancelar
              </Button>
            </div>
            
            <div className="flex gap-3">
              {currentStep === 1 && (
                <>
                  <Button 
                    onClick={() => handleCompleteSubmit()} 
                    variant="outline" 
                    className="bg-gray-100 text-sm rounded-xl safari-button-fix"
                  >
                    Guardar básico
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(2)} 
                    className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-sm rounded-xl shadow-lg safari-button-fix"
                  >
                    Continuar
                  </Button>
                </>
              )}
              {currentStep === 2 && (
                <Button 
                  onClick={handleCompleteSubmit} 
                  className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-sm rounded-xl shadow-lg safari-button-fix"
                >
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
