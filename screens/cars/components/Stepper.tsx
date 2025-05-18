import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepperProps {
  steps: string[]
  currentStep: number
  completedSteps: boolean[]
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="my-6">
      <div className="flex justify-between">
        {steps?.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-200 text-xs",
                currentStep === index
                  ? "border-primary bg-primary text-primary-foreground"
                  : completedSteps[index]
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-muted bg-background",
              )}
            >
              {completedSteps[index] ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
            </div>
            <span className="text-xs mt-2 text-center">{step}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 left-0 right-0 h-2 bg-muted rounded-md">
          <div
            className="h-2 bg-primary transition-all duration-300 rounded-md"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}


export default Stepper
