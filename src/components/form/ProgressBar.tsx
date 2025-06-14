
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Información básica</span>
        <span>Intensidad</span>
        <span>Síntomas</span>
        <span>Tratamiento</span>
        <span>Contexto</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 shadow-inner">
        <div 
          className="bg-gradient-to-r from-pink-400 to-rose-400 h-2 rounded-full transition-all duration-700 ease-in-out shadow-sm"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
