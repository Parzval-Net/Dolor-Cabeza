
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit3 } from 'lucide-react';
import { MedicationOption } from '@/types/headache';

interface MedicationItemProps {
  medication: MedicationOption;
  onEdit: (medication: MedicationOption) => void;
  onDelete: (id: string) => void;
}

const MedicationItem = ({ medication, onEdit, onDelete }: MedicationItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white/90 rounded-lg border border-violet-200/50 hover:border-violet-300 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-slate-800 text-sm md:text-base truncate">{medication.name}</span>
          {medication.isCommon && (
            <Badge variant="secondary" className="text-xs flex-shrink-0">Común</Badge>
          )}
        </div>
        <div className="text-xs md:text-sm text-slate-600 font-semibold">
          {medication.dosage} • {medication.type === 'acute' ? 'Crisis' : 'Preventivo'}
        </div>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <Button
          onClick={() => onEdit(medication)}
          variant="ghost"
          size="sm"
          className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-blue-100"
        >
          <Edit3 className="w-3 h-3" />
        </Button>
        <Button
          onClick={() => onDelete(medication.id)}
          variant="ghost"
          size="sm"
          className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-red-100 text-red-600"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default MedicationItem;
