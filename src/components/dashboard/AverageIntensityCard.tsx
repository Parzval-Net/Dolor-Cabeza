
import { Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AverageIntensityCardProps {
  averageIntensity: number;
}

const getIntensityGradient = (intensity: number) => {
  // Usamos solo gradientes violeta-rosas, eliminando los naranjas/amarillos
  if (intensity <= 3) return 'from-violet-400 to-purple-500';
  if (intensity <= 6) return 'from-fuchsia-400 to-pink-400';
  if (intensity <= 8) return 'from-rose-400 to-pink-500';
  return 'from-purple-700 to-fuchsia-700';
};

const AverageIntensityCard = ({ averageIntensity }: AverageIntensityCardProps) => (
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
        <div
          className={`bg-gradient-to-r ${getIntensityGradient(averageIntensity)} h-2 rounded-full`}
          style={{ width: `${averageIntensity * 10}%` }}
        ></div>
      </div>
    </CardContent>
  </Card>
);

export default AverageIntensityCard;
