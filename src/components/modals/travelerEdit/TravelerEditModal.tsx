import { useState } from "react";
import TravelerEditSlidePanel from "./TravelerEditSlidePanel";
import RoutineEditSlidePanel from "../routineEdit/RoutineEditSlidePanel";
import SlideModal from "../modal/SlideModal";
import ModalSlidePanel from "../modal/ModalSlidePanel";

interface RoutineItem {
  id: string;
  name: string;
  items: string[];
}

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
  const [activePanel, setActivePanel] = useState(0);
  const [routines, setRoutines] = useState<RoutineItem[]>([
    {
      id: "routine-1",
      name: "Standard Hygiene Routine",
      items: [
        "Toothbrush",
        "Toothpaste",
        "Dental floss",
        "Deodorant",
        "Shampoo",
        "Conditioner",
        "Body wash",
        "Face wash",
        "Moisturizer",
        "Razor",
        "Shaving cream",
      ],
    },
  ]);
  const [editingRoutineId, setEditingRoutineId] = useState<string | null>(null);

  const routineToEdit = editingRoutineId
    ? routines.find((r) => r.id === editingRoutineId) ?? null
    : null;

  return (
    <SlideModal
      open={open}
      title={title}
      onClose={onClose}
      activePanel={activePanel}
    >
      <ModalSlidePanel>
        <TravelerEditSlidePanel
          routines={routines}
          onRoutinesChange={setRoutines}
          onNavigateNext={() => {
            setEditingRoutineId(null);
            setActivePanel(1);
          }}
          onEditRoutine={(id) => {
            setEditingRoutineId(id);
            setActivePanel(1);
          }}
        />
      </ModalSlidePanel>

      <ModalSlidePanel>
        <RoutineEditSlidePanel
          onNavigateBack={() => {
            setEditingRoutineId(null);
            setActivePanel(0);
          }}
          onSave={(routine) => {
            if (editingRoutineId) {
              setRoutines((prev) =>
                prev.map((r) =>
                  r.id === editingRoutineId
                    ? { ...routine, id: editingRoutineId }
                    : r
                )
              );
            } else {
              setRoutines((prev) => [
                ...prev,
                { ...routine, id: `routine-${Date.now()}` },
              ]);
            }
            setEditingRoutineId(null);
          }}
          initialRoutine={routineToEdit}
        />
      </ModalSlidePanel>
    </SlideModal>
  );
}
