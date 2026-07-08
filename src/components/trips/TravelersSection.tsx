import { type Traveler } from "../../types/trip";
import "./styles/travelerSummary.css";

interface TravelersSectionProps {
  travelers: Traveler[];
  onAddTraveler: () => void;
}

export default function TravelersSection({
  travelers,
  onAddTraveler,
}: TravelersSectionProps) {
  return (
    <div className="travelers-section">
      <h2 className="travelers-heading">Who is going on this trip?</h2>

      {travelers.length > 0 && (
        <div className="travelers-list">
          {travelers.map((traveler) => (
            <div key={traveler.id} className="traveler-chip">
              {traveler.avatar ? (
                <img
                  src={traveler.avatar}
                  alt={traveler.name}
                  className="traveler-avatar"
                />
              ) : (
                <div className="traveler-avatar-placeholder">
                  {traveler.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="traveler-name">{traveler.name}</span>
            </div>
          ))}
        </div>
      )}

      <button
        className="add-traveler-btn"
        onClick={onAddTraveler}
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
        <span className="add-traveler-label">Add Traveler</span>
      </button>
    </div>
  );
}
