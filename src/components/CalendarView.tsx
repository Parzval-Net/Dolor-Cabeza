
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeadacheEntry } from '@/types/headache';

interface CalendarViewProps {
  entries: HeadacheEntry[];
}

const CalendarView = ({ entries }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getEntriesForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return entries.filter(entry => entry.date === dateStr);
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'bg-green-400';
    if (intensity <= 6) return 'bg-yellow-400';
    if (intensity <= 8) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const days = getDaysInMonth();

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-700">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-16"></div>;
              }

              const dayEntries = getEntriesForDate(day);
              const hasEntries = dayEntries.length > 0;
              const maxIntensity = hasEntries ? Math.max(...dayEntries.map(e => e.intensity)) : 0;

              return (
                <div
                  key={day}
                  className={`
                    h-16 p-1 border border-rose-100 rounded-lg relative
                    ${hasEntries ? 'bg-white/80' : 'bg-white/40'}
                    hover:bg-white/90 transition-colors cursor-pointer
                  `}
                >
                  <div className="text-sm font-medium text-gray-700">{day}</div>
                  {hasEntries && (
                    <div className="absolute top-1 right-1 flex flex-col items-end space-y-1">
                      <div className={`w-3 h-3 rounded-full ${getIntensityColor(maxIntensity)}`}></div>
                      {dayEntries.length > 1 && (
                        <div className="text-xs text-gray-500 bg-white/80 rounded px-1">
                          +{dayEntries.length - 1}
                        </div>
                      )}
                    </div>
                  )}
                  {hasEntries && (
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="text-xs text-gray-600 truncate">
                        {dayEntries[0].medications[0] || 'Sin medicamento'}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Leve (1-3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>Moderado (4-6)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span>Severo (7-8)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>Extremo (9-10)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
