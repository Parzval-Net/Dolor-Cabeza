
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface WeeklyPatternsListProps {
  entries: any[];
}

const WeeklyPatternsList = ({ entries }: WeeklyPatternsListProps) => {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  // Contar episodios por día de la semana
  const weeklyData = entries.reduce((acc, entry) => {
    const date = new Date(entry.date);
    const dayOfWeek = date.getDay(); // 0 = domingo, 1 = lunes, etc.
    acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const maxCount = Math.max(...Object.values(weeklyData), 1);

  const getDayColor = (count: number) => {
    const percentage = count / maxCount;
    if (percentage > 0.7) return 'from-red-500 to-rose-500';
    if (percentage > 0.4) return 'from-orange-500 to-amber-500';
    if (percentage > 0.2) return 'from-yellow-500 to-orange-400';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <Card className="glass-card-dark overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          Actividad por Día de Semana
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto">
              <Calendar className="h-10 w-10 text-blue-400" />
            </div>
            <div className="space-y-2">
              <p className="text-slate-600 font-medium">Sin episodios registrados</p>
              <p className="text-sm text-slate-400">Registra más episodios para ver patrones</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {daysOfWeek.map((day, index) => {
              const count = weeklyData[index] || 0;
              const percentage = count > 0 ? (count / maxCount) * 100 : 0;
              
              return (
                <div key={day} className="glass-card rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-br ${getDayColor(count)}`}>
                        {count}
                      </div>
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-800">{day}</span>
                        <p className="text-sm text-slate-500">
                          {count === 0 ? 'Sin episodios' : 
                           count === 1 ? '1 episodio' : 
                           `${count} episodios`} este mes
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-20 bg-slate-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${getDayColor(count)} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-400 mt-1">
                        {percentage > 0 ? `${Math.round(percentage)}%` : '0%'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyPatternsList;
