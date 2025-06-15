
interface FormProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgressBar = ({ currentStep, totalSteps }: FormProgressBarProps) => {
  return (
    <div className="w-full bg-violet-100 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-violet-500 to-purple-500 h-full rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );
};

export default FormProgressBar;
