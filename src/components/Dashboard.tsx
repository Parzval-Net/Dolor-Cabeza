
import { Calendar, Clock, Pill, Activity, Brain, TrendingUp, Sparkles } from 'lucide-react';
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

  const getIntensityGradient = (intensity: number) => {
    if (intensity <= 3) return 'from-emerald-400 to-emerald-500';
    if (intensity <= 6) return 'from-yellow-400 to-orange-400';
    if (intensity <= 8) return 'from-orange-400 to-red-400';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center space-x-3 glass-card rounded-full px-6 py-3 mb-4">
          <Sparkles className="w-5 h-5 text-violet-500" />
          <span className="text-sm font-medium text-slate-600">Panel de Bienestar</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
          Tu salud en perspectiva
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Conoce mejor tus patrones de dolor y toma decisiones informadas para tu bienestar
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Episodes Count */}
        <Card className="glass-card-dark glow-effect group hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Episodios</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-xl group-hover:shadow-violet-500/30 transition-all duration-300">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-slate-800">{monthlyEntries.length}</div>
            <p className="text-sm text-slate-600">este mes</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full" style={{width: `${Math.min(monthlyEntries.length * 10, 100)}%`}}></div>
            </div>
          </CardContent>
        </Card>

        {/* Average Intensity */}
        <Card className="glass-card-dark glow-effect group hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Intensidad</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/25 group-hover:shadow-xl group-hover:shadow-fuchsia-500/30 transition-all duration-300">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-slate-800">{averageIntensity.toFixed(1)}</div>
            <p className="text-sm text-slate-600">promedio de 10</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className={`bg-gradient-to-r ${getIntensityGradient(averageIntensity)} h-2 rounded-full`} style={{width: `${averageIntensity * 10}%`}}></div>
            </div>
          </CardContent>
        </Card>

        {/* Total Duration */}
        <Card className="glass-card-dark glow-effect group hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Duración</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-xl group-hover:shadow-cyan-500/30 transition-all duration-300">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-slate-800">{totalDuration}h</div>
            <p className="text-sm text-slate-600">total este mes</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{width: `${Math.min(totalDuration * 2, 100)}%`}}></div>
            </div>
          </CardContent>
        </Card>

        {/* Top Medication */}
        <Card className="glass-card-dark glow-effect group hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Medicamento</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300">
              <Pill className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm font-bold text-slate-800 truncate">{topMedication}</div>
            <p className="text-sm text-slate-600">más utilizado</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Episodes */}
        <Card className="glass-card-dark overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100/50">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              Episodios Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {recentEntries.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto">
                  <Calendar className="h-10 w-10 text-violet-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 font-medium">No hay registros aún</p>
                  <p className="text-sm text-slate-400">Comienza registrando tu primer episodio</p>
                </div>
              </div>
            ) : (
              recentEntries.map((entry, index) => (
                <div key={entry.id} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getIntensityGradient(entry.intensity)} flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-sm">{entry.intensity}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800">
                          {new Date(entry.date).toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {entry.time} • {entry.duration}h duración
                        </p>
                      </div>
                    </div>
                    <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Top Triggers */}
        <Card className="glass-card-dark overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-fuchsia-50 to-pink-50 border-b border-fuchsia-100/50">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              Principales Desencadenantes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {topTriggers.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto">
                  <TrendingUp className="h-10 w-10 text-fuchsia-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 font-medium">Datos insuficientes</p>
                  <p className="text-sm text-slate-400">Registra más episodios para ver patrones</p>
                </div>
              </div>
            ) : (
              topTriggers.map(([trigger, count], index) => (
                <div key={trigger} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                        index === 0 ? 'bg-gradient-to-br from-violet-500 to-purple-500' : 
                        index === 1 ? 'bg-gradient-to-br from-fuchsia-500 to-pink-500' : 
                        'bg-gradient-to-br from-cyan-500 to-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-800">{trigger}</span>
                        <p className="text-sm text-slate-500">{count} veces este mes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-16 bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${
                          index === 0 ? 'bg-gradient-to-r from-violet-500 to-purple-500' : 
                          index === 1 ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500' : 
                          'bg-gradient-to-r from-cyan-500 to-blue-500'
                        }`} style={{width: `${(count / Math.max(...topTriggers.map(([,c]) => c))) * 100}%`}}></div>
                      </div>
                    </div>
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
