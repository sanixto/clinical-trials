import Button from "@/base-components/button/Button";
import { useStepper } from "@/app-components/stepper/StepperContext";

export function StepperPrevButton() {
  const { activeStep, prev } = useStepper();

  return (
    <Button
      className="px-20"
      variant="outline"
      disabled={activeStep === 0}
      onClick={prev}
    >
      Prev
    </Button>
  );
}
