import { Check } from "lucide-react";

/**
 * StepIndicator Component
 * Visualizes the current step in the wizard.
 * 
 * Props:
 * - currentStep: number (1 or 2)
 */
const StepIndicator = ({ currentStep }) => {
  const steps = [
    { num: 1, label: "Select Template" },
    { num: 2, label: "Name & Create" }
  ];

  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.num;
        const isActive = currentStep === step.num;
        
        return (
          <div key={step.num} className="flex items-center">
            {/* Step Circle */}
            <div className={`flex items-center gap-2 ${
                index !== steps.length - 1 ? "mr-4" : ""
            }`}>
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-colors border-2 ${
                    isCompleted 
                        ? "bg-green-500 border-green-500 text-white" 
                        : isActive 
                            ? "bg-blue-600 border-blue-600 text-white" 
                            : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  {isCompleted ? <Check size={16} /> : step.num}
                </div>
                <span className={`text-sm font-medium ${
                    isActive || isCompleted ? "text-gray-800" : "text-gray-500"
                }`}>
                    {step.label}
                </span>
            </div>

            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div className={`w-12 h-0.5 mr-4 transition-colors ${
                isCompleted ? "bg-green-500" : "bg-gray-200"
              }`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
