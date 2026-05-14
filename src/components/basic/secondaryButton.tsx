import type { ButtonHTMLAttributes } from "react";

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
