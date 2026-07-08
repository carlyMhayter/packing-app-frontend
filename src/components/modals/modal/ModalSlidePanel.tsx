import type { ReactNode } from "react";
import "../styles/modal.css";

type Props = { children?: ReactNode };

export default function ModalSlidePanel({ children }: Props) {
  return <div className="modal-slide-panel">{children}</div>;
}
