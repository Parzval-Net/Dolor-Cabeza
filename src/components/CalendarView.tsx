
import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeadacheEntry } from "@/types/headache";

// --- Legend Component ---
const intensityInfo = [
  { key: "mild", label: "Leve (1-3)", dot: "bg-emerald-500", border: "border-emerald-200" },
  { key: "moderate", label: "Moderado (4-6)", dot: "bg-orange-500", border: "border-orange-200" },
  { key: "severe", label: "Severo (7-8)", dot: "bg-red-500", border: "border-red-200" },
  { key: "extreme", label: "Extremo (9-10)", dot: "bg-red-700", border: "border-red-300" },
];

function Legend() {
  return (
    <Card className="glass-card-dark mb-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-slate-800">Leyenda de Intensidad</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {intensityInfo.map(({ key, label, dot, border }) => (
          <div key={key} className={`flex items-center space-x-3 bg-white/90 px-3 py-2 rounded-lg shadow border ${border}`}>
            <div className={`w-4 h-4 ${dot} rounded-full shadow-lg border-2 border-white`} />
            <span className="text-slate-700 font-medium text-sm">{label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// --- Helpers ---
const getIntensityLevel = (value: number) => {
  if (value <= 3) return "mild";
  if (value <= 6) return "moderate";
  if (value <= 8) return "severe";
  return "extreme";
};
const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

// --- Calendar View ---

interface CalendarViewProps {
  entries: HeadacheEntry[];
}

const CalendarView = ({ entries }: CalendarViewProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  // Agrupa entradas por fecha y determina intensidad máxima por día
  const { modifiers, modifiersClassNames, entriesByDate } = useMemo(() => {
    const map: Record<string, HeadacheEntry[]> = {};
    const intensityDays: Record<string, Date[]> = { mild: [], moderate: [], severe: [], extreme: [] };

    entries.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });

    Object.entries(map).forEach(([key, dayEntries]) => {
      const max = Math.max(...dayEntries.map(e => e.intensity));
      const level = getIntensityLevel(max);
      const [y, m, d] = key.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      intensityDays[level].push(dateObj);
    });

    return {
      modifiers: intensityDays,
      modifiersClassNames: {
        mild: "calendar-intensity-mild",
        moderate: "calendar-intensity-moderate",
        severe: "calendar-intensity-severe",
        extreme: "calendar-intensity-extreme",
      },
      entriesByDate: map,
    };
  }, [entries]);

  const selectedEntries = selectedDay ? entriesByDate[formatDateKey(selectedDay)] || [] : [];

  // -- UI helpers para badges/colores episodios seleccionados --
  const badgeColor = (intensity: number) => {
    if (intensity <= 3) return "bg-emerald-500";
    if (intensity <= 6) return "bg-orange-500";
    if (intensity <= 8) return "bg-red-500";
    return "bg-red-700";
  };

  const showDateStr = selectedDay?.toLocaleDateString("es-ES", { day: "numeric", month: "long" });

  return (
    <div className="w-full max-w-none animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Calendario */}
        <div className="xl:col-span-3">
          <Card className="glass-card-dark h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-slate-800">
                Calendario de Migrañas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-slate-900 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700">
                <Calendar
                  mode="single"
                  selected={selectedDay}
                  onDayClick={setSelectedDay}
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                  className="w-full calendar-custom-intensity mx-auto"
                  numberOfMonths={1}
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center mb-4",
                    caption_label: "text-slate-100 font-bold text-xl",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-10 w-10 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-lg transition-colors border border-slate-600",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-slate-300 rounded-md w-16 h-12 font-bold text-base flex items-center justify-center",
                    row: "flex w-full mt-2",
                    cell: "relative",
                    day: "h-16 w-16 text-slate-100 font-semibold text-base hover:bg-slate-700 hover:text-white transition-all duration-200 rounded-xl border border-transparent bg-slate-800/60 relative flex items-center justify-center",
                    day_today: "bg-violet-600 text-white font-bold ring-2 ring-violet-400 border-violet-500",
                    day_selected: "bg-violet-700 text-white font-bold shadow-lg border-violet-600",
                    day_outside: "text-slate-500 bg-slate-800/20",
                    day_disabled: "text-slate-600 bg-slate-800/10",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Panel lateral */}
        <div className="xl:col-span-2 space-y-4">
          <Legend />
          {selectedDay && (
            <Card className="glass-card-dark">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-slate-800">
                  {showDateStr}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedEntries.length > 0 ? (
                  <div className="space-y-3">
                    {selectedEntries.map((e) => (
                      <div key={e.id} className="bg-white/90 p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${badgeColor(e.intensity)} flex items-center justify-center shadow text-white font-bold`}>
                            {e.intensity}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800">{e.time}</p>
                            <p className="text-slate-600 text-sm">{e.duration}h de duración</p>
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
                  <div className="text-center py-6">
                    <p className="text-slate-600">No hay episodios registrados en esta fecha.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

