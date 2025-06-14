
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
  <div className={`space-y-8 ${bgColor}`}>
    {/* Header Section */}
    <div className="text-center space-y-4">
      <div className="relative inline-flex flex-col items-center">
        <div className="relative">
          {icon}
          {sparkle && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">✨</span>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-2xl font-bold text-slate-800">
            {title}
          </h3>
          <p className="text-slate-600 max-w-md">{subtitle}</p>
        </div>
      </div>
    </div>
    
    {/* Content Card */}
    <div className="glass-card-dark rounded-3xl p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100/20 to-purple-100/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-fuchsia-100/20 to-pink-100/20 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative">
        {children}
      </div>
    </div>
  </div>
);

export default StepCard;
