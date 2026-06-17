import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "font-heading inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-primary text-on-primary shadow-md hover:opacity-90",
    secondary:
      "bg-secondary-container text-on-secondary-container shadow-md hover:opacity-90",
    outline:
      "border border-outline-variant bg-surface-container-low text-on-surface hover:bg-surface-variant",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
