
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Pill, Edit3 } from 'lucide-react';
import { MedicationOption } from '@/types/headache';
import { medicationOptions as defaultMedications } from '@/data/options';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const MedicationManager = () => {
  const [medications, setMedications] = useState<MedicationOption[]>(defaultMedications);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    type: 'acute' as const
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedMedications = localStorage.getItem('custom-medications');
    if (savedMedications) {
      try {
        const parsed = JSON.parse(savedMedications) as MedicationOption[];
        // Asegurar que todos los medicamentos tengan el tipo correcto
        const validatedMedications = parsed.map(med => ({
          ...med,
          type: (med.type === 'preventive' || med.type === 'acute') ? med.type : 'acute'
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
    
    // Disparar evento para que otros componentes se actualicen
    window.dispatchEvent(new CustomEvent('medications-updated'));
  };

  const addMedication = () => {
    if (!newMedication.name.trim() || !newMedication.dosage.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa el nombre y la dosis del medicamento.",
        variant: "destructive"
      });
      return;
    }

    const medication: MedicationOption = {
      id: `custom-${Date.now()}`,
      name: newMedication.name.trim(),
      dosage: newMedication.dosage.trim(),
      type: newMedication.type,
      isCommon: false
    };

    const updatedMedications = [...medications, medication];
    saveMedications(updatedMedications);

    setNewMedication({ name: '', dosage: '', type: 'acute' });
    toast({
      title: "Medicamento agregado",
      description: `${medication.name} ha sido agregado exitosamente.`
    });
  };

  const removeMedication = (id: string) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    saveMedications(updatedMedications);
    toast({
      title: "Medicamento eliminado",
      description: "El medicamento ha sido eliminado de la lista."
    });
  };

  const startEditing = (medication: MedicationOption) => {
    setEditingId(medication.id);
    setNewMedication({
      name: medication.name,
      dosage: medication.dosage,
      type: medication.type
    });
  };

  const saveEdit = () => {
    if (!newMedication.name.trim() || !newMedication.dosage.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa el nombre y la dosis del medicamento.",
        variant: "destructive"
      });
      return;
    }

    const updatedMedications = medications.map(med => 
      med.id === editingId 
        ? { ...med, name: newMedication.name.trim(), dosage: newMedication.dosage.trim(), type: newMedication.type }
        : med
    );
    
    saveMedications(updatedMedications);
    setEditingId(null);
    setNewMedication({ name: '', dosage: '', type: 'acute' });
    toast({
      title: "Medicamento actualizado",
      description: "Los cambios han sido guardados exitosamente."
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewMedication({ name: '', dosage: '', type: 'acute' });
  };

  const resetToDefaults = () => {
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
        {/* Add/Edit Form */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4 p-3 md:p-4 bg-white/80 rounded-xl border border-violet-200/50">
          <div className="space-y-2">
            <Label htmlFor="medName" className="text-sm font-bold text-slate-700">Nombre</Label>
            <Input
              id="medName"
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
              placeholder="ej. Ibuprofeno"
              className="text-sm md:text-base text-slate-800 font-semibold bg-white/90 border-violet-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medDosage" className="text-sm font-bold text-slate-700">Dosis</Label>
            <Input
              id="medDosage"
              value={newMedication.dosage}
              onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
              placeholder="ej. 400mg"
              className="text-sm md:text-base text-slate-800 font-semibold bg-white/90 border-violet-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-700">Tipo</Label>
            <Select value={newMedication.type} onValueChange={(value: 'preventive' | 'acute') => setNewMedication({ ...newMedication, type: value })}>
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
            {editingId ? (
              <>
                <Button onClick={saveEdit} size="sm" className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-xs md:text-sm">
                  Guardar
                </Button>
                <Button onClick={cancelEdit} variant="outline" size="sm" className="flex-1 md:flex-none text-xs md:text-sm">
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={addMedication} size="sm" className="w-full md:w-auto bg-violet-500 hover:bg-violet-600 text-xs md:text-sm">
                <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                Agregar
              </Button>
            )}
          </div>
        </div>

        {/* Medications List */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h4 className="font-bold text-slate-800 text-sm md:text-base">Lista de Medicamentos ({medications.length})</h4>
            <Button onClick={resetToDefaults} variant="outline" size="sm" className="text-slate-800 text-xs md:text-sm self-start sm:self-auto">
              Restaurar por defecto
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 max-h-80 md:max-h-96 overflow-y-auto">
            {medications.map((medication) => (
              <div key={medication.id} className="flex items-center justify-between p-3 bg-white/90 rounded-lg border border-violet-200/50 hover:border-violet-300 transition-colors">
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
                    onClick={() => startEditing(medication)}
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-blue-100"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={() => removeMedication(medication.id)}
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationManager;
