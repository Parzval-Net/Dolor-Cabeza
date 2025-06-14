
import React from 'react';
import { Button } from '@/components/ui/button';

interface InteractiveButtonProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const InteractiveButton = ({ 
  isSelected, 
  onClick, 
  children, 
  variant = 'primary',
  className = ''
}: InteractiveButtonProps) => {
  const getVariantClasses = () => {
    const baseClasses = "text-base font-semibold rounded-xl shadow hover:scale-105 transition-all border-2";
    
    switch (variant) {
      case 'secondary':
        return isSelected 
          ? 'bg-lavender-400/80 text-white border-lavender-500' 
          : 'bg-white text-lavender-700 border-lavender-200';
      case 'accent':
        return isSelected 
          ? 'bg-pink-400 text-white border-pink-300' 
          : 'bg-white text-pink-500 border-pink-200';
      default:
        return isSelected 
          ? 'bg-rose-400/90 text-white border-rose-400' 
          : 'bg-white text-rose-700 border-rose-200';
    }
  };

  return (
    <Button
      type="button"
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default InteractiveButton;
