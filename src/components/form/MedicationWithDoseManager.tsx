
import { useState, useEffect } from 'react';
import { MedicationOption } from '@/types/headache';
import { medicationOptions as defaultMedicationOptions } from '@/data/options';

interface MedicationWithDose {
  name: string;
  dosage: string;
  customDosage?: string;
  isEditing?: boolean;
}

interface MedicationWithDoseManagerProps {
  medications: MedicationWithDose[];
  onMedicationsChange: (medications: MedicationWithDose[]) => void;
  children: (props: {
    medicationOptions: MedicationOption[];
    medications: MedicationWithDose[];
    toggleMedication: (med: MedicationOption) => void;
    toggleEditDosage: (medName: string) => void;
    updateCustomDosage: (medName: string, dosage: string) => void;
    saveCustomDosage: (medName: string) => void;
  }) => React.ReactNode;
}

const MedicationWithDoseManager = ({ 
  medications, 
  onMedicationsChange, 
  children 
}: MedicationWithDoseManagerProps) => {
  const [medicationOptions, setMedicationOptions] = useState(defaultMedicationOptions);

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

  const toggleMedication = (med: MedicationOption) => {
    const existingIndex = medications.findIndex(m => m.name === med.name);
    
    if (existingIndex >= 0) {
      // Remover medicamento
      const newMedications = medications.filter((_, index) => index !== existingIndex);
      onMedicationsChange(newMedications);
    } else {
      // Agregar medicamento
      const newMedication: MedicationWithDose = {
        name: med.name,
        dosage: med.dosage,
        isEditing: false
      };
      onMedicationsChange([...medications, newMedication]);
    }
  };

  const toggleEditDosage = (medName: string) => {
    const updatedMedications = medications.map(med => 
      med.name === medName 
        ? { ...med, isEditing: !med.isEditing, customDosage: med.customDosage || med.dosage }
        : { ...med, isEditing: false }
    );
    onMedicationsChange(updatedMedications);
  };

  const updateCustomDosage = (medName: string, dosage: string) => {
    const updatedMedications = medications.map(med => 
      med.name === medName 
        ? { ...med, customDosage: dosage }
        : med
    );
    onMedicationsChange(updatedMedications);
  };

  const saveCustomDosage = (medName: string) => {
    const updatedMedications = medications.map(med => 
      med.name === medName 
        ? { 
            ...med, 
            dosage: med.customDosage || med.dosage,
            customDosage: med.customDosage || med.dosage,
            isEditing: false 
          }
        : med
    );
    onMedicationsChange(updatedMedications);
  };

  return (
    <>
      {children({
        medicationOptions,
        medications,
        toggleMedication,
        toggleEditDosage,
        updateCustomDosage,
        saveCustomDosage
      })}
    </>
  );
};

export default MedicationWithDoseManager;
