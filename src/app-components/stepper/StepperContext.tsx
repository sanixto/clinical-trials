"use client";

import { createContext, useContext, useState } from "react";

interface IStepperContext {
  activeStep: number;
  disabled: boolean;
  next: () => void;
  prev: () => void;
  setDisabled: (value: boolean) => void;
}

export interface IStep<S> {
  label: S;
  content: React.ReactNode;
}

const StepperContext = createContext<IStepperContext | undefined>(undefined);

interface IStepperProviderProps {
  children: React.ReactNode;
}

export const StepperProvider = ({ children }: IStepperProviderProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const next = () => setActiveStep((prev) => prev + 1);
  const prev = () => setActiveStep((prev) => Math.max(0, prev - 1));

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        disabled,
        next,
        prev,
        setDisabled,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export const useStepper = () => {
  const context = useContext(StepperContext);

  if (context === undefined) {
    throw new Error("useStepper must be used within a StepperProvider");
  }

  return context;
};
