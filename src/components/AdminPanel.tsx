
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
import SecurityTab from './admin/SecurityTab';

interface AdminSettings {
  appName: string;
  appDescription: string;
  dashboardDescription: string;
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
    dashboardDescription: 'Conoce mejor tus patrones de dolor y toma decisiones informadas para tu bienestar',
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    appIcon: 'Heart',
    language: 'es',
    timezone: 'America/Santiago',
    exportFormat: 'PDF'
  });
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'medications' | 'data' | 'security'>('general');
  const { toast } = useToast();

  // Verificación de autenticación
  useEffect(() => {
    const authStatus = localStorage.getItem('admin-authenticated');
    const sessionTimestamp = localStorage.getItem('admin-session-timestamp');
    
    if (authStatus === 'true' && sessionTimestamp) {
      const sessionAge = Date.now() - parseInt(sessionTimestamp);
      const MAX_SESSION_TIME = 24 * 60 * 60 * 1000; // 24 horas
      
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

  // Cargar configuración
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

  const handleSave = () => {
    try {
      localStorage.setItem('admin-settings', JSON.stringify(settings));
      document.title = `${settings.appName} - Seguimiento inteligente de migrañas`;
      window.dispatchEvent(new CustomEvent('admin-settings-updated', { detail: settings }));
      
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
      case 'security':
        return <SecurityTab onChangePassword={() => setShowChangePassword(true)} />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      {showChangePassword && (
        <ChangePasswordModal onPasswordChanged={() => setShowChangePassword(false)} />
      )}
      
      <div className="space-y-6 p-4">
        <Card className="admin-panel-card">
          <CardHeader className="pb-6 admin-panel-content">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <Settings className="w-6 h-6 text-violet-500" />
                Panel de Administración
              </CardTitle>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-slate-800 font-semibold hover:bg-red-100 hover:text-red-800 hover:border-red-300 w-full sm:w-auto bg-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
            
            <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </CardHeader>

          <CardContent className="space-y-6 admin-panel-content">
            {renderTabContent()}

            {activeTab !== 'medications' && activeTab !== 'security' && (
              <div className="flex justify-end pt-6 border-t border-slate-300">
                <Button
                  onClick={handleSave}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold shadow-lg w-full sm:w-auto"
                >
                  <Save className="w-4 h-4 mr-2" />
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
