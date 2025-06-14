
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { HeadacheEntry } from '@/types/headache';

interface CalendarViewProps {
  entries: HeadacheEntry[];
}

const CalendarView = ({ entries }: CalendarViewProps) => {
  const { modifiers, modifiersClassNames } = useMemo(() => {
    const entryDays = entries.reduce((acc, entry) => {
      const date = entry.date;
      const intensity = entry.intensity;
      if (!acc[date] || intensity > acc[date]) {
        acc[date] = intensity;
      }
      return acc;
    }, {} as Record<string, number>);

    const newModifiers = Object.entries(entryDays).reduce((acc, [date, intensity]) => {
      const dateObj = new Date(`${date}T00:00:00`);

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
    };
  }, [entries]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-card-dark">
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
            onSelect={() => {}} 
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
    </div>
  );
};

export default CalendarView;
