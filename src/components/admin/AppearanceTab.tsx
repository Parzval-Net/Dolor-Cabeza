
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import IconSelector from '../IconSelector';

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
      <div className="space-y-3 sm:space-y-4">
        <Label className="text-slate-800 font-bold text-sm sm:text-base">
          Icono de la Aplicación
        </Label>
        <IconSelector
          selectedIcon={settings.appIcon}
          onIconSelect={(iconName) => updateSetting('appIcon', iconName)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primaryColor" className="text-slate-800 font-bold text-sm sm:text-base">
            Color Primario
          </Label>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="color"
              id="primaryColor"
              value={settings.primaryColor}
              onChange={e => updateSetting('primaryColor', e.target.value)}
              className="w-10 h-10 sm:w-12 sm:h-10 rounded border-2 border-slate-400 cursor-pointer hover:border-violet-500"
            />
            <Input
              value={settings.primaryColor}
              onChange={e => updateSetting('primaryColor', e.target.value)}
              placeholder="#8B5CF6"
              className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 mobile-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryColor" className="text-slate-800 font-bold text-sm sm:text-base">
            Color Secundario
          </Label>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="color"
              id="secondaryColor"
              value={settings.secondaryColor}
              onChange={e => updateSetting('secondaryColor', e.target.value)}
              className="w-10 h-10 sm:w-12 sm:h-10 rounded border-2 border-slate-400 cursor-pointer hover:border-violet-500"
            />
            <Input
              value={settings.secondaryColor}
              onChange={e => updateSetting('secondaryColor', e.target.value)}
              placeholder="#EC4899"
              className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 mobile-input"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-100 border-2 border-slate-300 rounded-lg p-3 sm:p-4">
        <h4 className="font-bold text-slate-800 mb-3 text-sm sm:text-base">Vista Previa</h4>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base"
            style={{
              background: `linear-gradient(to br, ${settings.primaryColor}, ${settings.secondaryColor})`
            }}
          >
            {settings.appName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <h5
              style={{ color: settings.primaryColor }}
              className="font-bold text-base sm:text-lg"
            >
              {settings.appName}
            </h5>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold">
              {settings.appDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
