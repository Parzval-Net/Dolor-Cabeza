
import React, { useState, useEffect } from 'react';
import { Save, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeadacheEntry } from '@/types/headache';
import { medicationOptions as defaultMedicationOptions } from '@/data/options';
import { useToast } from '@/hooks/use-toast';
import ExpressForm from '@/components/form/ExpressForm';
import BasicInfoStep from '@/components/form/BasicInfoStep';
import DetailsStep from '@/components/form/DetailsStep';

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

  if (isExpress) {
    return (
      <ExpressForm
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleExpressSubmit}
        onCancel={onCancel}
        onSwitchToComplete={() => setIsExpress(false)}
      />
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto safe-area-pt safe-area-pb"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <Card className="w-full max-w-2xl my-4 sm:my-6 glass-card-mobile shadow-2xl border-0 rounded-3xl overflow-hidden mx-2 sm:mx-4">
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                {currentStep === 1 ? 'Información básica' : 'Detalles adicionales'}
              </h2>
              <p className="text-sm text-slate-600 font-medium">
                {currentStep === 1 ? 'Solo lo esencial' : 'Opcional, para mejor seguimiento'}
              </p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setIsExpress(true)} 
              className="text-violet-600 text-sm px-3 py-2 rounded-xl h-10 safari-button-fix mobile-touch-target"
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
            <BasicInfoStep
              formData={formData}
              onFormDataChange={setFormData}
            />
          )}

          {currentStep === 2 && (
            <DetailsStep
              formData={formData}
              medicationOptions={medicationOptions}
              onFormDataChange={setFormData}
              onToggleMedication={toggleMedication}
              onToggleEditDosage={toggleEditDosage}
              onUpdateCustomDosage={updateCustomDosage}
              onSaveCustomDosage={saveCustomDosage}
            />
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-violet-200/50 gap-3">
            <div className="flex gap-3 w-full sm:w-auto">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)} 
                  className="text-sm rounded-xl h-12 safari-button-fix mobile-touch-target flex-1 sm:flex-none"
                >
                  Anterior
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={onCancel} 
                className="text-sm rounded-xl h-12 safari-button-fix mobile-touch-target flex-1 sm:flex-none"
              >
                Cancelar
              </Button>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              {currentStep === 1 && (
                <>
                  <Button 
                    onClick={() => handleCompleteSubmit()} 
                    variant="outline" 
                    className="bg-gray-100 text-sm rounded-xl h-12 safari-button-fix mobile-touch-target flex-1 sm:flex-none"
                  >
                    Guardar básico
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(2)} 
                    className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-sm rounded-xl shadow-lg h-12 safari-button-fix mobile-touch-target flex-1 sm:flex-none"
                  >
                    Continuar
                  </Button>
                </>
              )}
              {currentStep === 2 && (
                <Button 
                  onClick={handleCompleteSubmit} 
                  className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-sm rounded-xl shadow-lg h-12 safari-button-fix mobile-touch-target w-full sm:w-auto"
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
