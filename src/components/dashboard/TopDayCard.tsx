
import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HeadacheEntry } from '@/types/headache';

interface TopDayCardProps {
  entries: HeadacheEntry[];
}

const TopDayCard = ({ entries }: TopDayCardProps) => {
  const getDayWithMostEpisodes = () => {
    const dayCount: Record<string, number> = {};
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    entries.forEach(entry => {
      const date = new Date(entry.date);
      const dayIndex = date.getDay();
      const dayName = dayNames[dayIndex];
      dayCount[dayName] = (dayCount[dayName] || 0) + 1;
    });

    if (Object.keys(dayCount).length === 0) {
      return { day: 'Ninguno', count: 0 };
    }

    const topDay = Object.entries(dayCount).reduce((a, b) => 
      dayCount[a[0]] > dayCount[b[0]] ? a : b
    );

    return { day: topDay[0], count: topDay[1] };
  };

  const { day, count } = getDayWithMostEpisodes();

  return (
    <Card className="glass-card-dark glow-effect group hover:scale-105 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-700">Día Crítico</CardTitle>
        <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/25 group-hover:shadow-xl group-hover:shadow-rose-500/30 transition-all duration-300">
          <Calendar className="h-6 w-6 text-white" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm font-bold text-slate-800">{day}</div>
        <p className="text-sm text-slate-600">{count} episodio{count !== 1 ? 's' : ''}</p>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full" 
            style={{width: `${Math.min(count * 20, 100)}%`}}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopDayCard;
