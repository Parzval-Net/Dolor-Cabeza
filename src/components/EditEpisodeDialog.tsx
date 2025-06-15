
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HeadacheEntry } from '@/types/headache';
import { useToast } from '@/hooks/use-toast';
import { X, Save } from 'lucide-react';
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
      <DialogContent className="w-full max-w-4xl max-h-[95vh] overflow-hidden p-0 gap-0 glass-card-mobile border-0 rounded-3xl shadow-2xl">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 border-b border-violet-200/50 bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600"></div>
              Editar Episodio
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="h-10 w-10 p-0 rounded-full hover:bg-violet-100 mobile-touch-target"
            >
              <X className="h-5 w-5 text-slate-600" />
            </Button>
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Fecha: {new Date(formData.date).toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • {formData.time}
          </p>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 min-h-0">
          <EditEpisodeForm 
            entry={entry}
            onFormDataChange={setFormData}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t border-violet-200/50 bg-white/80 backdrop-blur-sm rounded-b-3xl">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="order-2 sm:order-1 mobile-button border-violet-300 text-slate-700 hover:bg-violet-50 hover:border-violet-400"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            className="order-1 sm:order-2 mobile-button bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEpisodeDialog;
