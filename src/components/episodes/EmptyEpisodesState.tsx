
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const EmptyEpisodesState = () => {
  return (
    <Card className="glass-card-mobile border border-violet-200/50 shadow-lg">
      <CardContent className="p-8 sm:p-12 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-violet-500" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
          Sin episodios registrados
        </h3>
        <p className="text-sm sm:text-base text-slate-600">
          Comienza a registrar tus migrañas para hacer seguimiento de patrones y síntomas.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyEpisodesState;
