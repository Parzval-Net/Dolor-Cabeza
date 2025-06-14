
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save, Sparkles } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const FormNavigation = ({ currentStep, totalSteps, onPrevious, onNext, onSubmit }: FormNavigationProps) => {
  return (
    <div className="flex justify-between items-center pt-8 border-t border-violet-100">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all duration-300"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>
      
      {currentStep === totalSteps ? (
        <Button
          onClick={onSubmit}
          className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 rounded-2xl transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <Save className="h-4 w-4" />
          <span className="font-semibold">Guardar Registro</span>
          <Sparkles className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 rounded-2xl transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span className="font-medium">Siguiente</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
