
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeadacheEntry } from '@/types/headache';
import { Clock, Edit, Trash2, Calendar, Pill, Brain } from 'lucide-react';
import EditEpisodeDialog from './EditEpisodeDialog';
import { useToast } from '@/hooks/use-toast';

interface EpisodesListProps {
  entries: HeadacheEntry[];
  onUpdateEntry: (updatedEntry: HeadacheEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

const EpisodesList = ({ entries, onUpdateEntry, onDeleteEntry }: EpisodesListProps) => {
  const [editingEntry, setEditingEntry] = useState<HeadacheEntry | null>(null);
  const [filter, setFilter] = useState<'all' | 'thisMonth' | 'thisYear'>('thisMonth');
  const { toast } = useToast();

  const getIntensityGradient = (intensity: number) => {
    if (intensity <= 3) return 'from-emerald-400 to-emerald-500';
    if (intensity <= 6) return 'from-orange-400 to-orange-500';
    if (intensity <= 8) return 'from-red-400 to-red-500';
    return 'from-red-500 to-red-600';
  };

  const getFilteredEntries = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      
      switch (filter) {
        case 'thisMonth':
          return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
        case 'thisYear':
          return entryDate.getFullYear() === currentYear;
        default:
          return true;
      }
    }).sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());
  };

  const handleDelete = (entryId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este episodio?')) {
      onDeleteEntry(entryId);
      toast({
        title: "Episodio eliminado",
        description: "El episodio ha sido eliminado exitosamente.",
      });
    }
  };

  const filteredEntries = getFilteredEntries();

  return (
    <div className="space-y-6">
      <Card className="glass-card-dark">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <Brain className="w-6 h-6 text-violet-500" />
            Historial de Episodios
          </CardTitle>
          <div className="flex gap-2 mt-4">
            <Button
              variant={filter === 'thisMonth' ? 'default' : 'outline'}
              onClick={() => setFilter('thisMonth')}
              size="sm"
            >
              Este Mes
            </Button>
            <Button
              variant={filter === 'thisYear' ? 'default' : 'outline'}
              onClick={() => setFilter('thisYear')}
              size="sm"
            >
              Este Año
            </Button>
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto">
                <Calendar className="h-10 w-10 text-violet-400" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-600 font-medium">No hay episodios para mostrar</p>
                <p className="text-sm text-slate-400">Cambia el filtro para ver más episodios</p>
              </div>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <Card key={entry.id} className="glass-card p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getIntensityGradient(entry.intensity)} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{entry.intensity}</span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {new Date(entry.date).toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric',
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingEntry(entry)}
                            className="hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(entry.id)}
                            className="hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="w-4 h-4" />
                          <span>{entry.time} • {entry.duration}h de duración</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Brain className="w-4 h-4" />
                          <span>Estrés: {entry.stressLevel}/5</span>
                        </div>
                      </div>

                      {entry.medications.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <Pill className="w-4 h-4" />
                            Medicamentos:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {entry.medications.map((med, index) => (
                              <span key={index} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">
                                {med}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {entry.triggers.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-slate-700 font-medium">Desencadenantes:</div>
                          <div className="flex flex-wrap gap-2">
                            {entry.triggers.map((trigger, index) => (
                              <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                {trigger}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {entry.symptoms.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-slate-700 font-medium">Síntomas:</div>
                          <div className="flex flex-wrap gap-2">
                            {entry.symptoms.map((symptom, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {entry.notes && (
                        <div className="space-y-2">
                          <div className="text-slate-700 font-medium">Notas:</div>
                          <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">{entry.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      {editingEntry && (
        <EditEpisodeDialog
          entry={editingEntry}
          onSave={onUpdateEntry}
          onCancel={() => setEditingEntry(null)}
        />
      )}
    </div>
  );
};

export default EpisodesList;
