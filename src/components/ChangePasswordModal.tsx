
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

    // Guardar nueva contraseña
    localStorage.setItem('admin-password', newPassword);
    localStorage.setItem('admin-password-changed', 'true');
    
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido cambiada exitosamente."
    });
    
    onPasswordChanged();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="glass-card-dark w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Cambiar Contraseña
          </CardTitle>
          <p className="text-slate-600 font-medium mt-2">
            Por seguridad, es recomendable cambiar la contraseña predeterminada
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-slate-800 font-bold">
                Nueva Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ingresa tu nueva contraseña"
                  className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
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
              <Label htmlFor="confirmPassword" className="text-slate-800 font-bold">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirma tu nueva contraseña"
                  className="text-slate-800 font-semibold bg-white border-slate-400 focus:border-violet-500 hover:border-slate-500 pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
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

            <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-violet-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-violet-800">Recomendaciones de seguridad:</h4>
                  <ul className="text-xs text-violet-700 font-medium mt-1 space-y-1">
                    <li>• Usa al menos 6 caracteres</li>
                    <li>• Combina letras, números y símbolos</li>
                    <li>• No uses información personal</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold shadow-lg mt-6"
            >
              <Lock className="w-4 h-4 mr-2" />
              Cambiar Contraseña
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordModal;
