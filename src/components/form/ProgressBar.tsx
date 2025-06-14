
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const steps = [
    'Información básica',
    'Intensidad',
    'Síntomas',
    'Tratamiento',
    'Contexto'
  ];

  return (
    <div className="w-full space-y-4">
      {/* Step Labels */}
      <div className="hidden sm:flex justify-between text-xs">
        {steps.map((step, index) => (
          <span 
            key={step}
            className={`font-medium transition-colors duration-300 ${
              index + 1 <= currentStep 
                ? 'text-violet-600' 
                : index + 1 === currentStep + 1 
                  ? 'text-slate-500' 
                  : 'text-slate-400'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
      
      {/* Progress Track */}
      <div className="relative">
        <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 h-3 rounded-full transition-all duration-700 ease-out shadow-lg shadow-purple-500/25 relative overflow-hidden"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
        
        {/* Step indicators */}
        <div className="absolute inset-0 flex justify-between items-center px-1">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                i + 1 <= currentStep
                  ? 'bg-white border-violet-500 shadow-lg shadow-violet-500/25'
                  : i + 1 === currentStep + 1
                    ? 'bg-slate-100 border-slate-300'
                    : 'bg-slate-200 border-slate-300'
              }`}
            >
              {i + 1 <= currentStep && (
                <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-500 rounded-full scale-50"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
