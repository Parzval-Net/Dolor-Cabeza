
import React from 'react';
import { Sparkles } from 'lucide-react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  bgColor?: string;
  sparkle?: boolean;
}

const StepCard = ({ icon, title, subtitle, children, bgColor = '', sparkle = false }: StepCardProps) => (
  <div className={`space-y-8 ${bgColor}`}>
    <div className="text-center relative">
      {sparkle && (
        <Sparkles className="absolute left-[13%] -top-3 text-lavender-200 animate-gentle-bounce" size={32} />
      )}
      <div className="flex flex-col items-center justify-center">
        {icon}
        <h3 className="text-3xl font-extrabold text-rose-500 font-playfair mb-2 drop-shadow">
          {title}
        </h3>
        <p className="text-lg text-lavender-900 font-medium">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

export default StepCard;
