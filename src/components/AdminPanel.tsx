import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Save, Palette, Type, Globe, LogOut, Pill } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminAuth from './AdminAuth';
import IconSelector from './IconSelector';
import ChangePasswordModal from './ChangePasswordModal';
import MedicationManager from './MedicationManager';

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

  // Verificar autenticación al cargar
  useEffect(() => {
    const authStatus = localStorage.getItem('admin-authenticated');
    const sessionTimestamp = localStorage.getItem('admin-session-timestamp');
    
    if (authStatus === 'true' && sessionTimestamp) {
      const sessionAge = Date.now() - parseInt(sessionTimestamp);
      const MAX_SESSION_TIME = 24 * 60 * 60 * 1000; // 24 horas
      
      if (sessionAge < MAX_SESSION_TIME) {
        setIsAuthenticated(true);
        
        // Verificar si debe mostrar el modal de cambio de contraseña
        const passwordChanged = localStorage.getItem('admin-password-changed');
        if (!passwordChanged) {
          setShowChangePassword(true);
        }
      } else {
        handleLogout();
      }
    }
  }, []);

  // Cargar configuración guardada al montar el componente
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
      
      // Actualizar título del documento
      updateDocumentTitle(settings.appName);
      
      // Disparar evento personalizado para notificar cambios
      window.dispatchEvent(new CustomEvent('admin-settings-updated'));
      
      toast({
        title: "Configuración guardada",
        description: "Los cambios se han aplicado exitosamente."
      });
      console.log('Settings saved:', settings);
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

  const handleExportData = () => {
    const entries = localStorage.getItem('headache-entries');
    if (entries) {
      const blob = new Blob([entries], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `migracare-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Datos exportados",
        description: "El archivo de respaldo se ha descargado."
      });
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target?.result as string);
          localStorage.setItem('headache-entries', JSON.stringify(data));
          toast({
            title: "Datos importados",
            description: "Los datos se han restaurado exitosamente."
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "No se pudo importar el archivo. Verifica el formato.",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePasswordChanged = () => {
    setShowChangePassword(false);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      {showChangePassword && (
        <ChangePasswordModal onPasswordChanged={handlePasswordChanged} />
      )}
      
      <div className="space-y-6">
        <Card className="glass-card-dark">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <Settings className="w-6 h-6 text-violet-500" />
                Panel de Administración
              </CardTitle>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-slate-800 font-semibold hover:bg-red-100 hover:text-red-800 hover:border-red-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                variant={activeTab === 'general' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('general')} 
                size="sm" 
                className="text-slate-800 font-semibold hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300"
              >
                <Globe className="w-4 h-4 mr-2" />
                General
              </Button>
              <Button 
                variant={activeTab === 'appearance' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('appearance')} 
                size="sm" 
                className="text-slate-800 font-semibold hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300"
              >
                <Palette className="w-4 h-4 mr-2" />
                Apariencia
              </Button>
              <Button 
                variant={activeTab === 'medications' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('medications')} 
                size="sm" 
                className="text-slate-800 font-semibold hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300"
              >
                <Pill className="w-4 h-4 mr-2" />
                Medicamentos
              </Button>
              <Button 
                variant={activeTab === 'data' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('data')} 
                size="sm" 
                className="text-slate-800 font-semibold hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300"
              >
                <Type className="w-4 h-4 mr-2" />
                Datos
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="appName" className="text-slate-800 font-bold">Nombre de la Aplicación</Label>
                  <Input 
                    id="appName" 
                    value={settings.appName} 
                    onChange={e => setSettings(prev => ({
                      ...prev,
                      appName: e.target.value
                    }))} 
                    placeholder="Nombre de tu aplicación" 
                    className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500"
                  />
                  <p className="text-xs text-slate-600">Este será el título que aparecerá en la pestaña del navegador</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appDescription" className="text-slate-800 font-bold">Descripción</Label>
                  <Textarea 
                    id="appDescription" 
                    value={settings.appDescription} 
                    onChange={e => setSettings(prev => ({
                      ...prev,
                      appDescription: e.target.value
                    }))} 
                    placeholder="Descripción de tu aplicación" 
                    rows={3} 
                    className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-slate-800 font-bold">Idioma</Label>
                    <select 
                      id="language" 
                      value={settings.language} 
                      onChange={e => setSettings(prev => ({
                        ...prev,
                        language: e.target.value
                      }))} 
                      className="admin-select-fixed"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-slate-800 font-bold">Zona Horaria</Label>
                    <select 
                      id="timezone" 
                      value={settings.timezone} 
                      onChange={e => setSettings(prev => ({
                        ...prev,
                        timezone: e.target.value
                      }))} 
                      className="admin-select-fixed"
                    >
                      <option value="America/Santiago">Santiago</option>
                      <option value="America/New_York">New York</option>
                      <option value="Europe/Madrid">Madrid</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-slate-800 font-bold">Icono de la Aplicación</Label>
                  <IconSelector
                    selectedIcon={settings.appIcon}
                    onIconSelect={(iconName) => setSettings(prev => ({
                      ...prev,
                      appIcon: iconName
                    }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor" className="text-slate-800 font-bold">Color Primario</Label>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="color" 
                        id="primaryColor" 
                        value={settings.primaryColor} 
                        onChange={e => setSettings(prev => ({
                          ...prev,
                          primaryColor: e.target.value
                        }))} 
                        className="w-12 h-10 rounded border-2 border-slate-400 cursor-pointer hover:border-violet-500"
                      />
                      <Input 
                        value={settings.primaryColor} 
                        onChange={e => setSettings(prev => ({
                          ...prev,
                          primaryColor: e.target.value
                        }))} 
                        placeholder="#8B5CF6" 
                        className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor" className="text-slate-800 font-bold">Color Secundario</Label>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="color" 
                        id="secondaryColor" 
                        value={settings.secondaryColor} 
                        onChange={e => setSettings(prev => ({
                          ...prev,
                          secondaryColor: e.target.value
                        }))} 
                        className="w-12 h-10 rounded border-2 border-slate-400 cursor-pointer hover:border-violet-500"
                      />
                      <Input 
                        value={settings.secondaryColor} 
                        onChange={e => setSettings(prev => ({
                          ...prev,
                          secondaryColor: e.target.value
                        }))} 
                        placeholder="#EC4899" 
                        className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-preview-card-fixed">
                  <h4 className="font-bold text-slate-800 mb-3">Vista Previa</h4>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold shadow-lg" 
                      style={{
                        background: `linear-gradient(to br, ${settings.primaryColor}, ${settings.secondaryColor})`
                      }}
                    >
                      {settings.appName.charAt(0).toUpperCase()}
                    </div>
                    <div className="space-y-1">
                      <h5 
                        style={{ color: settings.primaryColor }} 
                        className="font-bold text-lg"
                      >
                        {settings.appName}
                      </h5>
                      <p className="text-sm text-slate-700 font-semibold">{settings.appDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medications' && (
              <MedicationManager />
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-slate-800 font-bold">Exportar Datos</Label>
                  <p className="text-sm text-slate-700 font-semibold">Descarga una copia de seguridad de todos tus datos.</p>
                  <Button 
                    onClick={handleExportData} 
                    variant="outline" 
                    className="bg-white text-slate-800 font-semibold border-slate-400 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300"
                  >
                    Exportar Datos
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="importData" className="text-slate-800 font-bold">Importar Datos</Label>
                  <p className="text-sm text-slate-700 font-semibold">Restaura datos desde un archivo de respaldo.</p>
                  <input 
                    type="file" 
                    id="importData" 
                    accept=".json" 
                    onChange={handleImportData} 
                    className="admin-file-input-fixed"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-800 font-bold">Formato de Exportación</Label>
                  <select 
                    value={settings.exportFormat} 
                    onChange={e => setSettings(prev => ({
                      ...prev,
                      exportFormat: e.target.value
                    }))} 
                    className="admin-select-fixed"
                  >
                    <option value="JSON">JSON</option>
                    <option value="CSV">CSV</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab !== 'medications' && (
              <div className="flex justify-end pt-6 border-t border-slate-300">
                <Button 
                  onClick={handleSave} 
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold shadow-lg"
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
