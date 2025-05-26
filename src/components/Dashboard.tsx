
import { Calendar, Clock, Pill, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeadacheEntry } from '@/types/headache';

interface DashboardProps {
  entries: HeadacheEntry[];
}

const Dashboard = ({ entries }: DashboardProps) => {
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  
  const monthlyEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === thisMonth && entryDate.getFullYear() === thisYear;
  });

  const averageIntensity = monthlyEntries.length > 0 
    ? monthlyEntries.reduce((sum, entry) => sum + entry.intensity, 0) / monthlyEntries.length
    : 0;

  const totalDuration = monthlyEntries.reduce((sum, entry) => sum + entry.duration, 0);

  const mostUsedMedication = monthlyEntries
    .flatMap(entry => entry.medications)
    .reduce((acc, med) => {
      acc[med] = (acc[med] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topMedication = Object.entries(mostUsedMedication)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Ninguno';

  const commonTriggers = monthlyEntries
    .flatMap(entry => entry.triggers)
    .reduce((acc, trigger) => {
      acc[trigger] = (acc[trigger] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topTriggers = Object.entries(commonTriggers)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Este Mes</CardTitle>
            <Calendar className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">{monthlyEntries.length}</div>
            <p className="text-xs text-gray-500 mt-1">episodios registrados</p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Intensidad Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {averageIntensity.toFixed(1)}/10
            </div>
            <p className="text-xs text-gray-500 mt-1">nivel de dolor</p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Duración Total</CardTitle>
            <Clock className="h-4 w-4 text-lavender-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-lavender-600">{totalDuration}h</div>
            <p className="text-xs text-gray-500 mt-1">horas con dolor</p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Medicamento Frecuente</CardTitle>
            <Pill className="h-4 w-4 text-coral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-coral-600 truncate">{topMedication}</div>
            <p className="text-xs text-gray-500 mt-1">más utilizado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Entries */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Episodios Recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentEntries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay registros aún</p>
            ) : (
              recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-rose-100/50">
                  <div className="flex items-center space-x-3">
                    <div className={`intensity-dot intensity-${entry.intensity}`}></div>
                    <div>
                      <p className="font-medium text-gray-700">
                        {new Date(entry.date).toLocaleDateString('es-ES', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-gray-500">{entry.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">Intensidad {entry.intensity}/10</p>
                    <p className="text-xs text-gray-500">{entry.duration}h duración</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Top Triggers */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Desencadenantes Principales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topTriggers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay datos suficientes</p>
            ) : (
              topTriggers.map(([trigger, count], index) => (
                <div key={trigger} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-rose-100/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      index === 0 ? 'bg-rose-400' : index === 1 ? 'bg-orange-400' : 'bg-yellow-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-700">{trigger}</span>
                  </div>
                  <span className="text-sm text-gray-500">{count} veces</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
