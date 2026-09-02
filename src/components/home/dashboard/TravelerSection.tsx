import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import DashboardSection from "./DashboardSection";
import Tooltip from "../../basic/tooltip";
import {
  selectAuthError,
  selectAuthLoading,
  selectTravelers,
} from "../../../state/appSlice";
import type { TravelerSimple } from "../../../types/traveler";
import { useAppSelector } from "../../../hooks/reduxHooks";

export default function TravelerSection() {
  const travelers = useAppSelector(selectTravelers);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <DashboardSection title="Travelers">
        <div className="dashboard-section-body">Loading.....</div>
        <div className="dashboard-section-footer"></div>
      </DashboardSection>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardSection title="Travelers">
        <div className="dashboard-section-body">
          <p className="dashboard-error">Failed to load travelers.</p>
        </div>
        <div className="dashboard-section-footer">
          <button
            className="sci-btn"
            onClick={() => navigate("/traveler_planner")}
            type="button"
          >
            + Create New Traveler
          </button>
        </div>
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="Travelers">
      <div className="travelers-list">
        {travelers.map((traveler: TravelerSimple) => (
          <Tooltip content="Edit traveler profile" position="top">
            <button
              key={traveler.id}
              className="traveler-chip"
              onClick={() => {
                navigate(`/travelers/${traveler.id}`);
              }}
            >
              {traveler.name == "Me" ? (
                <span className="dashboard-icon-star">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    width="16"
                    height="16"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
              ) : (
                <span className="traveler-avatar-placeholder">
                  {traveler.name.charAt(0).toUpperCase()}
                </span>
              )}

              <span className="traveler-name">{traveler.name}</span>
            </button>
          </Tooltip>
        ))}
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
