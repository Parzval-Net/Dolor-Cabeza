
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HeadacheEntry } from '@/types/headache';
import { useToast } from '@/hooks/use-toast';
import { X, Save, Calendar, Clock } from 'lucide-react';
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
      <DialogContent className="w-full max-w-6xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-white border border-violet-200 shadow-2xl rounded-2xl">
        {/* Header mejorado */}
        <DialogHeader className="px-6 py-5 bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 border-b border-violet-200/50 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-slate-800 mb-1">
                  Editar Episodio
                </DialogTitle>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(formData.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formData.time}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="h-10 w-10 p-0 rounded-xl hover:bg-violet-100 transition-colors"
            >
              <X className="h-5 w-5 text-slate-600" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Contenido con scroll mejorado */}
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-br from-slate-50/50 to-violet-50/30">
          <EditEpisodeForm 
            entry={entry}
            onFormDataChange={setFormData}
          />
        </div>

        {/* Footer con botones mejorados */}
        <div className="flex justify-end gap-3 p-6 bg-white border-t border-violet-200/50 rounded-b-2xl">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 rounded-xl font-semibold"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl font-semibold"
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
