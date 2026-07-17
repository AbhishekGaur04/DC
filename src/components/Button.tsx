// src/components/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-secondary text-white hover:bg-secondary-light focus:ring-secondary shadow-md hover:shadow-lg",
    secondary:
      "bg-primary text-white hover:bg-primary-light focus:ring-primary shadow-md hover:shadow-lg",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
