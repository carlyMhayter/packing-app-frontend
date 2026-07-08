import type { ButtonHTMLAttributes } from "react";
import LoadingDots from "./loading";
interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function TextButton({
  loading = false,
  children,
  disabled,
  className = "",
  ...props
}: TextButtonProps) {
  return (
    <button
      type="button"
      className={`btn-text ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingDots /> : children}
    </button>
  );
}
