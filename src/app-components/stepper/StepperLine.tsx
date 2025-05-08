"use client";

import { Fragment } from "react";
import { useStepper } from "@/app-components/stepper/StepperContext";

interface StepperLineProps {
  maxSteps: number;
}

export default function StepperLine({ maxSteps }: StepperLineProps) {
  const { activeStep } = useStepper();

  return (
    <div className="flex gap-1 lg:gap-2 items-center">
      {Array.from({ length: maxSteps }, (_, index) => (
        <Fragment key={index}>
          <div
            className={`h-8 w-8 lg:h-20 lg:w-20 rounded-full font-bold text-lg lg:text-2xl flex items-center justify-center ${
              index === activeStep ? "bg-green-600" : "bg-green-100"
            }`}
          >
            {index + 1}
          </div>
          {index < maxSteps - 1 && (
            <div className="grow underline bg-green-100 h-1"></div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
