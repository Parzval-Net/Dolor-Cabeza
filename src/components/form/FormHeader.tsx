
import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
  onCancel: () => void;
}

const FormHeader = ({ currentStep, totalSteps, onCancel }: FormHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between border-b border-rose-100 pb-6 bg-white/70 rounded-t-[1rem]">
      <div>
        <CardTitle className="text-3xl font-extrabold text-rose-600 font-playfair flex items-center">
          Registro dolor de cabeza
          <Sparkles className="ml-2 text-coral-300 h-7 w-7 animate-gentle-bounce" />
        </CardTitle>
        <p className="text-lg text-lavender-700 mt-1 italic">
          Paso {currentStep} de {totalSteps}
        </p>
      </div>
      <Button variant="ghost" size="icon" onClick={onCancel} className="h-10 w-10 bg-transparent hover:bg-rose-100">
        <X className="h-7 w-7 text-rose-300" />
      </Button>
    </CardHeader>
  );
};

export default FormHeader;
