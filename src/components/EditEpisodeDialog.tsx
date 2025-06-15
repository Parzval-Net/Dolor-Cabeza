
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HeadacheEntry } from '@/types/headache';
import { useToast } from '@/hooks/use-toast';
import { Save, Calendar, Clock } from 'lucide-react';
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
      <DialogContent 
        className="w-full h-full max-w-none max-h-none p-0 gap-0 bg-white border-0 rounded-none sm:w-[95vw] sm:h-[95vh] sm:max-w-4xl sm:max-h-[95vh] sm:rounded-2xl sm:border sm:border-violet-200 overflow-hidden"
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          margin: '0',
          transform: 'none',
        }}
      >
        {/* Header adaptativo - sin botón X duplicado */}
        <DialogHeader className="px-4 py-4 sm:px-6 sm:py-5 bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 border-b border-violet-200/50 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-lg sm:text-xl font-bold text-slate-800 mb-1 truncate">
                Editar Episodio
              </DialogTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate">{new Date(formData.date).toLocaleDateString('es-ES', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short'
                  })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{formData.time}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        {/* Contenido con scroll optimizado para móvil */}
        <div 
          className="flex-1 overflow-y-auto min-h-0 px-4 py-4 sm:px-6 sm:py-6 bg-gradient-to-br from-slate-50/50 to-violet-50/30"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          <EditEpisodeForm 
            entry={entry}
            onFormDataChange={setFormData}
          />
        </div>

        {/* Footer con botones optimizados para móvil */}
        <div className="flex-shrink-0 p-4 sm:p-6 bg-white border-t border-violet-200/50 safe-area-pb">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button 
              variant="outline" 
              onClick={onCancel} 
              className="w-full sm:w-auto h-12 sm:h-10 px-6 py-2.5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 rounded-xl font-semibold mobile-touch-target safari-interactive-button"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              className="w-full sm:w-auto h-12 sm:h-10 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl font-semibold mobile-touch-target safari-interactive-button"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEpisodeDialog;
