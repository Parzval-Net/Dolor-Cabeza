
import { Calendar, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNewEntry: () => void;
  currentView: 'dashboard' | 'calendar' | 'trends';
  onViewChange: (view: 'dashboard' | 'calendar' | 'trends') => void;
}

const Header = ({ onNewEntry, currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-white/80 to-rose-50/80 backdrop-blur-sm border-b border-rose-200/30 p-6 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 via-pink-400 to-lavender-400 rounded-2xl flex items-center justify-center shadow-lg animate-gentle-bounce">
            <span className="text-white text-2xl">🌸</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-lavender-600 bg-clip-text text-transparent">
              MigrañApp
            </h1>
            <p className="text-sm text-gray-600 font-medium">Tu diario personal de bienestar</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex bg-white/60 rounded-2xl p-1.5 border border-rose-200/50 shadow-sm backdrop-blur-sm">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('dashboard')}
              className={`rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
                currentView === 'dashboard' 
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-md' 
                  : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
              }`}
            >
              Dashboard
            </Button>
            <Button
              variant={currentView === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('calendar')}
              className={`rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
                currentView === 'calendar' 
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-md' 
                  : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendario
            </Button>
            <Button
              variant={currentView === 'trends' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('trends')}
              className={`rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
                currentView === 'trends' 
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-md' 
                  : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Tendencias
            </Button>
          </div>

          <Button
            onClick={onNewEntry}
            className="bg-gradient-to-r from-coral-400 to-rose-500 hover:from-coral-500 hover:to-rose-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2.5 font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Nuevo Registro</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
