
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

  const { modifiers, modifiersClassNames, entriesByDate } = useMemo(() => {
    const entryDays: Record<string, number> = {};
    const newEntriesByDate: Record<string, HeadacheEntry[]> = {};

    // Procesar entradas y agrupar por fecha
    entries.forEach((entry) => {
      const date = entry.date;
      const intensity = entry.intensity;
      
      // Guardar la intensidad máxima por día
      if (!entryDays[date] || intensity > entryDays[date]) {
        entryDays[date] = intensity;
      }
      
      // Agrupar entradas por fecha
      if (!newEntriesByDate[date]) {
        newEntriesByDate[date] = [];
      }
      newEntriesByDate[date].push(entry);
    });

    // Crear arrays de fechas por nivel de intensidad
    const mild: Date[] = [];
    const moderate: Date[] = [];
    const severe: Date[] = [];
    const extreme: Date[] = [];

    Object.entries(entryDays).forEach(([date, intensity]) => {
      const [year, month, day] = date.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);

      if (intensity <= 3) {
        mild.push(dateObj);
      } else if (intensity <= 6) {
        moderate.push(dateObj);
      } else if (intensity <= 8) {
        severe.push(dateObj);
      } else {
        extreme.push(dateObj);
      }
    });

    console.log('Processed entry days:', entryDays);
    console.log('Calendar modifiers:', { mild, moderate, severe, extreme });

    return {
      modifiers: {
        mild,
        moderate,
        severe,
        extreme,
      },
      modifiersClassNames: {
        mild: 'intensity-mild',
        moderate: 'intensity-moderate',
        severe: 'intensity-severe',
        extreme: 'intensity-extreme',
      },
      entriesByDate: newEntriesByDate,
    };
  }, [entries]);

  const handleDayClick = (day: Date | undefined, modifiers?: DayModifiers) => {
    console.log('Day clicked:', day, 'Modifiers:', modifiers);
    if (day) {
      setSelectedDay(day);
    }
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

  return (
    <div className="w-full max-w-none animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendario */}
        <div className="lg:col-span-2">
          <Card className="glass-card-dark h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-slate-800">
                Calendario de Migrañas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-slate-800 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-600 w-full">
                <Calendar
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                  className="w-full calendar-with-intensity mx-auto"
                  numberOfMonths={1}
                  onDayClick={handleDayClick}
                  selected={selectedDay}
                  mode="single"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="lg:col-span-1 space-y-4">
          {/* Leyenda */}
          <Card className="glass-card-dark">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-slate-800">
                Leyenda de Intensidad
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3 bg-white/80 px-3 py-2 rounded-lg shadow border border-emerald-200">
                <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg"></div>
                <span className="text-slate-700 font-medium text-sm">Leve (1-3)</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 px-3 py-2 rounded-lg shadow border border-orange-200">
                <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg"></div>
                <span className="text-slate-700 font-medium text-sm">Moderado (4-6)</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 px-3 py-2 rounded-lg shadow border border-red-200">
                <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                <span className="text-slate-700 font-medium text-sm">Severo (7-8)</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 px-3 py-2 rounded-lg shadow border border-red-300">
                <div className="w-4 h-4 bg-red-700 rounded-full shadow-lg"></div>
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
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getIntensityColor(entry.intensity)} flex items-center justify-center shadow text-white font-bold`}>
                          {entry.intensity}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{entry.time}</p>
                          <p className="text-slate-600 text-sm">{entry.duration}h</p>
                        </div>
                      </div>
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
                  <p className="text-slate-600">No hay episodios registrados.</p>
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
