
import { Button } from '@/components/ui/button';
import { MedicationOption } from '@/types/headache';
import MedicationItem from './MedicationItem';

interface MedicationListProps {
  medications: MedicationOption[];
  onEditMedication: (medication: MedicationOption) => void;
  onDeleteMedication: (id: string) => void;
  onResetToDefaults: () => void;
}

const MedicationList = ({ 
  medications, 
  onEditMedication, 
  onDeleteMedication, 
  onResetToDefaults 
}: MedicationListProps) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h4 className="font-bold text-slate-800 text-sm md:text-base">Lista de Medicamentos ({medications.length})</h4>
        <Button onClick={onResetToDefaults} variant="outline" size="sm" className="text-slate-800 text-xs md:text-sm self-start sm:self-auto">
          Restaurar por defecto
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 max-h-80 md:max-h-96 overflow-y-auto">
        {medications.map((medication) => (
          <MedicationItem
            key={medication.id}
            medication={medication}
            onEdit={onEditMedication}
            onDelete={onDeleteMedication}
          />
        ))}
      </div>
    </div>
  );
};

export default MedicationList;
