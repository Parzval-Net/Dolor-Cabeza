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
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-card-dark">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Calendario de Migrañas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="bg-slate-50/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200 w-full max-w-3xl">
            <Calendar
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              className="p-0 w-full calendar-dark-text"
              numberOfMonths={1}
              onDayClick={handleDayClick}
              selected={selectedDay}
              mode="single"
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-white/30">
              <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg"></div>
              <span className="text-slate-800 font-semibold">Leve (1-3)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-white/30">
              <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg"></div>
              <span className="text-slate-800 font-semibold">Moderado (4-6)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-white/30">
              <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
              <span className="text-slate-800 font-semibold">Severo (7-8)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-white/30">
              <div className="w-4 h-4 bg-red-700 rounded-full shadow-lg"></div>
              <span className="text-slate-800 font-semibold">Extremo (9-10)</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {selectedDayEntries.length > 0 && (
        <Card className="glass-card-dark">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">
              Detalles del {selectedDay?.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDayEntries.map(entry => (
                <div key={entry.id} className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/40 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getIntensityGradient(entry.intensity)} flex items-center justify-center shadow-xl text-white font-bold text-lg`}>
                      {entry.intensity}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-lg">Episodio a las {entry.time}</p>
                      <p className="text-slate-700 font-medium">{entry.duration}h de duración</p>
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
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">
              {selectedDay.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-lg text-slate-700 font-medium">No hay episodios registrados en esta fecha.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CalendarView;
