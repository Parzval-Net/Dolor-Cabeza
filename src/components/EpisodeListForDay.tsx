
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeadacheEntry } from "@/types/headache";
import { Clock, Zap, Pill, AlertTriangle, Calendar } from "lucide-react";

interface Props {
  date?: Date;
  entries: HeadacheEntry[];
}

const getIntensityColor = (intensity: number) => {
  if (intensity <= 3) return "bg-emerald-500 text-white";
  if (intensity <= 6) return "bg-orange-500 text-white";
  if (intensity <= 8) return "bg-red-500 text-white";
  return "bg-red-700 text-white";
};

const getIntensityText = (intensity: number) => {
  if (intensity <= 3) return "Leve";
  if (intensity <= 6) return "Moderado";
  if (intensity <= 8) return "Severo";
  return "Extremo";
};

export function EpisodeListForDay({ date, entries }: Props) {
  if (!date) {
    return (
      <Card className="glass-card-dark">
        <CardContent className="p-6 text-center">
          <div className="text-slate-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Selecciona una fecha para ver los episodios</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const dateString = date.toLocaleDateString("es-ES", { 
    weekday: 'long',
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });

  return (
    <Card className="glass-card-dark">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-800 capitalize">
          {dateString}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {entries.length > 0 ? (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={entry.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                {/* Header del episodio */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getIntensityColor(entry.intensity)}`}>
                      {entry.intensity}/10
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                      {getIntensityText(entry.intensity)}
                    </span>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {entry.time}
                  </div>
                </div>

                {/* Duración */}
                <div className="flex items-center text-slate-600 text-sm mb-3">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>Duración: {entry.duration}h</span>
                </div>

                {/* Síntomas */}
                {entry.symptoms && entry.symptoms.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center text-slate-700 text-sm font-medium mb-2">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Síntomas
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entry.symptoms.slice(0, 3).map((symptom, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                      {entry.symptoms.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{entry.symptoms.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Medicamentos */}
                {entry.medications && entry.medications.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center text-slate-700 text-sm font-medium mb-2">
                      <Pill className="w-4 h-4 mr-2" />
                      Medicamentos
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entry.medications.slice(0, 2).map((med, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {med}
                        </Badge>
                      ))}
                      {entry.medications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{entry.medications.length - 2} más
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Desencadenantes */}
                {entry.triggers && entry.triggers.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500">
                      <span className="font-medium">Posibles desencadenantes:</span> {entry.triggers.slice(0, 2).join(", ")}
                      {entry.triggers.length > 2 && ` (+${entry.triggers.length - 2} más)`}
                    </p>
                  </div>
                )}

                {/* Notas */}
                {entry.notes && (
                  <div className="pt-2 border-t border-slate-100 mt-2">
                    <p className="text-xs text-slate-600 italic">"{entry.notes}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-slate-400 mb-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">😌</span>
              </div>
              <p className="text-sm font-medium">Sin episodios registrados</p>
              <p className="text-xs text-slate-500 mt-1">
                ¡Qué bueno! No hay migrañas registradas en esta fecha.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
