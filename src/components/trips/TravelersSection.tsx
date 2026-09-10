import { useState } from "react";
import "./styles/travelerSummary.css";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import { selectError } from "../../state/travelerSlice.ts";
import { selectTripTravelers, loadTripThunk } from "../../state/tripSlice.tsx";
import { selectCurrentUser } from "../../state/appSlice.ts";
import { TravelerType, TemperatureUnit } from "../../enums/enums.ts";
import type { TravelerCreateDraft } from "../../types/travelers.ts";
import AddTravelerModal from "./AddTravelerModal/AddTravelerModal";
import { TempPrefStandards } from "../../enums/enums.ts";

const defaultDraft: TravelerCreateDraft = {
  name: "",
  traveler_type: TravelerType.ADULT,
  temp_unit: TemperatureUnit.FAHRENHEIT,
  temps: { ...TempPrefStandards },
};

interface TravelersSectionProps {
  tripId: number;
}

export default function TravelersSection({ tripId }: TravelersSectionProps) {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const travelers = useAppSelector(selectTripTravelers);
  const user = useAppSelector(selectCurrentUser);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTravelerDraft, setNewTravelerDraft] =
    useState<TravelerCreateDraft>(defaultDraft);

  const userId = user?.id ?? 0;

  const handleTravelerAdded = () => {
    // Refresh trip data to show the new traveler
    if (tripId && userId) {
      dispatch(loadTripThunk({ trip_id: tripId, user_id: userId }));
    }
  };

  const handleOpenModal = () => {
    // Reset draft to defaults every time modal opens
    setNewTravelerDraft(defaultDraft);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleDraftChange = (updates: Partial<TravelerCreateDraft>) => {
    setNewTravelerDraft((prev) => ({ ...prev, ...updates }));
  };

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className="travelers-section">
      <h2 className="travelers-heading">Who is going on this trip?</h2>{" "}
      <div className="attending-travelers">
        {travelers && (
          <div className="travelers-list">
            {travelers.map((traveler) => (
              <div key={traveler.id} className="traveler-chip">
                <div className="traveler-avatar-placeholder">
                  {traveler.name.charAt(0).toUpperCase()}
                </div>
                <span className="traveler-name">{traveler.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="add-traveler-btn"
        onClick={handleOpenModal}
        type="button"
      >
        <div className="add-traveler-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            width="28"
            height="28"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <span className="add-traveler-label">Add More Travelers</span>
      </button>
      <AddTravelerModal
        open={showAddModal}
        onClose={handleCloseModal}
        tripId={tripId}
        userId={userId}
        travelers={travelers ? travelers : []}
        draft={newTravelerDraft}
        onDraftChange={handleDraftChange}
        onTravelerAdded={handleTravelerAdded}
      />
    </div>
  );
}
