
import { User } from 'lucide-react';

interface EpisodesHeaderProps {
  entryCount: number;
}

const EpisodesHeader = ({ entryCount }: EpisodesHeaderProps) => {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
        <User className="w-6 h-6 text-violet-600" />
        Historial de Episodios
      </h2>
      <p className="text-sm sm:text-base text-slate-600">
        {entryCount} episodio{entryCount !== 1 ? 's' : ''} registrado{entryCount !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default EpisodesHeader;
