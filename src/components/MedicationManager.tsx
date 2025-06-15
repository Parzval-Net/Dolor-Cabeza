
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill } from 'lucide-react';
import { MedicationOption } from '@/types/headache';
import { medicationOptions as defaultMedications } from '@/data/options';
import { useToast } from '@/hooks/use-toast';
import MedicationForm from './medication/MedicationForm';
import MedicationList from './medication/MedicationList';

const MedicationManager = () => {
  const [medications, setMedications] = useState<MedicationOption[]>(defaultMedications);
  const [editingMedication, setEditingMedication] = useState<{
    id: string;
    name: string;
    dosage: string;
    type: 'acute' | 'preventive';
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedMedications = localStorage.getItem('custom-medications');
    if (savedMedications) {
      try {
        const parsed = JSON.parse(savedMedications) as MedicationOption[];
        const validatedMedications = parsed.map(med => ({
          ...med,
          type: (med.type === 'preventive' || med.type === 'acute') ? med.type : 'acute' as const
        })) as MedicationOption[];
        setMedications(validatedMedications);
      } catch (error) {
        console.error('Error loading medications:', error);
      }
    }
  }, []);

  const saveMedications = (updatedMedications: MedicationOption[]) => {
    localStorage.setItem('custom-medications', JSON.stringify(updatedMedications));
    setMedications(updatedMedications);
    window.dispatchEvent(new CustomEvent('medications-updated'));
  };

  const handleAddMedication = (medication: MedicationOption) => {
    const updatedMedications = [...medications, medication];
    saveMedications(updatedMedications);
    toast({
      title: "Medicamento agregado",
      description: `${medication.name} ha sido agregado exitosamente.`
    });
  };

  const handleEditMedication = (medication: MedicationOption) => {
    setEditingMedication({
      id: medication.id,
      name: medication.name,
      dosage: medication.dosage,
      type: medication.type
    });
  };

  const handleSaveEdit = () => {
    if (!editingMedication) return;

    const updatedMedications = medications.map(med => 
      med.id === editingMedication.id 
        ? { ...med, name: editingMedication.name, dosage: editingMedication.dosage, type: editingMedication.type }
        : med
    );
    
    saveMedications(updatedMedications);
    setEditingMedication(null);
    toast({
      title: "Medicamento actualizado",
      description: "Los cambios han sido guardados exitosamente."
    });
  };

  const handleCancelEdit = () => {
    setEditingMedication(null);
  };

  const handleDeleteMedication = (id: string) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    saveMedications(updatedMedications);
    toast({
      title: "Medicamento eliminado",
      description: "El medicamento ha sido eliminado de la lista."
    });
  };

  const handleResetToDefaults = () => {
    saveMedications(defaultMedications);
    toast({
      title: "Lista restaurada",
      description: "La lista de medicamentos ha sido restaurada a los valores por defecto."
    });
  };

  return (
    <Card className="glass-card-mobile">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2 md:gap-3">
          <Pill className="w-5 h-5 md:w-6 md:h-6 text-violet-500" />
          <span className="text-base md:text-xl">Gestión de Medicamentos</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 md:space-y-6">
        <MedicationForm
          onAddMedication={handleAddMedication}
          editingMedication={editingMedication}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
        />

        <MedicationList
          medications={medications}
          onEditMedication={handleEditMedication}
          onDeleteMedication={handleDeleteMedication}
          onResetToDefaults={handleResetToDefaults}
        />
      </CardContent>
    </Card>
  );
};

export default MedicationManager;
