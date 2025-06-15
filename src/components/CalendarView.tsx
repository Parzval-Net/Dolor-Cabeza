
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { HeadacheEntry } from '@/types/headache';
import { DayModifiers } from 'react-day-picker';

interface CalendarViewProps {
  entries: HeadacheEntry[];
}

const CalendarView = ({ entries }: CalendarViewProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  // Procesar entradas y crear modificadores de manera más robusta
  const { modifiers, modifiersClassNames, entriesByDate } = useMemo(() => {
    console.log('Processing entries for calendar:', entries);
    
    const entriesMap: Record<string, HeadacheEntry[]> = {};
    const intensityDates: Record<string, Date[]> = {
      mild: [],
      moderate: [],
      severe: [],
      extreme: []
    };

    // Agrupar entradas por fecha
    entries.forEach((entry) => {
      const dateKey = entry.date;
      
      if (!entriesMap[dateKey]) {
        entriesMap[dateKey] = [];
      }
      entriesMap[dateKey].push(entry);
    });

    // Determinar la intensidad máxima por día y crear fechas para modificadores
    Object.entries(entriesMap).forEach(([dateKey, dayEntries]) => {
      const maxIntensity = Math.max(...dayEntries.map(e => e.intensity));
      const [year, month, day] = dateKey.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);

      console.log(`Date: ${dateKey}, Max intensity: ${maxIntensity}`);

      if (maxIntensity >= 1 && maxIntensity <= 3) {
        intensityDates.mild.push(dateObj);
      } else if (maxIntensity >= 4 && maxIntensity <= 6) {
        intensityDates.moderate.push(dateObj);
      } else if (maxIntensity >= 7 && maxIntensity <= 8) {
        intensityDates.severe.push(dateObj);
      } else if (maxIntensity >= 9 && maxIntensity <= 10) {
        intensityDates.extreme.push(dateObj);
      }
    });

    console.log('Intensity dates:', intensityDates);

    return {
      modifiers: intensityDates,
      modifiersClassNames: {
        mild: 'calendar-intensity-mild',
        moderate: 'calendar-intensity-moderate', 
        severe: 'calendar-intensity-severe',
        extreme: 'calendar-intensity-extreme'
      },
      entriesByDate: entriesMap
    };
  }, [entries]);

  const handleDayClick = (day: Date | undefined, modifiers?: DayModifiers) => {
    console.log('Day clicked:', day, 'Modifiers:', modifiers);
    setSelectedDay(day);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const selectedDayEntries = selectedDay ? entriesByDate[formatDate(selectedDay)] || [] : [];

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'from-emerald-400 to-emerald-500';
    if (intensity <= 6) return 'from-orange-400 to-orange-500';
    if (intensity <= 8) return 'from-red-400 to-red-500';
    return 'from-red-600 to-red-700';
  };

  const getIntensityBadgeColor = (intensity: number) => {
    if (intensity <= 3) return 'bg-emerald-500';
    if (intensity <= 6) return 'bg-orange-500';
    if (intensity <= 8) return 'bg-red-500';
    return 'bg-red-700';
  };

  return (
    <div className="w-full max-w-none animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        
        {/* Calendario Principal */}
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
                  onDayClick={handleDayClick}
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

        {/* Panel Lateral */}
        <div className="xl:col-span-2 space-y-4">
          {/* Leyenda */}
          <Card className="glass-card-dark">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-slate-800">
                Leyenda de Intensidad
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3 bg-white/90 px-3 py-2 rounded-lg shadow border border-emerald-200">
                <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg border-2 border-white"></div>
                <span className="text-slate-700 font-medium text-sm">Leve (1-3)</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/90 px-3 py-2 rounded-lg shadow border border-orange-200">
                <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg border-2 border-white"></div>
                <span className="text-slate-700 font-medium text-sm">Moderado (4-6)</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/90 px-3 py-2 rounded-lg shadow border border-red-200">
                <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-white"></div>
                <span className="text-slate-700 font-medium text-sm">Severo (7-8)</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/90 px-3 py-2 rounded-lg shadow border border-red-300">
                <div className="w-4 h-4 bg-red-700 rounded-full shadow-lg border-2 border-white"></div>
                <span className="text-slate-700 font-medium text-sm">Extremo (9-10)</span>
              </div>
            </CardContent>
          </Card>

          {/* Detalles del día seleccionado */}
          {selectedDayEntries.length > 0 && (
            <Card className="glass-card-dark">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-slate-800">
                  {selectedDay?.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {selectedDayEntries.map(entry => (
                    <div key={entry.id} className="bg-white/90 p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${getIntensityBadgeColor(entry.intensity)} flex items-center justify-center shadow text-white font-bold`}>
                          {entry.intensity}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{entry.time}</p>
                          <p className="text-slate-600 text-sm">{entry.duration}h de duración</p>
                        </div>
                      </div>
                      {entry.symptoms && entry.symptoms.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-200">
                          <p className="text-xs text-slate-600">
                            Síntomas: {entry.symptoms.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedDay && selectedDayEntries.length === 0 && (
            <Card className="glass-card-dark">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-slate-800">
                  {selectedDay.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-center py-6">
                  <p className="text-slate-600">No hay episodios registrados en esta fecha.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
