
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

interface GeneralTabProps {
  settings: AdminSettings;
  onSettingsChange: (settings: AdminSettings) => void;
}

const GeneralTab = ({ settings, onSettingsChange }: GeneralTabProps) => {
  const updateSetting = (key: keyof AdminSettings, value: string) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="appName" className="text-slate-800 font-bold text-sm sm:text-base">
          Nombre de la Aplicación
        </Label>
        <Input
          id="appName"
          value={settings.appName}
          onChange={e => updateSetting('appName', e.target.value)}
          placeholder="Nombre de tu aplicación"
          className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 mobile-input"
        />
        <p className="text-xs text-slate-600">Este será el título que aparecerá en la pestaña del navegador</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="appDescription" className="text-slate-800 font-bold text-sm sm:text-base">
          Descripción
        </Label>
        <Textarea
          id="appDescription"
          value={settings.appDescription}
          onChange={e => updateSetting('appDescription', e.target.value)}
          placeholder="Descripción de tu aplicación"
          rows={3}
          className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 mobile-input"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="language" className="text-slate-800 font-bold text-sm sm:text-base">
            Idioma
          </Label>
          <select
            id="language"
            value={settings.language}
            onChange={e => updateSetting('language', e.target.value)}
            className="w-full px-3 py-2 sm:py-3 border-2 border-slate-400 rounded-xl bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 hover:border-slate-500 transition-colors mobile-input"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone" className="text-slate-800 font-bold text-sm sm:text-base">
            Zona Horaria
          </Label>
          <select
            id="timezone"
            value={settings.timezone}
            onChange={e => updateSetting('timezone', e.target.value)}
            className="w-full px-3 py-2 sm:py-3 border-2 border-slate-400 rounded-xl bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 hover:border-slate-500 transition-colors mobile-input"
          >
            <option value="America/Santiago">Santiago</option>
            <option value="America/New_York">New York</option>
            <option value="Europe/Madrid">Madrid</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
