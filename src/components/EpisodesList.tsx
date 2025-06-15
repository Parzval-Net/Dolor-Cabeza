
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeadacheEntry } from '@/types/headache';
import EditEpisodeDialog from './EditEpisodeDialog';
import { Calendar, Clock, Zap, Pill, AlertTriangle, Edit3, Trash2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EpisodesListProps {
  entries: HeadacheEntry[];
  onUpdateEntry: (entry: HeadacheEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

const getIntensityColor = (intensity: number) => {
  if (intensity <= 3) return "bg-emerald-500 text-white border-emerald-600";
  if (intensity <= 6) return "bg-orange-500 text-white border-orange-600";
  if (intensity <= 8) return "bg-red-500 text-white border-red-600";
  return "bg-red-700 text-white border-red-800";
};

const getIntensityText = (intensity: number) => {
  if (intensity <= 3) return "Leve";
  if (intensity <= 6) return "Moderado";
  if (intensity <= 8) return "Severo";
  return "Extremo";
};

const EpisodesList = ({ entries, onUpdateEntry, onDeleteEntry }: EpisodesListProps) => {
  const [editingEntry, setEditingEntry] = useState<HeadacheEntry | null>(null);
  const { toast } = useToast();

  const handleDelete = (entryId: string) => {
    onDeleteEntry(entryId);
    toast({
      title: "Episodio eliminado",
      description: "El episodio ha sido eliminado exitosamente.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <User className="w-6 h-6 text-violet-600" />
          Historial de Episodios
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {entries.length} episodio{entries.length !== 1 ? 's' : ''} registrado{entries.length !== 1 ? 's' : ''}
        </p>
      </div>

      {entries.length === 0 ? (
        <Card className="glass-card-mobile border border-violet-200/50 shadow-lg">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-violet-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
              Sin episodios registrados
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Comienza a registrar tus migrañas para hacer seguimiento de patrones y síntomas.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="glass-card-mobile border border-violet-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-violet-300">
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getIntensityColor(entry.intensity)}`}>
                      {entry.intensity}/10
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {getIntensityText(entry.intensity)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setEditingEntry(entry)}
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 hover:bg-violet-100 hover:text-violet-700 transition-colors rounded-lg mobile-touch-target"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(entry.id)}
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-700 transition-colors rounded-lg mobile-touch-target"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <CardTitle className="text-base sm:text-lg font-bold text-slate-800 capitalize">
                  {formatDate(entry.date)}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Información básica */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-white/80 rounded-xl border border-violet-200/30">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-violet-500" />
                    <span className="font-medium">{entry.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{entry.duration}h duración</span>
                  </div>
                </div>

                {/* Síntomas */}
                {entry.symptoms && entry.symptoms.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      Síntomas
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entry.symptoms.slice(0, 4).map((symptom, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs bg-orange-100 text-orange-800 border border-orange-200 hover:bg-orange-200 transition-colors"
                        >
                          {symptom}
                        </Badge>
                      ))}
                      {entry.symptoms.length > 4 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs text-slate-700 border-slate-400 bg-slate-50"
                        >
                          +{entry.symptoms.length - 4} más
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Medicamentos */}
                {entry.medications && entry.medications.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <Pill className="w-4 h-4 text-blue-600" />
                      Medicamentos
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entry.medications.slice(0, 3).map((med, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs text-blue-800 border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                          {med}
                        </Badge>
                      ))}
                      {entry.medications.length > 3 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs text-slate-700 border-slate-400 bg-slate-50"
                        >
                          +{entry.medications.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Desencadenantes */}
                {entry.triggers && entry.triggers.length > 0 && (
                  <div className="pt-3 border-t border-violet-200/50">
                    <p className="text-xs sm:text-sm text-slate-700">
                      <span className="font-bold text-slate-800">Desencadenantes:</span>{' '}
                      {entry.triggers.slice(0, 3).join(", ")}
                      {entry.triggers.length > 3 && ` (+${entry.triggers.length - 3} más)`}
                    </p>
                  </div>
                )}

                {/* Notas */}
                {entry.notes && (
                  <div className="pt-3 border-t border-violet-200/50">
                    <p className="text-xs sm:text-sm text-slate-700 italic bg-violet-50 p-3 rounded-lg border border-violet-200/50">
                      "{entry.notes}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {editingEntry && (
        <EditEpisodeDialog
          entry={editingEntry}
          onSave={(updatedEntry) => {
            onUpdateEntry(updatedEntry);
            setEditingEntry(null);
          }}
          onCancel={() => setEditingEntry(null)}
        />
      )}
    </div>
  );
};

export default EpisodesList;
