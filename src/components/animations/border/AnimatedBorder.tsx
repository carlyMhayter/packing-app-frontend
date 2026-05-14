import type { ReactNode } from "react";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedBorder({
  children,
  className = "",
}: AnimatedBorderProps) {
  return (
    <div className={`animated-border-wrapper ${className}`}>
      <svg
        className="animated-border-svg"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="var(--steelBlue-radius, 8)"
          ry="var(--steelBlue-radius, 8)"
          fill="none"
          stroke="var(--steelBlue)"
          strokeWidth="10"
          pathLength="100"
          className="animated-border-rect"
        />
      </svg>
      {children}
    </div>
  );
}
