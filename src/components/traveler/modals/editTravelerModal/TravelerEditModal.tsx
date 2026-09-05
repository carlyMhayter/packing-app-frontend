import { useState } from "react";
import Modal from "../../../modals/modal/Modal";
import RoutineEditSection from "../../../routines/modals/editRoutine/RoutineEditSection";
import TravelerEditSlidePanel from "./TravelerEditSlidePanel";
import { createTraveler, updateTraveler } from "../../../../services/travelers";
import { createRoutine, updateRoutine } from "../../../../services/routines";
import { type Traveler } from "../../../../types/traveler";

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
  onSaved?: (traveler: Traveler) => void;
}

export default function TravelerEditModal({
  open,
  title,
  onClose,
  travelerId,
  onSaved,
}: TravelerEditModalProps) {
  const [showRoutineEditor, setShowRoutineEditor] = useState(false);
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
    ? (routines.find((r) => r.id === editingRoutineId) ?? null)
    : null;

  const handleSaveTraveler = async (formData: Traveler) => {
    setError(null);
    const payload: Omit<Traveler, "id"> = {
      name: formData.name,
      type: formData.type,
      temperaturePreferences: { ...formData.temperaturePreferences },
      medications: formData.medications,
      routineIds: routines.map((r) => r.id),
      clothingPreferences: { ...formData.clothingPreferences },
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

  const handleNavigateToRoutineEditor = (routineId?: string) => {
    setEditingRoutineId(routineId ?? null);
    setShowRoutineEditor(true);
    setError(null);
  };

  const handleBackFromRoutineEditor = () => {
    setShowRoutineEditor(false);
    setEditingRoutineId(null);
    setError(null);
  };

  const handleSaveRoutine = async (routine: { name: string; items: string[] }) => {
    setError(null);
    try {
      if (editingRoutineId) {
        const saved = await updateRoutine(editingRoutineId, routine);
        setRoutines((prev) =>
          prev.map((r) =>
            r.id === editingRoutineId
              ? { id: editingRoutineId, name: saved.name, items: saved.items }
              : r,
          ),
        );
      } else {
        const saved = await createRoutine(routine);
        setRoutines((prev) => [
          ...prev,
          { id: saved.id, name: saved.name, items: saved.items },
        ]);
      }
      handleBackFromRoutineEditor();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save routine");
    }
  };

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {error && <p className="modal-error">{error}</p>}

      {!showRoutineEditor && (
        <div className="modal-wizard-section">
          <TravelerEditSlidePanel
            routines={routines}
            onRoutinesChange={setRoutines}
            onNavigateNext={() => handleNavigateToRoutineEditor()}
            onEditRoutine={(id) => handleNavigateToRoutineEditor(id)}
            onSave={handleSaveTraveler}
          />
        </div>
      )}

      {showRoutineEditor && (
        <div className="modal-wizard-section">
          <button
            className="modal-back-btn"
            onClick={handleBackFromRoutineEditor}
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="18"
              height="18"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Traveler
          </button>
          <RoutineEditSection
            onSave={handleSaveRoutine}
            onCancel={handleBackFromRoutineEditor}
            initialRoutine={routineToEdit}
          />
        </div>
      )}
    </Modal>
  );
}
