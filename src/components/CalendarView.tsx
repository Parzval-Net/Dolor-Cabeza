
import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { HeadacheEntry } from "@/types/headache";
import IntensityLegend from "./IntensityLegend";
import { EpisodeListForDay } from "./EpisodeListForDay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Asigna la clase correcta según la intensidad máxima del día
const getIntensityClass = (maxIntensity: number) => {
  if (maxIntensity <= 3) return "calendar-intensity-mild";
  if (maxIntensity <= 6) return "calendar-intensity-moderate";
  if (maxIntensity <= 8) return "calendar-intensity-severe";
  return "calendar-intensity-extreme";
};

const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

interface CalendarViewProps {
  entries: HeadacheEntry[];
}

export default function CalendarView({ entries }: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  // Mapea cada fecha a su clase de intensidad
  const { entriesByDate, daysWithIntensityClass } = useMemo(() => {
    const map: Record<string, HeadacheEntry[]> = {};
    const classMap: Record<string, string> = {};
    entries.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    Object.entries(map).forEach(([date, dayEntries]) => {
      const maxInt = Math.max(...dayEntries.map(e => e.intensity));
      classMap[date] = getIntensityClass(maxInt);
    });
    return {
      entriesByDate: map,
      daysWithIntensityClass: classMap,
    };
  }, [entries]);

  // DayContent: muestra el número y el dot de intensidad si aplica
  function renderDayContent(day: Date) {
    const key = formatDateKey(day);
    const intensityClass = daysWithIntensityClass[key];

    return (
      <div className={`relative w-full h-full flex items-center justify-center`}>
        <span
          className={
            "z-10 " +
            (intensityClass
              ? {
                  "calendar-intensity-mild": "bg-emerald-500",
                  "calendar-intensity-moderate": "bg-orange-500",
                  "calendar-intensity-severe": "bg-red-500",
                  "calendar-intensity-extreme": "bg-red-700",
                }[intensityClass] ?? ""
              : "")
          }
        >
          {day.getDate()}
        </span>
        {intensityClass && (
          <span
            className={`absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full shadow border-2 border-white pointer-events-none
              ${{
                "calendar-intensity-mild": "bg-emerald-500",
                "calendar-intensity-moderate": "bg-orange-500",
                "calendar-intensity-severe": "bg-red-500",
                "calendar-intensity-extreme": "bg-red-700",
              }[intensityClass]}`}
            aria-label="Indicador de intensidad"
          />
        )}
      </div>
    );
  }

  const selectedEntries = selectedDay
    ? entriesByDate[formatDateKey(selectedDay)] || []
    : [];

  return (
    <div className="w-full animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <Card className="glass-card-dark h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-base md:text-xl font-bold text-slate-800">
                Calendario de Migrañas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4">
              <div className="bg-slate-900 rounded-2xl p-2 sm:p-4 shadow-xl border border-slate-700 max-w-full overflow-x-auto">
                <Calendar
                  mode="single"
                  selected={selectedDay}
                  onDayClick={setSelectedDay}
                  className="w-full calendar-custom-intensity mx-auto min-w-[320px] max-w-full"
                  numberOfMonths={1}
                  modifiersClassNames={{
                    // Estas clases no afectan visualmente, solo son fallback si no hay renderDay de contenido personalizado
                  }}
                  renderDay={renderDayContent}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="xl:col-span-2 space-y-4 mt-4 xl:mt-0">
          <IntensityLegend />
          <EpisodeListForDay date={selectedDay} entries={selectedEntries} />
        </div>
      </div>
    </div>
  );
}
