
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HeadacheEntry } from "@/types/headache";

interface Props {
  date?: Date;
  entries: HeadacheEntry[];
}

const getBadgeColor = (intensity: number) => {
  if (intensity <= 3) return "bg-emerald-500";
  if (intensity <= 6) return "bg-orange-500";
  if (intensity <= 8) return "bg-red-500";
  return "bg-red-700";
};

export function EpisodeListForDay({ date, entries }: Props) {
  if (!date) return null;

  const showDateStr = date.toLocaleDateString("es-ES", { day: "numeric", month: "long" });

  return (
    <Card className="glass-card-dark">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold text-slate-800 truncate">{showDateStr}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {entries.length > 0 ? (
          <div className="space-y-3">
            {entries.map(e => (
              <div key={e.id} className="bg-white/90 p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${getBadgeColor(e.intensity)} flex items-center justify-center shadow text-white font-bold`}>
                    {e.intensity}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 break-words">{e.time}</p>
                    <p className="text-slate-600 text-xs">{e.duration}h de duración</p>
                  </div>
                </div>
                {e.symptoms?.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-xs text-slate-600">
                      Síntomas: {e.symptoms.join(", ")}
                    </p>
                  </div>
                )}
                {e.triggers?.length > 0 && (
                  <div className="mt-1 text-xs text-slate-500">
                    <span className="font-medium">Desencadenantes: </span>
                    {e.triggers.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6"><p className="text-slate-600">No hay episodios registrados en esta fecha.</p></div>
        )}
      </CardContent>
    </Card>
  );
}
