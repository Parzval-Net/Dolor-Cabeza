import { Calendar, Plus, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNewEntry: () => void;
  currentView: 'dashboard' | 'calendar' | 'trends' | 'episodes' | 'admin';
  onViewChange: (view: 'dashboard' | 'calendar' | 'trends' | 'episodes' | 'admin') => void;
}

const Header = ({ onNewEntry, currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-violet-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                MigraCare
              </h1>
              <p className="text-sm text-slate-500">Seguimiento inteligente de migrañas</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 shadow-sm">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'episodes', label: 'Episodios', icon: '📋' },
              { id: 'calendar', label: 'Calendario', icon: '📅' },
              { id: 'trends', label: 'Tendencias', icon: '📈' },
              { id: 'admin', label: 'Admin', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                    : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <Button
            onClick={onNewEntry}
            className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 rounded-2xl px-6"
          >
            <span className="hidden sm:inline mr-2">Nuevo</span>
            <span className="text-lg">+</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4">
          <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 shadow-sm overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'episodes', label: 'Episodios', icon: '📋' },
              { id: 'calendar', label: 'Calendario', icon: '📅' },
              { id: 'trends', label: 'Tendencias', icon: '📈' },
              { id: 'admin', label: 'Admin', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                    : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                }`}
              >
                <span className="block">{item.icon}</span>
                <span className="block">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
