
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HeadacheEntry } from '@/types/headache';
import { medicationOptions as defaultMedicationOptions } from '@/data/options';
import FormHeader from '@/components/form/FormHeader';
import ProgressBar from '@/components/form/ProgressBar';
import FormNavigation from '@/components/form/FormNavigation';
import BasicInfoStep from '@/components/form/BasicInfoStep';
import IntensityStressStep from '@/components/form/steps/IntensityStressStep';
import SymptomsStep from '@/components/form/steps/SymptomsStep';
import TreatmentStep from '@/components/form/steps/TreatmentStep';
import ContextStep from '@/components/form/steps/ContextStep';

interface HeadacheFormProps {
  onSave: (entry: HeadacheEntry) => void;
  onCancel: () => void;
}

const HeadacheForm = ({ onSave, onCancel }: HeadacheFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [medicationOptions, setMedicationOptions] = useState(defaultMedicationOptions);
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

  // Load custom medications on component mount
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

    // Listen for medication updates
    const handleMedicationsUpdate = () => {
      loadCustomMedications();
    };

    window.addEventListener('medications-updated', handleMedicationsUpdate);
    return () => window.removeEventListener('medications-updated', handleMedicationsUpdate);
  }, []);

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep 
            formData={{
              date: formData.date,
              time: formData.time,
              intensity: formData.intensity,
              stressLevel: formData.stressLevel
            }}
            onFormDataChange={(newData) => setFormData({ ...formData, ...newData })}
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
          <SymptomsStep
            formData={{ symptoms: formData.symptoms }}
            onFormDataChange={(newData) => setFormData({ ...formData, ...newData })}
            toggleArrayItem={toggleArrayItem}
          />
        );
      case 4:
        return (
          <TreatmentStep
            formData={{
              medications: formData.medications,
              relievedBy: formData.relievedBy
            }}
            medicationOptions={medicationOptions}
            onFormDataChange={(newData) => setFormData({ ...formData, ...newData })}
            toggleArrayItem={toggleArrayItem}
          />
        );
      case 5:
        return (
          <ContextStep
            formData={{
              triggers: formData.triggers,
              mood: formData.mood,
              weather: formData.weather,
              menstrualCycle: formData.menstrualCycle,
              sleepHours: formData.sleepHours,
              notes: formData.notes
            }}
            onFormDataChange={(newData) => setFormData({ ...formData, ...newData })}
            toggleArrayItem={toggleArrayItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[95vh] overflow-y-auto glass-card-dark shadow-2xl border-0 rounded-3xl">
        <FormHeader 
          currentStep={currentStep}
          totalSteps={totalSteps}
          onCancel={onCancel}
        />

        <CardContent className="p-8 space-y-8">
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
