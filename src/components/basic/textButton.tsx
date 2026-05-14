import type { ButtonHTMLAttributes } from "react";

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
