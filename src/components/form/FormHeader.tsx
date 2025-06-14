
import React from 'react';
import { X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
  onCancel: () => void;
}

const FormHeader = ({ currentStep, totalSteps, onCancel }: FormHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between border-b border-pink-100 pb-6 bg-gradient-to-r from-pink-50/70 to-rose-50/70 backdrop-blur-sm rounded-t-[1rem]">
      <div>
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Heart className="h-6 w-6 text-pink-400" />
          Registro dolor de cabeza
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Paso {currentStep} de {totalSteps} • Cuida tu bienestar
        </p>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onCancel} 
        className="h-9 w-9 text-gray-400 hover:text-gray-600 hover:bg-pink-50"
      >
        <X className="h-5 w-5" />
      </Button>
    </CardHeader>
  );
};

export default FormHeader;
