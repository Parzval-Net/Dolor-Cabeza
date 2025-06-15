import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import IconSelector from '@/components/IconSelector';

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

interface AppearanceTabProps {
  settings: AdminSettings;
  onSettingsChange: (settings: AdminSettings) => void;
}

const AppearanceTab = ({ settings, onSettingsChange }: AppearanceTabProps) => {
  const updateSetting = (key: keyof AdminSettings, value: string) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="primaryColor" className="text-slate-800 font-bold text-sm sm:text-base">
          Color Primario
        </Label>
        <div className="flex items-center space-x-3">
          <Input
            id="primaryColor"
            type="color"
            value={settings.primaryColor}
            onChange={e => updateSetting('primaryColor', e.target.value)}
            className="w-12 h-12 rounded-xl border-2 border-slate-400 p-1 cursor-pointer"
          />
          <Input
            value={settings.primaryColor}
            onChange={e => updateSetting('primaryColor', e.target.value)}
            placeholder="#8B5CF6"
            className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 mobile-input"
          />
        </div>
        <p className="text-xs text-slate-600">Color principal de la aplicación</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="secondaryColor" className="text-slate-800 font-bold text-sm sm:text-base">
          Color Secundario
        </Label>
        <div className="flex items-center space-x-3">
          <Input
            id="secondaryColor"
            type="color"
            value={settings.secondaryColor}
            onChange={e => updateSetting('secondaryColor', e.target.value)}
            className="w-12 h-12 rounded-xl border-2 border-slate-400 p-1 cursor-pointer"
          />
          <Input
            value={settings.secondaryColor}
            onChange={e => updateSetting('secondaryColor', e.target.value)}
            placeholder="#EC4899"
            className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 mobile-input"
          />
        </div>
        <p className="text-xs text-slate-600">Color secundario para gradientes y acentos</p>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-800 font-bold text-sm sm:text-base">
          Icono de la Aplicación
        </Label>
        <IconSelector
          selectedIcon={settings.appIcon}
          onIconSelect={(icon) => updateSetting('appIcon', icon)}
        />
        <p className="text-xs text-slate-600">Icono que aparecerá en el encabezado</p>
      </div>
    </div>
  );
};

export default AppearanceTab;
