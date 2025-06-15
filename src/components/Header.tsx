import { useState, useEffect } from 'react';
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
  Flame,
  Eye,
  Target,
  BarChart3,
  HeartHandshake,
  Stethoscope,
  Pill,
  Clock,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onNewEntry: () => void;
  currentView: 'dashboard' | 'calendar' | 'trends' | 'episodes' | 'admin';
  onViewChange: (view: 'dashboard' | 'calendar' | 'trends' | 'episodes' | 'admin') => void;
}

const Header = ({ onNewEntry }: HeaderProps) => {
  const [appSettings, setAppSettings] = useState({
    appName: 'MigraCare',
    appDescription: 'Seguimiento inteligente de migrañas',
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    appIcon: 'Heart'
  });

  // Mapeo de iconos
  const iconMap: { [key: string]: React.ComponentType<any> } = {
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
    BarChart3,
    HeartHandshake,
    Stethoscope,
    Pill,
    Clock,
  };

  // Función para cargar configuración desde localStorage
  const loadSettings = () => {
    const savedSettings = localStorage.getItem('admin-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setAppSettings({
          appName: parsedSettings.appName || 'MigraCare',
          appDescription: parsedSettings.appDescription || 'Seguimiento inteligente de migrañas',
          primaryColor: parsedSettings.primaryColor || '#8B5CF6',
          secondaryColor: parsedSettings.secondaryColor || '#EC4899',
          appIcon: parsedSettings.appIcon || 'Heart'
        });
      } catch (error) {
        console.error('Error loading admin settings in Header:', error);
      }
    }
  };

  // Cargar configuración al montar el componente
  useEffect(() => {
    loadSettings();
  }, []);

  // Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-settings') {
        loadSettings();
      }
    };

    const handleCustomStorageChange = () => {
      loadSettings();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('admin-settings-updated', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('admin-settings-updated', handleCustomStorageChange);
    };
  }, []);

  // Obtener el componente de icono seleccionado
  const SelectedIcon = iconMap[appSettings.appIcon] || Heart;

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-violet-100 sticky top-0 z-50 shadow-sm safe-area-pt">
      <div className="max-w-6xl mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-9 h-9 lg:w-10 lg:h-10 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${appSettings.primaryColor}, ${appSettings.secondaryColor})`
              }}
            >
              <SelectedIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h1 
                className="text-xl lg:text-2xl font-bold"
                style={{
                  background: `linear-gradient(135deg, ${appSettings.primaryColor}, ${appSettings.secondaryColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {appSettings.appName}
              </h1>
              <p className="text-xs lg:text-sm text-slate-600 font-medium hidden sm:block">{appSettings.appDescription}</p>
            </div>
          </div>

          {/* Botón de nueva entrada - optimizado para móviles */}
          <Button
            onClick={onNewEntry}
            className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 rounded-2xl px-3 py-2 lg:px-6 lg:py-3 active:scale-95 text-sm lg:text-base"
          >
            <span className="hidden sm:inline mr-2">Registrar dolor</span>
            <span className="text-lg">+</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
