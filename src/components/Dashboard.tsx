
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
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-lavender-600 bg-clip-text text-transparent mb-2">
          Tu bienestar en resumen
        </h2>
        <p className="text-gray-600">Monitorea y comprende tus patrones de dolor</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Este Mes</CardTitle>
            <div className="p-2 bg-rose-100 rounded-full">
              <Calendar className="h-5 w-5 text-rose-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-700 mb-1">{monthlyEntries.length}</div>
            <p className="text-xs text-gray-600">episodios registrados</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-lavender-50 border-purple-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Intensidad Promedio</CardTitle>
            <div className="p-2 bg-purple-100 rounded-full">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700 mb-1">
              {averageIntensity.toFixed(1)}/10
            </div>
            <p className="text-xs text-gray-600">nivel de dolor</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-coral-50 to-rose-50 border-coral-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Duración Total</CardTitle>
            <div className="p-2 bg-coral-100 rounded-full">
              <Clock className="h-5 w-5 text-coral-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-coral-700 mb-1">{totalDuration}h</div>
            <p className="text-xs text-gray-600">horas con dolor</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Medicamento Frecuente</CardTitle>
            <div className="p-2 bg-pink-100 rounded-full">
              <Pill className="h-5 w-5 text-pink-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-pink-700 truncate mb-1">{topMedication}</div>
            <p className="text-xs text-gray-600">más utilizado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Entries */}
        <Card className="bg-white/70 backdrop-blur-sm border-rose-200/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-t-lg border-b border-rose-100">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full"></div>
              Episodios Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {recentEntries.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-8 w-8 text-rose-400" />
                </div>
                <p className="text-gray-500">No hay registros aún</p>
                <p className="text-sm text-gray-400">Comienza registrando tu primer episodio</p>
              </div>
            ) : (
              recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-rose-50/50 rounded-xl border border-rose-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      entry.intensity <= 3 ? 'bg-green-400' :
                      entry.intensity <= 6 ? 'bg-rose-300' :
                      entry.intensity <= 8 ? 'bg-rose-400' : 'bg-rose-600'
                    } shadow-sm`}></div>
                    <div>
                      <p className="font-semibold text-gray-800">
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
                    <p className="text-sm font-semibold text-gray-800">Intensidad {entry.intensity}/10</p>
                    <p className="text-xs text-gray-500">{entry.duration}h duración</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Top Triggers */}
        <Card className="bg-white/70 backdrop-blur-sm border-purple-200/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-lavender-50 rounded-t-lg border-b border-purple-100">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-lavender-500 rounded-full"></div>
              Desencadenantes Principales
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {topTriggers.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingDown className="h-8 w-8 text-purple-400" />
                </div>
                <p className="text-gray-500">No hay datos suficientes</p>
                <p className="text-sm text-gray-400">Registra más episodios para ver patrones</p>
              </div>
            ) : (
              topTriggers.map(([trigger, count], index) => (
                <div key={trigger} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-purple-50/50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${
                      index === 0 ? 'bg-gradient-to-r from-rose-400 to-pink-500' : 
                      index === 1 ? 'bg-gradient-to-r from-purple-400 to-lavender-500' : 
                      'bg-gradient-to-r from-coral-400 to-rose-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-semibold text-gray-800">{trigger}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-700">{count} veces</span>
                    <p className="text-xs text-gray-500">este mes</p>
                  </div>
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
