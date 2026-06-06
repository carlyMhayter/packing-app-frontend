import { useEffect, useRef } from "react";
import "../styles/modal.css";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay modal-overlay-dark"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="traveler-modal-title"
    >
      <div className="modal-content modal-scrollable">
        <div className="modal-header">
          <h3 id="traveler-modal-title" className="modal-title">
            {title}
          </h3>
          <button
            ref={closeRef}
            className="modal-close-btn"
            onClick={onClose}
            type="button"
            aria-label="Close modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              width="18"
              height="18"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
