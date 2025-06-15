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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 z-50">
      <div className="w-full h-full max-w-4xl flex flex-col overflow-hidden">
        <Card className="flex-1 bg-white/95 backdrop-blur-xl shadow-2xl border-0 rounded-t-3xl sm:rounded-3xl sm:m-4 sm:max-h-[95vh] overflow-hidden">
          <CardContent className="flex flex-col h-full p-3 sm:p-6 space-y-3 sm:space-y-6 overflow-hidden">
            <div className="flex justify-between items-start flex-shrink-0">
              <FormStepIndicator currentStep={currentStep} />
            </div>

            <FormProgressBar currentStep={currentStep} totalSteps={2} />

            <div className="flex-1 overflow-y-auto min-h-0 px-1">
              <div className="pb-4">
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
            </div>

            <div className="flex-shrink-0 pt-2 border-t border-violet-200/50">
              <FormActionButtons
                currentStep={currentStep}
                onCancel={onCancel}
                onSwitchToExpress={() => setIsExpress(true)}
                onPrevious={() => setCurrentStep(1)}
                onContinue={() => setCurrentStep(2)}
                onSaveBasic={handleCompleteSubmit}
                onSaveComplete={handleCompleteSubmit}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleHeadacheForm;
