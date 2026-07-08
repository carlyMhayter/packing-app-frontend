import Modal from "./Modal";
import "../styles/modal.css";

interface SlideModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  activePanel: number;
  children: React.ReactNode;
}

export default function SlideModal({
  open,
  activePanel,
  title,
  onClose,
  children,
}: SlideModalProps) {
  if (!open) return null;

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="modal-slide-container">
        <div
          className="modal-slide-track"
          style={{ transform: `translateX(-${activePanel * 100}%)` }}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
}
