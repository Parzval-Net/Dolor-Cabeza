
import { useState, useEffect } from 'react';
import { HeadacheEntry } from '@/types/headache';
import { medicationOptions as defaultMedicationOptions } from '@/data/options';
import EpisodeBasicFields from './EpisodeBasicFields';
import EpisodeMedicationSelector from './EpisodeMedicationSelector';
import EpisodeTriggerSelector from './EpisodeTriggerSelector';
import EpisodeSymptomSelector from './EpisodeSymptomSelector';
import EpisodeNotesField from './EpisodeNotesField';

interface EditEpisodeFormProps {
  entry: HeadacheEntry;
  onFormDataChange: (formData: HeadacheEntry) => void;
}

const EditEpisodeForm = ({ entry, onFormDataChange }: EditEpisodeFormProps) => {
  const [formData, setFormData] = useState<HeadacheEntry>(entry);
  const [medicationOptions, setMedicationOptions] = useState(defaultMedicationOptions);

  // Cargar medicamentos personalizados al montar el componente
  useEffect(() => {
    const loadCustomMedications = () => {
      const customMedications = localStorage.getItem('custom-medications');
      if (customMedications) {
        try {
          const parsed = JSON.parse(customMedications);
          const validatedMedications = parsed.map((med: any) => ({
            ...med,
            type: (med.type === 'preventive' || med.type === 'acute') ? med.type : 'acute'
          }));
          setMedicationOptions(validatedMedications);
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

  // Notificar cambios al componente padre
  useEffect(() => {
    onFormDataChange(formData);
  }, [formData, onFormDataChange]);

  const updateFormData = (updates: Partial<HeadacheEntry>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleCheckboxChange = (
    field: 'medications' | 'triggers' | 'symptoms',
    value: string,
    checked: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  return (
    <div className="space-y-4 md:space-y-6 py-4">
      <EpisodeBasicFields 
        formData={formData} 
        onUpdate={updateFormData} 
      />

      <EpisodeMedicationSelector
        selectedMedications={formData.medications}
        medicationOptions={medicationOptions}
        onToggleMedication={(medication, checked) => 
          handleCheckboxChange('medications', medication, checked)
        }
      />

      <EpisodeTriggerSelector
        selectedTriggers={formData.triggers}
        onToggleTrigger={(trigger, checked) => 
          handleCheckboxChange('triggers', trigger, checked)
        }
      />

      <EpisodeSymptomSelector
        selectedSymptoms={formData.symptoms}
        onToggleSymptom={(symptom, checked) => 
          handleCheckboxChange('symptoms', symptom, checked)
        }
      />

      <EpisodeNotesField
        notes={formData.notes || ''}
        onNotesChange={(notes) => updateFormData({ notes })}
      />
    </div>
  );
};

export default EditEpisodeForm;
