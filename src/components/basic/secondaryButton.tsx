import type { ButtonHTMLAttributes } from "react";
import LoadingDots from "./loading";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function SecondaryButton({
  loading = false,
  children,
  disabled,
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      type="button"
      className={`btn-secondary ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingDots /> : children}
    </button>
  );
}
