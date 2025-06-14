
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full bg-lavender-100 rounded-full h-3 mb-6 shadow">
      <div 
        className="bg-gradient-to-r from-rose-300 via-coral-300 to-lavender-400 h-3 rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
