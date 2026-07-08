import type { ButtonHTMLAttributes } from "react";
import LoadingDots from "./loading";
interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  loading?: boolean;
}

export default function MainButton({
  color = "#d14f46",
  loading = false,
  children,
  disabled,
  className = "",
  ...props
}: MainButtonProps) {
  return (
    <button
      type="button"
      className={`btn-main ${className}`}
      disabled={disabled || loading}
      style={
        {
          "--btn-color": color,
        } as React.CSSProperties
      }
      {...props}
    >
      {loading ? <LoadingDots /> : children}
    </button>
  );
}
