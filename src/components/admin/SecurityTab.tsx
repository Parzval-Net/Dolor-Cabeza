
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Shield, Key } from 'lucide-react';

interface SecurityTabProps {
  onChangePassword: () => void;
}

const SecurityTab = ({ onChangePassword }: SecurityTabProps) => {
  return (
    <div className="space-y-6">
      <Card className="admin-panel-card">
        <CardHeader className="admin-panel-content pb-4">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-500 flex-shrink-0" />
            <span>Configuración de Seguridad</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 admin-panel-content">
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <Lock className="w-5 h-5 text-violet-600 flex-shrink-0 mt-1" />
              <div className="flex-1 space-y-3">
                <h4 className="text-sm font-bold text-violet-800">
                  Contraseña de Administrador
                </h4>
                <p className="text-sm text-violet-700 leading-relaxed">
                  Cambia tu contraseña de administrador para mantener la seguridad de tu aplicación.
                </p>
                <Button
                  onClick={onChangePassword}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold w-full sm:w-auto mobile-touch-target safari-interactive-button"
                  size="sm"
                >
                  <Key className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Cambiar Contraseña</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-amber-800 mb-3">
                  Recomendaciones de Seguridad
                </h4>
                <ul className="text-sm text-amber-700 space-y-1 leading-relaxed">
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
