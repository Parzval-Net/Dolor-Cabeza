
interface FormStepIndicatorProps {
  currentStep: number;
}

const FormStepIndicator = ({ currentStep }: FormStepIndicatorProps) => {
  return (
    <div className="space-y-1">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
        {currentStep === 1 ? 'Información básica' : 'Detalles adicionales'}
      </h2>
      <p className="text-sm text-slate-600 font-medium">
        {currentStep === 1 ? 'Solo lo esencial' : 'Opcional, para mejor seguimiento'}
      </p>
    </div>
  );
};

export default FormStepIndicator;
