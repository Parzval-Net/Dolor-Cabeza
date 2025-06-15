
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Save, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminAuth from './AdminAuth';
import ChangePasswordModal from './ChangePasswordModal';
import MedicationManager from './MedicationManager';
import AdminTabs from './admin/AdminTabs';
import GeneralTab from './admin/GeneralTab';
import AppearanceTab from './admin/AppearanceTab';
import DataTab from './admin/DataTab';

interface AdminSettings {
  appName: string;
  appDescription: string;
  primaryColor: string;
  secondaryColor: string;
  appIcon: string;
  language: string;
  timezone: string;
  exportFormat: string;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [settings, setSettings] = useState<AdminSettings>({
    appName: 'MigraCare',
    appDescription: 'Tu aplicación para el seguimiento de migrañas',
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    appIcon: 'Heart',
    language: 'es',
    timezone: 'America/Santiago',
    exportFormat: 'PDF'
  });
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'medications' | 'data'>('general');
  const { toast } = useToast();

  // Authentication check
  useEffect(() => {
    const authStatus = localStorage.getItem('admin-authenticated');
    const sessionTimestamp = localStorage.getItem('admin-session-timestamp');
    
    if (authStatus === 'true' && sessionTimestamp) {
      const sessionAge = Date.now() - parseInt(sessionTimestamp);
      const MAX_SESSION_TIME = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge < MAX_SESSION_TIME) {
        setIsAuthenticated(true);
        
        const passwordChanged = localStorage.getItem('admin-password-changed');
        if (!passwordChanged) {
          setShowChangePassword(true);
        }
      } else {
        handleLogout();
      }
    }
  }, []);

  // Load settings
  useEffect(() => {
    if (isAuthenticated) {
      const savedSettings = localStorage.getItem('admin-settings');
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(parsedSettings);
        } catch (error) {
          console.error('Error loading admin settings:', error);
        }
      }
    }
  }, [isAuthenticated]);

  const updateDocumentTitle = (appName: string) => {
    document.title = `${appName} - Seguimiento inteligente de migrañas`;
    const titleElement = document.getElementById('dynamic-title');
    if (titleElement) {
      titleElement.textContent = `${appName} - Seguimiento inteligente de migrañas`;
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('admin-settings', JSON.stringify(settings));
      updateDocumentTitle(settings.appName);
      window.dispatchEvent(new CustomEvent('admin-settings-updated'));
      
      toast({
        title: "Configuración guardada",
        description: "Los cambios se han aplicado exitosamente."
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la configuración.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    localStorage.removeItem('admin-session-timestamp');
    setIsAuthenticated(false);
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente."
    });
  };

  const handlePasswordChanged = () => {
    setShowChangePassword(false);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab settings={settings} onSettingsChange={setSettings} />;
      case 'appearance':
        return <AppearanceTab settings={settings} onSettingsChange={setSettings} />;
      case 'medications':
        return <MedicationManager />;
      case 'data':
        return <DataTab settings={settings} onSettingsChange={setSettings} />;
      default:
        return null;
    }
  };

  return (
    <>
      {showChangePassword && (
        <ChangePasswordModal onPasswordChanged={handlePasswordChanged} />
      )}
      
      <div className="space-y-4 sm:space-y-6 p-4">
        <Card className="glass-card-mobile">
          <CardHeader className="pb-2 sm:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <CardTitle className="text-lg sm:text-2xl font-bold text-slate-800 flex items-center gap-2 sm:gap-3">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500" />
                Panel de Administración
              </CardTitle>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-slate-800 font-semibold hover:bg-red-100 hover:text-red-800 hover:border-red-300 w-full sm:w-auto mobile-button"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
            
            <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6">
            {renderTabContent()}

            {activeTab !== 'medications' && (
              <div className="flex justify-end pt-4 sm:pt-6 border-t border-slate-300">
                <Button
                  onClick={handleSave}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold shadow-lg w-full sm:w-auto mobile-button"
                >
                  <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Guardar Configuración
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminPanel;
