import { SectionLink } from "./SectionLink";
import { type RoutineSimple } from "../../../types/routine";
import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import { useAppSelector } from "../../../hooks/reduxHooks";
import DashboardSection from "./DashboardSection";
import {
  selectAuthError,
  selectAuthLoading,
  selectRoutines,
} from "../../../state/appSlice";

export default function RoutinesSection() {
  const routines = useAppSelector(selectRoutines);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <DashboardSection title="Routines">
        <div className="dashboard-section-body">Loading.....</div>
        <div className="dashboard-section-footer"></div>
      </DashboardSection>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardSection title="Routines">
        <div className="dashboard-section-body">
          <p className="dashboard-error">Failed to load routinse.</p>
        </div>
        <div className="dashboard-section-footer">
          <button
            className="sci-btn"
            onClick={() => navigate("/traveler_planner")}
            type="button"
          >
            + Create New Routine
          </button>
        </div>
      </DashboardSection>
    );
  }

  return (
    <div className="dashboard-section">
      <SectionLink>Routines</SectionLink>
      <div className="dashboard-section-body">
        {routines.map((routine: RoutineSimple) => (
          <button
            key={routine.id}
            className="dashboard-list-item dashboard-list-clickable"
            onClick={() => {
              navigate(`/routines/${routine.id}`);
            }}
            type="button"
          >
            <span className="dashboard-list-text">{routine.name}</span>
          </button>
        ))}
        <button
          className="sci-btn"
          onClick={() => navigate("/traveler_planner")}
          type="button"
        >
          + Create New Routine
        </button>
      </div>
    </div>
  );
}
