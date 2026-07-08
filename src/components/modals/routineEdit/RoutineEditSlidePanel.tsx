import { useState, useEffect } from "react";
import "../styles/travelerEdit.css";

interface RoutineEditSlidePanelProps {
  onNavigateBack: () => void;
  onSave: (routine: { name: string; items: string[] }) => void;
  initialRoutine?: { name: string; items: string[] } | null;
}

export default function RoutineEditSlidePanel({
  onNavigateBack,
  onSave,
  initialRoutine,
}: RoutineEditSlidePanelProps) {
  // Create New Routine state
  const [routineName, setRoutineName] = useState("");
  const [routineItems, setRoutineItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    setRoutineName(initialRoutine?.name ?? "");
    setRoutineItems(initialRoutine?.items ?? []);
  }, [initialRoutine]);

  // Create New Routine handlers
  const addRoutineItem = () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;
    setRoutineItems((prev) => [...prev, trimmed]);
    setNewItem("");
  };

  const removeRoutineItem = (index: number) => {
    setRoutineItems((prev) => prev.filter((_, i) => i !== index));
  };

  const saveNewRoutine = () => {
    const trimmed = routineName.trim();
    if (!trimmed) return;
    if (routineItems.length === 0) return;
    onSave({ name: trimmed, items: routineItems });
    setRoutineName("");
    setRoutineItems([]);
    onNavigateBack();
  };

  return (
    <>
      <div className="routine-panel-header">
        <button
          className="routine-back-btn"
          onClick={onNavigateBack}
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
        <h3 className="routine-panel-title">
          {initialRoutine ? "Edit Routine" : "Create New Routine"}
        </h3>
      </div>

      <section className="trav-modal-section">
        <label className="trav-modal-section-label" htmlFor="routine-name">
          Routine Name
        </label>
        <input
          id="routine-name"
          type="text"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          placeholder="e.g. Morning Skincare"
          className="modal-text-input"
        />
      </section>

      <section className="trav-modal-section">
        <h4 className="trav-modal-section-heading">Routine Items</h4>
        <div className="routine-items-list">
          {routineItems.map((item, i) => (
            <div key={i} className="routine-item-row">
              <span className="routine-item-number">{i + 1}.</span>
              <span className="routine-item-name">{item}</span>
              <button
                className="tag-remove"
                onClick={() => removeRoutineItem(i)}
                type="button"
                aria-label={`Remove ${item}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  width="10"
                  height="10"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="tag-add-row">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addRoutineItem();
            }}
            placeholder="Add item..."
            className="tag-add-input"
          />
          <button
            className="tag-add-btn"
            onClick={addRoutineItem}
            type="button"
            aria-label="Add item"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              width="14"
              height="14"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </section>

      <div className="modal-footer">
        <button
          className="btn-main"
          onClick={saveNewRoutine}
          type="button"
          disabled={!routineName.trim() || routineItems.length === 0}
        >
          Save Routine
        </button>
        <button
          className="btn-text"
          onClick={onNavigateBack}
          type="button"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
