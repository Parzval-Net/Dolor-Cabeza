
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HeadacheEntry } from '@/types/headache';
import { useToast } from '@/hooks/use-toast';
import EditEpisodeForm from './episode-edit/EditEpisodeForm';

interface EditEpisodeDialogProps {
  entry: HeadacheEntry;
  onSave: (updatedEntry: HeadacheEntry) => void;
  onCancel: () => void;
}

const EditEpisodeDialog = ({ entry, onSave, onCancel }: EditEpisodeDialogProps) => {
  const [formData, setFormData] = useState<HeadacheEntry>(entry);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(formData);
    onCancel();
    toast({
      title: "Episodio actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    });
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card-mobile border border-violet-200/60 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold text-slate-800">
            Editar Episodio
          </DialogTitle>
        </DialogHeader>
        
        <EditEpisodeForm 
          entry={entry}
          onFormDataChange={setFormData}
        />

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
