
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
    <CardHeader className="relative overflow-hidden bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 border-b border-violet-100/50 rounded-t-2xl">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100/30 to-purple-100/30 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-fuchsia-100/30 to-pink-100/30 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative flex flex-row items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 floating-animation">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            Nuevo Registro
          </CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 font-medium">
              Paso {currentStep} de {totalSteps}
            </span>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <span className="text-sm text-violet-600 font-medium">
              Cuidando tu bienestar
            </span>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onCancel} 
          className="h-10 w-10 text-slate-400 hover:text-slate-600 hover:bg-white/60 rounded-xl transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default FormHeader;
