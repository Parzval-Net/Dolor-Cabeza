
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface EpisodeNotesFieldProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

const EpisodeNotesField = ({ notes, onNotesChange }: EpisodeNotesFieldProps) => {
  return (
    <div className="bg-white rounded-2xl border border-violet-200/60 shadow-sm p-6">
      <Label htmlFor="notes" className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
          <FileText className="h-4 w-4 text-white" />
        </div>
        Notas Adicionales
      </Label>
      <Textarea
        id="notes"
        value={notes || ''}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Escribe cualquier información adicional sobre este episodio..."
        rows={4}
        className="w-full border-2 border-violet-200 focus:border-violet-500 resize-none bg-white rounded-xl text-base p-4 transition-colors placeholder:text-slate-400"
      />
    </div>
  );
};

export default EpisodeNotesField;
