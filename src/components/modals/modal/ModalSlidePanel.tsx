import React from "react";
import "../styles/modal.css";

type Props = { children?: React.ReactNode };

export default function ModalSlidePanel({ children }: Props) {
  return <div className="modal-slide-panel">{children}</div>;
}
