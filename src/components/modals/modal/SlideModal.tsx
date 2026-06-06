import Modal from "./Modal";
import "../styles/travelerEdit.css";
import "../styles/modal.css";

interface SlideModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  view: "traveler" | "createRoutine";
  children?: React.ReactNode;
}

export default function SlideModal({
  open,
  view,
  title,
  onClose,
  children,
}: SlideModalProps) {
  if (!open) return null;

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="modal-slide-container">
        <div
          className={`modal-slide-track ${view === "createRoutine" ? "is-shifted" : ""}`}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
}
