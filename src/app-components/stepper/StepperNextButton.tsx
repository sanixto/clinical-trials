import { useFormStatus } from "react-dom";
import Button from "@/base-components/button/Button";
import { useStepper } from "@/app-components/stepper/StepperContext";

interface StepperNextButtonProps {
  maxSteps: number;
}

export function StepperNextButton({ maxSteps }: StepperNextButtonProps) {
  const { activeStep, disabled, next } = useStepper();
  const { pending } = useFormStatus();
  const isLastStep = activeStep === maxSteps - 1;

  return (
    <Button
      className="px-20"
      variant="primary"
      type={isLastStep ? "submit" : "button"}
      onClick={!isLastStep ? next : undefined}
      disabled={disabled}
    >
      {isLastStep ? (pending ? `Applying...` : "Apply") : "Next"}
    </Button>
  );
}
