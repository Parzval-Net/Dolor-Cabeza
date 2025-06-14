
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const FormNavigation = ({ currentStep, totalSteps, onPrevious, onNext, onSubmit }: FormNavigationProps) => {
  return (
    <div className="flex justify-between pt-8 border-t border-rose-100">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="text-lg px-8 py-3 border-2 border-lavender-200 text-lavender-700 hover:bg-lavender-50 rounded-xl bg-white/90 font-semibold"
      >
        Anterior
      </Button>
      {currentStep === totalSteps ? (
        <Button
          onClick={onSubmit}
          className="text-lg px-8 py-3 bg-gradient-to-r from-coral-400 to-rose-400 hover:from-coral-500 hover:to-rose-500 text-white rounded-xl shadow-lg font-bold animate-gentle-bounce"
        >
          Guardar Registro
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="text-lg px-8 py-3 bg-gradient-to-r from-rose-400 to-lavender-400 hover:from-rose-500 hover:to-lavender-500 text-white rounded-xl shadow-lg font-semibold"
        >
          Siguiente
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
