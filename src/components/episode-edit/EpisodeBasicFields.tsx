
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeadacheEntry } from '@/types/headache';

interface EpisodeBasicFieldsProps {
  formData: HeadacheEntry;
  onUpdate: (updates: Partial<HeadacheEntry>) => void;
}

const EpisodeBasicFields = ({ formData, onUpdate }: EpisodeBasicFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      <div className="space-y-2">
        <Label htmlFor="date" className="text-sm font-bold text-slate-800">Fecha</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => onUpdate({ date: e.target.value })}
          className="mobile-input border-violet-200 focus:border-violet-500 bg-white/95"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="time" className="text-sm font-bold text-slate-800">Hora</Label>
        <Input
          id="time"
          type="time"
          value={formData.time}
          onChange={(e) => onUpdate({ time: e.target.value })}
          className="mobile-input border-violet-200 focus:border-violet-500 bg-white/95"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="intensity" className="text-sm font-bold text-slate-800">Intensidad (1-10)</Label>
        <Input
          id="intensity"
          type="number"
          min="1"
          max="10"
          value={formData.intensity}
          onChange={(e) => onUpdate({ intensity: Number(e.target.value) })}
          className="mobile-input border-violet-200 focus:border-violet-500 bg-white/95"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="stressLevel" className="text-sm font-bold text-slate-800">Nivel de Estrés (1-5)</Label>
        <Input
          id="stressLevel"
          type="number"
          min="1"
          max="5"
          value={formData.stressLevel}
          onChange={(e) => onUpdate({ stressLevel: Number(e.target.value) })}
          className="mobile-input border-violet-200 focus:border-violet-500 bg-white/95"
        />
      </div>
    </div>
  );
};

export default EpisodeBasicFields;
