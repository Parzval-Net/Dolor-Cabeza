
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface TopTriggersListProps {
  topTriggers: [string, number][];
}

const TopTriggersList = ({ topTriggers }: TopTriggersListProps) => (
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
);

export default TopTriggersList;
