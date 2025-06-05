import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description?: string
}

interface ProgressStepsProps {
  steps: Step[]
  currentStep: string
  completedSteps: string[]
}

export function ProgressSteps({ steps, currentStep, completedSteps }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id)
        const isCurrent = currentStep === step.id
        const isLast = index === steps.length - 1

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold",
                  isCompleted
                    ? "border-sky-blue bg-sky-blue text-white"
                    : isCurrent
                      ? "border-sky-blue bg-white text-sky-blue"
                      : "border-gray-300 bg-white text-gray-400",
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <div className="mt-2 text-center">
                <p className={cn("text-sm font-medium", isCurrent ? "text-sky-blue" : "text-gray-600")}>{step.title}</p>
                {step.description && <p className="text-xs text-gray-500">{step.description}</p>}
              </div>
            </div>
            {!isLast && <div className={cn("mx-4 h-0.5 w-16 flex-1", isCompleted ? "bg-sky-blue" : "bg-gray-300")} />}
          </div>
        )
      })}
    </div>
  )
}
