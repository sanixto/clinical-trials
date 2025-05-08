"use client";

import * as React from "react";
import {
  Accordion as RadixAccordion,
  AccordionItem as RadixAccordionItem,
  AccordionTrigger as RadixAccordionTrigger,
  AccordionContent as RadixAccordionContent,
} from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof RadixAccordionItem>,
  React.ComponentPropsWithoutRef<typeof RadixAccordionItem>
>(({ children, ...props }, forwardedRef) => (
  <RadixAccordionItem
    className="mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10"
    {...props}
    ref={forwardedRef}
  >
    {children}
  </RadixAccordionItem>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof RadixAccordionTrigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordionTrigger>
>(({ children, ...props }, forwardedRef) => (
  <RadixAccordionTrigger
    className="w-full font-semibold hover:cursor-pointer group flex py-8 flex-1 cursor-default items-center gap-5 leading-none text-green-600 text-xl lg:text-3xl outline-none "
    {...props}
    ref={forwardedRef}
  >
    <ChevronDownIcon
      width={30}
      height={30}
      className="text-green-600 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
      aria-hidden
    />
    {children}
  </RadixAccordionTrigger>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof RadixAccordionContent>,
  React.ComponentPropsWithoutRef<typeof RadixAccordionContent>
>(({ children, ...props }, forwardedRef) => (
  <RadixAccordionContent
    className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
    {...props}
    ref={forwardedRef}
  >
    <div className="p-5">{children}</div>
  </RadixAccordionContent>
));
AccordionContent.displayName = "AccordionContent";

interface AccordionProps {
  trigger: string;
  children?: React.ReactNode;
}

export function Accordion({ trigger, children }: AccordionProps) {
  return (
    <RadixAccordion
      type="single"
      collapsible
      className="w-full border-t-2 border-t-green-600"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </RadixAccordion>
  );
}
