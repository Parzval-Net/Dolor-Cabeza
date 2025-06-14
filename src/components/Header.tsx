
import { Calendar, Plus, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNewEntry: () => void;
  currentView: 'dashboard' | 'calendar' | 'trends';
  onViewChange: (view: 'dashboard' | 'calendar' | 'trends') => void;
}

const Header = ({ onNewEntry, currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="glass-card sticky top-0 z-50 border-b-0 shadow-lg shadow-purple-100/20">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-5">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-tr from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-500/30 floating-animation">
                <Sparkles className="text-white text-xl" size={24} />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xs">✨</span>
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                MigrañApp
              </h1>
              <p className="text-sm text-slate-600 font-medium">Tu compañera de bienestar personal</p>
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-6">
            {/* Navigation Pills */}
            <div className="hidden lg:flex glass-card rounded-2xl p-2 space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('dashboard')}
                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  currentView === 'dashboard' 
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-slate-600 hover:text-violet-600 hover:bg-white/60'
                }`}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('calendar')}
                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  currentView === 'calendar' 
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-slate-600 hover:text-violet-600 hover:bg-white/60'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendario
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('trends')}
                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  currentView === 'trends' 
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-slate-600 hover:text-violet-600 hover:bg-white/60'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Tendencias
              </Button>
            </div>

            {/* Action Button */}
            <Button
              onClick={onNewEntry}
              className="gradient-button text-white rounded-2xl px-8 py-3 font-semibold text-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Plus className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Nuevo Registro</span>
              <span className="sm:hidden">Nuevo</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
