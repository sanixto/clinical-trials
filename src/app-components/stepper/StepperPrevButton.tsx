import Button from "@/base-components/button/Button";
import { useStepper } from "@/app-components/stepper/StepperContext";

export function StepperPrevButton() {
  const { activeStep, prev } = useStepper();

  return (
    <Button
      className="w-full lg:w-fit px-20"
      variant="outline"
      disabled={activeStep === 0}
      onClick={prev}
    >
      Prev
    </Button>
  );
}
