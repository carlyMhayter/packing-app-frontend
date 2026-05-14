import type { ButtonHTMLAttributes } from "react";

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
      {loading ? (
        <span className="loading-dots" aria-label="Loading">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
