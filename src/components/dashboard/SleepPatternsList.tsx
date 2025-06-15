
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Moon, Sun } from 'lucide-react';

interface SleepPatternsListProps {
  entries: any[];
}

const SleepPatternsList = ({ entries }: SleepPatternsListProps) => {
  // Calcular estadísticas de sueño
  const sleepData = entries
    .filter(entry => entry.sleep !== undefined && entry.sleep !== null)
    .map(entry => ({ sleep: entry.sleep, date: entry.date }));

  const averageSleep = sleepData.length > 0 
    ? sleepData.reduce((sum, item) => sum + item.sleep, 0) / sleepData.length
    : 0;

  const sleepRanges = {
    'Menos de 6h': sleepData.filter(item => item.sleep < 6).length,
    '6-8 horas': sleepData.filter(item => item.sleep >= 6 && item.sleep <= 8).length,
    'Más de 8h': sleepData.filter(item => item.sleep > 8).length,
  };

  const getSleepQualityColor = (hours: number) => {
    if (hours < 6) return 'from-red-500 to-rose-500';
    if (hours >= 6 && hours <= 8) return 'from-green-500 to-emerald-500';
    return 'from-blue-500 to-indigo-500';
  };

  return (
    <Card className="glass-card-dark overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100/50">
        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Moon className="h-4 w-4 text-white" />
          </div>
          Patrones de Descanso
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {sleepData.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto">
              <Moon className="h-10 w-10 text-indigo-400" />
            </div>
            <div className="space-y-2">
              <p className="text-slate-600 font-medium">Sin datos de sueño registrados</p>
              <p className="text-sm text-slate-400">Registra más episodios para ver patrones</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Promedio de sueño */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-br ${getSleepQualityColor(averageSleep)}`}>
                    <Sun className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-800">Promedio de sueño</span>
                    <p className="text-sm text-slate-500">{averageSleep.toFixed(1)} horas por noche</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribución de rangos de sueño */}
            {Object.entries(sleepRanges).map(([range, count], index) => (
              count > 0 && (
                <div key={range} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                        index === 0 ? 'bg-gradient-to-br from-red-500 to-rose-500' : 
                        index === 1 ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 
                        'bg-gradient-to-br from-blue-500 to-indigo-500'
                      }`}>
                        {count}
                      </div>
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-800">{range}</span>
                        <p className="text-sm text-slate-500">{count} episodios este mes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-16 bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${
                          index === 0 ? 'bg-gradient-to-r from-red-500 to-rose-500' : 
                          index === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                          'bg-gradient-to-r from-blue-500 to-indigo-500'
                        }`} style={{width: `${(count / Math.max(...Object.values(sleepRanges))) * 100}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SleepPatternsList;
