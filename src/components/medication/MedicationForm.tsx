
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { MedicationOption } from '@/types/headache';
import { useToast } from '@/hooks/use-toast';

interface MedicationFormProps {
  onAddMedication: (medication: MedicationOption) => void;
  editingMedication?: {
    id: string;
    name: string;
    dosage: string;
    type: 'acute' | 'preventive';
  } | null;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
}

const MedicationForm = ({ 
  onAddMedication, 
  editingMedication, 
  onSaveEdit, 
  onCancelEdit 
}: MedicationFormProps) => {
  const [formData, setFormData] = useState({
    name: editingMedication?.name || '',
    dosage: editingMedication?.dosage || '',
    type: editingMedication?.type || 'acute' as 'acute' | 'preventive'
  });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.dosage.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa el nombre y la dosis del medicamento.",
        variant: "destructive"
      });
      return;
    }

    if (editingMedication && onSaveEdit) {
      onSaveEdit();
    } else {
      const medication: MedicationOption = {
        id: `custom-${Date.now()}`,
        name: formData.name.trim(),
        dosage: formData.dosage.trim(),
        type: formData.type,
        isCommon: false
      };
      onAddMedication(medication);
      setFormData({ name: '', dosage: '', type: 'acute' });
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', dosage: '', type: 'acute' });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4 p-3 md:p-4 bg-white/80 rounded-xl border border-violet-200/50">
      <div className="space-y-2">
        <Label htmlFor="medName" className="text-sm font-bold text-slate-700">Nombre</Label>
        <Input
          id="medName"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="ej. Ibuprofeno"
          className="text-sm md:text-base text-slate-800 font-semibold bg-white/90 border-violet-200"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="medDosage" className="text-sm font-bold text-slate-700">Dosis</Label>
        <Input
          id="medDosage"
          value={formData.dosage}
          onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
          placeholder="ej. 400mg"
          className="text-sm md:text-base text-slate-800 font-semibold bg-white/90 border-violet-200"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm font-bold text-slate-700">Tipo</Label>
        <Select value={formData.type} onValueChange={(value: 'preventive' | 'acute') => setFormData({ ...formData, type: value })}>
          <SelectTrigger className="text-sm md:text-base text-slate-800 font-semibold bg-white/90 border-violet-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white/95 border-violet-200">
            <SelectItem value="acute">Para crisis</SelectItem>
            <SelectItem value="preventive">Preventivo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-end gap-2 md:mt-0 mt-2">
        {editingMedication ? (
          <>
            <Button onClick={handleSubmit} size="sm" className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-xs md:text-sm">
              Guardar
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1 md:flex-none text-xs md:text-sm">
              Cancelar
            </Button>
          </>
        ) : (
          <Button onClick={handleSubmit} size="sm" className="w-full md:w-auto bg-violet-500 hover:bg-violet-600 text-xs md:text-sm">
            <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            Agregar
          </Button>
        )}
      </div>
    </div>
  );
};

export default MedicationForm;
