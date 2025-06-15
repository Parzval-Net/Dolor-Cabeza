
import { Home, Calendar, TrendingUp, List, Settings } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: 'dashboard' | 'calendar' | 'trends' | 'episodes' | 'admin';
  onViewChange: (view: 'dashboard' | 'calendar' | 'trends' | 'episodes' | 'admin') => void;
}

const MobileBottomNav = ({ currentView, onViewChange }: MobileBottomNavProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: Home },
    { id: 'episodes', label: 'Lista', icon: List },
    { id: 'calendar', label: 'Fechas', icon: Calendar },
    { id: 'trends', label: 'Gráficos', icon: TrendingUp },
    { id: 'admin', label: 'Ajustes', icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-xl border-t border-violet-100 shadow-lg z-50 safe-area-pb">
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-0 flex-1 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-t from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                  : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
              }`}
            >
              <IconComponent className={`w-4 h-4 mb-1 ${isActive ? 'drop-shadow-sm' : ''}`} />
              <span className={`text-xs font-medium truncate ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
