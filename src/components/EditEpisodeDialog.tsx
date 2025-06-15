
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { HeadacheEntry } from '@/types/headache';
import { medicationOptions as defaultMedicationOptions, triggerOptions, symptomOptions } from '@/data/options';
import { useToast } from '@/hooks/use-toast';

interface EditEpisodeDialogProps {
  entry: HeadacheEntry;
  onSave: (updatedEntry: HeadacheEntry) => void;
  onCancel: () => void;
}

const EditEpisodeDialog = ({ entry, onSave, onCancel }: EditEpisodeDialogProps) => {
  const [formData, setFormData] = useState<HeadacheEntry>(entry);
  const [medicationOptions, setMedicationOptions] = useState(defaultMedicationOptions);
  const { toast } = useToast();

  // Cargar medicamentos personalizados al montar el componente
  useEffect(() => {
    const loadCustomMedications = () => {
      const customMedications = localStorage.getItem('custom-medications');
      if (customMedications) {
        try {
          const parsed = JSON.parse(customMedications);
          // Asegurar que todos los medicamentos tengan el tipo correcto
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
    
    // Escuchar cambios en medicamentos
    const handleMedicationsUpdate = () => {
      loadCustomMedications();
    };
    
    window.addEventListener('medications-updated', handleMedicationsUpdate);
    return () => window.removeEventListener('medications-updated', handleMedicationsUpdate);
  }, []);

  const handleSave = () => {
    onSave(formData);
    onCancel();
    toast({
      title: "Episodio actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    });
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
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card-mobile border border-violet-200/60 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold text-slate-800">
            Editar Episodio
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 md:space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-bold text-slate-800">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="mobile-input border-violet-200 focus:border-violet-500 bg-white/95"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-bold text-slate-800">Hora</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="mobile-input border-violet-200 focus:border-violet-500 bg-white/95"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-2">
              <Label htmlFor="intensity" className="text-sm font-bold text-slate-800">Intensidad (1-10)</Label>
              <Input
                id="intensity"
                type="number"
                min="1"
                max="10"
                value={formData.intensity}
                onChange={(e) => setFormData(prev => ({ ...prev, intensity: Number(e.target.value) }))}
                className="mobile-input border-violet-200 focus:border-violet-500 bg-white/95"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stressLevel" className="text-sm font-bold text-slate-800">Nivel de Estrés (1-5)</Label>
              <Input
                id="stressLevel"
                type="number"
                min="1"
                max="5"
                value={formData.stressLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, stressLevel: Number(e.target.value) }))}
                className="mobile-input border-violet-200 focus:border-violet-500 bg-white/95"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-800">Medicamentos</Label>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto bg-white/80 rounded-xl p-4 border border-violet-200/60 shadow-inner">
              {medicationOptions.map((med) => {
                const medicationWithDose = `${med.name} (${med.dosage})`;
                return (
                  <label key={med.id} className="flex items-center space-x-3 text-sm p-3 hover:bg-violet-50 rounded-lg transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.medications.includes(medicationWithDose)}
                      onChange={(e) => handleCheckboxChange('medications', medicationWithDose, e.target.checked)}
                      className="rounded border-violet-300 text-violet-600 focus:ring-violet-500 mobile-touch-target w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-slate-800">{med.name}</div>
                      <div className="text-xs text-slate-600">{med.dosage} • {med.type === 'acute' ? 'Crisis' : 'Preventivo'}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-800">Desencadenantes</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto bg-white/80 rounded-xl p-4 border border-violet-200/60 shadow-inner">
              {triggerOptions.map((trigger) => (
                <label key={trigger.id} className="flex items-center space-x-3 text-sm p-2 hover:bg-violet-50 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.triggers.includes(trigger.name)}
                    onChange={(e) => handleCheckboxChange('triggers', trigger.name, e.target.checked)}
                    className="rounded border-violet-300 text-violet-600 focus:ring-violet-500 w-4 h-4"
                  />
                  <span className="text-slate-800 font-medium">{trigger.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-800">Síntomas</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto bg-white/80 rounded-xl p-4 border border-violet-200/60 shadow-inner">
              {symptomOptions.map((symptom, index) => (
                <label key={index} className="flex items-center space-x-3 text-sm p-2 hover:bg-violet-50 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.symptoms.includes(symptom)}
                    onChange={(e) => handleCheckboxChange('symptoms', symptom, e.target.checked)}
                    className="rounded border-violet-300 text-violet-600 focus:ring-violet-500 w-4 h-4"
                  />
                  <span className="text-slate-800 font-medium">{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="notes" className="text-sm font-bold text-slate-800">Notas adicionales</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Escribe cualquier información adicional..."
              rows={3}
              className="mobile-input border-violet-200 focus:border-violet-500 resize-none bg-white/95"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-violet-200/50">
          <Button variant="outline" onClick={onCancel} className="mobile-button border-violet-300 text-slate-700 hover:bg-violet-50">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="mobile-button bg-violet-600 hover:bg-violet-700 text-white">
            Guardar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEpisodeDialog;
