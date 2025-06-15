
import { Pill } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TopMedicationCardProps {
  medication: string;
}

const TopMedicationCard = ({ medication }: TopMedicationCardProps) => (
  <Card className="glass-card-dark glow-effect group hover:scale-105 transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <CardTitle className="text-sm font-semibold text-slate-700">Medicamento</CardTitle>
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300">
        <Pill className="h-6 w-6 text-white" />
      </div>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="text-sm font-bold text-slate-800 truncate">{medication}</div>
      <p className="text-sm text-slate-600">más utilizado</p>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full w-3/4"></div>
      </div>
    </CardContent>
  </Card>
);

export default TopMedicationCard;
