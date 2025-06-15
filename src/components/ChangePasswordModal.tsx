
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChangePasswordModalProps {
  onPasswordChanged: () => void;
}

const ChangePasswordModal = ({ onPasswordChanged }: ChangePasswordModalProps) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      toast({
        title: "Contraseña muy corta",
        description: "La contraseña debe tener al menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Por favor verifica que ambas contraseñas sean iguales.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('admin-password', newPassword);
    localStorage.setItem('admin-password-changed', 'true');
    
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido cambiada exitosamente."
    });
    
    onPasswordChanged();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md mx-auto bg-white border border-slate-200 shadow-2xl">
        <CardHeader className="text-center bg-white rounded-t-lg px-4 sm:px-6 py-4 sm:py-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <CardTitle className="text-lg sm:text-2xl font-bold text-slate-800">
            Cambiar Contraseña
          </CardTitle>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed px-2">
            Por seguridad, es recomendable cambiar la contraseña predeterminada
          </p>
        </CardHeader>

        <CardContent className="bg-white rounded-b-lg px-4 sm:px-6 py-4 sm:py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-slate-800 font-bold text-sm">
                Nueva Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ingresa tu nueva contraseña"
                  className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 pr-12 mobile-input safari-form-button"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100 safari-interactive-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-600" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-800 font-bold text-sm">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirma tu nueva contraseña"
                  className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 pr-12 mobile-input safari-form-button"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100 safari-interactive-button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-600" />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-violet-800 mb-1">
                    Recomendaciones de seguridad:
                  </h4>
                  <ul className="text-xs text-violet-700 font-medium space-y-0.5 leading-relaxed">
                    <li>• Usa al menos 6 caracteres</li>
                    <li>• Combina letras, números y símbolos</li>
                    <li>• No uses información personal</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold shadow-lg mt-4 sm:mt-6 mobile-button safari-interactive-button"
            >
              <Lock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm sm:text-base">Cambiar Contraseña</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordModal;
