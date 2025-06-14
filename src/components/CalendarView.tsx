
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

  const handleDayClick = (day: Date, modifiers: DayModifiers) => {
    if (modifiers.level1 || modifiers.level2 || modifiers.level3 || modifiers.level4) {
      setSelectedDay(day);
    } else {
      setSelectedDay(undefined);
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDayEntries = selectedDay ? entriesByDate[formatDate(selectedDay)] || [] : [];

  const getIntensityGradient = (intensity: number) => {
    if (intensity <= 3) return 'from-emerald-400 to-emerald-500';
    if (intensity <= 6) return 'from-orange-400 to-orange-500';
    if (intensity <= 8) return 'from-red-400 to-red-500';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-card-dark md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">
            Calendario de Migrañas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Calendar
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="p-0"
            numberOfMonths={1}
            onDayClick={handleDayClick}
            selected={selectedDay}
          />
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <span>Leve (1-3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span>Moderado (4-6)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>Severo (7-8)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span>Extremo (9-10)</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card-dark">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">
            {selectedDay ? `Detalles del ${selectedDay.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}` : 'Detalles del día'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDayEntries.length > 0 ? (
            <div className="space-y-4">
              {selectedDayEntries.map(entry => (
                <div key={entry.id} className="glass-card p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getIntensityGradient(entry.intensity)} flex items-center justify-center shadow-lg text-white font-bold`}>
                      {entry.intensity}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-700">Episodio a las {entry.time}</p>
                      <p className="text-sm text-slate-500">{entry.duration}h de duración</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500">
              <p>Selecciona un día en el calendario para ver los detalles.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
