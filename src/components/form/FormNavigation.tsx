
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const FormNavigation = ({ currentStep, totalSteps, onPrevious, onNext, onSubmit }: FormNavigationProps) => {
  return (
    <div className="flex justify-between pt-6 border-t border-pink-100">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center gap-2 px-6 py-2 border-pink-200 text-pink-700 hover:bg-pink-50 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>
      {currentStep === totalSteps ? (
        <Button
          onClick={onSubmit}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg"
        >
          <Save className="h-4 w-4" />
          Guardar Registro
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
