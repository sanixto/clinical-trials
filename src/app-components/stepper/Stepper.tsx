import { StepperPrevButton } from "@/app-components/stepper/StepperPrevButton";
import { StepperNextButton } from "@/app-components/stepper/StepperNextButton";
import StepperLine from "@/app-components/stepper/StepperLine";
import { StepperProvider } from "@/app-components/stepper/StepperContext";
import StepperContent from "@/app-components/stepper/StepperContent";

interface StepperProps {
  children: React.ReactNode[];
}

export function Stepper({ children }: StepperProps) {
  return (
    <StepperProvider>
      <div className="w-full flex flex-col gap-10">
        <StepperLine maxSteps={children.length} />
        <StepperContent>{children}</StepperContent>
        <div className="flex w-full flex-wrap lg:flex-nowrap lg:justify-end gap-2">
          <StepperPrevButton />
          <StepperNextButton maxSteps={children.length} />
        </div>
      </div>
    </StepperProvider>
  );
}
