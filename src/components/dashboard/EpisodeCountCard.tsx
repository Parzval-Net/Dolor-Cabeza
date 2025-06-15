
import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface EpisodeCountCardProps {
  count: number;
}

const EpisodeCountCard = ({ count }: EpisodeCountCardProps) => (
  <Card className="glass-card-dark glow-effect group hover:scale-105 transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <CardTitle className="text-sm font-semibold text-slate-700">Episodios</CardTitle>
      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-xl group-hover:shadow-violet-500/30 transition-all duration-300">
        <Calendar className="h-6 w-6 text-white" />
      </div>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="text-3xl font-bold text-slate-800">{count}</div>
      <p className="text-sm text-slate-600">este mes</p>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full" style={{width: `${Math.min(count * 10, 100)}%`}}></div>
      </div>
    </CardContent>
  </Card>
);

export default EpisodeCountCard;
