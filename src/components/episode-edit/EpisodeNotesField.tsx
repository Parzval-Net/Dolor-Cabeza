
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EpisodeNotesFieldProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

const EpisodeNotesField = ({ notes, onNotesChange }: EpisodeNotesFieldProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="notes" className="text-sm font-bold text-slate-800">Notas adicionales</Label>
      <Textarea
        id="notes"
        value={notes || ''}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Escribe cualquier información adicional..."
        rows={3}
        className="mobile-input border-violet-200 focus:border-violet-500 resize-none bg-white/95"
      />
    </div>
  );
};

export default EpisodeNotesField;
