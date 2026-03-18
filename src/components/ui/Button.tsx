import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition";

  const styles =
    variant === "primary"
      ? "bg-emerald-500 text-white hover:bg-emerald-600"
      : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50";

  return (
    <button className={`${base} ${styles} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
