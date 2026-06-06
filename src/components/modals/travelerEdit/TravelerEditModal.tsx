import { useState } from "react";
import "../styles/travelerEdit.css";
import RoutineEditSlidePanel from "../routineEdit/RoutineEditSlidePanel";
import TravelerEditSlidePanel from "./TravelerEditSlidePanel";
import SlideModal from "../modal/SlideModal";

interface TravelerEditModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
}

export default function TravelerEditModal({
  open,
  title,
  onClose,
}: TravelerEditModalProps) {
  const [view, setView] = useState<"traveler" | "createRoutine">("traveler");

  const panels = [
    {
      name: "traveler",
      component: <TravelerEditSlidePanel setView={setView} />,
    },
    {
      name: "createRoutine",
      component: <RoutineEditSlidePanel setView={setView} />,
    },
  ];

  if (!open) return null;

  return (
    <SlideModal open={open} title={title} onClose={onClose} view={view}>
      {panels.map((panel) => (
        <div
          key={panel.name}
          className={`modal-slide ${view === panel.name ? "is-active" : ""}`}
        >
          {panel.component}
        </div>
      ))}
    </SlideModal>
  );
}
