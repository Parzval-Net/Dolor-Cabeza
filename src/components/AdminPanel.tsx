
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Save, Palette, Type, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminSettings {
  appName: string;
  appDescription: string;
  primaryColor: string;
  secondaryColor: string;
  language: string;
  timezone: string;
  exportFormat: string;
}

const AdminPanel = () => {
  const [settings, setSettings] = useState<AdminSettings>({
    appName: 'MigraCare',
    appDescription: 'Tu aplicación para el seguimiento de migrañas',
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    language: 'es',
    timezone: 'America/Santiago',
    exportFormat: 'PDF'
  });

  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'data'>('general');
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('admin-settings', JSON.stringify(settings));
    toast({
      title: "Configuración guardada",
      description: "Los cambios se han aplicado exitosamente.",
    });
  };

  const handleExportData = () => {
    const entries = localStorage.getItem('headache-entries');
    if (entries) {
      const blob = new Blob([entries], { type: 'application/json' });
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
        description: "El archivo de respaldo se ha descargado.",
      });
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          localStorage.setItem('headache-entries', JSON.stringify(data));
          toast({
            title: "Datos importados",
            description: "Los datos se han restaurado exitosamente.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "No se pudo importar el archivo. Verifica el formato.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card-dark">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <Settings className="w-6 h-6 text-violet-500" />
            Panel de Administración
          </CardTitle>
          
          <div className="flex gap-2 mt-4">
            <Button
              variant={activeTab === 'general' ? 'default' : 'outline'}
              onClick={() => setActiveTab('general')}
              size="sm"
            >
              <Globe className="w-4 h-4 mr-2" />
              General
            </Button>
            <Button
              variant={activeTab === 'appearance' ? 'default' : 'outline'}
              onClick={() => setActiveTab('appearance')}
              size="sm"
            >
              <Palette className="w-4 h-4 mr-2" />
              Apariencia
            </Button>
            <Button
              variant={activeTab === 'data' ? 'default' : 'outline'}
              onClick={() => setActiveTab('data')}
              size="sm"
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
                <Label htmlFor="appName">Nombre de la Aplicación</Label>
                <Input
                  id="appName"
                  value={settings.appName}
                  onChange={(e) => setSettings(prev => ({ ...prev, appName: e.target.value }))}
                  placeholder="Nombre de tu aplicación"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appDescription">Descripción</Label>
                <Textarea
                  id="appDescription"
                  value={settings.appDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, appDescription: e.target.value }))}
                  placeholder="Descripción de tu aplicación"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <select
                    id="language"
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <select
                    id="timezone"
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Color Primario</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="primaryColor"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-10 rounded border border-slate-300"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      placeholder="#8B5CF6"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Color Secundario</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="secondaryColor"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-12 h-10 rounded border border-slate-300"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      placeholder="#EC4899"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-slate-700 mb-2">Vista Previa</h4>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ background: `linear-gradient(to br, ${settings.primaryColor}, ${settings.secondaryColor})` }}
                  >
                    8
                  </div>
                  <div className="space-y-1">
                    <h5 style={{ color: settings.primaryColor }} className="font-semibold">
                      {settings.appName}
                    </h5>
                    <p className="text-sm text-slate-600">{settings.appDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Exportar Datos</Label>
                <p className="text-sm text-slate-600">Descarga una copia de seguridad de todos tus datos.</p>
                <Button onClick={handleExportData} variant="outline">
                  Exportar Datos
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="importData">Importar Datos</Label>
                <p className="text-sm text-slate-600">Restaura datos desde un archivo de respaldo.</p>
                <input
                  type="file"
                  id="importData"
                  accept=".json"
                  onChange={handleImportData}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
              </div>

              <div className="space-y-2">
                <Label>Formato de Exportación</Label>
                <select
                  value={settings.exportFormat}
                  onChange={(e) => setSettings(prev => ({ ...prev, exportFormat: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="JSON">JSON</option>
                  <option value="CSV">CSV</option>
                  <option value="PDF">PDF</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSave} className="bg-violet-500 hover:bg-violet-600">
              <Save className="w-4 h-4 mr-2" />
              Guardar Configuración
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
