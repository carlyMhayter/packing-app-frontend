import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import { listTravelers } from "../../../services/travelers";
import { type TravelerProfile } from "../../../types/traveler";
import DashboardSection from "./DashboardSection";

export default function TravelerSection() {
  const [travelers, setTravelers] = useState<TravelerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    listTravelers(4)
      .then((data) => {
        setTravelers(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <DashboardSection title="Travelers">
        <div className="dashboard-section-body">Loading.....</div>
        <div className="dashboard-section-footer">
          <button
            className="sci-btn"
            onClick={() => navigate("/traveler_planner")}
            type="button"
          >
            + Add New Traveler
          </button>
        </div>
      </DashboardSection>
    );
  }

  if (error) {
    return (
      <DashboardSection title="Travelers">
        <div className="dashboard-section-body">
          <p className="dashboard-error">{error}</p>
        </div>
        <div className="dashboard-section-footer">
          <button
            className="sci-btn"
            onClick={() => navigate("/traveler_planner")}
            type="button"
          >
            + Add New Traveler
          </button>
        </div>
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Travelers">
      {travelers.length > 0 ? (
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
      ) : (
        <>
          <p className="dashboard-empty-line">No travelers yet!</p>
          <p className="dashboard-empty-line">Let&apos;s get started!</p>
        </>
      )}
      <div className="dashboard-section-footer">
        <button
          className="sci-btn"
          onClick={() => navigate("/traveler_planner")}
          type="button"
        >
          + Add New Traveler
        </button>
      </div>
    </DashboardSection>
  );
}
