"use client";

interface ButtonButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
}

const variants = {
  primary: "bg-green-600 text-white",
  outline: "border-green-600 text-green-600 border-2 ",
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonButton) {
  const variantClass = variants[variant];

  return (
    <button
      className={`rounded-xl text-3xl font-semibold py-3 px-6 hover:cursor-pointer disabled:opacity-50 ${variantClass} ${
        className ?? ""
      }`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
