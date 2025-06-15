
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeadacheEntry } from '@/types/headache';
import { Calendar, Clock, Edit3, Trash2, Brain, Activity } from 'lucide-react';
import { getIntensityColor, getIntensityText, getMoodEmoji, getMoodText, getStressColor, formatDate } from '@/utils/episodeHelpers';

interface EpisodeCardProps {
  entry: HeadacheEntry;
  onEdit: (entry: HeadacheEntry) => void;
  onDelete: (entryId: string) => void;
}

const EpisodeCard = ({ entry, onEdit, onDelete }: EpisodeCardProps) => {
  return (
    <Card className="glass-card-mobile border border-violet-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-violet-300">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getIntensityColor(entry.intensity)} flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold text-lg">{entry.intensity}</span>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-base sm:text-lg font-bold text-slate-800 capitalize">
                {formatDate(entry.date)}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-violet-500" />
                <span className="font-medium">{entry.time}</span>
                <span className="text-violet-600 font-semibold">• {getIntensityText(entry.intensity)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:flex-col sm:items-end">
            <div className="flex gap-2">
              <Button
                onClick={() => onEdit(entry)}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 hover:text-blue-800 hover:border-blue-300 transition-all duration-200 rounded-lg shadow-sm"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => onDelete(entry.id)}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 hover:text-red-800 hover:border-red-300 transition-all duration-200 rounded-lg shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Estado y Estrés */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/80 rounded-xl p-3 border border-violet-200/30">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
              <span className="text-xs font-medium text-slate-600">Estado</span>
            </div>
            <p className="text-sm font-semibold text-slate-800">
              {getMoodText(entry.mood)}
            </p>
          </div>
          <div className="bg-white/80 rounded-xl p-3 border border-violet-200/30">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-medium text-slate-600">Estrés</span>
            </div>
            <Badge className={`text-xs font-semibold ${getStressColor(entry.stressLevel)}`}>
              Nivel {entry.stressLevel}/5
            </Badge>
          </div>
        </div>

        {/* Medicamentos */}
        {entry.medications && entry.medications.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <Brain className="w-4 h-4 text-blue-600" />
              Medicamentos
            </div>
            <div className="flex flex-wrap gap-2">
              {entry.medications.slice(0, 2).map((med, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs text-blue-800 border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  {med.split('(')[0].trim()}
                </Badge>
              ))}
              {entry.medications.length > 2 && (
                <Badge 
                  variant="outline" 
                  className="text-xs text-slate-700 border-slate-400 bg-slate-50"
                >
                  +{entry.medications.length - 2} más
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Síntomas */}
        {entry.symptoms && entry.symptoms.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <span className="text-orange-600">⚡</span>
              Síntomas principales
            </div>
            <div className="flex flex-wrap gap-2">
              {entry.symptoms.slice(0, 3).map((symptom, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs bg-orange-100 text-orange-800 border border-orange-200"
                >
                  {symptom}
                </Badge>
              ))}
              {entry.symptoms.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs text-slate-700 border-slate-400 bg-slate-50"
                >
                  +{entry.symptoms.length - 3} más
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Desencadenantes */}
        {entry.triggers && entry.triggers.length > 0 && (
          <div className="pt-3 border-t border-violet-200/50">
            <p className="text-xs sm:text-sm text-slate-700">
              <span className="font-bold text-slate-800">Posibles desencadenantes:</span>{' '}
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
  );
};

export default EpisodeCard;
