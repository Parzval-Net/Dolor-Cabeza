
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
  const baseClasses = "text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border-2 px-3 py-2";
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return isSelected 
          ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white border-purple-300 shadow-md' 
          : 'bg-white text-purple-700 border-purple-200 hover:border-purple-300 hover:bg-purple-50';
      case 'accent':
        return isSelected 
          ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white border-rose-300 shadow-md' 
          : 'bg-white text-rose-600 border-rose-200 hover:border-rose-300 hover:bg-rose-50';
      default:
        return isSelected 
          ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white border-pink-300 shadow-md' 
          : 'bg-white text-pink-700 border-pink-200 hover:border-pink-300 hover:bg-pink-50';
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
