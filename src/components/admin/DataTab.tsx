
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Download, Upload, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface DataTabProps {
  settings: AdminSettings;
  onSettingsChange: (settings: AdminSettings) => void;
}

const DataTab = ({ settings, onSettingsChange }: DataTabProps) => {
  const { toast } = useToast();

  const updateSetting = (key: keyof AdminSettings, value: string) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const exportData = () => {
    try {
      const data = {
        settings: localStorage.getItem('admin-settings'),
        entries: localStorage.getItem('headache-entries'),
        medications: localStorage.getItem('custom-medications')
      };

      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `migracare-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);

      toast({
        title: "Datos exportados",
        description: "La copia de seguridad se ha descargado exitosamente."
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Error",
        description: "No se pudo exportar los datos.",
        variant: "destructive"
      });
    }
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.settings) localStorage.setItem('admin-settings', data.settings);
        if (data.entries) localStorage.setItem('headache-entries', data.entries);
        if (data.medications) localStorage.setItem('custom-medications', data.medications);

        // Reload the page to apply changes
        window.location.reload();

        toast({
          title: "Datos importados",
          description: "Los datos se han restaurado exitosamente."
        });
      } catch (error) {
        console.error('Error importing data:', error);
        toast({
          title: "Error",
          description: "El archivo no es válido o está corrupto.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('headache-entries');
      localStorage.removeItem('custom-medications');
      
      toast({
        title: "Datos eliminados",
        description: "Todos los datos han sido eliminados."
      });

      // Reload to reflect changes
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label className="text-slate-800 font-bold text-sm sm:text-base">
          Formato de Exportación
        </Label>
        <select
          value={settings.exportFormat}
          onChange={e => updateSetting('exportFormat', e.target.value)}
          className="w-full px-3 py-2 sm:py-3 border-2 border-slate-400 rounded-xl bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 hover:border-slate-500 transition-colors mobile-input"
        >
          <option value="JSON">JSON</option>
          <option value="CSV">CSV</option>
          <option value="PDF">PDF</option>
        </select>
        <p className="text-xs text-slate-600">Formato predeterminado para exportar datos</p>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-300">
        <h3 className="text-slate-800 font-bold text-base">Gestión de Datos</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            onClick={exportData}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold mobile-button"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Exportar
          </Button>

          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="import-file"
            />
            <Button
              asChild
              className="bg-green-500 hover:bg-green-600 text-white font-bold mobile-button w-full"
            >
              <label htmlFor="import-file" className="cursor-pointer flex items-center justify-center">
                <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Importar
              </label>
            </Button>
          </div>

          <Button
            onClick={clearAllData}
            variant="destructive"
            className="font-bold mobile-button"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Limpiar
          </Button>
        </div>

        <p className="text-xs text-slate-600 mt-2">
          Exporta tus datos para crear copias de seguridad, importa desde un archivo de respaldo previo, 
          o limpia todos los datos para empezar de nuevo.
        </p>
      </div>
    </div>
  );
};

export default DataTab;
