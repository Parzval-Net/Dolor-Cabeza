
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeadacheEntry } from '@/types/headache';
import { Calendar, Clock, Gauge, Brain } from 'lucide-react';

interface EpisodeBasicFieldsProps {
  formData: HeadacheEntry;
  onUpdate: (updates: Partial<HeadacheEntry>) => void;
}

const EpisodeBasicFields = ({ formData, onUpdate }: EpisodeBasicFieldsProps) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-violet-200/60 shadow-sm p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-5 flex items-center gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
        Información Básica
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 sm:space-y-3">
          <Label htmlFor="date" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-violet-600" />
            Fecha
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => onUpdate({ date: e.target.value })}
            className="h-12 sm:h-10 border-2 border-violet-200 focus:border-violet-500 bg-white rounded-xl text-base sm:text-sm font-medium transition-colors mobile-input safari-form-button"
          />
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <Label htmlFor="time" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Clock className="h-4 w-4 text-violet-600" />
            Hora
          </Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => onUpdate({ time: e.target.value })}
            className="h-12 sm:h-10 border-2 border-violet-200 focus:border-violet-500 bg-white rounded-xl text-base sm:text-sm font-medium transition-colors mobile-input safari-form-button"
          />
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <Label htmlFor="intensity" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-violet-600" />
            Intensidad (1-10)
          </Label>
          <Input
            id="intensity"
            type="number"
            min="1"
            max="10"
            value={formData.intensity}
            onChange={(e) => onUpdate({ intensity: Number(e.target.value) })}
            className="h-12 sm:h-10 border-2 border-violet-200 focus:border-violet-500 bg-white rounded-xl text-base sm:text-sm font-medium transition-colors mobile-input safari-form-button"
          />
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <Label htmlFor="stressLevel" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Brain className="h-4 w-4 text-violet-600" />
            Nivel de Estrés (1-5)
          </Label>
          <Input
            id="stressLevel"
            type="number"
            min="1"
            max="5"
            value={formData.stressLevel}
            onChange={(e) => onUpdate({ stressLevel: Number(e.target.value) })}
            className="h-12 sm:h-10 border-2 border-violet-200 focus:border-violet-500 bg-white rounded-xl text-base sm:text-sm font-medium transition-colors mobile-input safari-form-button"
          />
        </div>
      </div>
    </div>
  );
};

export default EpisodeBasicFields;
