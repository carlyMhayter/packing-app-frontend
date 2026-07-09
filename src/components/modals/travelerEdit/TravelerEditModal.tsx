import { useState } from "react";
import TravelerEditSlidePanel from "./TravelerEditSlidePanel";
import RoutineEditSlidePanel from "../routineEdit/RoutineEditSlidePanel";
import SlideModal from "../modal/SlideModal";
import ModalSlidePanel from "../modal/ModalSlidePanel";
import { createTraveler, updateTraveler } from "../../../services/travelers";
import { createRoutine, updateRoutine } from "../../../services/routines";
import { type TravelerProfile } from "../../../types/traveler";

interface RoutineItem {
  id: string;
  name: string;
  items: string[];
}

interface TravelerEditModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  travelerId?: string | null;
  onSaved?: (traveler: TravelerProfile) => void;
}

export default function TravelerEditModal({
  open,
  title,
  onClose,
  travelerId,
  onSaved,
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
  const [error, setError] = useState<string | null>(null);

  const routineToEdit = editingRoutineId
    ? routines.find((r) => r.id === editingRoutineId) ?? null
    : null;

  const handleSaveTraveler = async (formData: {
    name: string;
    type: "adult" | "child" | "infant" | "pet";
    temps: { hot: number; warm: number; cool: number; cold: number };
    unit: "F" | "C";
    medications: string[];
  }) => {
    setError(null);
    const payload: Omit<TravelerProfile, "id"> = {
      name: formData.name,
      type: formData.type,
      temperaturePreferences: { ...formData.temps, unit: formData.unit },
      medications: formData.medications,
      routineIds: routines.map((r) => r.id),
    };
    try {
      const result = travelerId
        ? await updateTraveler(travelerId, payload)
        : await createTraveler(payload);
      onSaved?.(result);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save traveler");
    }
  };

  return (
    <SlideModal
      open={open}
      title={title}
      onClose={onClose}
      activePanel={activePanel}
    >
      <ModalSlidePanel>
        {error && <p className="modal-error">{error}</p>}
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
          onSave={handleSaveTraveler}
        />
      </ModalSlidePanel>

      <ModalSlidePanel>
        <RoutineEditSlidePanel
          onNavigateBack={() => {
            setEditingRoutineId(null);
            setActivePanel(0);
          }}
          onSave={async (routine) => {
            try {
              if (editingRoutineId) {
                const saved = await updateRoutine(editingRoutineId, routine);
                setRoutines((prev) =>
                  prev.map((r) =>
                    r.id === editingRoutineId
                      ? { id: editingRoutineId, name: saved.name, items: saved.items }
                      : r
                  )
                );
              } else {
                const saved = await createRoutine(routine);
                setRoutines((prev) => [
                  ...prev,
                  { id: saved.id, name: saved.name, items: saved.items },
                ]);
              }
              setEditingRoutineId(null);
            } catch (_err) {
              // silently fall back to local state on error (mocks will succeed)
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
            }
          }}
          initialRoutine={routineToEdit}
        />
      </ModalSlidePanel>
    </SlideModal>
  );
}
