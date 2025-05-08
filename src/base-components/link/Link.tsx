"use client";

import NextLink from "next/link";

interface ButtonButton extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  variant?: keyof typeof variants;
  className?: string;
}

const variants = {
  primary: "bg-green-600 text-white",
  outline: "border-green-600 text-green-600 border-2 ",
};

export default function Link({
  children,
  href,
  variant = "primary",
  className,
  ...props
}: ButtonButton) {
  const variantClass = variants[variant];

  return (
    <NextLink
      className={`rounded-xl font-semibold py-3 px-6 hover:cursor-pointer ${variantClass} ${
        className ?? ""
      }`}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
