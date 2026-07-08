import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelerEditModal from "../../modals/travelerEdit/TravelerEditModal";
import TripSection from "./TripSection";
import "./styles/dashboard.css";
import TravelerSection from "./TravelerSection";

function SectionLink({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <button
      className="dashboard-section-title"
      onClick={() => navigate("/dashboard")}
      type="button"
    >
      {children}
    </button>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [travelerModalOpen, setTravelerModalOpen] = useState(false);
  const [routineModalOpen, setRoutineModalOpen] = useState(false);

  return (
    <div className="dashboard">
      <h1 className="dashboard-welcome">Welcome Carly!</h1>

      <div className="dashboard-grid">
        <TripSection />

        {/* Travelers */}
        <TravelerSection />

        {/* Routines */}
        <div className="dashboard-section">
          <SectionLink>Routines</SectionLink>
          <div className="dashboard-section-body">
            <button
              className="dashboard-list-item dashboard-list-clickable"
              onClick={() => setRoutineModalOpen(true)}
              type="button"
            >
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
              <span className="dashboard-list-text">Basic Routine</span>
              <span className="dashboard-edit-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  width="14"
                  height="14"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </span>
            </button>
            <button
              className="dashboard-list-add"
              onClick={() => navigate("/dashboard")}
              type="button"
            >
              <span className="dashboard-icon-plus">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  width="14"
                  height="14"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <span className="dashboard-list-text">add a routine</span>
            </button>
          </div>
        </div>
        {/* <DestinationsSection /> */}
      </div>

      <TravelerEditModal
        open={travelerModalOpen}
        title={"Edit Traveler"}
        onClose={() => setTravelerModalOpen(false)}
      />

      <TravelerEditModal
        open={routineModalOpen}
        title="Edit Routine"
        onClose={() => setRoutineModalOpen(false)}
      />
    </div>
  );
}
