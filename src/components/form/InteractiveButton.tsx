
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
  const baseClasses = "text-sm font-medium rounded-2xl transition-all duration-300 border-2 px-4 py-3 relative overflow-hidden group safari-interactive-button";
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return isSelected 
          ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white border-violet-300 shadow-lg shadow-violet-500/25' 
          : 'bg-white/80 text-violet-700 border-violet-200 hover:border-violet-300 hover:bg-violet-50 hover:shadow-lg hover:shadow-violet-500/10';
      case 'accent':
        return isSelected 
          ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white border-fuchsia-300 shadow-lg shadow-fuchsia-500/25' 
          : 'bg-white/80 text-fuchsia-600 border-fuchsia-200 hover:border-fuchsia-300 hover:bg-fuchsia-50 hover:shadow-lg hover:shadow-fuchsia-500/10';
      default:
        return isSelected 
          ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white border-violet-300 shadow-lg shadow-purple-500/25' 
          : 'bg-white/80 text-slate-700 border-slate-200 hover:border-violet-300 hover:bg-violet-50 hover:shadow-lg hover:shadow-violet-500/10';
    }
  };

  return (
    <Button
      type="button"
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      )}
      <span className="relative">{children}</span>
    </Button>
  );
};

export default InteractiveButton;
