import type { TravelerPublic } from "../../../../types/travelers";
import LoadingDots from "../../../basic/loading";

interface TravelerListPanelProps {
  travelers: TravelerPublic[];
  isLoading: boolean;
  error: string | null;
  onSelectTraveler: (traveler: TravelerPublic) => void;
  onCreateNew: () => void;
}

export default function TravelerListPanel({
  travelers,
  isLoading,
  error,
  onSelectTraveler,
  onCreateNew,
}: TravelerListPanelProps) {
  if (isLoading) {
    return (
      <div className="traveler-list-panel loading-state">
        <LoadingDots />
        <p>Loading travelers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="traveler-list-panel error-state">
        <p className="panel-error-text">{error}</p>
        <button className="btn-secondary" onClick={onCreateNew} type="button">
          Create New Traveler Instead
        </button>
      </div>
    );
  }

  if (travelers.length === 0) {
    return (
      <div className="traveler-list-panel empty-state">
        <img
          className="empty-icon"
          src="/src/assets/platy_square.png"
          alt="Platypak logo"
        />
        <h3>No Other Travelers</h3>
        <p>
          You don&apos;t have any other travelers! Would you like to make
          another Traveler Profile?
        </p>
        <button className="btn-primary" onClick={onCreateNew} type="button">
          Create New Traveler
        </button>
      </div>
    );
  }

  return (
    <div className="traveler-list-panel">
      <h3 className="panel-heading">Select a Traveler</h3>
      <div className="traveler-list">
        {travelers.map((traveler) => (
          <button
            key={traveler.id}
            type="button"
            className="traveler-list-item"
            onClick={() => onSelectTraveler(traveler)}
          >
            <div className="traveler-avatar">
              {traveler.name.charAt(0).toUpperCase()}
            </div>
            <div className="traveler-info">
              <span className="traveler-name">{traveler.name}</span>
              <span className="traveler-type">{traveler.traveler_type}</span>
            </div>
            <span className="traveler-add-icon">+</span>
          </button>
        ))}
      </div>

      <div className="panel-divider">
        <span>or</span>
      </div>

      <button className="btn-secondary" onClick={onCreateNew} type="button">
        Create New Traveler
      </button>
    </div>
  );
}
