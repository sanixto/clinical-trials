"use client";

import { useEffect } from "react";
import { useStepper } from "@/app-components/stepper/StepperContext";

interface StepProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  disabled?: boolean;
}

export function Step({
  children,
  title,
  subtitle,
  disabled = false,
}: StepProps) {
  const { setDisabled } = useStepper();

  useEffect(() => {
    setDisabled(disabled);
  }, [disabled, setDisabled]);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-3xl lg:text-5xl font-semibold text-green-600">
        {title}
      </h3>
      {subtitle && (
        <p className="text-2xl lg:text-3xl font-medium text-gray-600">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
