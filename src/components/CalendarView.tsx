
import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { HeadacheEntry } from "@/types/headache";
import IntensityLegend from "./IntensityLegend";
import { EpisodeListForDay } from "./EpisodeListForDay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// -- Helper para agrupar entradas y mapear intensidad al día --
const getIntensityLevel = (value: number) => {
  if (value <= 3) return "mild";
  if (value <= 6) return "moderate";
  if (value <= 8) return "severe";
  return "extreme";
};
const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

interface CalendarViewProps {
  entries: HeadacheEntry[];
}

export default function CalendarView({ entries }: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  // Agrupación y mapping de intensidad
  const { modifiers, modifiersClassNames, entriesByDate } = useMemo(() => {
    const map: Record<string, HeadacheEntry[]> = {};
    const days: Record<string, Date[]> = { mild: [], moderate: [], severe: [], extreme: [] };
    entries.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    Object.entries(map).forEach(([date, dayEntries]) => {
      const max = Math.max(...dayEntries.map(e => e.intensity));
      const level = getIntensityLevel(max);
      const [y, m, d] = date.split("-").map(Number);
      days[level].push(new Date(y, m - 1, d));
    });
    return {
      modifiers: days,
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

  return (
    <div className="w-full animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Calendario principal */}
        <div className="xl:col-span-3">
          <Card className="glass-card-dark h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-base md:text-xl font-bold text-slate-800">
                Calendario de Migrañas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4">
              <div className="bg-slate-900 rounded-2xl p-2 sm:p-4 shadow-xl border border-slate-700 max-w-full overflow-x-auto">
                {/* El calendario se adapta bien al móvil (scroll lateral si falta espacio) */}
                <Calendar
                  mode="single"
                  selected={selectedDay}
                  onDayClick={setSelectedDay}
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                  className="w-full calendar-custom-intensity mx-auto min-w-[320px] max-w-full"
                  numberOfMonths={1}
                  classNames={{
                    months: "flex flex-col",
                    month: "space-y-2",
                    caption: "flex justify-center pt-1 relative items-center mb-2",
                    caption_label: "text-slate-100 font-bold text-lg",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-10 w-10 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-lg transition-colors border border-slate-600",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-slate-300 rounded-md w-12 h-12 font-bold text-base flex items-center justify-center",
                    row: "flex w-full mt-1",
                    cell: "relative",
                    day: "h-12 w-12 text-slate-100 font-semibold text-sm hover:bg-slate-700 hover:text-white rounded-xl border border-transparent bg-slate-800/60 relative flex items-center justify-center transition-all duration-150",
                    day_today: "bg-violet-600 text-white font-bold ring-2 ring-violet-400 border-violet-500",
                    day_selected: "bg-violet-700 text-white font-bold shadow-lg border-violet-600 scale-105",
                    day_outside: "text-slate-500 bg-slate-800/20",
                    day_disabled: "text-slate-600 bg-slate-800/10",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Panel lateral: leyenda + episodios */}
        <div className="xl:col-span-2 space-y-4 mt-4 xl:mt-0">
          <IntensityLegend />
          <EpisodeListForDay date={selectedDay} entries={selectedEntries} />
        </div>
      </div>
    </div>
  );
}
