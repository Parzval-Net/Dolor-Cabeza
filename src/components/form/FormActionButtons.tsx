
import { Button } from '@/components/ui/button';
import { Save, Clock } from 'lucide-react';

interface FormActionButtonsProps {
  currentStep: number;
  onCancel: () => void;
  onSwitchToExpress: () => void;
  onPrevious: () => void;
  onContinue: () => void;
  onSaveBasic: () => void;
  onSaveComplete: () => void;
}

const FormActionButtons = ({
  currentStep,
  onCancel,
  onSwitchToExpress,
  onPrevious,
  onContinue,
  onSaveBasic,
  onSaveComplete
}: FormActionButtonsProps) => {
  return (
    <>
      {/* Express Button */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1" />
        <Button 
          variant="ghost" 
          onClick={onSwitchToExpress} 
          className="text-violet-600 text-sm px-3 py-2 rounded-xl h-10 safari-button-fix mobile-touch-target"
        >
          <Clock className="w-4 h-4 mr-2" />
          Express
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-violet-200/50 gap-3">
        <div className="flex gap-3 w-full sm:w-auto">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={onPrevious} 
              className="text-sm rounded-xl h-12 safari-button-fix mobile-touch-target flex-1 sm:flex-none"
            >
              Anterior
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="text-sm rounded-xl h-12 safari-button-fix mobile-touch-target flex-1 sm:flex-none"
          >
            Cancelar
          </Button>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          {currentStep === 1 && (
            <>
              <Button 
                onClick={onSaveBasic} 
                variant="outline" 
                className="bg-gray-100 text-sm rounded-xl h-12 safari-button-fix mobile-touch-target flex-1 sm:flex-none"
              >
                Guardar básico
              </Button>
              <Button 
                onClick={onContinue} 
                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-sm rounded-xl shadow-lg h-12 safari-button-fix mobile-touch-target flex-1 sm:flex-none"
              >
                Continuar
              </Button>
            </>
          )}
          {currentStep === 2 && (
            <Button 
              onClick={onSaveComplete} 
              className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-sm rounded-xl shadow-lg h-12 safari-button-fix mobile-touch-target w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar completo
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default FormActionButtons;
