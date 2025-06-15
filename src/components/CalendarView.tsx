
import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { HeadacheEntry } from "@/types/headache";
import IntensityLegend from "./IntensityLegend";
import { EpisodeListForDay } from "./EpisodeListForDay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const getIntensityColor = (intensity: number) => {
  if (intensity <= 3) return "bg-emerald-500";
  if (intensity <= 6) return "bg-orange-500";
  if (intensity <= 8) return "bg-red-500";
  return "bg-red-700";
};

interface CalendarViewProps {
  entries: HeadacheEntry[];
}

export default function CalendarView({ entries }: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  // Procesar entradas por fecha
  const entriesByDate = useMemo(() => {
    const map: Record<string, HeadacheEntry[]> = {};
    entries.forEach(entry => {
      if (!map[entry.date]) map[entry.date] = [];
      map[entry.date].push(entry);
    });
    return map;
  }, [entries]);

  // Obtener fechas que tienen episodios
  const datesWithEpisodes = useMemo(() => {
    return Object.keys(entriesByDate).map(dateStr => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    });
  }, [entriesByDate]);

  // Función para renderizar contenido personalizado de día
  const renderDayContent = (day: Date) => {
    const dateKey = formatDateKey(day);
    const dayEntries = entriesByDate[dateKey];
    
    if (!dayEntries || dayEntries.length === 0) {
      return <span>{day.getDate()}</span>;
    }

    const maxIntensity = Math.max(...dayEntries.map(e => e.intensity));
    const colorClass = getIntensityColor(maxIntensity);

    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <span className="z-10 font-semibold">{day.getDate()}</span>
        <div 
          className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${colorClass} border border-white shadow-sm`}
        />
      </div>
    );
  };

  const selectedEntries = selectedDay
    ? entriesByDate[formatDateKey(selectedDay)] || []
    : [];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Calendario de Migrañas
        </h2>
        <p className="text-slate-600">
          Haz clic en una fecha para ver los detalles de tus episodios
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario */}
        <div className="lg:col-span-2">
          <Card className="glass-card-dark">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Vista Mensual
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-white rounded-xl p-4 shadow-inner border">
                <Calendar
                  mode="single"
                  selected={selectedDay}
                  onSelect={setSelectedDay}
                  className="w-full"
                  numberOfMonths={1}
                  modifiers={{
                    hasEpisodes: datesWithEpisodes
                  }}
                  modifiersClassNames={{
                    hasEpisodes: "bg-blue-50 border-blue-200"
                  }}
                  components={{
                    DayContent: ({ date }) => renderDayContent(date)
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-4">
          <IntensityLegend />
          
          {selectedDay ? (
            <EpisodeListForDay 
              date={selectedDay} 
              entries={selectedEntries} 
            />
          ) : (
            <Card className="glass-card-dark">
              <CardContent className="p-6 text-center">
                <div className="text-slate-500">
                  <p className="mb-2">📅</p>
                  <p className="text-sm">
                    Selecciona una fecha en el calendario para ver los episodios registrados
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resumen rápido */}
          <Card className="glass-card-dark">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-800">
                Resumen
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total episodios:</span>
                  <span className="font-semibold text-slate-800">{entries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Días con episodios:</span>
                  <span className="font-semibold text-slate-800">{Object.keys(entriesByDate).length}</span>
                </div>
                {entries.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Intensidad promedio:</span>
                    <span className="font-semibold text-slate-800">
                      {(entries.reduce((sum, e) => sum + e.intensity, 0) / entries.length).toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
