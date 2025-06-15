
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Shield, Key } from 'lucide-react';

interface SecurityTabProps {
  onChangePassword: () => void;
}

const SecurityTab = ({ onChangePassword }: SecurityTabProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-white border border-slate-200 shadow-sm">
        <CardHeader className="bg-white pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 flex-shrink-0" />
            <span className="truncate">Configuración de Seguridad</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-white px-4 sm:px-6">
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <Lock className="w-5 h-5 text-violet-600 flex-shrink-0 sm:mt-0.5" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-violet-800 mb-2">
                  Contraseña de Administrador
                </h4>
                <p className="text-xs sm:text-sm text-violet-700 font-medium mb-3 leading-relaxed">
                  Cambia tu contraseña de administrador para mantener la seguridad de tu aplicación.
                </p>
                <Button
                  onClick={onChangePassword}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold w-full sm:w-auto mobile-touch-target safari-interactive-button"
                  size="sm"
                >
                  <Key className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Cambiar Contraseña</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 sm:mt-0.5" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-amber-800 mb-2">
                  Recomendaciones de Seguridad
                </h4>
                <ul className="text-xs sm:text-sm text-amber-700 font-medium space-y-1 leading-relaxed">
                  <li>• Cambia la contraseña regularmente</li>
                  <li>• Usa contraseñas fuertes con al menos 8 caracteres</li>
                  <li>• No compartas tu contraseña de administrador</li>
                  <li>• Cierra sesión al terminar de usar el panel</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
