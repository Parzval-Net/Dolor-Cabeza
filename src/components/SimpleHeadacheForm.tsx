
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HeadacheEntry } from '@/types/headache';
import { useToast } from '@/hooks/use-toast';
import ExpressForm from '@/components/form/ExpressForm';
import BasicInfoStep from '@/components/form/BasicInfoStep';
import DetailsStep from '@/components/form/DetailsStep';
import FormProgressBar from '@/components/form/FormProgressBar';
import FormStepIndicator from '@/components/form/FormStepIndicator';
import FormActionButtons from '@/components/form/FormActionButtons';
import MedicationWithDoseManager from '@/components/form/MedicationWithDoseManager';

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <Card className="glass-card-mobile shadow-2xl border-0 rounded-3xl overflow-hidden mx-2 sm:mx-4 my-4">
          <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <div className="flex justify-between items-start">
              <FormStepIndicator currentStep={currentStep} />
            </div>

            <FormProgressBar currentStep={currentStep} totalSteps={2} />

            <div className="min-h-[400px]">
              {currentStep === 1 && (
                <BasicInfoStep
                  formData={formData}
                  onFormDataChange={setFormData}
                />
              )}

              {currentStep === 2 && (
                <MedicationWithDoseManager
                  medications={formData.medications}
                  onMedicationsChange={(medications) => setFormData(prev => ({ ...prev, medications }))}
                >
                  {({ medicationOptions, medications, toggleMedication, toggleEditDosage, updateCustomDosage, saveCustomDosage }) => (
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
                </MedicationWithDoseManager>
              )}
            </div>

            <FormActionButtons
              currentStep={currentStep}
              onCancel={onCancel}
              onSwitchToExpress={() => setIsExpress(true)}
              onPrevious={() => setCurrentStep(1)}
              onContinue={() => setCurrentStep(2)}
              onSaveBasic={handleCompleteSubmit}
              onSaveComplete={handleCompleteSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleHeadacheForm;
