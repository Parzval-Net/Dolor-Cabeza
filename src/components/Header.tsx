
import { Calendar, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNewEntry: () => void;
  currentView: 'dashboard' | 'calendar' | 'trends';
  onViewChange: (view: 'dashboard' | 'calendar' | 'trends') => void;
}

const Header = ({ onNewEntry, currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-rose-100/80 to-lavender-100/80 backdrop-blur-sm border-b border-rose-200/50 p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-lavender-400 rounded-full flex items-center justify-center animate-gentle-bounce">
            <span className="text-white text-xl">🌸</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-lavender-600 bg-clip-text text-transparent">
              MigrañApp
            </h1>
            <p className="text-sm text-gray-600">Tu diario personal de salud</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex bg-white/50 rounded-full p-1 border border-rose-200/50">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('dashboard')}
              className={`rounded-full ${currentView === 'dashboard' ? 'bg-gradient-to-r from-rose-400 to-lavender-400 text-white' : 'text-gray-600 hover:text-rose-600'}`}
            >
              Dashboard
            </Button>
            <Button
              variant={currentView === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('calendar')}
              className={`rounded-full ${currentView === 'calendar' ? 'bg-gradient-to-r from-rose-400 to-lavender-400 text-white' : 'text-gray-600 hover:text-rose-600'}`}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Calendario
            </Button>
            <Button
              variant={currentView === 'trends' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('trends')}
              className={`rounded-full ${currentView === 'trends' ? 'bg-gradient-to-r from-rose-400 to-lavender-400 text-white' : 'text-gray-600 hover:text-rose-600'}`}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Tendencias
            </Button>
          </div>

          <Button
            onClick={onNewEntry}
            className="bg-gradient-to-r from-coral-400 to-rose-400 hover:from-coral-500 hover:to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Nuevo Registro</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
