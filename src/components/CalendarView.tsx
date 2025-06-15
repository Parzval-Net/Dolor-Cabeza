
import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { HeadacheEntry } from "@/types/headache";
import IntensityLegend from "./IntensityLegend";
import { EpisodeListForDay } from "./EpisodeListForDay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Get correct intensity key for day classes
const getIntensityKey = (maxIntensity: number) => {
  if (maxIntensity <= 3) return "intensity-level-1";
  if (maxIntensity <= 6) return "intensity-level-2";
  if (maxIntensity <= 8) return "intensity-level-3";
  return "intensity-level-4";
};

const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

interface CalendarViewProps {
  entries: HeadacheEntry[];
}

export default function CalendarView({ entries }: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  // Map (string date) => entries & map (string date) => className
  const { entriesByDate, daysWithIntensityKey } = useMemo(() => {
    const map: Record<string, HeadacheEntry[]> = {};
    const classMap: Record<string, string> = {};
    entries.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    Object.entries(map).forEach(([date, dayEntries]) => {
      const maxInt = Math.max(...dayEntries.map(e => e.intensity));
      classMap[date] = getIntensityKey(maxInt);
    });
    return {
      entriesByDate: map,
      daysWithIntensityKey: classMap,
    };
  }, [entries]);

  // Prepare modifiers and their classNames for DayPicker
  const modifiers: Record<string, (date: Date) => boolean> = {};
  const modifiersClassNames: Record<string, string> = {};

  Object.entries(daysWithIntensityKey).forEach(([dateStr, intensityClass]) => {
    const modName = intensityClass;
    modifiers[modName] = (date: Date) => formatDateKey(date) === dateStr;
    modifiersClassNames[modName] = intensityClass;
  });

  // Custom Day component with guard for undefined
  function CustomDay(props: any) {
    if (!props.day) return null;
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <span className="z-10">{props.day.getDate()}</span>
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
                  onSelect={setSelectedDay}
                  className="w-full calendar-custom-intensity mx-auto min-w-[320px] max-w-full"
                  numberOfMonths={1}
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                  components={{
                    Day: CustomDay,
                  }}
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

