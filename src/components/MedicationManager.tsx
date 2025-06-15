
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
    type: 'acute' as 'preventive' | 'acute'
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedMedications = localStorage.getItem('custom-medications');
    if (savedMedications) {
      try {
        const parsed = JSON.parse(savedMedications) as MedicationOption[];
        setMedications(parsed);
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
    <Card className="glass-card-dark">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <Pill className="w-6 h-6 text-violet-500" />
          Gestión de Medicamentos
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Add/Edit Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border-2 border-slate-300">
          <div className="space-y-2">
            <Label htmlFor="medName" className="text-slate-800 font-bold">Nombre</Label>
            <Input
              id="medName"
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
              placeholder="ej. Ibuprofeno"
              className="text-slate-800 font-semibold bg-white border-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medDosage" className="text-slate-800 font-bold">Dosis</Label>
            <Input
              id="medDosage"
              value={newMedication.dosage}
              onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
              placeholder="ej. 400mg"
              className="text-slate-800 font-semibold bg-white border-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-slate-800 font-bold">Tipo</Label>
            <Select value={newMedication.type} onValueChange={(value: 'preventive' | 'acute') => setNewMedication({ ...newMedication, type: value })}>
              <SelectTrigger className="text-slate-800 font-semibold bg-white border-slate-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-400">
                <SelectItem value="acute">Para crisis</SelectItem>
                <SelectItem value="preventive">Preventivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end gap-2">
            {editingId ? (
              <>
                <Button onClick={saveEdit} size="sm" className="bg-green-500 hover:bg-green-600">
                  Guardar
                </Button>
                <Button onClick={cancelEdit} variant="outline" size="sm">
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={addMedication} size="sm" className="bg-violet-500 hover:bg-violet-600">
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            )}
          </div>
        </div>

        {/* Medications List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-slate-800">Lista de Medicamentos ({medications.length})</h4>
            <Button onClick={resetToDefaults} variant="outline" size="sm" className="text-slate-800">
              Restaurar por defecto
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {medications.map((medication) => (
              <div key={medication.id} className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-slate-300 hover:border-violet-300 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800">{medication.name}</span>
                    {medication.isCommon && (
                      <Badge variant="secondary" className="text-xs">Común</Badge>
                    )}
                  </div>
                  <div className="text-sm text-slate-600 font-semibold">
                    {medication.dosage} • {medication.type === 'acute' ? 'Crisis' : 'Preventivo'}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => startEditing(medication)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-blue-100"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={() => removeMedication(medication.id)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
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
