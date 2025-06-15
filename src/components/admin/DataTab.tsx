
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

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

interface DataTabProps {
  settings: AdminSettings;
  onSettingsChange: (settings: AdminSettings) => void;
}

const DataTab = ({ settings, onSettingsChange }: DataTabProps) => {
  const { toast } = useToast();

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

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-3">
        <Label className="text-slate-800 font-bold text-sm sm:text-base">
          Exportar Datos
        </Label>
        <p className="text-xs sm:text-sm text-slate-700 font-semibold">
          Descarga una copia de seguridad de todos tus datos.
        </p>
        <Button
          onClick={handleExportData}
          variant="outline"
          className="bg-white text-slate-800 font-semibold border-slate-400 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300 w-full sm:w-auto mobile-button"
        >
          Exportar Datos
        </Button>
      </div>

      <div className="space-y-3">
        <Label htmlFor="importData" className="text-slate-800 font-bold text-sm sm:text-base">
          Importar Datos
        </Label>
        <p className="text-xs sm:text-sm text-slate-700 font-semibold">
          Restaura datos desde un archivo de respaldo.
        </p>
        <input
          type="file"
          id="importData"
          accept=".json"
          onChange={handleImportData}
          className="block w-full text-xs sm:text-sm text-slate-800 font-semibold file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-bold file:bg-violet-100 file:text-violet-800 hover:file:bg-violet-200 file:transition-colors border-2 border-slate-400 rounded-xl p-2 sm:p-3 bg-white hover:border-slate-500 focus:border-violet-500"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-slate-800 font-bold text-sm sm:text-base">
          Formato de Exportación
        </Label>
        <select
          value={settings.exportFormat}
          onChange={e => onSettingsChange({
            ...settings,
            exportFormat: e.target.value
          })}
          className="w-full px-3 py-2 sm:py-3 border-2 border-slate-400 rounded-xl bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 hover:border-slate-500 transition-colors mobile-input"
        >
          <option value="JSON">JSON</option>
          <option value="CSV">CSV</option>
          <option value="PDF">PDF</option>
        </select>
      </div>
    </div>
  );
};

export default DataTab;
