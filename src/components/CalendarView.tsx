
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { HeadacheEntry } from '@/types/headache';
import { DayModifiers } from 'react-day-picker';
import { Clock } from 'lucide-react';

interface CalendarViewProps {
  entries: HeadacheEntry[];
}

const CalendarView = ({ entries }: CalendarViewProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  const { modifiers, modifiersClassNames, entriesByDate } = useMemo(() => {
    const entryDays: Record<string, number> = {};
    const newEntriesByDate: Record<string, HeadacheEntry[]> = {};

    entries.forEach((entry) => {
      const date = entry.date;
      const intensity = entry.intensity;
      
      if (!entryDays[date] || intensity > entryDays[date]) {
        entryDays[date] = intensity;
      }
      if (!newEntriesByDate[date]) {
        newEntriesByDate[date] = [];
      }
      newEntriesByDate[date].push(entry);
    });

    const newModifiers = Object.entries(entryDays).reduce((acc, [date, intensity]) => {
      const parts = date.split('-').map(Number);
      const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);

      if (intensity <= 3) {
        if (!acc.level1) acc.level1 = [];
        acc.level1.push(dateObj);
      } else if (intensity <= 6) {
        if (!acc.level2) acc.level2 = [];
        acc.level2.push(dateObj);
      } else if (intensity <= 8) {
        if (!acc.level3) acc.level3 = [];
        acc.level3.push(dateObj);
      } else {
        if (!acc.level4) acc.level4 = [];
        acc.level4.push(dateObj);
      }
      return acc;
    }, {} as Record<string, Date[]>);

    return {
      modifiers: newModifiers,
      modifiersClassNames: {
        level1: 'intensity-level-1',
        level2: 'intensity-level-2',
        level3: 'intensity-level-3',
        level4: 'intensity-level-4',
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
    return date.toISOString().split('T')[0];
  };

  const selectedDayEntries = selectedDay ? entriesByDate[formatDate(selectedDay)] || [] : [];
  console.log('Selected day entries:', selectedDayEntries);

  const getIntensityGradient = (intensity: number) => {
    if (intensity <= 3) return 'from-emerald-400 to-emerald-500';
    if (intensity <= 6) return 'from-orange-400 to-orange-500';
    if (intensity <= 8) return 'from-red-400 to-red-500';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="glass-card-dark">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-800">
            Calendario de Migrañas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {/* Calendario más compacto */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-200 w-full max-w-2xl mx-auto">
            <Calendar
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              className="w-full calendar-compact"
              numberOfMonths={1}
              onDayClick={handleDayClick}
              selected={selectedDay}
              mode="single"
            />
          </div>
          
          {/* Leyenda más compacta */}
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
            <div className="flex items-center space-x-2 bg-white/80 px-3 py-2 rounded-lg shadow border border-emerald-200">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-slate-700 font-medium">Leve (1-3)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-3 py-2 rounded-lg shadow border border-orange-200">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-slate-700 font-medium">Moderado (4-6)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-3 py-2 rounded-lg shadow border border-red-200">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-slate-700 font-medium">Severo (7-8)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-3 py-2 rounded-lg shadow border border-red-300">
              <div className="w-3 h-3 bg-red-700 rounded-full"></div>
              <span className="text-slate-700 font-medium">Extremo (9-10)</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {selectedDayEntries.length > 0 && (
        <Card className="glass-card-dark">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-800">
              Detalles del {selectedDay?.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {selectedDayEntries.map(entry => (
                <div key={entry.id} className="bg-white/90 p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getIntensityGradient(entry.intensity)} flex items-center justify-center shadow text-white font-bold`}>
                      {entry.intensity}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">Episodio a las {entry.time}</p>
                      <p className="text-slate-600 text-sm">{entry.duration}h de duración</p>
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
              <p className="text-slate-600">No hay episodios registrados en esta fecha.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CalendarView;
