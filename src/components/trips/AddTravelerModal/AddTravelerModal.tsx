import { useState, useEffect, useCallback, useMemo } from "react";
import Modal from "../../modals/modal/Modal";
import TravelerListPanel from "./panels/TravelerListPanel";
import TravelerCreatePanel from "./panels/TravelerCreatePanel";
import { listTravelers, createTraveler } from "../../../services/travelers";
import { addTravelerToTrip } from "../../../services/trips";
import type { TravelerPublic, TravelerCreate } from "../../../types/travelers";
import type { TravelerCreateDraft } from "../../../types/forms/travelers";
import "./AddTravelerModal.css";

type ModalView = "list" | "create";

interface AddTravelerModalProps {
  open: boolean;
  onClose: () => void;
  tripId: number;
  userId: number;
  travelers: TravelerPublic[];
  draft: TravelerCreateDraft;
  onDraftChange: (updates: Partial<TravelerCreateDraft>) => void;
  onTravelerAdded: () => void;
}

export default function AddTravelerModal({
  open,
  onClose,
  tripId,
  userId,
  travelers,
  draft,
  onDraftChange,
  onTravelerAdded,
}: AddTravelerModalProps) {
  const [view, setView] = useState<ModalView>("list");
  const [allTravelers, setAllTravelers] = useState<TravelerPublic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchAllTravelersForUser = useCallback(async () => {
    if (!open || !userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const travelers = await listTravelers(userId);
      setAllTravelers(travelers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load travelers");
    } finally {
      setIsLoading(false);
    }
  }, [open, userId]);

  useEffect(() => {
    fetchAllTravelersForUser();
  }, [fetchAllTravelersForUser, travelers]);

  // Reset to list view when modal opens
  useEffect(() => {
    if (open) {
      setView("list");
      setError(null);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    setView("list");
    setError(null);
    setIsSaving(false);
    onClose();
  }, [onClose]);

  const handleSelectExisting = async (traveler: TravelerPublic) => {
    setIsSaving(true);
    setError(null);
    try {
      await addTravelerToTrip(tripId, traveler.id);
      onTravelerAdded();
      handleClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add traveler to trip",
      );
      setIsSaving(false);
    }
  };

  const handleCreateNew = () => {
    setView("create");
    setError(null);
  };

  const handleSaveNewTraveler = async () => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      // Build the API payload from the draft state
      const payload: TravelerCreate = {
        name: draft.name.trim(),
        traveler_type: draft.traveler_type,
        temp_unit: draft.temp_unit,
        temp_pref: JSON.stringify(draft.temps),
        is_active: true,
        user_id: userId,
        trip_ids: [],
        is_primary_for_user: false,
        clothing_preference: undefined,
      };

      // Create the traveler
      const newTraveler = await createTraveler(
        payload as Omit<TravelerPublic, "id">,
      );
      // Then add to trip
      await addTravelerToTrip(tripId, newTraveler.id);
      onTravelerAdded();
      handleClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create traveler",
      );
      setIsSaving(false);
    }
  };

  const handleCancelCreate = () => {
    setView("list");
    setError(null);
  };

  // Filter out travelers already on this trip
  const existingIds = new Set(travelers.map((t) => t.id));
  const parentIds = new Set(
    allTravelers.filter((t) => t.parent_id).map((t) => t.parent_id),
  );
  const availableTravelers = travelers.filter(
    (traveler: TravelerPublic) =>
      !existingIds.has(traveler.id) && !parentIds.has(traveler.id),
  );

  const title = view === "list" ? "Add Traveler" : "Create New Traveler";

  return (
    <Modal open={open} title={title} onClose={handleClose}>
      {error && view === "list" && <div className="modal-error">{error}</div>}

      {view === "list" && (
        <div className="modal-wizard-section">
          <TravelerListPanel
            travelers={availableTravelers}
            isLoading={isLoading}
            error={error}
            onSelectTraveler={handleSelectExisting}
            onCreateNew={handleCreateNew}
          />
        </div>
      )}

      {view === "create" && (
        <div className="modal-wizard-section">
          <TravelerCreatePanel
            draft={draft}
            onChange={onDraftChange}
            onSave={handleSaveNewTraveler}
            onCancel={handleCancelCreate}
            isSaving={isSaving}
            error={error}
          />
        </div>
      )}
    </Modal>
  );
}
