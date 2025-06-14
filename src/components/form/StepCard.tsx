
import React from 'react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  bgColor?: string;
  sparkle?: boolean;
}

const StepCard = ({ icon, title, subtitle, children, bgColor = '', sparkle = false }: StepCardProps) => (
  <div className={`space-y-6 ${bgColor}`}>
    <div className="text-center">
      <div className="flex flex-col items-center justify-center mb-4">
        {icon}
        <h3 className="text-2xl font-bold text-gray-800 mb-1">
          {title}
        </h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
      {children}
    </div>
  </div>
);

export default StepCard;
