
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Activity, 
  Brain, 
  Zap, 
  Shield, 
  Star, 
  Moon, 
  Sun, 
  Sparkles, 
  Flame,
  Eye,
  Target,
  Plus,
  Calendar,
  TrendingUp,
  BarChart3,
  HeartHandshake,
  Stethoscope,
  Pill,
  Clock
} from 'lucide-react';

interface IconSelectorProps {
  selectedIcon: string;
  onIconSelect: (iconName: string) => void;
}

const IconSelector = ({ selectedIcon, onIconSelect }: IconSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const recommendedIcons = [
    { name: 'Heart', icon: Heart, label: 'Corazón' },
    { name: 'Activity', icon: Activity, label: 'Actividad' },
    { name: 'Brain', icon: Brain, label: 'Cerebro' },
    { name: 'Zap', icon: Zap, label: 'Energía' },
    { name: 'Shield', icon: Shield, label: 'Protección' },
    { name: 'Star', icon: Star, label: 'Estrella' },
    { name: 'Moon', icon: Moon, label: 'Luna' },
    { name: 'Sun', icon: Sun, label: 'Sol' },
    { name: 'Sparkles', icon: Sparkles, label: 'Destellos' },
    { name: 'Flame', icon: Flame, label: 'Llama' },
    { name: 'Eye', icon: Eye, label: 'Ojo' },
    { name: 'Target', icon: Target, label: 'Objetivo' },
    { name: 'Plus', icon: Plus, label: 'Plus' },
    { name: 'Calendar', icon: Calendar, label: 'Calendario' },
    { name: 'TrendingUp', icon: TrendingUp, label: 'Tendencia' },
    { name: 'BarChart3', icon: BarChart3, label: 'Gráfico' },
    { name: 'HeartHandshake', icon: HeartHandshake, label: 'Cuidado' },
    { name: 'Stethoscope', icon: Stethoscope, label: 'Salud' },
    { name: 'Pill', icon: Pill, label: 'Medicina' },
    { name: 'Clock', icon: Clock, label: 'Tiempo' },
  ];

  const SelectedIconComponent = recommendedIcons.find(icon => icon.name === selectedIcon)?.icon || Heart;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
          <SelectedIconComponent className="w-6 h-6 text-white" />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-800 font-semibold border-slate-400 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300"
        >
          {isOpen ? 'Ocultar iconos' : 'Seleccionar icono'}
        </Button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-5 gap-3 p-4 bg-white rounded-lg border border-slate-300 shadow-sm">
          {recommendedIcons.map((iconItem) => {
            const IconComponent = iconItem.icon;
            const isSelected = selectedIcon === iconItem.name;
            
            return (
              <button
                key={iconItem.name}
                type="button"
                onClick={() => {
                  onIconSelect(iconItem.name);
                  setIsOpen(false);
                }}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-violet-100 hover:text-violet-700'
                }`}
                title={iconItem.label}
              >
                <IconComponent className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IconSelector;
