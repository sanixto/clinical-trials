import { useStepper } from "@/app-components/stepper/StepperContext";

interface StepperContentProps {
  children: React.ReactNode[];
}

export default function StepperContent({ children }: StepperContentProps) {
  const { activeStep } = useStepper();

  return <div>{children.length && children[activeStep]}</div>;
}
